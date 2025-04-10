import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import GradientButton from "@/components/ui/GradientButton";

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    // Fetch projects from Firebase
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Unable to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Filter projects by category
  const filteredProjects = currentCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === currentCategory);

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
            {/* Fix: Improved TabsList centering */}
            <div className="flex justify-center mb-8">
              <div className="w-full flex justify-center">
                <TabsList className="bg-dts-blue-dark/40 border border-foreground/10 p-1 mx-auto">
                  <TabsTrigger value="all" onClick={() => setCurrentCategory("all")}>All Projects</TabsTrigger>
                  <TabsTrigger value="web" onClick={() => setCurrentCategory("web")}>Web Dev</TabsTrigger>
                  <TabsTrigger value="mobile" onClick={() => setCurrentCategory("mobile")}>Mobile Apps</TabsTrigger>
                  <TabsTrigger value="ai" onClick={() => setCurrentCategory("ai")}>AI Solutions</TabsTrigger>
                  <TabsTrigger value="security" onClick={() => setCurrentCategory("security")}>Security</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-foreground/70">Loading projects...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-destructive">{error}</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-foreground/70">No projects available in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="web" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Add Contact CTA Section */}
        <section className="py-12 bg-dts-blue-dark/50 backdrop-blur-sm mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Want to see more of our work or discuss a specific project in detail?
              </h2>
              <p className="text-xl mb-8 text-foreground/80">
                Contact Our Team
              </p>
              <Link to="/contact">
                {/* Replace Button with styled motion + GradientButton to match Hero.tsx */}
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(123, 31, 162, 0.5)" }} 
                  whileTap={{ scale: 0.98 }}
                  className="relative group inline-block"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <GradientButton size="lg" className="relative">
                    Get in Touch
                  </GradientButton>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Project Card component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Changed: Added shadow on hover instead of border change
      className="group rounded-xl overflow-hidden border border-foreground/10 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-dts-purple/20"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-400"
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
        
        {project.projectUrl && (
          // Enhanced View Project Details button with better hover effect
          <div className="mt-2">
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-dts-purple hover:text-cyan-400 font-medium transition-all duration-300 group/link"
            >
              <span className="border-b-2 border-transparent group-hover/link:border-cyan-400 pb-1">View Project Details</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Portfolio;
