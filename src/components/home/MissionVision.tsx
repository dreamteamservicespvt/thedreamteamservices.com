import { motion } from "framer-motion";
import { Check, Target, Rocket, Lightbulb, Zap, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MissionVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  // Service level cards - simplified for better visual impact
  const serviceLevels = [
    {
      level: "Level 1",
      title: "Web Presence",
      description: "Websites & Digital Marketing",
      icon: <Target className="h-6 w-6" />,
      color: "from-dts-purple to-pink-500"
    },
    {
      level: "Level 2",
      title: "Software Solutions",
      description: "Custom Software & Mobile Apps",
      icon: <Rocket className="h-6 w-6" />,
      color: "from-dts-cyan to-blue-500"
    },
    {
      level: "Level 3",
      title: "Advanced Tech",
      description: "AI & Cybersecurity",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-green-400 to-emerald-600"
    }
  ];

  return (
    <section ref={containerRef} className="section-container py-16 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-16"
      >
        {/* Mission & Vision Cards - Modern design with gradient borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/30 to-purple-900/50 opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="relative p-8 sm:p-10 backdrop-blur-sm border border-white/10 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-dts-purple/20 flex items-center justify-center mr-4 border border-dts-purple/30">
                  <Target className="text-dts-purple" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Our Mission</h3>
              </div>
              
              <p className="text-xl text-foreground/90 font-medium mb-6">
                Transforming ideas into digital success stories.
              </p>
              
              <p className="text-foreground/70 mb-6">
                We empower organizations with cutting-edge technology solutions that drive growth, 
                enhance customer engagement, and secure digital assets.
              </p>
              
              <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                <Rocket size={120} className="text-dts-purple" />
              </div>
            </div>
          </motion.div>
          
          {/* Vision Card */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dts-cyan/30 to-blue-900/50 opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="relative p-8 sm:p-10 backdrop-blur-sm border border-white/10 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-dts-cyan/20 flex items-center justify-center mr-4 border border-dts-cyan/30">
                  <Lightbulb className="text-dts-cyan" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Our Vision</h3>
              </div>
              
              <p className="text-xl text-foreground/90 font-medium mb-6">
                A world where technology elevates every business to its fullest potential.
              </p>
              
              <p className="text-foreground/70 mb-6">
                We're creating a future where integrated digital solutions make businesses more 
                innovative, secure, and successful across all industries.
              </p>
              
              <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                <Lightbulb size={120} className="text-dts-cyan" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Service Levels - Sleek, Modern Cards */}
        <motion.div variants={itemVariants} className="pt-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Approach</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {serviceLevels.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm group"
              >
                <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-foreground/60 font-medium">{service.level}</span>
                    <h4 className="text-xl font-bold">{service.title}</h4>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mt-10"
          >
            <a 
              href="#services" 
              className="inline-flex items-center text-dts-cyan hover:text-dts-purple transition-colors duration-300 font-medium text-lg group"
            >
              Explore our full service offerings
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MissionVision;
