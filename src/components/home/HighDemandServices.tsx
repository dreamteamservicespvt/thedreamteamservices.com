import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, Globe, Video, BarChart3, Share2, 
  ArrowRight, Check, Sparkles, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  colorClass: string;
  gradient: string;
  index: number;
}

const ServiceCard = ({
  title,
  description,
  features,
  icon,
  colorClass,
  gradient,
  index
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-foreground/10 backdrop-blur-sm overflow-hidden",
        "hover:border-foreground/30 hover:shadow-2xl hover:shadow-dts-purple/10 transition-all duration-500",
        "bg-dts-blue-dark/50"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
        delay: index * 0.1
      }}
    >
      {/* Gradient accent line */}
      <motion.div 
        className={cn("absolute top-0 left-0 h-full w-1", gradient)}
        animate={{
          width: isHovered ? 4 : 2,
          opacity: isHovered ? 1 : 0.7
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-xl"
        animate={{
          opacity: isHovered ? 0.1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: gradient.includes('pink') ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.1))' :
                     gradient.includes('cyan') ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.1))' :
                     gradient.includes('purple') ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.1))' :
                     gradient.includes('emerald') ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))' :
                     gradient.includes('orange') ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 88, 12, 0.1))' :
                     'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
        }}
      />
      
      <div className="p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
          <motion.div 
            className={cn("p-3 sm:p-3.5 rounded-xl shrink-0", colorClass)}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1">
            <motion.h3 
              className="text-lg sm:text-xl font-bold mb-2 text-foreground"
              animate={{
                color: isHovered ? "rgb(255 255 255)" : "rgb(229 231 235)"
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
            >
              <Check size={16} className="mr-2 text-dts-cyan mt-0.5 shrink-0" />
              <span className="text-sm text-foreground/80">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Link to="/Services">
            <GradientButton 
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-center text-sm group-hover:shadow-lg group-hover:shadow-dts-cyan/20 transition-all"
            >
              <span>Learn More</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HighDemandServices = () => {
  const services = [
    {
      title: "Custom Website Design & Development",
      description: "Professional, responsive websites tailored to your brand with cutting-edge technology and modern design.",
      features: [
        "Responsive & Mobile-First Design",
        "SEO Optimization Built-In",
        "Fast Loading & Performance",
        "Custom Content Management",
        "E-commerce Integration"
      ],
      icon: <Globe size={24} className="text-dts-cyan" />,
      colorClass: "bg-dts-cyan/20",
      gradient: "bg-gradient-to-b from-dts-cyan to-blue-500"
    },
    {
      title: "Custom Software Development",
      description: "Scalable, robust software solutions built to streamline your business operations and drive growth.",
      features: [
        "Tailored Business Solutions",
        "Cloud-Based Applications",
        "API Development & Integration",
        "Database Design & Management",
        "Ongoing Support & Maintenance"
      ],
      icon: <Code size={24} className="text-dts-purple" />,
      colorClass: "bg-dts-purple/20",
      gradient: "bg-gradient-to-b from-dts-purple to-indigo-600"
    },
    {
      title: "AI Commercial Ads",
      description: "AI-powered video ads that capture attention and convert viewers into customers with stunning visuals.",
      features: [
        "AI-Generated Video Content",
        "Professional Voice-Overs",
        "Motion Graphics & Animation",
        "Social Media Optimized",
        "Multiple Format Exports"
      ],
      icon: <Video size={24} className="text-pink-400" />,
      colorClass: "bg-pink-500/20",
      gradient: "bg-gradient-to-b from-pink-500 to-orange-400"
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that boost your online presence and deliver measurable results.",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Campaigns",
        "Content Marketing Strategy",
        "Email Marketing Automation",
        "Analytics & Performance Tracking"
      ],
      icon: <BarChart3 size={24} className="text-emerald-400" />,
      colorClass: "bg-emerald-500/20",
      gradient: "bg-gradient-to-b from-emerald-500 to-green-600"
    },
    {
      title: "Social Media Management",
      description: "Complete social media solutions to build your brand, engage audiences, and grow your community.",
      features: [
        "Content Creation & Scheduling",
        "Multi-Platform Management",
        "Community Engagement",
        "Influencer Collaboration",
        "Performance Analytics & Reports"
      ],
      icon: <Share2 size={24} className="text-orange-400" />,
      colorClass: "bg-orange-500/20",
      gradient: "bg-gradient-to-b from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="high-demand-services" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles size={20} className="text-dts-cyan mr-2" />
            <span className="text-sm font-semibold text-dts-cyan uppercase tracking-wider">
              Our Expertise
            </span>
            <Sparkles size={20} className="text-dts-cyan ml-2" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">High Demand Services</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Specialized solutions designed to meet the most critical needs of modern businesses. 
            From cutting-edge AI to strategic digital marketing, we deliver excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom 2 services centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard
              key={index + 3}
              {...service}
              index={index + 3}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-foreground/70 mb-4 text-sm sm:text-base">
            Ready to transform your business with our high-demand services?
          </p>
          <Link to="/Contact">
            <GradientButton 
              className="text-sm sm:text-base px-6 py-3"
              size="lg"
              gradientDirection="horizontal"
              highContrast={true}
            >
              <Zap size={18} className="mr-2" />
              Get Started Today
              <ArrowRight size={18} className="ml-2" />
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HighDemandServices;
