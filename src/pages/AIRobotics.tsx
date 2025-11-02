import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Bot, Cpu, Brain, Zap, Rocket, Dog, Plane, Cog, 
  Check, ArrowRight, ChevronRight, Sparkles, Target,
  Shield, Clock, Users, TrendingUp, CheckCircle2,
  Code, Settings, Radio, Eye, Workflow
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { breadcrumbSchema } from "@/lib/schema";

const AIRobotics = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Breadcrumb schema for AI & Robotics page
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "https://dreamteamservices.com" },
    { name: "Services", url: "https://dreamteamservices.com/services" },
    { name: "AI & Robotics", url: "https://dreamteamservices.com/ai-robotics" }
  ]);

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

  // Main AI & Robotics Services
  const services = [
    {
      id: "ai-agents",
      title: "AI Agents for Business",
      description: "Intelligent AI assistants that understand your business and work 24/7 to boost productivity and customer satisfaction.",
      icon: <Bot className="w-8 h-8" />,
      gradient: "from-violet-500 to-purple-600",
      features: [
        "Custom AI Assistants",
        "Automated Customer Support",
        "Intelligent Task Management",
        "Natural Language Processing",
        "Multi-platform Integration",
        "24/7 Autonomous Operation"
      ],
      benefits: [
        "Reduce response time by 90%",
        "Handle unlimited conversations",
        "Learn from interactions",
        "Scale without hiring"
      ]
    },
    {
      id: "ai-automation",
      title: "AI Automation Solutions",
      description: "Transform your business processes with intelligent automation that learns, adapts, and optimizes your workflows automatically.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-cyan-500 to-blue-600",
      features: [
        "Process Optimization",
        "Predictive Analytics",
        "Smart Decision Systems",
        "Workflow Automation",
        "Data-Driven Insights",
        "Continuous Learning"
      ],
      benefits: [
        "Save 40+ hours per week",
        "Eliminate repetitive tasks",
        "Improve accuracy to 99%+",
        "Real-time optimization"
      ]
    },
    {
      id: "robo-dog",
      title: "Robo Dog Development",
      description: "Advanced quadruped robots with autonomous navigation, security capabilities, and custom behavior programming for various applications.",
      icon: <Dog className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-600",
      features: [
        "Autonomous Navigation",
        "Security & Surveillance",
        "Custom Behavior Programming",
        "Obstacle Avoidance",
        "Remote Control & Monitoring",
        "AI-Powered Decision Making"
      ],
      benefits: [
        "24/7 security coverage",
        "Navigate complex terrain",
        "Reduce security costs",
        "Real-time monitoring"
      ]
    },
    {
      id: "drones",
      title: "Drone Systems",
      description: "Cutting-edge drone solutions with autonomous flight, AI-powered navigation, and custom applications for various industries.",
      icon: <Plane className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        "Autonomous Flight Systems",
        "Aerial Photography/Videography",
        "Inspection & Monitoring",
        "AI Object Detection",
        "Custom Payload Integration",
        "Real-time Data Transmission"
      ],
      benefits: [
        "Cover large areas quickly",
        "Access hard-to-reach spots",
        "Reduce inspection costs",
        "High-resolution data capture"
      ]
    },
    {
      id: "custom-robotics",
      title: "Custom Robotics Solutions",
      description: "End-to-end custom robotics development from concept to deployment, including hardware, software, and AI integration.",
      icon: <Cog className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-600",
      features: [
        "Industrial Automation",
        "IoT Integration",
        "Custom Hardware + Software",
        "Robot Training & Deployment",
        "Sensor Fusion",
        "Computer Vision Systems"
      ],
      benefits: [
        "Tailored to your needs",
        "Full-stack solution",
        "Ongoing support",
        "Future-proof technology"
      ]
    }
  ];

  // Process Steps
  const processSteps = [
    {
      number: "01",
      title: "Train",
      description: "We train your robot with advanced AI algorithms, teaching it to understand and perform tasks specific to your needs.",
      icon: <Brain className="w-6 h-6" />,
      color: "from-violet-500 to-purple-600"
    },
    {
      number: "02",
      title: "Test",
      description: "Rigorous testing in simulated and real environments ensures reliability, safety, and optimal performance.",
      icon: <Target className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      number: "03",
      title: "Deploy",
      description: "Seamless deployment with complete integration into your existing systems and workflows.",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      number: "04",
      title: "Support",
      description: "Ongoing monitoring, updates, and support to ensure your robotics solution continues to perform at its best.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  // Technology Stack
  const techStack = [
    { name: "ROS/ROS2", icon: <Cpu className="w-5 h-5" /> },
    { name: "TensorFlow", icon: <Brain className="w-5 h-5" /> },
    { name: "PyTorch", icon: <Zap className="w-5 h-5" /> },
    { name: "OpenCV", icon: <Eye className="w-5 h-5" /> },
    { name: "SLAM", icon: <Radio className="w-5 h-5" /> },
    { name: "Computer Vision", icon: <Eye className="w-5 h-5" /> },
    { name: "Machine Learning", icon: <Brain className="w-5 h-5" /> },
    { name: "IoT Integration", icon: <Workflow className="w-5 h-5" /> }
  ];

  // Why Choose Us
  const whyChooseUs = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "End-to-End Solutions",
      description: "From concept to deployment, we handle every aspect of your robotics project."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Turnaround",
      description: "Efficient development process gets your solution to market quickly."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Proven Reliability",
      description: "Rigorous testing ensures your robots perform flawlessly in real-world conditions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "Specialized engineers with deep expertise in AI, robotics, and automation."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scalable Solutions",
      description: "Built to grow with your business and adapt to changing needs."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Ongoing Support",
      description: "Continuous maintenance, updates, and optimization for peak performance."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="AI & Robotics Services | Custom Robot Software Development - Dream Team Services"
        description="Custom robotics software solutions from training to deployment. AI Agents, AI Automation, Robo Dog, Drones, and Custom Robotics. Fully managed end-to-end service. Sit back and relax while we handle everything."
        keywords="AI robotics, custom robot software, AI agents, AI automation, robo dog, drone systems, custom robotics, robot training, robot deployment, autonomous robots, industrial automation, AI development, Kakinada"
        url="/ai-robotics"
        schema={breadcrumb}
      />
      <Navbar />
      
      <main className="flex-grow pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">AI & Robotics Solutions</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Custom Software for Your
              <span className="block mt-2 bg-gradient-to-r from-violet-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Robots & AI Systems
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-8 leading-relaxed">
              From training to deployment, we handle <span className="text-violet-400 font-semibold">everything</span>.
              <span className="block mt-2">Sit back, relax, and watch your robotics vision come to life.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <GradientButton
                  size="lg"
                  className="text-base sm:text-lg px-8 py-6"
                  gradientDirection="horizontal"
                  highContrast={true}
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </GradientButton>
              </Link>
              <Link to="/portfolio">
                <button className="px-8 py-3 rounded-lg border border-foreground/20 hover:border-foreground/40 transition-colors text-base sm:text-lg font-medium">
                  View Portfolio
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Full-Service Solution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Expert AI Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Proven Track Record</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">AI & Robotics</span> Services
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
              Comprehensive robotics solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative p-6 sm:p-8 rounded-2xl bg-dts-blue-dark/40 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10"
              >
                {/* Gradient Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-4`}>
                  <div className="text-white">{service.icon}</div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground/80 mb-3 uppercase tracking-wide">Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-violet-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-foreground/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="pt-4 border-t border-foreground/10">
                  <h4 className="text-sm font-semibold text-violet-400 mb-3">Key Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link to="/contact">
                  <button className="mt-6 w-full py-3 rounded-lg border border-foreground/20 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span className="font-medium">Get a Quote</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Process Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Complete Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
              We handle everything from start to finish, so you can focus on your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-foreground/20 to-transparent -translate-x-4" />
                )}

                <div className="relative p-6 rounded-xl bg-dts-blue-dark/40 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} mb-4`}>
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 text-violet-400">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link to="/contact">
              <GradientButton
                size="lg"
                className="text-lg px-8 py-6"
                gradientDirection="horizontal"
                highContrast={true}
              >
                Start Your Project <Rocket className="ml-2 w-5 h-5" />
              </GradientButton>
            </Link>
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Dream Team Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
              We're your complete partner for AI and robotics solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-dts-blue-dark/40 border border-foreground/10 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-4">
                  <div className="text-violet-400">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powered by <span className="gradient-text">Cutting-Edge Technology</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              We use industry-leading tools and frameworks to build robust, scalable robotics solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-dts-blue-dark/60 border border-foreground/10 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="text-violet-400">{tech.icon}</div>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/20 via-cyan-600/20 to-purple-600/20 border border-violet-500/30 p-8 sm:p-12 text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how AI and robotics can revolutionize your operations. 
                Get a free consultation today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <GradientButton
                    size="lg"
                    className="text-lg px-8 py-6"
                    gradientDirection="horizontal"
                    highContrast={true}
                  >
                    Schedule Consultation <ArrowRight className="ml-2 w-5 h-5" />
                  </GradientButton>
                </Link>
                <Link to="/services">
                  <button className="px-8 py-3 rounded-lg border border-foreground/30 hover:border-foreground/50 transition-colors text-lg font-medium">
                    Explore All Services
                  </button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Quick Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIRobotics;
