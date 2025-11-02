import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Palette, Globe, Code, Database, Cpu, Check, 
  ArrowRight, Phone, Mail, MapPin, Users, 
  Instagram, Youtube, Facebook, Linkedin, 
  Twitter, Video, Image, Play, Bot, Sparkles, Rocket
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { servicesSchema, breadcrumbSchema } from "@/lib/schema";
 
const Services = () => {
  useEffect(() => {
    // Add grid pattern to 
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Breadcrumb schema for Services page
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "https://dreamteamservices.com" },
    { name: "Services", url: "https://dreamteamservices.com/services" }
  ]);

  // Combined schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      ...servicesSchema,
      breadcrumb
    ]
  };
 
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

  // Service levels
  const serviceLevels = [
    {
      id: "branding-design",
      level: "Level 1",
      title: "Branding & Design",
      description: "Professional design services to establish your visual identity and marketing materials.",
      services: [
        "Logo with Tagline",
        "Visiting Card Design",
        "Banner Design",
        "Poster Design",
        "Brochure Design"
      ],
      icon: <Palette size={24} />,
      color: "from-pink-500 to-orange-400"
    },
    {
      id: "website-marketing",
      level: "Level 2",
      title: "Website & Digital Marketing",
      description: "Establish your online presence with a professional website and strategic digital marketing.",
      services: [
        "Website Development",
        "SEO Optimization",
        "Digital Marketing Campaigns",
        "Content Management Systems",
        "E-commerce Solutions"
      ],
      icon: <Globe size={24} />,
      color: "from-dts-cyan to-blue-500"
    },
    {
      id: "software-apps",
      level: "Level 3",
      title: "Software & App Development",
      description: "Custom software solutions and mobile applications tailored to your business needs.",
      services: [
        "Custom Software Development",
        "Mobile App Development",
        "Web Applications",
        "API Integration"
      ],
      icon: <Code size={24} />,
      color: "from-dts-purple to-indigo-600"
    },
    {
      id: "data-cybersecurity",
      level: "Level 4",
      title: "Data Science & Cybersecurity",
      description: "Advanced data analysis and security solutions to protect and leverage your digital assets.",
      services: [
        "Data Analysis",
        "Predictive Modeling",
        "Cybersecurity Assessment",
        "Data Visualization",
        "Security Audits"
      ],
      icon: <Database size={24} />,
      color: "from-emerald-500 to-green-600"
    },
    {
      id: "ai-automation",
      level: "Level 5",
      title: "AI Automation & Chatbots",
      description: "Cutting-edge AI solutions to automate processes and enhance customer interactions.",
      services: [
        "AI Process Automation",
        "AI Agent Development",
        "Chatbot Integration",
        "Machine Learning Solutions",
        "Natural Language Processing"
      ],
      icon: <Cpu size={24} />,
      color: "from-violet-600 to-fuchsia-500"
    }
  ];

  const websitePackages = [
    {
      name: "Business Websites",
      description: "Professional business presence online",
      features: [
        "Responsive Design",
        "SEO Optimization", 
        "Contact Forms",
        "Social Media Integration",
        "Mobile-First Approach"
      ],
      recommended: false
    },
    {
      name: "Enterprise Solutions",
      description: "Advanced web applications and CMS",
      features: [
        "Content Management System",
        "Admin Dashboard",
        "Blog Integration",
        "Advanced SEO",
        "Analytics Integration",
        "Ongoing Support"
      ],
      recommended: true
    },
    {
      name: "E-commerce & Custom",
      description: "Complex integrations and e-commerce",
      features: [
        "E-commerce Functionality",
        "Custom Integrations",
        "Advanced Analytics",
        "User Authentication",
        "Payment Gateway Integration",
        "Advanced Security Features",
        "Extended Support"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Our Services | AI Commercial Ads, Digital Marketing & Software Development - Dream Team Services"
        description="Explore our comprehensive digital services: AI-powered commercial ads, strategic digital marketing, social media management, custom website development, and enterprise software solutions. Get world-class services in Kakinada, India."
        keywords="AI commercial advertising, video ad production, digital marketing strategy, social media management services, Instagram marketing, Facebook ads, LinkedIn marketing, website development services, custom software development, mobile app development, e-commerce solutions, SEO optimization, content marketing, brand strategy, Kakinada digital services"
        url="/services"
        schema={combinedSchema}
      />
      <Navbar />
      <main className="flex-grow pt-32">
        {/* Page Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Services</span></h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
              Professional services tailored for startups and businesses. 
              Explore our comprehensive solutions and get a custom quote.
            </p>
          </motion.div>

          {/* 1. Commercial Ads Creation Section - Professional Design */}
          <section className="relative mb-20">
            {/* Section Header - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-dts-cyan/10 border border-dts-cyan/20">
                <Video className="w-3 h-3 sm:w-4 sm:h-4 text-dts-cyan" />
                <span className="text-xs sm:text-sm font-medium text-dts-cyan">Commercial Video Ads</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Professional <span className="gradient-text">Video Advertisements</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Transform your business with AI-powered video advertisements. Professional production, 
                custom voiceovers, and real store footage integration.
              </p>
            </motion.div>

            {/* Video Ad Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {[
                {
                  title: "Short-Form Content",
                  description: "Quick, engaging videos perfect for social media platforms",
                  features: ["8-24 second formats", "Social media optimized", "High engagement focus"],
                  icon: <Play className="w-6 h-6" />
                },
                {
                  title: "Brand Storytelling",
                  description: "Extended format videos that tell your brand's story",
                  features: ["32-48 second formats", "Narrative structure", "Brand identity focus"],
                  icon: <Video className="w-6 h-6" />
                },
                {
                  title: "Full Commercials",
                  description: "Complete commercial advertisements for comprehensive campaigns",
                  features: ["60+ second formats", "Professional production", "Multi-platform ready"],
                  icon: <Users className="w-6 h-6" />
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="p-6 sm:p-8 rounded-xl bg-dts-blue-dark/40 border border-foreground/10 hover:border-foreground/20 transition-colors"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-dts-blue-light">
                      <div className="text-dts-cyan">{service.icon}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-center">{service.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/70 mb-4 text-center">{service.description}</p>
                  
                                    <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-dts-cyan mr-2 shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/contact">
                    <GradientButton 
                      className="w-full" 
                      size="lg"
                      gradientDirection="horizontal"
                      highContrast={true}
                    >
                      Get Quote
                    </GradientButton>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* What's Included - Professional Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm p-6 sm:p-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">What's Included in Every Ad</h3>
                <p className="text-foreground/70">Complete production pipeline for professional video advertisements</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    icon: <Code className="w-5 h-5" />, 
                    title: "Script Development", 
                    desc: "Custom storyline tailored to your brand"
                  },
                  { 
                    icon: <Users className="w-5 h-5" />, 
                    title: "Professional Voiceover", 
                    desc: "High-quality voice recording"
                  },
                  { 
                    icon: <Palette className="w-5 h-5" />, 
                    title: "AI Visual Creation", 
                    desc: "Stunning AI-generated visuals"
                  },
                  { 
                    icon: <Video className="w-5 h-5" />, 
                    title: "Video Production", 
                    desc: "Professional editing & assembly"
                  },
                  { 
                    icon: <Globe className="w-5 h-5" />, 
                    title: "Post-Production", 
                    desc: "Color grading & final polish"
                  },
                  { 
                    icon: <Check className="w-5 h-5" />, 
                    title: "Quality Assurance", 
                    desc: "Thorough review & approval"
                  }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + idx * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 p-2.5 bg-dts-blue-light rounded-lg">
                      <div className="text-dts-cyan">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-foreground/70">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Special Bonus */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
                className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🎁 Special Bonus
                  </div>
                </div>
                <p className="text-center text-sm font-semibold text-green-400">
                  Real Store Footage Integration - Absolutely FREE!
                </p>
                <p className="text-center text-xs text-foreground/70 mt-1">
                  We'll integrate your actual store footage at no additional cost
                </p>
              </motion.div>
            </motion.div>
          </section>
        </section>

        {/* 2. Social Media Management Detailed Packages */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Social Media <span className="gradient-text">Management</span></h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto px-2">
              Complete social media management across all major platforms with professional content creation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Content Creation Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-2 sm:py-3 font-medium text-sm sm:text-base">
                Content Creation & Management
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-dts-cyan">Professional Social Media Management</h3>
                  <p className="text-sm sm:text-base text-foreground/60 mt-2">Complete content creation and platform management</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Video size={14} className="mr-2 text-pink-500 sm:w-4 sm:h-4" />
                      Content Types
                    </h4>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/80 ml-4 sm:ml-6">
                      <li>• Professional video content</li>
                      <li>• Custom poster designs</li>
                      <li>• Story and reel creation</li>
                      <li>• Festival & event posts</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Globe size={14} className="mr-2 text-purple-500 sm:w-4 sm:h-4" />
                      Platforms Covered
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 text-xs">
                      <div className="flex items-center">
                        <Instagram size={10} className="mr-1 sm:w-3 sm:h-3" />
                        Instagram
                      </div>
                      <div className="flex items-center">
                        <Youtube size={10} className="mr-1 sm:w-3 sm:h-3" />
                        YouTube
                      </div>
                      <div className="flex items-center">
                        <Facebook size={10} className="mr-1 sm:w-3 sm:h-3" />
                        Facebook
                      </div>
                      <div className="flex items-center">
                        <img 
                          src="/images/image.png" 
                          alt="Threads"
                          className="mr-1 w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain"
                        />
                        Threads
                      </div>
                      <div className="flex items-center">
                        <Linkedin size={10} className="mr-1 sm:w-3 sm:h-3" />
                        LinkedIn
                      </div>
                      <div className="flex items-center">
                        <Twitter size={10} className="mr-1 sm:w-3 sm:h-3" />
                        X (Twitter)
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Service Features:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {[
                        "SEO content preparation",
                        "Professional editing",
                        "Scheduled posting",
                        "Analytics & reporting"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 shrink-0 mr-2 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link to="/contact">
                  <GradientButton 
                    className="w-full mt-6 sm:mt-8 text-sm sm:text-base" 
                    size="lg"
                    gradientDirection="horizontal"
                    highContrast={true}
                  >
                    Get Quote
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </GradientButton>
                </Link>
              </div>
            </motion.div>

            {/* Strategy & Analytics Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-dts-cyan/20 bg-dts-blue-dark/60 backdrop-blur-sm relative"
            >
              <div className="bg-gradient-to-r from-dts-cyan to-blue-500 text-white text-center py-2 sm:py-3 font-medium text-sm sm:text-base">
                Strategy & Growth Management
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-dts-cyan">Advanced Social Media Strategy</h3>
                  <p className="text-sm sm:text-base text-foreground/60 mt-2">Complete strategy development and growth optimization</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Video size={14} className="mr-2 text-dts-cyan sm:w-4 sm:h-4" />
                      Advanced Services
                    </h4>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/80 ml-4 sm:ml-6">
                      <li>• Enhanced content volumes</li>
                      <li>• Advanced SEO optimization</li>
                      <li>• Growth strategy development</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Premium Features:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {[
                        "Priority support",
                        "Detailed analytics & insights",
                        "Monthly strategy consultations",
                        "Competitor analysis",
                        "Custom campaign development"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-dts-cyan shrink-0 mr-2 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link to="/contact">
                  <GradientButton 
                    className="w-full mt-6 sm:mt-8 text-sm sm:text-base" 
                    size="lg"
                    gradientDirection="diagonal"
                    intensity="strong"
                    highContrast={true}
                  >
                    Get Quote
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </GradientButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Website Package Comparison */}
        <section className="bg-dts-blue py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Website <span className="gradient-text">Development</span></h2>
              <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto px-2">
                Professional website development services tailored to your business needs. All websites are built with modern technologies and best practices.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {websitePackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={cn(
                    "rounded-xl sm:rounded-2xl overflow-hidden border backdrop-blur-sm relative",
                    pkg.recommended 
                      ? "border-dts-purple/50 bg-dts-blue-dark/60" 
                      : "border-foreground/10 bg-dts-blue-dark/40"
                  )}
                >
                  {pkg.recommended && (
                    <div className="bg-gradient-to-r from-dts-purple to-dts-cyan text-white text-center py-1 font-medium text-xs sm:text-sm">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">{pkg.description}</p>
                    
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-cyan shrink-0 mr-2 sm:mr-3 mt-0.5" />
                          <span className="text-sm sm:text-base text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to="/contact">
                      <GradientButton 
                        className="w-full text-sm sm:text-base" 
                        size="lg"
                        gradientDirection={pkg.recommended ? "diagonal" : "horizontal"}
                        intensity={pkg.recommended ? "strong" : "default"}
                        highContrast={true}
                      >
                        Get Quote
                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                      </GradientButton>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Service Levels */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            className="space-y-6 sm:space-y-20 py-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Service <span className="gradient-text">Levels</span></h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Comprehensive digital solutions organized by expertise levels to match your business needs
              </p>
            </div>
            
            {serviceLevels.map((serviceLevel) => (
              <motion.div 
                key={serviceLevel.id} 
                id={serviceLevel.id}
                variants={itemVariants}
                className="p-4 sm:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 h-full w-1 sm:w-2 bg-gradient-to-b ${serviceLevel.color}`}></div>
                
                <div className="mb-4 sm:mb-8">
                  <span className="text-xs sm:text-sm font-medium text-foreground/60">{serviceLevel.level}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{serviceLevel.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/70">{serviceLevel.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {serviceLevel.services.map((service, index) => (
                    <div 
                      key={index} 
                      className="p-3 sm:p-5 rounded-lg bg-background/10 border border-foreground/5 hover:border-foreground/10 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-0">{service}</h4>
                        <div className="bg-dts-blue-light p-1.5 sm:p-2 rounded-lg w-fit">
                          {serviceLevel.icon}
                        </div>
                      </div>
                      <Link to="/contact">
                        <GradientButton 
                          size="sm" 
                          gradientDirection="horizontal" 
                          className="w-full text-xs sm:text-sm"
                          highContrast={true}
                        >
                          Get Quote
                        </GradientButton>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* AI & Robotics Feature Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/20 via-cyan-600/20 to-purple-600/20 border border-violet-500/30 p-8 sm:p-12"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">New Service</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">AI & Robotics</span> Solutions
                  </h2>
                  <p className="text-lg sm:text-xl text-foreground/80 mb-6 leading-relaxed">
                    Custom software for your robots from training to deployment. 
                    <span className="block mt-2 font-semibold text-violet-400">Sit back, relax — we handle everything!</span>
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-500/20">
                        <Bot className="w-5 h-5 text-violet-400" />
                      </div>
                      <span className="text-foreground/90">AI Agents for Business</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-foreground/90">AI Automation Solutions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Rocket className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-foreground/90">Custom Robotics & Drones</span>
                    </div>
                  </div>

                  <Link to="/ai-robotics">
                    <GradientButton
                      size="lg"
                      className="text-base sm:text-lg"
                      gradientDirection="horizontal"
                      highContrast={true}
                    >
                      Explore AI & Robotics <ArrowRight className="ml-2 w-5 h-5" />
                    </GradientButton>
                  </Link>
                </div>

                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="p-6 rounded-xl bg-dts-blue-dark/60 border border-violet-500/20">
                        <Bot className="w-8 h-8 text-violet-400 mb-3" />
                        <h4 className="font-bold mb-2">AI Agents</h4>
                        <p className="text-sm text-foreground/70">Intelligent assistants for your business</p>
                      </div>
                      <div className="p-6 rounded-xl bg-dts-blue-dark/60 border border-cyan-500/20">
                        <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                        <h4 className="font-bold mb-2">Automation</h4>
                        <p className="text-sm text-foreground/70">Smart process optimization</p>
                      </div>
                    </div>
                    <div className="space-y-4 mt-8">
                      <div className="p-6 rounded-xl bg-dts-blue-dark/60 border border-orange-500/20">
                        <Rocket className="w-8 h-8 text-orange-400 mb-3" />
                        <h4 className="font-bold mb-2">Robotics</h4>
                        <p className="text-sm text-foreground/70">Custom robot solutions</p>
                      </div>
                      <div className="p-6 rounded-xl bg-dts-blue-dark/60 border border-purple-500/20">
                        <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
                        <h4 className="font-bold mb-2">Drones</h4>
                        <p className="text-sm text-foreground/70">Autonomous flight systems</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Additional Notes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Why Choose Our Services</h2>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">Professional quality guaranteed on all projects with dedicated support.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">Custom solutions tailored to your specific business needs and goals.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">Flexible service packages available for comprehensive business solutions.</p>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            className="rounded-xl sm:rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/30 to-dts-cyan/30 opacity-60"></div>
            <div className="relative p-6 sm:p-8 lg:p-10 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
              <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 max-w-3xl">
                Contact our team for a detailed quote or to discuss your project requirements.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-10">
                <div className="flex items-start">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-dts-blue-light rounded-lg">
                    <Phone size={20} className="text-dts-cyan sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-1">Phone</h3>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-dts-purple font-medium">
                        <a href="tel:+919849834102" className="hover:underline transition-colors">
                          +91 9849834102
                        </a>
                      </p>
                      <p className="text-sm sm:text-base text-dts-purple font-medium">
                        <a href="tel:+919390011378" className="hover:underline transition-colors">
                          +91 9390011378
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-dts-blue-light rounded-lg">
                    <Mail size={20} className="text-dts-cyan sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-1">Email</h3>
                    <p className="text-sm sm:text-base text-dts-purple font-medium">
                      <a href="mailto:thedreamteamservicespvt@gmail.com" className="hover:underline transition-colors break-all">
                        thedreamteamservicespvt@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-dts-blue-light rounded-lg">
                    <MapPin size={20} className="text-dts-cyan sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-1">Location</h3>
                    <p className="text-sm sm:text-base text-dts-purple font-medium">50-6-23, vishnalayam street, Jagannaickpur, Kakinada, Andhra Pradesh 533002</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/contact">
                  <GradientButton
                    size="lg"
                    gradientDirection="horizontal"
                    intensity="strong"
                    highContrast={true}
                    className="group text-sm sm:text-base"
                  >
                    Get Custom Quote
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4" />
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;