import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Palette, Globe, Code, Database, Cpu, Check, 
  ArrowRight, Phone, Mail, MapPin, Users, 
  Instagram, Youtube, Facebook, Linkedin, 
  Twitter, Video, Image, Play
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
 
const Services = () => {
  useEffect(() => {
    // Add grid pattern to 
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

  // Service levels with Services
  const serviceLevels = [
    {
      id: "branding-design",
      level: "Level 1",
      title: "Branding & Design",
      description: "Professional design services to establish your visual identity and marketing materials.",
      services: [
        { name: "Logo with Tagline", price: "Starting From ₹500" },
        { name: "Visiting Card Design", price: "Starting From ₹500" },
        { name: "Banner Design", price: "Starting From ₹500" },
        { name: "Poster Design", price: "Starting From ₹500" },
        { name: "Brochure Design", price: "Starting From ₹1000" }
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
        { name: "Basic Website", price: "Starting From ₹20,000" },
        { name: "Standard Website", price: "Starting From ₹30,000" },
        { name: "Advanced Website", price: "Starting From ₹50,000+" },
        { name: "SEO Posts", price: "₹500 each" },
        { name: "SEO Reels", price: "₹5,000 to ₹10,000 each" },
        { name: "Digital Marketing Campaigns", price: "₹10,000 to ₹15,000 per month" }
      ],
      icon: <Globe size={24} />,
      color: "from-dts-cyan to-blue-500"
    },
    {
      id: "social-media-management",
      level: "Level 2.5",
      title: "Social Media Management",
      description: "Professional social media management across Instagram, YouTube, Facebook, Threads, LinkedIn, and X (Twitter). Complete content creation, SEO optimization, and posting services.",
      services: [
        { name: "Starter Package", price: "₹25,000 per month" },
        { name: "Professional Package", price: "₹30,000 per month" }
      ],
      icon: <Users size={24} />,
      color: "from-pink-500 to-purple-500"
    },
    {
      id: "commercial-ads",
      level: "Level 2.7",
      title: "Commercial Ads Creation",
      description: "Professional AI-generated video advertisements tailored for your business. Real store footage can be integrated at no extra cost.",
      services: [
        { name: "8 Second Ad", price: "Up to ₹3,000" },
        { name: "16 Second Ad", price: "Up to ₹5,000" },
        { name: "24 Second Ad", price: "Up to ₹8,000" },
        { name: "32 Second Ad", price: "Up to ₹10,000" },
        { name: "40 Second Ad", price: "Up to ₹13,000" },
        { name: "48 Second Ad", price: "Up to ₹15,000" },
        { name: "1 Minute Ad", price: "Up to ₹20,000" }
      ],
      icon: <Video size={24} />,
      color: "from-red-500 to-orange-500"
    },
    {
      id: "software-apps",
      level: "Level 3",
      title: "Software & App Development",
      description: "Custom software solutions and mobile applications tailored to your business needs.",
      services: [
        { name: "Custom Software Development", price: "₹50,000 to ₹1,00,000+" },
        { name: "Mobile App Development", price: "₹50,000 to ₹1,00,000+" }
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
        { name: "Data Analysis", price: "₹10,000 to ₹40,000+" },
        { name: "Predictive Modeling", price: "₹25,000 to ₹1,00,000+" },
        { name: "Cybersecurity Assessment", price: "₹15,000 to ₹80,000+" }
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
        { name: "AI Process Automation", price: "₹50,000 to ₹1,50,000+" },
        { name: "AI Agent Development", price: "₹1,00,000 to ₹4,00,000+" },
        { name: "Chatbot Integration", price: "₹20,000 to ₹70,000+" }
      ],
      icon: <Cpu size={24} />,
      color: "from-violet-600 to-fuchsia-500"
    }
  ];

  const websitePackages = [
    {
      name: "Basic",
      price: "₹20,000",
      features: [
        "5 Pages",
        "Responsive Design",
        "Basic SEO Optimization",
        "Contact Form",
        "Social Media Links"
      ],
      recommended: false
    },
    {
      name: "Standard",
      price: "₹30,000",
      features: [
        "10 Pages",
        "Content Management System",
        "Admin Dashboard",
        "Blog Integration",
        "Advanced SEO",
        "Analytics Integration",
        "1 Month Free Support"
      ],
      recommended: true
    },
    {
      name: "Advanced",
      price: "₹60,000+",
      features: [
        "E-commerce Functionality",
        "Custom Integrations",
        "Advanced Analytics",
        "User Authentication",
        "Payment Gateway Integration",
        "Advanced Security Features",
        "3 Months Free Support"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Services Plans</span></h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
              Clear, competitive Services tailored for startups and businesses. 
              Choose the package that fits your needs.
            </p>
          </motion.div>

          {/* 1. Commercial Ads Creation Section - Premium UI/UX */}
          <section className="relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12 sm:mb-20"
            >
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                <Video className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium text-red-400">Commercial Video Ads</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Professional <span className="gradient-text bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Video Advertisements</span>
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                Transform your business with AI-powered video advertisements. Professional production, 
                custom voiceovers, and real store footage integration - all at competitive prices.
              </p>
            </motion.div>

            {/* Premium Ad Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {[
                { duration: "8 Second", time: "8s", price: "3,000", popular: false, description: "Perfect for quick social media ads", color: "from-red-400 to-red-600" },
                { duration: "16 Second", time: "16s", price: "5,000", popular: false, description: "Great for Instagram stories & reels", color: "from-orange-400 to-red-500" },
                { duration: "24 Second", time: "24s", price: "8,000", popular: true, description: "Most popular choice for brands", color: "from-yellow-400 to-orange-500" },
                { duration: "32 Second", time: "32s", price: "10,000", popular: false, description: "Extended storytelling format", color: "from-orange-500 to-red-500" },
                { duration: "40 Second", time: "40s", price: "13,000", popular: false, description: "Detailed product showcases", color: "from-red-500 to-pink-500" },
                { duration: "48 Second", time: "48s", price: "15,000", popular: false, description: "Comprehensive brand story", color: "from-pink-500 to-red-600" },
                { duration: "1 Minute", time: "60s", price: "20,000", popular: false, description: "Full-length commercial", color: "from-purple-500 to-red-500" }
              ].map((ad, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.2 } 
                  }}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden backdrop-blur-xl border-2 transition-all duration-300",
                    ad.popular 
                      ? "border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-red-500/10 shadow-2xl shadow-orange-500/20" 
                      : "border-foreground/10 bg-gradient-to-br from-background/50 to-background/30 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/10"
                  )}
                >
                  {/* Popular Badge */}
                  {ad.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${ad.color}`}></div>
                    <div className="absolute inset-0 bg-dots-white/10"></div>
                  </div>
                  
                  <div className="relative p-6 lg:p-8">
                    {/* Video Icon with Animation */}
                    <div className="flex justify-center mb-6">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${ad.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Play className="w-8 h-8 text-white" />
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Duration Display */}
                    <div className="text-center mb-4">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">{ad.time}</div>
                      <h3 className="text-lg font-semibold text-foreground/90">{ad.duration} Ad</h3>
                      <p className="text-sm text-foreground/60 mt-2">{ad.description}</p>
                    </div>
                    
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-sm text-foreground/60 mb-1">Starting from</div>
                      <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${ad.color} bg-clip-text text-transparent`}>
                        ₹{ad.price}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GradientButton 
                        className="w-full font-semibold shadow-lg" 
                        size="lg"
                        gradientDirection="horizontal"
                        highContrast={true}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Order Now
                      </GradientButton>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Production Process Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative rounded-3xl overflow-hidden border border-foreground/10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
              
              <div className="relative p-8 lg:p-12">
                <div className="text-center mb-12">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">Complete Production Pipeline</h3>
                  <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                    From concept to delivery, we handle every aspect of your video advertisement production
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { 
                      icon: <Code className="w-6 h-6" />, 
                      title: "Script & Concept", 
                      desc: "Custom storyline development tailored to your brand",
                      color: "from-red-500 to-orange-500"
                    },
                    { 
                      icon: <Users className="w-6 h-6" />, 
                      title: "Professional Voiceover", 
                      desc: "High-quality voice recording with multiple language options",
                      color: "from-orange-500 to-yellow-500"
                    },
                    { 
                      icon: <Palette className="w-6 h-6" />, 
                      title: "AI Visual Generation", 
                      desc: "Cutting-edge AI creates stunning visuals for your brand",
                      color: "from-yellow-500 to-red-500"
                    },
                    { 
                      icon: <Video className="w-6 h-6" />, 
                      title: "Video Assembly", 
                      desc: "Professional editing and seamless video production",
                      color: "from-red-500 to-pink-500"
                    },
                    { 
                      icon: <Globe className="w-6 h-6" />, 
                      title: "Post-Production", 
                      desc: "Color grading, effects, and final polish",
                      color: "from-pink-500 to-purple-500"
                    },
                    { 
                      icon: <Check className="w-6 h-6" />, 
                      title: "Quality Assurance", 
                      desc: "Rigorous testing and approval process",
                      color: "from-purple-500 to-red-500"
                    }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                        <p className="text-foreground/70 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Special Offer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="mt-12 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      🎁 SPECIAL BONUS
                    </div>
                  </div>
                  <p className="text-center text-lg font-semibold">
                    <span className="text-green-400">Real Store Footage Integration</span> - Absolutely FREE!
                  </p>
                  <p className="text-center text-sm text-foreground/70 mt-2">
                    We'll seamlessly integrate your actual store or product footage at no additional cost
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* 2. Social Media Management */}
          <section className="py-16 sm:py-20">
            {/* Social Media Management content will be moved here */}
          </section>

          {/* 3. Service Levels */}
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
            
            {serviceLevels.filter(level => level.id !== 'commercial-ads' && level.id !== 'social-media-management').map((serviceLevel) => (
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
                        <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-0">{service.name}</h4>
                        <div className="bg-dts-blue-light p-1.5 sm:p-2 rounded-lg w-fit">
                          {serviceLevel.icon}
                        </div>
                      </div>
                      <p className="text-dts-cyan font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{service.price}</p>
                      <GradientButton 
                        size="sm" 
                        gradientDirection="horizontal" 
                        className="w-full text-xs sm:text-sm"
                        highContrast={true}
                      >
                        Get Started
                      </GradientButton>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Social Media Management Detailed Packages */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Starter Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-2 sm:py-3 font-medium text-sm sm:text-base">
                Starter Package
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 text-dts-cyan">₹25,000</div>
                  <div className="text-sm sm:text-base text-foreground/60">per month</div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Video size={14} className="mr-2 text-pink-500 sm:w-4 sm:h-4" />
                      Content Creation
                    </h4>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/80 ml-4 sm:ml-6">
                      <li>• Weekly: 1 Video + 4 Posters</li>
                      <li>• Monthly: 20 total posts</li>
                      <li>• All 6 platforms covered</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Globe size={14} className="mr-2 text-purple-500 sm:w-4 sm:h-4" />
                      Platforms
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
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Includes:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {[
                        "SEO content preparation",
                        "Professional editing",
                        "Scheduled posting",
                        "Festival & occasion posts"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 shrink-0 mr-2 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <GradientButton 
                  className="w-full mt-6 sm:mt-8 text-sm sm:text-base" 
                  size="lg"
                  gradientDirection="horizontal"
                  highContrast={true}
                >
                  Choose Starter
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </GradientButton>
              </div>
            </motion.div>

            {/* Professional Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/50 bg-dts-blue-dark/60 backdrop-blur-sm relative"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 sm:py-3 font-medium text-sm sm:text-base">
                Professional - Most Popular
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 text-dts-cyan">₹30,000</div>
                  <div className="text-sm sm:text-base text-foreground/60">per month</div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                      <Video size={14} className="mr-2 text-purple-500 sm:w-4 sm:h-4" />
                      Enhanced Content
                    </h4>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/80 ml-4 sm:ml-6">
                      <li>• Weekly: 2 Videos + 4 Posters</li>
                      <li>• Monthly: 24 total posts</li>
                      <li>• Premium features included</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Everything in Starter, Plus:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {[
                        "Double video content",
                        "Advanced SEO optimization",
                        "Priority support",
                        "Detailed analytics",
                        "Monthly strategy calls"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 shrink-0 mr-2 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <GradientButton 
                  className="w-full mt-6 sm:mt-8 text-sm sm:text-base" 
                  size="lg"
                  gradientDirection="diagonal"
                  intensity="strong"
                  highContrast={true}
                >
                  Choose Professional
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Commercial Ads Creation Detailed Services */}
        <section className="bg-dts-blue py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Commercial <span className="gradient-text">Ads Creation</span></h2>
              <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto px-2">
                Professional AI-generated video advertisements with complete production. 
                Real store footage integration at no extra cost.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {[
                { duration: "8 seconds", price: "₹3,000", popular: false },
                { duration: "16 seconds", price: "₹5,000", popular: false },
                { duration: "24 seconds", price: "₹8,000", popular: true },
                { duration: "32 seconds", price: "₹10,000", popular: false },
                { duration: "40 seconds", price: "₹13,000", popular: false },
                { duration: "48 seconds", price: "₹15,000", popular: false },
                { duration: "1 minute", price: "₹20,000", popular: false }
              ].map((ad, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className={cn(
                    "rounded-xl sm:rounded-2xl overflow-hidden border backdrop-blur-sm relative",
                    ad.popular 
                      ? "border-orange-500/50 bg-dts-blue-dark/60" 
                      : "border-foreground/10 bg-dts-blue-dark/40"
                  )}
                >
                  {ad.popular && (
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-1 font-medium text-xs sm:text-sm">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-3 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="bg-red-500/20 p-2 sm:p-3 rounded-lg w-fit mx-auto mb-2 sm:mb-3">
                        <Play size={20} className="text-red-500 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-1">{ad.duration}</h3>
                      <div className="text-lg sm:text-2xl font-bold text-dts-cyan">Up to {ad.price}</div>
                    </div>
                    
                    <GradientButton 
                      className="w-full text-xs sm:text-sm" 
                      size="sm"
                      gradientDirection={ad.popular ? "diagonal" : "horizontal"}
                      intensity={ad.popular ? "strong" : "default"}
                      highContrast={true}
                    >
                      Order Now
                    </GradientButton>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">What's Included in Every Ad</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[
                  { icon: <Code size={16} />, title: "Concept Creation", desc: "Custom script development" },
                  { icon: <Users size={16} />, title: "Voiceover", desc: "Professional voice recording" },
                  { icon: <Image size={16} />, title: "Visual Generation", desc: "AI-powered design" },
                  { icon: <Video size={16} />, title: "Video Production", desc: "Complete assembly" },
                  { icon: <Globe size={16} />, title: "Editing", desc: "Professional post-production" },
                  { icon: <Check size={16} />, title: "Quality Check", desc: "Final QA & QC" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="bg-red-500/20 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm sm:text-base">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-foreground/70">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-center text-xs sm:text-sm">
                  <strong className="text-green-400">Bonus:</strong> Real store footage integration at no additional cost!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Website Package Comparison */}
        <section className="bg-dts-blue py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Website <span className="gradient-text">Packages</span></h2>
              <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto px-2">
                Choose the perfect website package for your business. All websites are built with modern technologies.
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
                    <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-dts-cyan">{pkg.price}</div>
                    
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-cyan shrink-0 mr-2 sm:mr-3 mt-0.5" />
                          <span className="text-sm sm:text-base text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <GradientButton 
                      className="w-full text-sm sm:text-base" 
                      size="lg"
                      gradientDirection={pkg.recommended ? "diagonal" : "horizontal"}
                      intensity={pkg.recommended ? "strong" : "default"}
                      highContrast={true}
                    >
                      Select Package
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </GradientButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Additional Notes</h2>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">Startups in Kakinada get 10–15% off on their first project.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">GST will be added once registration is complete.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-dts-purple/20 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-dts-purple" />
                </div>
                <p className="text-sm sm:text-base text-foreground/80">Flexible quotes available for large or combined service packages.</p>
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
