import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle image load success
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({...prev, [id]: true}));
  };

  // Handle image load error
  const handleImageError = (id: number, target: HTMLImageElement) => {
    // Set placeholder based on member name or use default
    const member = teamMembers.find(m => m.id === id);
    const initials = member ? member.name.split(' ').map(n => n[0]).join('') : 'TM';
    const color = stringToColor(member?.name || 'Team Member');
    
    // Use dynamically generated placeholder with member's initials
    target.src = `https://ui-avatars.com/api/?name=${initials}&background=${color.replace('#', '')}&color=fff&size=400`;
    
    // Alternatively fall back to a local placeholder if the above fails
    target.onerror = () => {
      target.src = "https://via.placeholder.com/400x300?text=Team+Member";
      target.onerror = null; // Prevent infinite error loop
    };
  };

  // Generate consistent colors from strings (for avatars)
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  // Team members data with internet-sourced professional images
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Lead Web Developer",
      // Professional male developer image from Unsplash
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      bio: "10+ years experience in full-stack web development with expertise in React and Node.js.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      id: 2,
      name: "Samantha Chen",
      role: "AI Solutions Architect",
      // Professional female tech lead image from Unsplash
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
      bio: "PhD in Machine Learning with extensive experience implementing AI solutions for businesses.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      id: 3,
      name: "Marcus Williams",
      role: "Cybersecurity Specialist",
      // Professional male cybersecurity expert image from Unsplash
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Certified security expert with background in threat detection and prevention.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Mobile App Developer",
      // Professional female developer image from Unsplash
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
      bio: "Specialist in native and cross-platform mobile application development.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    }
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <section id="team" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-dts-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-dts-cyan/10 rounded-full blur-3xl"></div>

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
          {teamMembers.map((member) => (
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
                {/* Add placeholder while image is loading */}
                {!loadedImages[member.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-dts-blue-dark/60">
                    <User size={48} className="text-dts-cyan/50" />
                  </div>
                )}
                <img 
                  src={member.image} 
                  alt={member.name}
                  className={cn(
                    "object-cover w-full h-full transition-all duration-500",
                    loadedImages[member.id] ? "opacity-100" : "opacity-0",
                    "hover:scale-105"
                  )}
                  onLoad={() => handleImageLoad(member.id)}
                  onError={(e) => handleImageError(member.id, e.target as HTMLImageElement)}
                  loading="lazy"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex space-x-3">
                    {member.socialLinks.linkedin && (
                      <motion.a 
                        href={member.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Linkedin size={18} className="text-white" />
                      </motion.a>
                    )}
                    {member.socialLinks.twitter && (
                      <motion.a 
                        href={member.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Twitter size={18} className="text-white" />
                      </motion.a>
                    )}
                    {member.socialLinks.github && (
                      <motion.a 
                        href={member.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Github size={18} className="text-white" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold">{member.name}</h3>
                <p className="text-dts-cyan mb-2 sm:mb-3">{member.role}</p>
                <p className="text-foreground/70 text-sm flex-1">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
