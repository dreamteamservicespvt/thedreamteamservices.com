import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TeamMember } from "@/types/team";
import { getTeamMembers } from "@/services/teamService";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ErrorDisplay } from "@/components/ui/error-display";
import TeamCard from "./TeamCard";
import TeamCardMobile from "./TeamCardMobile";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<TeamMember[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const { hasError, message, details, handleError, clearError } = useErrorHandler();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.2,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: shouldReduceMotion ? 0.4 : undefined
      }
    }
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        clearError();
        const members = await getTeamMembers();
        
        console.log('TeamSection: Fetched team members', { 
          count: members.length,
          members: members.map(m => ({ id: m.id, name: m.name, hasImage: !!m.image }))
        });
        
        // Sort team members by their order property if available
        const sortedMembers = [...members].sort((a, b) => {
          return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
        });
        
        setTeamMembers(sortedMembers);
        setDisplayedMembers(sortedMembers.slice(0, visibleCount));
      } catch (error) {
        console.error('TeamSection: Failed to fetch team members', error);
        handleError(error, "Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [handleError, clearError]);

  useEffect(() => {
    console.log('TeamSection: Updating displayed members', { 
      totalMembers: teamMembers.length,
      visibleCount,
      displayingCount: Math.min(visibleCount, teamMembers.length)
    });
    setDisplayedMembers(teamMembers.slice(0, visibleCount));
  }, [teamMembers, visibleCount]);

  const handleShowMore = () => {
    const newVisibleCount = Math.min(visibleCount + 4, teamMembers.length);
    console.log('TeamSection: Show More clicked', { 
      currentVisible: visibleCount,
      newVisible: newVisibleCount,
      totalMembers: teamMembers.length 
    });
    setVisibleCount(newVisibleCount);
  };

  const handleMemberImageError = (member: TeamMember) => (error: Error) => {
    console.error(`TeamSection: Failed to load image for ${member.name}:`, {
      error: error.message,
      memberId: member.id,
      imageUrl: member.image,
      hasImage: !!member.image
    });
  };

  return (
    <section id="team" className="py-16 sm:py-20 lg:py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/5 via-transparent to-dts-cyan/5 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-dts-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-dts-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Team
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Meet the talented professionals driving our success and committed 
            to deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Error Display */}
        {hasError && (
          <ErrorDisplay 
            message={message}
            details={details}
            onRetry={() => {
              clearError();
              setIsLoading(true);
            }}
            className="mb-6 sm:mb-8"
          />
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl flex flex-col min-h-[360px] sm:min-h-[400px]">
                <div className="h-40 sm:h-48 lg:h-56 bg-muted animate-pulse rounded-t-2xl"></div>
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <div className="h-6 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                  <div className="flex-1"></div>
                  <div className="h-10 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedMembers.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-lg">No team members to display.</p>
          </div>
        ) : (
          <motion.div 
            key={`team-grid-${displayedMembers.length}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full"
          >
            {displayedMembers.map((member, index) => (
              isMobile ? (
                <TeamCardMobile
                  key={`${member.id}-${index}`}
                  member={member}
                  index={index}
                  onImageError={handleMemberImageError(member)}
                />
              ) : (
                <TeamCard
                  key={`${member.id}-${index}`}
                  member={member}
                  index={index}
                  onImageError={handleMemberImageError(member)}
                  variants={itemVariants}
                />
              )
            ))}
          </motion.div>
        )}

        {/* Show More Button */}
        {!isLoading && visibleCount < teamMembers.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 sm:mt-12 lg:mt-16"
          >
            <Button
              onClick={handleShowMore}
              variant="outline"
              size="lg"
              className="bg-card/50 backdrop-blur-sm border-dts-cyan/30 hover:border-dts-cyan/60 hover:bg-dts-cyan/10 transition-all duration-300 w-full sm:w-auto min-h-[44px]"
            >
              Show More Team Members
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-4">
            We are a team of passionate professionals committed to excellence and innovation.
            Join us in creating exceptional digital experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;