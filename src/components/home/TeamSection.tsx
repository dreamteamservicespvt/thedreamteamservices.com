import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { TeamMember } from "@/types/team";
import { getTeamMembers } from "@/services/teamService";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { ErrorDisplay } from "@/components/ui/error-display";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<TeamMember[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const { hasError, message, details, handleError, clearError } = useErrorHandler();
  const shouldReduceMotion = useReducedMotion();

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
        
        // Sort team members by their order property if available
        const sortedMembers = [...members].sort((a, b) => {
          return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
        });
        
        setTeamMembers(sortedMembers);
        setDisplayedMembers(sortedMembers.slice(0, visibleCount));
      } catch (error) {
        handleError(error, "Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [handleError, clearError]);

  useEffect(() => {
    setDisplayedMembers(teamMembers.slice(0, visibleCount));
  }, [teamMembers, visibleCount]);

  const handleShowMore = () => {
    const newVisibleCount = Math.min(visibleCount + 4, teamMembers.length);
    setVisibleCount(newVisibleCount);
  };

  const handleMemberImageError = (member: TeamMember) => (error: Error) => {
    console.error(`Failed to load image for ${member.name}:`, error);
  };

  return (
    <section id="team" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/5 via-transparent to-dts-cyan/5"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-dts-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-dts-purple/10 rounded-full blur-3xl"></div>
      
      <div className="mobile-container relative z-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="mobile-card min-h-[360px] sm:min-h-[400px]">
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {displayedMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="group mobile-card hover:border-dts-cyan/40 hover:shadow-xl hover:shadow-dts-cyan/5 transition-all duration-500 hover:scale-[1.02] flex flex-col h-full"
              >
                <div className="team-image-container rounded-t-2xl bg-gradient-to-br from-dts-blue-dark/20 to-dts-purple/20">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    className="team-image p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500"
                    width={280}
                    height={280}
                    fallbackSrc="/images/placeholder-person.jpg"
                    onError={handleMemberImageError(member)}
                  />
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-1 text-foreground/90 group-hover:text-dts-cyan transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-dts-purple font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {member.bio}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target-mobile p-2 rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target-mobile p-2 rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
                        aria-label={`${member.name}'s Twitter profile`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                    )}
                    
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target-mobile p-2 rounded-full bg-background/50 hover:bg-dts-cyan/10 hover:text-dts-cyan transition-all duration-300"
                        aria-label={`${member.name}'s GitHub profile`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
              className="mobile-button bg-card/50 backdrop-blur-sm border-dts-cyan/30 hover:border-dts-cyan/60 hover:bg-dts-cyan/10 transition-all duration-300 w-full sm:w-auto"
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