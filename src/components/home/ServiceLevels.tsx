import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Monitor, BarChart3, Globe, Smartphone, Cpu, Shield, Rocket, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  level: number;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  colorClass: string;
  isExpanded: boolean;
  onToggle: () => void;
  id: string;
}

const ServiceCard = ({
  level,
  title,
  description,
  features,
  icon,
  secondaryIcon,
  colorClass,
  isExpanded,
  onToggle,
  id
}: ServiceCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-500",
        isExpanded ? "col-span-full md:col-span-2 p-8" : "p-6 cursor-pointer hover:shadow-lg hover:shadow-dts-purple/10"
      )}
      onClick={() => !isExpanded && onToggle()}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      id={id}
    >
      <motion.div layout className="flex flex-col h-full">
        <motion.div layout className="flex items-center mb-4">
          <div className={cn("p-3 rounded-lg mr-4", colorClass)}>
            {icon}
          </div>
          <div>
            <motion.span layout className="text-sm font-medium text-foreground/60">
              Level {level}
            </motion.span>
            <motion.h3 layout className="text-xl font-bold">
              {title}
            </motion.h3>
          </div>
          <motion.button 
            layout 
            className="ml-auto p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? 
              <ChevronUp size={18} className="text-foreground/60" /> : 
              <ChevronDown size={18} className="text-foreground/60" />
            }
          </motion.button>
        </motion.div>

        <motion.p layout className="text-foreground/80 mb-4">
          {description}
        </motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
                <div className="flex flex-col space-y-4">
                  <h4 className="text-lg font-semibold">Key Features</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Rocket size={16} className="mr-2 text-dts-purple mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col space-y-4">
                  <h4 className="text-lg font-semibold">Services Include</h4>
                  <div className="p-4 rounded-lg bg-muted/50 flex items-center">
                    {secondaryIcon && <div className="mr-4">{secondaryIcon}</div>}
                    <div>
                      <p className="text-foreground/80">
                        {level === 1 && "Full web development & digital marketing integration"}
                        {level === 2 && "Custom software & mobile app development"}
                        {level === 3 && "AI-powered solutions & comprehensive cybersecurity"}
                      </p>
                    </div>
                  </div>
                  <Link to={`/services#level-${level}`}>
                    <GradientButton className="w-full mt-4">View Full Details</GradientButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <motion.div layout className="mt-auto pt-2">
            <GradientButton 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex items-center"
            >
              <span>{isExpanded ? "Show Less" : "Learn More"}</span>
              <ChevronDown size={16} className={cn(
                "ml-1 transition-transform",
                isExpanded ? "rotate-180" : ""
              )} />
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
      id: "level-one",
      title: "Web Development & Digital Marketing",
      description: "We design and develop stunning websites and implement digital marketing strategies to boost online sales and drive traffic for our clients.",
      features: [
        "Responsive website design",
        "E-commerce solutions",
        "SEO optimization",
        "Social media marketing",
        "Content strategy"
      ],
      icon: <Monitor size={24} className="text-dts-cyan" />,
      secondaryIcon: <Globe size={40} className="text-dts-cyan" />,
      colorClass: "bg-dts-cyan/20"
    },
    {
      level: 2,
      id: "level-two",
      title: "Software & Mobile App Development",
      description: "Building on Level One, we develop and maintain custom software and mobile applications for organizations seeking high-quality solutions at affordable prices.",
      features: [
        "Custom software development",
        "Mobile app creation",
        "System integration",
        "Testing & deployment",
        "Maintenance & support"
      ],
      icon: <Code size={24} className="text-dts-purple" />,
      secondaryIcon: <Smartphone size={40} className="text-dts-purple" />,
      colorClass: "bg-dts-purple/20"
    },
    {
      level: 3,
      id: "level-three",
      title: "AI Solutions & Cybersecurity",
      description: "Integrating Levels One and Two with AI and Cybersecurity specialists, we offer innovative AI-driven solutions and advanced security systems to safeguard your digital assets.",
      features: [
        "AI integration",
        "Machine learning solutions",
        "Cybersecurity assessment",
        "Threat protection",
        "Security monitoring"
      ],
      icon: <BarChart3 size={24} className="text-dts-cyan" />,
      secondaryIcon: <Shield size={40} className="text-dts-cyan" />,
      colorClass: "bg-gradient-to-r from-dts-purple/20 to-dts-cyan/20"
    }
  ];

  return (
    <section id="services" className="section-container py-16 sm:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="mb-4">Our <span className="gradient-text">Service Levels</span></h2>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto px-4">
          Discover our three-tiered approach to digital transformation, from web presence to advanced AI solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceLevels;
