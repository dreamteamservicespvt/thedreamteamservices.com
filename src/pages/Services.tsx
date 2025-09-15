
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Code, Smartphone, Shield, Rocket, Megaphone, Database, Users, Video } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

const Services = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const services = [
    {
      id: "level-one",
      level: "Level One",
      title: "Web Development & Digital Marketing",
      description: "We design and develop stunning websites and implement digital marketing strategies to boost online sales and drive traffic for our clients.",
      services: [
        { icon: <Code size={24} />, name: "Web Development", description: "Custom, responsive website design and development" },
        { icon: <Megaphone size={24} />, name: "Digital Marketing", description: "SEO, social media, and content marketing strategies" }
      ],
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "social-media-management",
      level: "Level One Plus",
      title: "Social Media Management",
      description: "Complete social media management across Instagram, YouTube, Facebook, Threads, LinkedIn, and X. Professional content creation with SEO optimization and strategic posting.",
      services: [
        { icon: <Users size={24} />, name: "Multi-Platform Management", description: "Handle 6 major social media platforms simultaneously" },
        { icon: <Video size={24} />, name: "Content Creation", description: "Weekly videos, posters, and festival-themed content" }
      ],
      color: "from-pink-500 to-purple-500"
    },
    {
      id: "commercial-ads",
      level: "Level One Pro",
      title: "Commercial Ads Creation",
      description: "AI-generated professional video advertisements from 8 seconds to 1 minute. Complete production including concept, voiceover, visuals, and editing with real footage integration.",
      services: [
        { icon: <Video size={24} />, name: "AI Video Production", description: "Professional AI-generated commercials with custom concepts" },
        { icon: <Megaphone size={24} />, name: "Complete Ad Package", description: "Concept, voiceover, visuals, editing, and quality assurance" }
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      id: "level-two",
      level: "Level Two",
      title: "Software & Mobile App Development",
      description: "Building on Level One, we develop and maintain custom software and mobile applications for organizations seeking high-quality solutions at affordable prices.",
      services: [
        { icon: <Database size={24} />, name: "Software Development", description: "Custom software solutions for businesses of all sizes" },
        { icon: <Smartphone size={24} />, name: "Mobile App Development", description: "Native and cross-platform mobile applications" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "level-three",
      level: "Level Three",
      title: "AI Solutions & Cybersecurity Services",
      description: "Integrating all previous levels with AI and Cybersecurity specialists, we offer innovative AI-driven solutions and advanced security measures.",
      services: [
        { icon: <Rocket size={24} />, name: "AI Solutions", description: "Innovative AI-driven websites, software, and digital marketing" },
        { icon: <Shield size={24} />, name: "Cybersecurity", description: "Advanced, tailored security solutions against cyber threats" }
      ],
      color: "from-dts-purple to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Services</span></h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Dream Team Services offers a comprehensive range of digital solutions 
              across three service levels to meet your every need.
            </p>
          </motion.div>

          <motion.div
            className="space-y-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((serviceLevel) => (
              <motion.div 
                key={serviceLevel.id} 
                id={serviceLevel.id}
                variants={itemVariants}
                className="p-8 rounded-2xl relative overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 h-full w-2 bg-gradient-to-b ${serviceLevel.color}`}></div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-sm font-medium text-foreground/60">{serviceLevel.level}</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{serviceLevel.title}</h2>
                    <p className="text-foreground/70 mb-6">{serviceLevel.description}</p>
                    <GradientButton>Learn More</GradientButton>
                  </div>
                  
                  <div className="space-y-4">
                    {serviceLevel.services.map((service, index) => (
                      <div key={index} className="flex p-4 rounded-lg bg-background/10 border border-foreground/5">
                        <div className="mr-4 bg-dts-blue-light p-3 rounded-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{service.name}</h3>
                          <p className="text-sm text-foreground/70">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
