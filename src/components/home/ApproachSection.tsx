import { motion } from "framer-motion";
import { Target, Rocket, Lightbulb, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ApproachSection = () => {
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
      title: "Digital Presence",
      description: "Websites, Social Media & Ads",
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
    <section id="approach" ref={containerRef} className="section-container py-16 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-16"
      >
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

export default ApproachSection;
