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
 
const Pricing = () => {
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

  // Service levels with pricing
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Pricing Plans</span></h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
              Clear, competitive pricing tailored for startups and businesses. 
              Choose the package that fits your needs.
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

            {/* Premium Ad Cards Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6 mb-16">
              {[
                { duration: "8s", price: "3,000", popular: false, recommended: false, description: "Quick social media ads" },
                { duration: "16s", price: "5,000", popular: false, recommended: false, description: "Instagram stories & reels" },
                { duration: "24s", price: "8,000", popular: true, recommended: false, description: "Most popular for brands" },
                { duration: "32s", price: "10,000", popular: false, recommended: true, description: "Extended storytelling" },
                { duration: "40s", price: "13,000", popular: false, recommended: false, description: "Product showcases" },
                { duration: "48s", price: "15,000", popular: false, recommended: false, description: "Brand story format" },
                { duration: "60s", price: "20,000", popular: false, recommended: false, description: "Full commercial" }
              ].map((ad, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={cn(
                    "group relative rounded-lg sm:rounded-xl overflow-visible backdrop-blur-sm border transition-all duration-300",
                    // Add top margin to accommodate badges
                    ad.popular || ad.recommended ? "mt-4 sm:mt-5" : "mt-4 sm:mt-5",
                    ad.popular 
                      ? "border-dts-cyan/30 bg-dts-blue-dark/60 shadow-lg shadow-dts-cyan/10" 
                      : ad.recommended
                      ? "border-dts-purple/30 bg-dts-blue-dark/60 shadow-lg shadow-dts-purple/10"
                      : "border-foreground/10 bg-dts-blue-dark/40 hover:border-foreground/20 hover:shadow-lg hover:shadow-background/20"
                  )}
                >
                  {/* Badge - Fixed Positioning */}
                  {ad.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-dts-cyan text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        ⭐ POPULAR
                      </div>
                    </div>
                  )}
                  {ad.recommended && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-dts-purple text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        💎 BEST VALUE
                      </div>
                    </div>
                  )}

                  {/* Gradient Background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={cn(
                      "absolute inset-0",
                      ad.popular 
                        ? "bg-gradient-to-br from-dts-cyan to-blue-500" 
                        : ad.recommended
                        ? "bg-gradient-to-br from-dts-purple to-purple-600"
                        : "bg-gradient-to-br from-foreground/10 to-foreground/5"
                    )}></div>
                  </div>
                  
                  <div className="relative p-3 sm:p-4 lg:p-6">
                    {/* Video Icon - Compact */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className={cn(
                        "p-2 sm:p-2.5 lg:p-3 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110",
                        ad.popular 
                          ? "bg-gradient-to-br from-dts-cyan to-blue-500" 
                          : ad.recommended
                          ? "bg-gradient-to-br from-dts-purple to-purple-600"
                          : "bg-dts-blue-light"
                      )}>
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                      </div>
                    </div>

                    {/* Duration - Compact */}
                    <div className="text-center mb-2 sm:mb-3">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{ad.duration}</div>
                      <div className="text-[10px] sm:text-xs text-foreground/60 hidden sm:block">{ad.description}</div>
                    </div>
                    
                    {/* Price - Compact */}
                    <div className="text-center mb-3 sm:mb-4 lg:mb-5">
                      <div className="text-[10px] sm:text-xs text-foreground/50 mb-0.5">Up to</div>
                      <div className={cn(
                        "text-sm sm:text-base lg:text-xl font-bold",
                        ad.popular 
                          ? "text-dts-cyan" 
                          : ad.recommended
                          ? "text-dts-purple"
                          : "text-foreground"
                      )}>
                        ₹{ad.price}
                      </div>
                    </div>

                    {/* CTA Button - Mobile Optimized */}
                    <GradientButton 
                      className="w-full font-semibold text-[10px] sm:text-xs lg:text-sm py-1.5 sm:py-2" 
                      size="sm"
                      gradientDirection={ad.popular || ad.recommended ? "diagonal" : "horizontal"}
                      intensity={ad.popular || ad.recommended ? "strong" : "default"}
                      highContrast={true}
                    >
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-2" />
                      Order
                    </GradientButton>
                  </div>
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
                        <Twitter size={10} className="mr-1 sm:w-3 sm:h-3" />
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

        {/* 3. Website Package Comparison */}
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

export default Pricing;