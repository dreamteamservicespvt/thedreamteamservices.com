import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButtonAbout from "@/components/ui/FloatingWhatsAppButtonAbout";
import TeamSection from "@/components/home/TeamSection";
import { motion } from "framer-motion";
import { 
  Users, Target, Award, Lightbulb, Rocket, Globe,
  Code, Smartphone, Shield, Database, Megaphone, Cpu,
  ArrowRight, CheckCircle, Zap, Heart, Star, Palette
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import SectionHeading from "@/components/ui/section-heading";
import SEO from "@/components/SEO";
import { organizationSchema, breadcrumbSchema } from "@/lib/schema";

const About = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Breadcrumb schema for About page
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "https://dreamteamservices.com" },
    { name: "About Us", url: "https://dreamteamservices.com/about" }
  ]);

  // Combined schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
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

  const values = [
    {
      icon: <Target size={32} />,
      title: "Excellence",
      description: "We strive for perfection in every project, delivering solutions that exceed expectations and drive real results."
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description: "We work closely with our clients as partners, fostering open communication and shared success."
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative approaches to solve complex challenges."
    },
    {
      icon: <Heart size={32} />,
      title: "Integrity",
      description: "We build trust through transparency, reliability, and ethical business practices in everything we do."
    }
  ];

  const achievements = [
    { number: "50+", label: "Successful Projects" },
    { number: "25+", label: "Happy Clients" },
    { number: "5", label: "Service Levels" },
    { number: "24/7", label: "Support Available" }
  ];

  const services = [
    {
      level: "Level 1",
      title: "Branding & Design",
      description: "Professional visual identity and marketing materials that make your brand memorable and trustworthy",
      services: ["Logo with Tagline", "Visiting Card Design", "Banner & Poster Design", "Brochure Design", "Brand Guidelines"],
      icon: <Palette size={24} />,
      color: "from-pink-500 to-orange-400"
    },
    {
      level: "Level 2", 
      title: "Website & Digital Marketing",
      description: "Complete online presence with professional websites and strategic marketing to attract and convert customers",
      services: ["Responsive Website Development", "SEO Content Creation", "Social Media Marketing", "Digital Ad Campaigns", "Analytics & Reporting"],
      icon: <Globe size={24} />,
      color: "from-dts-cyan to-blue-500"
    },
    {
      level: "Level 3",
      title: "Software & App Development",
      description: "Custom software solutions and mobile applications that streamline your business operations and enhance customer experience",
      services: ["Custom Software Development", "Mobile App Creation", "System Integration", "Database Design", "Cloud Solutions"],
      icon: <Code size={24} />,
      color: "from-dts-purple to-indigo-600"
    },
    {
      level: "Level 4",
      title: "Data Science & Cybersecurity",
      description: "Advanced data insights and comprehensive security measures to protect your business and make data-driven decisions",
      services: ["Data Analysis & Insights", "Predictive Modeling", "Cybersecurity Assessment", "Threat Protection", "Compliance Solutions"],
      icon: <Database size={24} />,
      color: "from-emerald-500 to-green-600"
    },
    {
      level: "Level 5",
      title: "AI Automation & Chatbots",
      description: "Cutting-edge AI solutions that automate processes and provide 24/7 intelligent customer support",
      services: ["AI Process Automation", "Intelligent Chatbots", "Machine Learning Models", "Natural Language Processing", "Automated Workflows"],
      icon: <Cpu size={24} />,
      color: "from-violet-600 to-fuchsia-500"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award size={24} />,
      title: "Proven Track Record",
      description: "Years of experience delivering successful projects across various industries"
    },
    {
      icon: <Zap size={24} />,
      title: "Fast Delivery",
      description: "Efficient project management ensures timely delivery without compromising quality"
    },
    {
      icon: <Star size={24} />,
      title: "Premium Quality",
      description: "We maintain the highest standards in development, design, and customer service"
    },
    {
      icon: <Users size={24} />,
      title: "Expert Team",
      description: "Our skilled professionals bring diverse expertise to every project"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="About Us | Dream Team Services - Leading Digital Solutions Provider in Kakinada"
        description="Learn about Dream Team Services, a leading digital solutions provider in Kakinada, Andhra Pradesh. We specialize in AI commercial ads, digital marketing, social media management, website development, and custom software solutions. Meet our expert team and discover our mission to transform businesses through technology."
        keywords="about Dream Team Services, digital agency Kakinada, tech company Andhra Pradesh, AI solutions provider, software development company, digital transformation experts, web development team, marketing agency India"
        url="/about"
        schema={combinedSchema}
      />
      <Navbar />
      <main className="flex-grow pt-20 sm:pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="mobile-container mobile-section">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="mobile-heading-1 mb-4">
                About
              </h1>
              <div className="flex justify-center mb-4 sm:mb-6">
                <Logo size="xl" className="h-16 sm:h-20 md:h-24" />
              </div>
            </div>
            <p className="mobile-text-body max-w-4xl mx-auto leading-relaxed">
              We are a dedicated team of digital innovators, committed to transforming businesses 
              through cutting-edge technology solutions. From web development to AI integration, 
              we deliver excellence at every level.
            </p>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="relative mobile-container mobile-section overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/5 via-transparent to-dts-cyan/5 pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-dts-purple"></div>
                  <Rocket className="h-6 w-6 text-dts-purple" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-dts-purple"></div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                  <span className="gradient-text">Our Story</span>
                </h2>
                <p className="text-xl md:text-2xl text-dts-cyan font-medium">From Vision to Reality</p>
              </motion.div>
            </div>

            {/* Content Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
            >
              {/* Story Content */}
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Card 1 */}
                <div className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-dts-blue-dark/60 to-dts-blue-dark/40 backdrop-blur-xl border border-dts-purple/20 hover:border-dts-purple/40 transition-all duration-500 hover:shadow-2xl hover:shadow-dts-purple/10">
                  <div className="absolute -top-3 -left-3 w-24 h-24 bg-gradient-to-br from-dts-purple/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-dts-purple to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">The Beginning</h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-dts-purple to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      <strong className="text-dts-cyan">Dream Team Services</strong> was born from a simple observation: 
                      small businesses and startups often struggle to access high-quality digital services that fit their budget. 
                      We saw talented entrepreneurs with amazing ideas who couldn't afford expensive agencies, while having 
                      great concepts that deserved professional execution.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-dts-blue-dark/60 to-dts-blue-dark/40 backdrop-blur-xl border border-dts-cyan/20 hover:border-dts-cyan/40 transition-all duration-500 hover:shadow-2xl hover:shadow-dts-cyan/10">
                  <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-dts-cyan/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-dts-cyan to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Our Solution</h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-dts-cyan to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      Our founders, experienced in technology and business, decided to bridge this gap. We created a unique 
                      <strong className="text-dts-purple"> five-level service structure</strong> that allows any business - 
                      from a local shop needing a logo to a growing company requiring AI integration - to find exactly what 
                      they need with transparent, accessible solutions.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-dts-blue-dark/60 to-dts-blue-dark/40 backdrop-blur-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
                  <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Today & Beyond</h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      Today, we're proud to have helped <strong className="text-green-400">50+ businesses</strong> transform 
                      their digital presence. From simple logo designs to complex AI-powered applications, we've proven that 
                      quality digital services should be accessible to everyone, not just big corporations.
                    </p>
                    <div className="flex items-start gap-3 p-4 bg-dts-purple/10 border border-dts-purple/20 rounded-xl">
                      <Heart className="h-5 w-5 text-dts-purple flex-shrink-0 mt-0.5" />
                      <p className="text-sm italic text-foreground/90 leading-relaxed">
                        "We don't just provide services - we become your <strong className="text-dts-cyan">technology partner</strong>, 
                        growing with you as your business expands."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats & Visual Element */}
              <motion.div variants={itemVariants} className="lg:sticky lg:top-24 space-y-6">
                {/* Achievements Card */}
                <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-dts-purple/20 via-dts-blue-dark/60 to-dts-cyan/20 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dts-purple/30 via-transparent to-dts-cyan/30 opacity-50"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-dts-purple/30 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-dts-cyan/30 rounded-full blur-3xl"></div>
                  
                  {/* Side Gradient Bar */}
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-dts-purple via-dts-cyan to-green-500"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-dts-purple to-dts-cyan rounded-2xl mb-4 shadow-lg">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold gradient-text mb-2">Our Impact</h3>
                      <p className="text-sm text-foreground/60">Numbers that speak for themselves</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="group text-center p-6 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-white/5 hover:border-dts-purple/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-dts-purple/20"
                        >
                          <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                            {achievement.number}
                          </div>
                          <div className="text-sm font-medium text-foreground/70 group-hover:text-foreground/90 transition-colors">
                            {achievement.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-dts-blue-dark/40 to-dts-blue-dark/20 backdrop-blur-sm border border-white/10">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span>Quick Facts</span>
                  </h4>
                  <div className="space-y-3">
                    {[
                      { icon: Globe, text: "Based in Kakinada, Serving India" },
                      { icon: Users, text: "Expert Multi-Disciplinary Team" },
                      { icon: Shield, text: "100% Client Satisfaction" },
                      { icon: Rocket, text: "Future-Ready Solutions" }
                    ].map((fact, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                        <div className="w-8 h-8 bg-dts-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <fact.icon className="h-4 w-4 text-dts-purple" />
                        </div>
                        <span>{fact.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-dts-purple to-pink-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 mr-4 text-dts-purple" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  <strong>To make professional digital services accessible to everyone.</strong> We believe that every 
                  business, regardless of size or budget, deserves access to high-quality technology solutions. 
                  Our mission is to democratize digital transformation by offering world-class services at transparent, 
                  affordable prices. We're committed to helping businesses grow by providing them with the same level 
                  of digital excellence that was once only available to large corporations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-dts-cyan to-blue-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Rocket className="h-8 w-8 mr-4 text-dts-cyan" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  <strong>To become India's most trusted digital transformation partner.</strong> We envision a future 
                  where geographical location and business size never limit access to cutting-edge technology. Our goal 
                  is to create a network of successful businesses that have grown with our support, from local startups 
                  in Kakinada to enterprises across India. We want to be known as the team that turns digital dreams 
                  into profitable realities.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Core Values Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionHeading 
              title="Core Values"
              subtitle="What Drives Us"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-dts-blue-dark/20 backdrop-blur-sm border border-foreground/5 hover:border-foreground/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-dts-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-dts-purple">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-foreground/70 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Services Overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionHeading 
              title="Our Service Levels"
              subtitle="Comprehensive Solutions"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 h-full w-2 bg-gradient-to-b ${service.color}`}></div>
                
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-dts-blue-light p-3 rounded-lg mr-4">
                        {service.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground/60">{service.level}</span>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-4">{service.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Services Include:</h4>
                    <ul className="space-y-2">
                      {service.services.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle size={16} className="mr-2 text-green-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionHeading 
              title="Why Choose Us"
              subtitle="Your Success is Our Priority"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-3 md:p-6 rounded-xl bg-background/10 border border-foreground/5 hover:border-foreground/10 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-dts-cyan/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <div className="text-dts-cyan">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2 md:mb-3 leading-tight">{item.title}</h3>
                <p className="text-foreground/70 text-xs md:text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Team Section */}
        <TeamSection />

        {/* Call to Action Section */}
        <section className="py-16 bg-dts-blue-dark/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
                Let's discuss how Dream Team Services can help you achieve your digital goals. 
                From concept to completion, we're here to turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <GradientButton className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight size={16} className="ml-2" />
                  </GradientButton>
                </Link>
                <Link to="/services">
                  <GradientButton variant="outline" className="w-full sm:w-auto">
                    Explore Our Services
                  </GradientButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButtonAbout />
    </div>
  );
};

export default About;
