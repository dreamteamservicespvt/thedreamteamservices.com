
import { motion } from "framer-motion";
import { Check, Target, Rocket, Lightbulb, Zap } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MissionVision = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });

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
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const missionPoints = [
    "Deliver cutting-edge digital solutions that drive growth and innovation",
    "Help organizations leverage technology to achieve their goals",
    "Provide accessible technology services for businesses of all sizes",
    "Foster a culture of continuous learning and advancement"
  ];

  const visionPoints = [
    "Become the leading provider of integrated digital solutions",
    "Create a global network of technological excellence",
    "Pioneer AI and cybersecurity advancements for businesses",
    "Establish a sustainable digital ecosystem for the future"
  ];

  return (
    <section id="mission" className="py-16 sm:py-24 px-4 relative overflow-hidden bg-dts-blue-dark">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-dts-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-dts-cyan/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-dts-cyan font-semibold py-2 px-4 rounded-full bg-dts-cyan/10 border border-dts-cyan/20 mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Mission & <span className="gradient-text">Vision</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Section */}
          <div 
            ref={missionRef}
            className="glass-card rounded-xl p-8 relative overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isMissionInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-dts-purple/20 flex items-center justify-center mr-4">
                  <Target className="text-dts-purple" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Our Mission</h3>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-foreground/80 mb-8">
                At Dream Team Services, our mission is to empower organizations with innovative digital solutions that 
                transform their operations, enhance their growth, and secure their digital assets in an ever-evolving 
                technological landscape.
              </motion.p>

              <div className="space-y-4">
                {missionPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-dts-purple/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check size={14} className="text-dts-purple" />
                    </div>
                    <span className="text-foreground/80">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <Rocket size={160} className="text-dts-purple" />
            </div>
          </div>

          {/* Vision Section */}
          <div 
            ref={visionRef}
            className="glass-card rounded-xl p-8 relative overflow-hidden"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisionInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-dts-cyan/20 flex items-center justify-center mr-4">
                  <Lightbulb className="text-dts-cyan" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">Our Vision</h3>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-foreground/80 mb-8">
                We envision a future where technology serves as the ultimate enabler for businesses and 
                individuals alike, creating a world where digital innovation drives sustainable growth, 
                fosters connectivity, and ensures security for all.
              </motion.p>

              <div className="space-y-4">
                {visionPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-dts-cyan/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <Zap size={14} className="text-dts-cyan" />
                    </div>
                    <span className="text-foreground/80">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10">
              <Lightbulb size={160} className="text-dts-cyan" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
