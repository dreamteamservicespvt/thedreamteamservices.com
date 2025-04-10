
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import GradientButton from "../ui/GradientButton";
import { ArrowRight, Code, Smartphone, Shield, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 }
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dts-blue-dark opacity-30"></div>
      
      {/* Content */}
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Digital Presence?
          </h2>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
          Partner with us to unlock innovation, growth, and security for your business.
          Our team is ready to bring your vision to life.
        </motion.p>
        
        <motion.div 
          variants={iconContainerVariants}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12"
        >
          {[
            { icon: <Code size={24} />, label: "Web Dev" },
            { icon: <Smartphone size={24} />, label: "Mobile Apps" },
            { icon: <Shield size={24} />, label: "Security" },
            { icon: <Rocket size={24} />, label: "Growth" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-dts-blue-light flex items-center justify-center mb-2 border border-dts-purple/30">
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <GradientButton size="lg" className="group w-full sm:w-auto">
              Work With Us
              <ArrowRight size={16} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
            </GradientButton>
          </Link>
          <Link to="/portfolio">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Our Portfolio
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
