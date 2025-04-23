import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTeamMembers } from "@/services/teamService";
import { TeamMember } from "@/types/team";
import SectionHeading from "@/components/ui/section-heading";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { ErrorDisplay } from "@/components/ui/error-display";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const { hasError, message, details, handleError, clearError } = useErrorHandler();
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setIsLoading(true);
      try {
        const members = await getTeamMembers();
        
        // Sort team members by their order property if available
        const sortedMembers = [...members].sort((a, b) => {
          return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
        });
        
        setTeamMembers(sortedMembers);
        setDisplayedMembers(sortedMembers.slice(0, visibleCount));
        clearError();
      } catch (error) {
        handleError(error, "Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, [handleError, clearError, visibleCount]);
  
  const handleShowMore = () => {
    const newVisibleCount = Math.min(visibleCount + 4, teamMembers.length);
    setVisibleCount(newVisibleCount);
    setDisplayedMembers(teamMembers.slice(0, newVisibleCount));
  };
  
  // Handle individual image errors
  const handleMemberImageError = (member: TeamMember) => (error: Error) => {
    handleError(new Error(`Failed to load image for team member "${member.name}": ${error.message}`));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: shouldReduceMotion ? "tween" : "spring",
        stiffness: 100, 
        damping: 20,
        duration: shouldReduceMotion ? 0.3 : undefined
      }
    }
  };

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading 
          title="Our Team" 
          subtitle="Meet the talented professionals driving our success"
          id="team-section-heading"
        />
        
        {/* Error handling UI */}
        {hasError && (
          <ErrorDisplay 
            message={message} 
            details={details}
            onRetry={() => {
              clearError();
              // Re-fetch team members
              const fetchTeamMembers = async () => {
                setIsLoading(true);
                try {
                  const members = await getTeamMembers();
                  setTeamMembers(members);
                  setDisplayedMembers(members.slice(0, visibleCount));
                  clearError();
                } catch (error) {
                  handleError(error, "Failed to load team members");
                } finally {
                  setIsLoading(false);
                }
              };
              fetchTeamMembers();
            }}
            className="mb-8"
          />
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 flex flex-col h-full">
                <div className="aspect-[4/3] bg-muted animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-6 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                  <div className="h-16 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedMembers.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No team members to display.</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayedMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-dts-cyan/50 hover:shadow-lg hover:shadow-dts-cyan/10 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-dts-blue-dark/40">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    width={400}
                    height={300}
                    fallbackSrc="/images/placeholder-person.jpg"
                    onError={handleMemberImageError(member)}
                  />
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-dts-purple/80 mb-3">{member.role}</p>
                  <p className="text-sm text-foreground/70 mb-4 flex-grow">{member.bio}</p>
                  
                  {member.socialLinks && (
                    <div className="flex gap-2 mt-auto">
                      {member.socialLinks.linkedin && (
                        <a 
                          href={member.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a 
                          href={member.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a 
                          href={member.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Show more button */}
        {!isLoading && visibleCount < teamMembers.length && (
          <div className="text-center mt-12">
            <Button onClick={handleShowMore} variant="outline" size="lg">
              Show More Team Members
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
