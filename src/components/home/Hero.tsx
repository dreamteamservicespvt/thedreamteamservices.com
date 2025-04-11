import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for stars
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const nebulasY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Generate stars
  const stars = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5
  }));

  // Generate nebulas for background effect
  const nebulas = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: [
      'bg-purple-600/10', 
      'bg-cyan-500/10', 
      'bg-fuchsia-500/10',
      'bg-blue-600/10',
      'bg-indigo-500/10'
    ][i],
    duration: Math.random() * 100 + 20,
    delay: Math.random() * 10
  }));

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMission = () => {
    const missionSection = document.getElementById("mission");
    missionSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Stars Background */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: starsY, opacity: opacityParallax }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0.7
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Nebula/Cosmic Elements Background */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{ y: nebulasY }}
      >
        {nebulas.map((nebula) => (
          <motion.div
            key={nebula.id}
            className={`absolute blur-3xl rounded-full ${nebula.color}`}
            style={{
              width: nebula.size,
              height: nebula.size,
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              opacity: 0.6
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              delay: nebula.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Grid overlay with cosmic effect - hide on mobile and disable interactions */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10 hidden md:block pointer-events-none select-none"></div>

      {/* Content */}
      <motion.div 
        className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        style={{ y: titleY }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-medium py-2 px-6 rounded-full border border-purple-500/30 backdrop-blur-sm inline-block mb-6 animate-pulse-gentle">
            Dream · Create · Innovate
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span 
            className="block mb-2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Just Dream Big
          </motion.span>
          <motion.span 
            className="gradient-text block"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            We Build It
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl sm:text-2xl max-w-3xl mx-auto text-foreground/80 mb-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Unlock the magic of innovation – turn your boldest ideas into reality.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <Link to="/services">
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)" }} 
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <GradientButton size="lg" className="relative">
                Get Started
                <ArrowRight size={16} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
              </GradientButton>
            </motion.div>
          </Link>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToMission} 
              className="group border-[rgb(126,34,206)] hover:border-purple-500"
            >
              Learn More
              <ChevronDown size={16} className="ml-2 inline-block transition-transform group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 3 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer flex flex-col items-center"
          onClick={scrollToMission}
        >
          <span className="text-sm font-medium text-foreground/70 mb-2">Discover More</span>
          <div className="w-6 h-9 border-2 border-foreground/30 rounded-full flex justify-center pt-1">
            <motion.div 
              className="w-1 h-1 bg-foreground/70 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
