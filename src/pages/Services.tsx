
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Palette, Globe, Code, Database, Cpu, Users, Video, Play, 
  ArrowRight, Check, Star, Clock, DollarSign, Smartphone, Shield, 
  Megaphone, Image, FileText, Monitor, Search, Camera, Edit3,
  Zap, Bot, Brain, Lock, BarChart3, Target, MessageCircle, Rocket
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Services = () => {
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

  const services = [
    {
      id: "level-1-branding",
      level: "Level 1",
      title: "Branding & Design",
      subtitle: "Your First Step to Professional Business Identity",
      description: "Think of this as getting your business dressed up professionally. Just like you wear nice clothes for important meetings, your business needs to look professional to attract customers.",
      whatIsIt: "Visual design services that make your business look trustworthy and memorable to customers.",
      whoNeedsIt: "New businesses, existing businesses that look unprofessional, anyone starting fresh.",
      services: [
        { 
          icon: <Image size={20} />, 
          name: "Logo with Tagline", 
          description: "A symbol that represents your business + a short memorable phrase",
          details: "Like Nike's swoosh + 'Just Do It'. Your logo appears everywhere - business cards, websites, products. The tagline helps people remember what you do.",
          example: "A restaurant might get a fork & spoon logo + 'Taste the Difference'"
        },
        { 
          icon: <FileText size={20} />, 
          name: "Visiting Card Design", 
          description: "Professional business cards that make great first impressions",
          details: "Small cards with your name, phone number, and business details. When you meet someone, you give them this card so they remember you and can contact you later.",
          example: "Instead of writing your number on paper, you hand them a beautiful card"
        },
        { 
          icon: <Monitor size={20} />, 
          name: "Banner Design", 
          description: "Eye-catching banners for shops, events, or online use",
          details: "Large displays that announce your business, sales, or events. Can be printed for physical locations or used online on websites and social media.",
          example: "A 'Grand Opening Sale' banner outside your new shop"
        },
        { 
          icon: <Edit3 size={20} />, 
          name: "Poster Design", 
          description: "Attractive posters for marketing your products or events",
          details: "Visual advertisements that tell people about your products, services, or special offers. Can be printed or shared online.",
          example: "A poster advertising your bakery's special Diwali sweets"
        },
        { 
          icon: <FileText size={20} />, 
          name: "Brochure Design", 
          description: "Detailed pamphlets explaining your business offerings",
          details: "Folded papers with multiple pages showing all your services, prices, and contact details. Customers can take them home and read later.",
          example: "A tri-fold brochure for a real estate agent showing available properties"
        }
      ],
      icon: <Palette size={24} />,
      color: "from-pink-500 to-orange-400",
      bgColor: "bg-pink-500/10"
    },
    {
      id: "level-2-website",
      level: "Level 2",
      title: "Website & Digital Marketing",
      subtitle: "Get Found Online & Attract More Customers",
      description: "This is like opening a shop on the internet where people can find you 24/7. Plus, we help more people discover your shop through smart marketing.",
      whatIsIt: "A professional website + online marketing to bring customers to your business.",
      whoNeedsIt: "Businesses ready to sell online, those wanting more customers, professionals needing credibility.",
      services: [
        { 
          icon: <Monitor size={20} />, 
          name: "Basic Website", 
          description: "5-page professional website with all essential information",
          details: "Home page, About page, Services, Contact, and one more page. Looks good on phones and computers. Includes contact form so customers can reach you easily.",
          example: "A doctor's website with appointment booking, services offered, and clinic information"
        },
        { 
          icon: <Globe size={20} />, 
          name: "Standard Website", 
          description: "10-page website with admin panel to update content yourself",
          details: "More pages for detailed information. You get a simple dashboard where you can add new content, update prices, or change text without calling us every time.",
          example: "A restaurant website where owner can update daily menu and special offers"
        },
        { 
          icon: <Smartphone size={20} />, 
          name: "Advanced Website", 
          description: "Full e-commerce website where customers can buy online",
          details: "Online shop with payment system, customer accounts, order tracking, and inventory management. Customers can browse, add to cart, and pay online.",
          example: "A clothing store where customers can order clothes and pay online"
        },
        { 
          icon: <Search size={20} />, 
          name: "SEO Posts", 
          description: "Articles that help your website appear in Google searches",
          details: "We write helpful articles related to your business and post them on your website. This makes Google show your website when people search for your services.",
          example: "For a gym: 'Best Home Exercises for Weight Loss' article brings people searching for fitness"
        },
        { 
          icon: <Video size={20} />, 
          name: "SEO Reels", 
          description: "Short videos that make your business popular on social media",
          details: "Professional short videos showing your products or services. These videos are designed to go viral and bring lots of people to your business.",
          example: "A baker's reel showing cake decoration process - gets thousands of views"
        },
        { 
          icon: <Target size={20} />, 
          name: "Digital Marketing Campaigns", 
          description: "Complete online marketing to bring more customers",
          details: "We advertise your business on Google, Facebook, Instagram, and other platforms. Track how many people see your ads and become customers.",
          example: "Running ads for a car service center to people searching for car repair nearby"
        }
      ],
      icon: <Globe size={24} />,
      color: "from-dts-cyan to-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "level-3-software",
      level: "Level 3",
      title: "Software & App Development",
      subtitle: "Custom Digital Solutions for Your Unique Business Needs",
      description: "Like hiring a carpenter to build custom furniture, we build custom software that fits your exact business needs. No more forcing your business to fit into generic software.",
      whatIsIt: "Tailor-made software and mobile apps designed specifically for your business processes.",
      whoNeedsIt: "Growing businesses with unique needs, companies wanting competitive advantage, businesses tired of generic software.",
      services: [
        { 
          icon: <Code size={20} />, 
          name: "Custom Software Development", 
          description: "Software built exactly for your business processes",
          details: "We create software that works exactly how your business works. Handles your specific requirements that generic software can't solve. Runs on computers and can be accessed by your team.",
          example: "A school management system that handles admissions, fees, attendance, and report cards - designed specifically for your school's rules"
        },
        { 
          icon: <Smartphone size={20} />, 
          name: "Mobile App Development", 
          description: "Apps for Android and iPhone that your customers can download",
          details: "Mobile applications that customers download from Google Play Store or Apple App Store. Can send notifications, work offline, and provide easy access to your services.",
          example: "A food delivery app for your restaurant where customers can order, track delivery, and pay through their phone"
        },
        { 
          icon: <Database size={20} />, 
          name: "System Integration", 
          description: "Connect all your different software systems to work together",
          details: "Make your accounting software, inventory system, and customer database talk to each other automatically. No more entering same data multiple times.",
          example: "When someone buys from your online store, it automatically updates inventory and sends data to accounting software"
        },
        { 
          icon: <Shield size={20} />, 
          name: "Cloud Solutions", 
          description: "Store your data safely on the internet so you can access it anywhere",
          details: "Your software and data live on secure internet servers. Access from any device, anywhere. Automatic backups ensure you never lose important information.",
          example: "Access your business data from office, home, or while traveling - everything stays synchronized"
        }
      ],
      icon: <Code size={24} />,
      color: "from-dts-purple to-indigo-600",
      bgColor: "bg-purple-500/10"
    },
    {
      id: "level-4-data-security",
      level: "Level 4",
      title: "Data Science & Cybersecurity",
      subtitle: "Turn Your Data into Insights & Protect Your Digital Assets",
      description: "Like having a detective analyze clues to solve mysteries, we analyze your business data to reveal hidden opportunities. Plus, we protect your business like a digital security guard.",
      whatIsIt: "Advanced analysis of your business data + protection from online threats and hackers.",
      whoNeedsIt: "Data-rich businesses, companies handling sensitive information, businesses wanting to predict future trends.",
      services: [
        { 
          icon: <BarChart3 size={20} />, 
          name: "Data Analysis", 
          description: "Discover hidden patterns and insights in your business data",
          details: "We examine your sales records, customer data, and other business information to find trends you missed. Identify your best customers, peak sales times, and growth opportunities.",
          example: "Analyzing a retail store's data reveals that customers who buy shoes also buy socks 80% of the time - leading to better product placement"
        },
        { 
          icon: <Brain size={20} />, 
          name: "Predictive Modeling", 
          description: "Predict future trends and customer behavior using AI",
          details: "Using your historical data, we build models that predict what will happen in the future. Forecast sales, identify customers likely to leave, or predict equipment failures.",
          example: "Predicting which customers are likely to stop buying so you can offer them special deals to retain them"
        },
        { 
          icon: <Lock size={20} />, 
          name: "Cybersecurity Assessment", 
          description: "Check how safe your business is from hackers and cyber attacks",
          details: "We examine your computers, networks, and online systems to find weaknesses that hackers could exploit. Provide detailed report with fixes to make you safer.",
          example: "Discovering that employee passwords are weak and fixing it before hackers can break in"
        },
        { 
          icon: <Shield size={20} />, 
          name: "Security Implementation", 
          description: "Install advanced protection systems for your digital assets",
          details: "Set up firewalls, antivirus systems, secure backups, and employee training to protect against cyber threats. Monitor for suspicious activities 24/7.",
          example: "Installing systems that automatically detect and block suspicious login attempts"
        }
      ],
      icon: <Database size={24} />,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10"
    },
    {
      id: "level-5-ai-automation",
      level: "Level 5",
      title: "AI Automation & Chatbots",
      subtitle: "Artificial Intelligence Working 24/7 for Your Business",
      description: "Like having a super-smart robot employee that never sleeps, never takes breaks, and can handle thousands of customers simultaneously while learning and getting better every day.",
      whatIsIt: "Smart computer systems that can think, learn, and handle business tasks automatically.",
      whoNeedsIt: "Businesses wanting to scale without hiring more people, companies with repetitive tasks, businesses needing 24/7 customer support.",
      services: [
        { 
          icon: <Zap size={20} />, 
          name: "AI Process Automation", 
          description: "Smart systems that handle repetitive business tasks automatically",
          details: "AI that can read emails, process orders, generate reports, and handle routine tasks that humans currently do manually. Works 24/7 without errors or breaks.",
          example: "AI system that reads incoming customer emails, categorizes them, and responds appropriately - like a super-efficient virtual assistant"
        },
        { 
          icon: <Bot size={20} />, 
          name: "AI Agent Development", 
          description: "Intelligent virtual employees that can handle complex business decisions",
          details: "Advanced AI systems that can make decisions, solve problems, and handle complex business scenarios. Can learn from experience and get better over time.",
          example: "An AI agent for a travel company that can plan complete trips, handle bookings, manage cancellations, and provide personalized recommendations"
        },
        { 
          icon: <MessageCircle size={20} />, 
          name: "Chatbot Integration", 
          description: "Smart chat systems that talk to customers like a human would",
          details: "AI-powered chat systems for your website, WhatsApp, or Facebook that can answer questions, take orders, and help customers 24/7. Understands natural language and context.",
          example: "A restaurant chatbot that takes orders, explains menu items, handles dietary restrictions, and processes payments through WhatsApp"
        },
        { 
          icon: <Brain size={20} />, 
          name: "Custom AI Solutions", 
          description: "Specialized AI systems designed for your unique business challenges",
          details: "AI solutions built specifically for your industry and business needs. Could be image recognition, voice processing, recommendation systems, or any other AI application.",
          example: "AI system for a medical clinic that can analyze X-rays and highlight potential issues for doctors to review"
        }
      ],
      icon: <Cpu size={24} />,
      color: "from-violet-600 to-fuchsia-500",
      bgColor: "bg-violet-500/10"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Services</span></h1>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto">
              Complete digital solutions explained in simple terms. Whether you're just starting or scaling up, 
              we have the perfect service level for your needs and budget.
            </p>
          </motion.div>

          <motion.div
            className="space-y-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((serviceLevel, index) => (
              <motion.div 
                key={serviceLevel.id} 
                id={serviceLevel.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Service Level Header */}
                <div className={cn(
                  "p-8 rounded-2xl relative overflow-hidden border border-foreground/10 backdrop-blur-sm mb-8",
                  serviceLevel.bgColor
                )}>
                  <div className={`absolute top-0 left-0 h-full w-2 bg-gradient-to-b ${serviceLevel.color}`}></div>
                  
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-dts-blue-light p-3 rounded-lg mr-4">
                          {serviceLevel.icon}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground/60">{serviceLevel.level}</span>
                          <h2 className="text-2xl md:text-3xl font-bold">{serviceLevel.title}</h2>
                          <p className="text-lg font-medium text-foreground/80 mt-1">{serviceLevel.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-foreground/70 mb-6 text-lg leading-relaxed">{serviceLevel.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-background/20 border border-foreground/10">
                        <h4 className="font-semibold mb-2 text-dts-cyan">What is this?</h4>
                        <p className="text-sm text-foreground/80">{serviceLevel.whatIsIt}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/20 border border-foreground/10">
                        <h4 className="font-semibold mb-2 text-dts-purple">Who needs this?</h4>
                        <p className="text-sm text-foreground/80">{serviceLevel.whoNeedsIt}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Services */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {serviceLevel.services.map((service, idx) => (
                    <motion.div
                      key={idx}
                      className="p-6 rounded-xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-dts-blue-light p-2.5 rounded-lg mr-4 flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                          <p className="text-foreground/80 text-sm mb-3">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-background/10">
                          <h4 className="font-medium text-sm mb-2 text-foreground">How it works:</h4>
                          <p className="text-xs text-foreground/70 leading-relaxed">{service.details}</p>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-background/10">
                          <h4 className="font-medium text-sm mb-2 text-foreground">Real example:</h4>
                          <p className="text-xs text-foreground/70 leading-relaxed italic">{service.example}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-foreground/10">
                        <Link to="/pricing">
                          <GradientButton size="sm" className="w-full">
                            View Pricing
                            <ArrowRight size={14} className="ml-2" />
                          </GradientButton>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            className="mt-20 p-8 rounded-2xl bg-dts-blue-dark/40 backdrop-blur-sm border border-foreground/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Our Approach?</h2>
              <p className="text-foreground/70 max-w-3xl mx-auto">
                We believe in transparency and education. Every service is explained in simple terms 
                so you know exactly what you're getting and how it benefits your business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Clear Pricing</h3>
                <p className="text-sm text-foreground/70">No hidden costs. You know exactly what you pay before we start.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Quick Delivery</h3>
                <p className="text-sm text-foreground/70">Fast turnaround times without compromising on quality.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-sm text-foreground/70">Professional results that help your business grow.</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Not sure which level is right for you? Contact us for a free consultation. 
              We'll help you choose the perfect services for your business needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <GradientButton size="lg">
                  Get Free Consultation
                  <ArrowRight size={16} className="ml-2" />
                </GradientButton>
              </Link>
              <Link to="/pricing">
                <GradientButton variant="outline" size="lg">
                  View All Pricing
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
