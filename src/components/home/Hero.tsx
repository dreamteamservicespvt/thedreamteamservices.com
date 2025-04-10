
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import FloatingAnimation from "../ui/FloatingAnimation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMission = () => {
    const missionSection = document.getElementById("mission");
    missionSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dts-blue z-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-60"></div>
        
        {/* Animated circle elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-dts-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dts-cyan/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div 
          className={cn(
            "transition-all duration-1000 transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-dts-cyan font-semibold py-2 px-4 rounded-full bg-dts-cyan/10 border border-dts-cyan/20 mb-6">
            Welcome to Dream Team Services
          </span>
        </div>
        
        <h1 
          className={cn(
            "mb-6 transition-all duration-1000 delay-300 transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="block">Futuristic</span>
          <span className="gradient-text">Digital Solutions</span>
        </h1>

        <p 
          className={cn(
            "text-xl max-w-2xl text-foreground/80 mb-10 transition-all duration-1000 delay-500 transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          We provide cutting-edge digital solutions from web development to AI and cybersecurity services.
          Our mission is to help organizations and individuals grow their ventures with technology.
        </p>

        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link to="/services">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <GradientButton size="lg" className="group">
                Get Started
                <ArrowRight size={16} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </GradientButton>
            </motion.div>
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <GradientButton size="lg" variant="outline" onClick={scrollToMission}>
              Learn More
            </GradientButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <FloatingAnimation 
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          <a href="#mission" className="flex flex-col items-center text-foreground/70 hover:text-foreground">
            <span className="text-sm font-medium mb-2">Discover Our Mission</span>
            <ChevronDown size={24} />
          </a>
        </FloatingAnimation>
      </div>
    </section>
  );
};

export default Hero;
