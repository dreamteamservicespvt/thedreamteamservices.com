import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Monitor, BarChart3, Globe, Smartphone, Cpu, Shield, Rocket, 
  ChevronDown, ChevronUp, Palette, Database, ArrowRight, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import { Link } from "react-router-dom";
import "./service-levels-optimizations.css";

interface ServiceCardProps {
  level: number;
  title: string;
  description: string;
  features: string[];
  services: string[];
  icon: React.ReactNode;
  colorClass: string;
  gradient: string;
  isExpanded: boolean;
  onToggle: () => void;
  id: string;
}

const ServiceCard = ({
  level,
  title,
  description,
  features,
  services,
  icon,
  colorClass,
  gradient,
  isExpanded,
  onToggle,
  id
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "service-card group relative rounded-xl border border-foreground/10 backdrop-blur-sm overflow-hidden",
        "hover:border-foreground/30 hover:shadow-2xl hover:shadow-dts-purple/10",
        isExpanded ? "bg-dts-blue-dark/70 border-dts-cyan/30" : "bg-dts-blue-dark/50 cursor-pointer"
      )}
      onClick={() => !isExpanded && onToggle()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHovered && !isExpanded ? 1.02 : 1,
        rotateX: isHovered && !isExpanded ? 2 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        opacity: { duration: 0.3 },
        y: { duration: 0.4, delay: level * 0.1 },
        scale: { duration: 0.2 },
        rotateX: { duration: 0.3 }
      }}
      style={{ 
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      }}
      id={id}
    >
      {/* Gradient accent line */}
      <motion.div 
        className={cn("gradient-accent absolute top-0 left-0 h-full w-1", gradient)}
        animate={{
          width: isExpanded ? 4 : 2,
          opacity: isHovered || isExpanded ? 1 : 0.7
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      ></motion.div>
      
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-xl"
        animate={{
          opacity: isHovered || isExpanded ? 0.1 : 0,
          scale: isHovered || isExpanded ? 1.02 : 1
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: gradient.includes('pink') ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.1))' :
                     gradient.includes('cyan') ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.1))' :
                     gradient.includes('purple') ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.1))' :
                     gradient.includes('emerald') ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))' :
                     gradient.includes('violet') ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(192, 132, 252, 0.1))' :
                     'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
        }}
      />
      
      <motion.div layout className="p-3 sm:p-6 mobile-card-header">
        {/* Header */}
        <motion.div layout className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
            <motion.div 
              className={cn("mobile-icon-container p-2 sm:p-2.5 rounded-lg shrink-0", colorClass)}
              animate={{
                scale: isHovered || isExpanded ? 1.1 : 1,
                rotate: isExpanded ? 360 : 0
              }}
              transition={{ 
                scale: { duration: 0.2 },
                rotate: { duration: 0.6, ease: "easeInOut" }
              }}
            >
              {icon}
            </motion.div>
            <div className="min-w-0 flex-1">
              <motion.span 
                layout 
                className="mobile-level-badge text-xs font-medium text-foreground/60 block"
                animate={{
                  color: isExpanded ? "rgb(34 197 94)" : "rgb(156 163 175)"
                }}
                transition={{ duration: 0.3 }}
              >
                Level {level}
              </motion.span>
              <motion.h3 
                layout 
                className="service-card-title text-sm sm:text-lg font-bold leading-tight"
                animate={{
                  color: isExpanded ? "rgb(255 255 255)" : "rgb(229 231 235)"
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>
            </div>
          </div>
          <motion.button 
            layout 
            className="p-1 sm:p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/20 transition-all duration-200 shrink-0 ml-1 sm:ml-2"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isExpanded ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.05)",
              rotate: isExpanded ? 180 : 0
            }}
            transition={{ 
              backgroundColor: { duration: 0.3 },
              rotate: { duration: 0.4, ease: "easeInOut" }
            }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? 
                <ChevronUp size={14} className="text-emerald-400 sm:w-4 sm:h-4" /> : 
                <ChevronDown size={14} className="text-foreground/60 sm:w-4 sm:h-4" />
              }
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Description */}
        <motion.p layout className="service-card-description text-xs sm:text-sm text-foreground/80 mb-2 sm:mb-4 leading-relaxed">
          {description}
        </motion.p>

        {/* Compact feature list when collapsed */}
        {!isExpanded && (
          <motion.div 
            layout 
            className="space-y-1 sm:space-y-2 mb-2 sm:mb-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <motion.span 
                  key={index}
                  className="feature-tag inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-foreground/5 text-xs text-foreground/70 hover:bg-foreground/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(34, 197, 94, 0.1)"
                  }}
                >
                  <Check size={10} className="mr-0.5 sm:mr-1 text-dts-cyan sm:w-3 sm:h-3" />
                  {feature}
                </motion.span>
              ))}
              {features.length > 3 && (
                <motion.span 
                  className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-foreground/5 text-xs text-foreground/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.3,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  +{features.length - 3} more
                </motion.span>
              )}
            </div>
          </motion.div>
        )}

        {/* Expanded content */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                y: 0,
                transition: {
                  height: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 0.1 },
                  y: { duration: 0.3, delay: 0.1 }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                y: -10,
                transition: {
                  height: { duration: 0.3, ease: "easeIn" },
                  opacity: { duration: 0.2 },
                  y: { duration: 0.2 }
                }
              }}
              className="expanded-content overflow-hidden"
            >
              <motion.div 
                className="space-y-2 sm:space-y-4 mt-2 sm:mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {/* Features */}
                <motion.div 
                  className="mobile-expanded-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h4 className="mobile-expanded-title text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-emerald-400">Key Features</h4>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1.5">
                    {features.map((feature, index) => (
                      <motion.div 
                        key={index} 
                        className="mobile-expanded-item flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.4 + (index * 0.05),
                          duration: 0.3
                        }}
                      >
                        <Check size={10} className="mr-1 sm:mr-2 text-dts-cyan mt-0.5 shrink-0 sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Services */}
                <motion.div 
                  className="mobile-expanded-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h4 className="mobile-expanded-title text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-dts-purple">Services Include</h4>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1.5">
                    {services.map((service, index) => (
                      <motion.div 
                        key={index} 
                        className="mobile-expanded-item flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.6 + (index * 0.05),
                          duration: 0.3
                        }}
                      >
                        <Rocket size={10} className="mr-1 sm:mr-2 text-dts-purple mt-0.5 shrink-0 sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-sm text-foreground/80">{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div 
                  className="pt-1 sm:pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Link to={`/Services#level-${level}`}>
                    <GradientButton 
                      className="w-full text-xs sm:text-sm px-3 py-1.5 hover:shadow-lg hover:shadow-dts-cyan/20" 
                      size="sm"
                      gradientDirection="horizontal"
                      highContrast={true}
                    >
                      View Service Details
                      <ArrowRight size={12} className="ml-1 sm:w-3.5 sm:h-3.5" />
                    </GradientButton>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button when collapsed */}
        {!isExpanded && (
          <motion.div 
            layout 
            className="pt-1 sm:pt-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <GradientButton 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="mobile-learn-more w-full flex items-center justify-center text-xs sm:text-sm px-3 py-1.5 hover:bg-dts-cyan/10 transition-all duration-300"
              >
                <motion.span
                  animate={{
                    color: isHovered ? "rgb(34, 197, 94)" : "rgb(255, 255, 255)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Learn More
                </motion.span>
                <motion.div
                  animate={{
                    rotate: isHovered ? 90 : 0,
                    x: isHovered ? 2 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={12} className="ml-1 sm:w-3.5 sm:h-3.5" />
                </motion.div>
              </GradientButton>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ServiceLevels = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const services = [
    {
      level: 1,
      id: "branding-design",
      title: "Branding & Design",
      description: "Professional design services to establish your visual identity and marketing materials.",
      features: [
        "Logo with Tagline",
        "Visiting Card Design", 
        "Banner & Poster Design",
        "Brochure Design",
        "Complete Brand Identity"
      ],
      services: [
        "Professional Logo Design with Tagline",
        "Business Card Design & Print-Ready Files",
        "Marketing Banners & Promotional Posters",
        "Company Brochures & Catalogs"
      ],
      icon: <Palette size={20} className="text-pink-400" />,
      colorClass: "bg-pink-500/20",
      gradient: "bg-gradient-to-b from-pink-500 to-orange-400"
    },
    {
      level: 2,
      id: "website-marketing", 
      title: "Website & Digital Marketing",
      description: "Establish your online presence with professional websites and strategic digital marketing.",
      features: [
        "Basic Website Package",
        "Standard Website Package",
        "Advanced E-commerce Website",
        "SEO Content Creation",
        "Digital Marketing Campaigns"
      ],
      services: [
        "Responsive Website Development",
        "Search Engine Optimization (SEO)",
        "Social Media Content & Video Reels",
        "Comprehensive Digital Marketing Campaigns"
      ],
      icon: <Globe size={20} className="text-dts-cyan" />,
      colorClass: "bg-dts-cyan/20",
      gradient: "bg-gradient-to-b from-dts-cyan to-blue-500"
    },
    {
      level: 3,
      id: "software-apps",
      title: "Software & App Development",
      description: "Custom software solutions and mobile applications tailored to your business needs.",
      features: [
        "Custom Software Solutions",
        "Mobile App Development",
        "Cross-platform Applications",
        "System Integration",
        "Ongoing Support"
      ],
      services: [
        "Custom Business Software Development",
        "Android & iOS Mobile Applications",
        "API Development & System Integration",
        "Cloud-based Solutions & Deployment"
      ],
      icon: <Code size={20} className="text-dts-purple" />,
      colorClass: "bg-dts-purple/20",
      gradient: "bg-gradient-to-b from-dts-purple to-indigo-600"
    },
    {
      level: 4,
      id: "data-cybersecurity",
      title: "Data Science & Cybersecurity",
      description: "Advanced data analysis and security solutions to protect and leverage your digital assets.",
      features: [
        "Data Analysis & Insights",
        "Predictive Modeling",
        "Cybersecurity Assessment",
        "Threat Protection",
        "Security Monitoring"
      ],
      services: [
        "Business Intelligence & Data Analytics",
        "Machine Learning & Predictive Models",
        "Comprehensive Security Assessments",
        "Cybersecurity Implementation & Monitoring"
      ],
      icon: <Database size={20} className="text-emerald-400" />,
      colorClass: "bg-emerald-500/20",
      gradient: "bg-gradient-to-b from-emerald-500 to-green-600"
    },
    {
      level: 5,
      id: "ai-automation",
      title: "AI Automation & Chatbots",
      description: "Cutting-edge AI solutions to automate processes and enhance customer interactions.",
      features: [
        "AI Process Automation",
        "Intelligent Chatbots",
        "AI Agent Development",
        "Machine Learning Solutions",
        "Workflow Automation"
      ],
      services: [
        "Intelligent Process Automation Systems",
        "Advanced AI Agent Development",
        "Smart Chatbot Integration & Development",
        "Custom AI Solutions for Business"
      ],
      icon: <Cpu size={20} className="text-violet-400" />,
      colorClass: "bg-violet-600/20",
      gradient: "bg-gradient-to-b from-violet-600 to-fuchsia-500"
    }
  ];

  return (
    <section id="services" className="section-container service-levels-container py-8 sm:py-20">
      <div className="text-center mb-4 sm:mb-12 mobile-section-header">
        <h2 className="mobile-section-title text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 service-card-text">
          Our <span className="gradient-text">Service Levels</span>
        </h2>
        <p className="mobile-section-description text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed service-card-text">
          Discover our comprehensive five-tier approach to digital transformation, 
          from creative design to advanced AI solutions.
        </p>
      </div>

      {/* Mobile: Stack all cards */}
      <div className="block sm:hidden px-2 space-y-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Tablet & Desktop: Responsive grid */}
      <div className="hidden sm:block px-4 sm:px-6">
        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
        
        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard
              key={index + 3}
              {...service}
              isExpanded={expandedIndex === index + 3}
              onToggle={() => handleToggle(index + 3)}
            />
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-4 sm:mt-12 px-2 sm:px-4 mobile-cta-section">
        <p className="mobile-cta-text text-foreground/70 mb-2 sm:mb-4 text-xs sm:text-base">
          Need a custom solution combining multiple levels?
        </p>
        <Link to="/Services">
          <GradientButton 
            className="text-xs sm:text-base px-4 py-2"
            size="sm"
            gradientDirection="horizontal"
            highContrast={true}
          >
            View All Services
            <ArrowRight size={14} className="ml-1 sm:ml-2" />
          </GradientButton>
        </Link>
      </div>
    </section>
  );
};

export default ServiceLevels;
