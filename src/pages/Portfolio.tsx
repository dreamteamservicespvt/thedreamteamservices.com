
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Filter, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FloatingAnimation from "@/components/ui/FloatingAnimation";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Portfolio = () => {
  const isMobile = useIsMobile();
  
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

  // Portfolio projects data with real images
  const projects = [
    {
      id: 1,
      title: "TechFusion E-Commerce Platform",
      category: "web",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      description: "A comprehensive e-commerce solution with advanced product filtering, user authentication, and payment processing."
    },
    {
      id: 2,
      title: "HealthTrack Mobile App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["React Native", "Firebase", "Health API"],
      description: "A fitness and health tracking mobile application with personalized workout plans and nutrition guidance."
    },
    {
      id: 3,
      title: "SmartHome IoT Dashboard",
      category: "software",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["Angular", "Python", "IoT", "WebSockets"],
      description: "An intelligent dashboard for managing smart home devices with real-time monitoring and automation capabilities."
    },
    {
      id: 4,
      title: "AI-Powered Content Generator",
      category: "ai",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["Python", "TensorFlow", "NLP", "React"],
      description: "An AI tool that generates high-quality marketing content based on brand guidelines and target audience profiles."
    },
    {
      id: 5,
      title: "SecureVault Enterprise Security",
      category: "security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["Go", "Blockchain", "Encryption", "Vue.js"],
      description: "A comprehensive cybersecurity solution for enterprises with advanced threat detection and data protection."
    },
    {
      id: 6,
      title: "Global Marketing Campaign",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      tags: ["SEO", "Social Media", "Content Strategy"],
      description: "A multi-channel digital marketing campaign that increased client conversion rates by 45% within three months."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 lg:pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div 
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Portfolio</span></h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore our featured projects and see how we've helped businesses 
              transform their digital presence and achieve their goals.
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="mb-12">
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList className="bg-dts-blue-dark/40 border border-foreground/10 p-1">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="web">Web Dev</TabsTrigger>
                <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
                <TabsTrigger value="ai">AI Solutions</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </div>

            {/* All Projects Tab */}
            <TabsContent value="all">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={itemVariants} />
                ))}
              </motion.div>
            </TabsContent>

            {/* Category Tabs */}
            {["web", "mobile", "ai", "security"].map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {projects
                    .filter(project => project.category === category)
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} variants={itemVariants} />
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-6 text-foreground/70">
              Want to see more of our work or discuss a specific project in detail?
            </p>
            <Link to="/contact">
              <Button variant="outline" className="group">
                Contact Our Team
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Project Card Component with enhanced hover effects
const ProjectCard = ({ project, variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="rounded-xl overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-dts-purple/20 group"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative overflow-hidden h-48 sm:h-56">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dts-blue-dark to-transparent opacity-70"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-dts-purple transition-colors duration-300">{project.title}</h3>
        <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-dts-blue-light/30 text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full justify-start px-0 text-dts-purple group">
          View Project Details
          <ExternalLink size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Portfolio;
