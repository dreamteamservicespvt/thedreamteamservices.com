import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import GradientButton from "../ui/GradientButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import TypewriterEffect from "../ui/TypewriterEffect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import "./hero-optimizations.css";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Check if device is mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only use scroll effects on desktop for performance
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Typewriter effect lines
  const typewriterLines = [
    "We build your brand from zero to unforgettable.",
    "We turn your ideas into powerful websites.",
    "We create designs that make people stop and stare.",
    "We help students become digital creators.",
    "We automate businesses with software that works.",
    "We grow your social media, while you focus on your passion.",
    "We help startups launch like pros.",
    "We design logos your customers remember.",
    "We make your business look premium online.",
    "We turn clicks into real customers."
  ];
  
  // Parallax effects - only on desktop and when motion is allowed
  const shouldUseParallax = !isMobile && !prefersReducedMotion;
  const starsY = useTransform(scrollYProgress, [0, 1], shouldUseParallax ? [0, 300] : [0, 0]);
  const nebulasY = useTransform(scrollYProgress, [0, 1], shouldUseParallax ? [0, 150] : [0, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], shouldUseParallax ? [0, -50] : [0, 0]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], shouldUseParallax ? [1, 0] : [1, 1]);

  // Optimized stars generation - fewer on mobile
  const stars = useMemo(() => {
    const starCount = isMobile ? 50 : prefersReducedMotion ? 100 : 200; // Reduced from 300
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5, // Smaller stars
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10, // Slower animations
      delay: Math.random() * 8
    }));
  }, [isMobile, prefersReducedMotion]);

  // Optimized nebulas - fewer and simpler on mobile
  const nebulas = useMemo(() => {
    const nebulaCount = isMobile ? 2 : prefersReducedMotion ? 3 : 4; // Reduced from 5
    return Array.from({ length: nebulaCount }, (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 200 : 250) + (isMobile ? 150 : 200), // Smaller on mobile
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: [
        'bg-purple-600/5', // Reduced opacity for performance
        'bg-cyan-500/5', 
        'bg-fuchsia-500/5',
        'bg-blue-600/5'
      ][i % 4],
      duration: Math.random() * 50 + 30, // Slower animations
      delay: Math.random() * 15
    }));
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMission = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={heroRef} 
      className={cn(
        "relative min-h-screen flex items-center justify-center w-full overflow-x-hidden hero-optimized",
        isMobile && "performance-optimized",
        prefersReducedMotion && "mobile-reduced-motion"
      )}
    >
      {/* Stars Background - Optimized for mobile */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 z-0 gpu-accelerated" 
          style={{ y: starsY, opacity: opacityParallax }}
        >
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white star-element"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: isMobile ? 0.4 : 0.7 // Dimmer on mobile
              }}
              animate={!isMobile ? {
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.1, 1]
              } : {
                opacity: [0.3, 0.5, 0.3], // Simpler animation on mobile
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
      )}

      {/* Nebula/Cosmic Elements Background - Simplified for mobile */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden gpu-accelerated" 
          style={{ y: nebulasY }}
        >
          {nebulas.map((nebula) => (
            <motion.div
              key={nebula.id}
              className={`absolute rounded-full nebula-element ${nebula.color} ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
              style={{
                width: nebula.size,
                height: nebula.size,
                left: `${nebula.x}%`,
                top: `${nebula.y}%`,
                opacity: isMobile ? 0.3 : 0.6
              }}
              animate={!isMobile ? {
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
                x: [0, 20, 0],
                y: [0, -20, 0]
              } : {
                opacity: [0.2, 0.4, 0.2], // Simpler animation on mobile
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
      )}
      
      {/* Static background for reduced motion/mobile */}
      {(prefersReducedMotion || isMobile) && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        </div>
      )}
      
      {/* Grid overlay - disabled on mobile */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10 hidden lg:block pointer-events-none select-none"></div>

      {/* Content */}
      <motion.div 
        className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center safe-area"
        style={{ y: titleY }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="mb-8"
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-medium py-2 px-6 rounded-full border border-purple-500/30 backdrop-blur-sm inline-block mb-6 animate-pulse-gentle">
            Dream · Create · Innovate
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight mb-6 hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <motion.span 
            className="block mb-2"
            initial={{ y: prefersReducedMotion ? 0 : 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: prefersReducedMotion ? 0 : 0.5 }}
          >
            Just Dream Big
          </motion.span>
          <motion.span 
            className="gradient-text block"
            initial={{ y: prefersReducedMotion ? 0 : 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: prefersReducedMotion ? 0.1 : 0.7 }}
          >
            We Build It
          </motion.span>
        </motion.h1>

        <motion.div 
          className="w-full mx-auto mb-12 px-4 sm:px-6 lg:px-8"
          initial={{ y: prefersReducedMotion ? 0 : 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: prefersReducedMotion ? 0.2 : 0.9 }}
          style={{ minHeight: "80px" }}
        >
          <TypewriterEffect
            words={typewriterLines}
            typeSpeed={isMobile ? 60 : 45} // Slower on mobile for better performance
            deleteSpeed={isMobile ? 40 : 30}
            delayBetweenWords={isMobile ? 3000 : 2800}
            startDelay={prefersReducedMotion ? 500 : 1800}
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed"
          />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={{ y: prefersReducedMotion ? 0 : 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: prefersReducedMotion ? 0.3 : 1.1 }}
        >
          <Link to="/pricing">
            <motion.div 
              whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05, boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)" } : {}} 
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
            whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05 } : {}} 
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

      {/* Floating Elements - Simplified for mobile */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[1, 2, 3].map((i) => ( // Reduced from 5 to 3 elements
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full gpu-accelerated"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * (isMobile ? 2 : 3) + 0.5,
                opacity: Math.random() * (isMobile ? 0.3 : 0.5) + 0.2
              }}
              animate={{
                y: [0, isMobile ? -50 : -100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * (isMobile ? 8 : 10) + (isMobile ? 8 : 10),
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
