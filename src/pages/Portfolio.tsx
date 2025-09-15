import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import GradientButton from "@/components/ui/GradientButton";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { ErrorDisplay } from "@/components/ui/error-display";

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { hasError, message, details, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    // Fetch projects from Firebase
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(projectsData.map(project => project.category))];
        setCategories(uniqueCategories);
        
        clearError();
      } catch (error) {
        handleError(error, "Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, [handleError, clearError]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory, projects]);

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
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto px-2">
              Explore our featured projects and see how we've helped businesses 
              transform their digital presence and achieve their goals.
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="mb-12">
            {/* Tab navigation with enhanced mobile scrolling */}
            <div className="flex justify-center mb-8">
              <div className="w-full overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-max flex justify-center">
                  <TabsList className="bg-dts-blue-dark/40 border border-foreground/10 p-1 flex-nowrap whitespace-nowrap">
                    <TabsTrigger 
                      value="all" 
                      onClick={() => setActiveCategory("All")}
                      className="text-sm py-1.5"
                    >
                      All Projects
                    </TabsTrigger>
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category}
                        value={category} 
                        onClick={() => setActiveCategory(category)}
                        className="text-sm py-1.5"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-foreground/70">Loading projects...</p>
                </div>
              ) : hasError ? (
                <div className="text-center py-16">
                  <ErrorDisplay 
                    message={message}
                    details={details}
                    onRetry={() => {
                      clearError();
                      window.location.reload();
                    }}
                    className="mb-8"
                  />
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-foreground/70">No projects available in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Add Contact CTA Section with improved mobile padding */}
        <section className="py-8 sm:py-12 bg-dts-blue-dark/50 backdrop-blur-sm mt-12 sm:mt-20 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
                Want to see more of our work or discuss a specific project in detail?
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-foreground/80">
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

// Project Card component with enhanced mobile responsiveness
const ProjectCard = ({ project }: { project: Project }) => {
  const { handleError } = useErrorHandler();
    
  const handleImageError = (error: Error) => {
    handleError(new Error(`Failed to load project image for "${project.title}": ${error.message}`));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group rounded-xl overflow-hidden border border-foreground/10 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-dts-purple/20 h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <OptimizedImage 
          src={project.image} 
          alt={project.title}
          className="w-full h-auto max-h-64 rounded-t-xl"
          width={640}
          height={360}
          fallbackSrc="/images/placeholder-project.jpg"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dts-blue-dark to-transparent opacity-70"></div>
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-dts-purple transition-colors duration-300">{project.title}</h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 mt-auto">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-dts-blue-light/30 text-foreground/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-dts-blue-light/30 text-foreground/80">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
        
        {project.projectUrl && (
          <div className="mt-auto pt-2">
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-dts-purple hover:text-cyan-400 font-medium transition-all duration-300 group/link text-sm sm:text-base"
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
