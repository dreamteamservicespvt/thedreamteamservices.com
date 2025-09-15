import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Users, Target, Award, Lightbulb, Rocket, Globe,
  Code, Smartphone, Shield, Database, Megaphone, Cpu,
  ArrowRight, CheckCircle, Zap, Heart, Star
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { Link } from "react-router-dom";
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
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "3", label: "Service Levels" },
    { number: "24/7", label: "Support Available" }
  ];

  const services = [
    {
      level: "Level 1",
      title: "Web Development & Digital Marketing",
      description: "Creating stunning websites and implementing powerful digital marketing strategies",
      services: ["Custom Web Development", "Responsive Design", "SEO Optimization", "Social Media Marketing", "Content Strategy"],
      icon: <Globe size={24} />,
      color: "from-blue-500 to-cyan-400"
    },
    {
      level: "Level 2", 
      title: "Software & Mobile App Development",
      description: "Building robust software solutions and mobile applications for modern businesses",
      services: ["Custom Software Development", "Mobile App Development", "API Integration", "Database Design", "Cloud Solutions"],
      icon: <Smartphone size={24} />,
      color: "from-purple-500 to-pink-500"
    },
    {
      level: "Level 3",
      title: "AI Solutions & Cybersecurity",
      description: "Advanced AI-driven solutions and comprehensive security measures for enterprise-level protection",
      services: ["AI & Machine Learning", "Cybersecurity Solutions", "Data Analytics", "Automation Systems", "Security Audits"],
      icon: <Shield size={24} />,
      color: "from-dts-purple to-indigo-600"
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
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Dream Team Services</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              We are a dedicated team of digital innovators, committed to transforming businesses 
              through cutting-edge technology solutions. From web development to AI integration, 
              we deliver excellence at every level.
            </p>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <SectionHeading 
                title="Our Story"
                subtitle="Journey of Innovation"
                className="text-left"
              />
              <div className="space-y-6 text-foreground/80">
                <p className="text-lg leading-relaxed">
                  Dream Team Services was founded with a simple yet powerful vision: to bridge the gap 
                  between cutting-edge technology and practical business solutions. We recognized that 
                  many businesses struggle to keep pace with rapidly evolving digital landscapes.
                </p>
                <p className="text-lg leading-relaxed">
                  Our journey began with a small team of passionate developers and designers who shared 
                  a common goal - to make advanced technology accessible and affordable for businesses 
                  of all sizes. Today, we've grown into a comprehensive digital solutions provider.
                </p>
                <p className="text-lg leading-relaxed">
                  What sets us apart is our unique three-level service approach, allowing us to scale 
                  our solutions according to each client's specific needs and budget, ensuring everyone 
                  gets the perfect fit for their requirements.
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
                  To empower businesses with innovative digital solutions that drive growth, 
                  enhance efficiency, and create lasting competitive advantages. We strive to 
                  make advanced technology accessible and affordable for organizations of all sizes, 
                  fostering digital transformation that delivers measurable results.
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
                  To become the leading digital transformation partner, recognized for our 
                  innovative solutions, exceptional service, and commitment to client success. 
                  We envision a future where every business, regardless of size, has access to 
                  world-class technology solutions that propel them toward unprecedented growth.
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
    </div>
  );
};

export default About;
