import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import { getTeamMembers } from "@/services/teamService";
import { TeamMember } from "@/types/team";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        // Sort by the order property - ensure members are of type TeamMember[]
        const sortedMembers = [...members].sort((a, b) => 
          (a.order || 0) - (b.order || 0)
        );
        setTeamMembers(sortedMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  // Fallback team members if no data is loaded from Firebase
  const fallbackTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "David Johnson",
      role: "CTO & Lead Developer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "10+ years experience in full-stack web development with expertise in React and Node.js.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      order: 1
    },
    {
      id: "2",
      name: "Samantha Chen",
      role: "AI Solutions Architect",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
      bio: "PhD in Machine Learning with extensive experience implementing AI solutions for businesses.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      order: 2
    },
    {
      id: "3",
      name: "Marcus Williams",
      role: "Cybersecurity Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Certified security expert with background in threat detection and prevention.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      order: 3
    },
    {
      id: "4",
      name: "Priya Patel",
      role: "Mobile App Developer",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      bio: "Specialist in native and cross-platform mobile application development.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      order: 4
    }
  ];

  const displayedTeamMembers = teamMembers.length > 0 ? teamMembers : fallbackTeamMembers;

  return (
    <section ref={ref} id="team" className="py-16 sm:py-24 bg-dts-blue-dark/30 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-dts-cyan font-semibold py-2 px-4 rounded-full bg-dts-cyan/10 border border-dts-cyan/20 mb-4">
            Our Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Meet The <span className="gradient-text">Team</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Our diverse team of experts brings together decades of experience across web development, 
            AI solutions, and cybersecurity.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {isLoading ? (
            // Show loading skeletons
            [...Array(4)].map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                variants={itemVariants}
                className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 animate-pulse"
              >
                <div className="aspect-[4/3] bg-dts-blue-dark/40"></div>
                <div className="p-6">
                  <div className="h-6 bg-dts-blue-dark/40 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-dts-blue-dark/40 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-dts-blue-dark/40 rounded w-full mb-2"></div>
                  <div className="h-4 bg-dts-blue-dark/40 rounded w-full mb-2"></div>
                  <div className="h-4 bg-dts-blue-dark/40 rounded w-3/4"></div>
                </div>
              </motion.div>
            ))
          ) : (
            // Show team members
            displayedTeamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-dts-cyan/50 hover:shadow-lg hover:shadow-dts-cyan/10 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-dts-blue-dark/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-dts-cyan mb-4">{member.role}</p>
                  <p className="text-sm text-foreground/70 mb-6 flex-grow">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks.linkedin && (
                      <a 
                        href={member.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-dts-purple/20 hover:text-dts-purple transition-colors"
                      >
                        <Linkedin size={16} />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    )}
                    
                    {member.socialLinks.twitter && (
                      <a 
                        href={member.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-dts-cyan/20 hover:text-dts-cyan transition-colors"
                      >
                        <Twitter size={16} />
                        <span className="sr-only">Twitter</span>
                      </a>
                    )}
                    
                    {member.socialLinks.github && (
                      <a 
                        href={member.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/30 transition-colors"
                      >
                        <Github size={16} />
                        <span className="sr-only">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
