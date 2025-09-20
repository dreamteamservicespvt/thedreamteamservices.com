import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingReviewButton from "@/components/ui/FloatingReviewButton";
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

const About = () => {
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
        <section className="mobile-container mobile-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mobile-grid mobile-grid-2 items-center gap-8 lg:gap-12"
          >
            <motion.div variants={itemVariants}>
              <SectionHeading 
                title="Our Story"
                subtitle="From Vision to Reality"
                className="text-left"
              />
              <div className="space-y-4 sm:space-y-6 text-foreground/80">
                <p className="mobile-text-body leading-relaxed">
                  <strong>Dream Team Services</strong> was born from a simple observation: small businesses and startups 
                  often struggle to access high-quality digital services that fit their budget. We saw talented entrepreneurs 
                  with amazing ideas who couldn't afford the expensive agencies, while having great concepts that deserved 
                  professional execution.
                </p>
                <p className="text-lg leading-relaxed">
                  Our founders, experienced in technology and business, decided to bridge this gap. We created a unique 
                  <strong> five-level service structure</strong> that allows any business - from a local shop needing a logo 
                  to a growing company requiring AI integration - to find exactly what they need with transparent, 
                  accessible solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we're proud to have helped <strong>50+ businesses</strong> transform their digital presence. 
                  From simple logo designs to complex AI-powered applications, we've proven that quality digital services 
                  should be accessible to everyone, not just big corporations.
                </p>
                <p className="text-lg leading-relaxed">
                  <em>We don't just provide services - we become your technology partner, growing with you as your business expands.</em>
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <div className="relative p-8 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10">
                <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-dts-purple to-dts-cyan rounded-l-2xl"></div>
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">{achievement.number}</div>
                      <div className="text-sm text-foreground/70">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-background/10 border border-foreground/5 hover:border-foreground/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-dts-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-dts-cyan">{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

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
      <FloatingReviewButton />
    </div>
  );
};

export default About;
