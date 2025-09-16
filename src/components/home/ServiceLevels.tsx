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
  return (
    <motion.div
      className={cn(
        "service-card group relative rounded-xl border border-foreground/10 backdrop-blur-sm overflow-hidden transition-all duration-300",
        "hover:border-foreground/20 hover:shadow-lg hover:shadow-dts-purple/5",
        isExpanded ? "bg-dts-blue-dark/60" : "bg-dts-blue-dark/40 cursor-pointer"
      )}
      onClick={() => !isExpanded && onToggle()}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      id={id}
    >
      {/* Gradient accent line */}
      <div className={cn("gradient-accent absolute top-0 left-0 h-full w-1", gradient)}></div>
      
      <motion.div layout className="p-3 sm:p-6 mobile-card-header">
        {/* Header */}
        <motion.div layout className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
            <div className={cn("mobile-icon-container p-2 sm:p-2.5 rounded-lg shrink-0", colorClass)}>
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <motion.span layout className="mobile-level-badge text-xs font-medium text-foreground/60 block">
                Level {level}
              </motion.span>
              <motion.h3 layout className="service-card-title text-sm sm:text-lg font-bold leading-tight">
                {title}
              </motion.h3>
            </div>
          </div>
          <motion.button 
            layout 
            className="p-1 sm:p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors shrink-0 ml-1 sm:ml-2"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? 
              <ChevronUp size={14} className="text-foreground/60 sm:w-4 sm:h-4" /> : 
              <ChevronDown size={14} className="text-foreground/60 sm:w-4 sm:h-4" />
            }
          </motion.button>
        </motion.div>

        {/* Description */}
        <motion.p layout className="service-card-description text-xs sm:text-sm text-foreground/80 mb-2 sm:mb-4 leading-relaxed">
          {description}
        </motion.p>

        {/* Compact feature list when collapsed */}
        {!isExpanded && (
          <motion.div layout className="space-y-1 sm:space-y-2 mb-2 sm:mb-4">
            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="feature-tag inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-foreground/5 text-xs text-foreground/70"
                >
                  <Check size={10} className="mr-0.5 sm:mr-1 text-dts-cyan sm:w-3 sm:h-3" />
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-foreground/5 text-xs text-foreground/60">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="expanded-content overflow-hidden"
            >
              <div className="space-y-2 sm:space-y-4 mt-2 sm:mt-4">
                {/* Features */}
                <div className="mobile-expanded-section">
                  <h4 className="mobile-expanded-title text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-foreground">Key Features</h4>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1.5">
                    {features.map((feature, index) => (
                      <div key={index} className="mobile-expanded-item flex items-start">
                        <Check size={10} className="mr-1 sm:mr-2 text-dts-cyan mt-0.5 shrink-0 sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mobile-expanded-section">
                  <h4 className="mobile-expanded-title text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-foreground">Services Include</h4>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1.5">
                    {services.map((service, index) => (
                      <div key={index} className="mobile-expanded-item flex items-start">
                        <Rocket size={10} className="mr-1 sm:mr-2 text-dts-purple mt-0.5 shrink-0 sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-sm text-foreground/80">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-1 sm:pt-2">
                  <Link to={`/pricing#level-${level}`}>
                    <GradientButton 
                      className="w-full text-xs sm:text-sm px-3 py-1.5" 
                      size="sm"
                      gradientDirection="horizontal"
                      highContrast={true}
                    >
                      View Pricing & Details
                      <ArrowRight size={12} className="ml-1 sm:w-3.5 sm:h-3.5" />
                    </GradientButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button when collapsed */}
        {!isExpanded && (
          <motion.div layout className="pt-1 sm:pt-2">
            <GradientButton 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="mobile-learn-more w-full flex items-center justify-center text-xs sm:text-sm px-3 py-1.5"
            >
              <span>Learn More</span>
              <ChevronDown size={12} className="ml-1 sm:w-3.5 sm:h-3.5" />
            </GradientButton>
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
        <Link to="/pricing">
          <GradientButton 
            className="text-xs sm:text-base px-4 py-2"
            size="sm"
            gradientDirection="horizontal"
            highContrast={true}
          >
            View All Pricing
            <ArrowRight size={14} className="ml-1 sm:ml-2" />
          </GradientButton>
        </Link>
      </div>
    </section>
  );
};

export default ServiceLevels;
