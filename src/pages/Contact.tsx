import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/GradientButton";
import FloatingAnimation from "@/components/ui/FloatingAnimation";
import { createInquiry } from "@/services/inquiryService";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createInquiry(formData);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: "contact@dreamteamservices.com",
      description: "For general inquiries and information"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "+1 (123) 456-7890",
      description: "Mon-Fri from 9am to 6pm EST"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: "123 Innovation Drive, Tech City",
      description: "Schedule an appointment first"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Have questions or want to work with us? We'd love to hear from you.
              Our team is ready to help you transform your digital presence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              className="md:col-span-3 p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Send us a message</motion.h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="bg-background/10 border-foreground/10"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-background/10 border-foreground/10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    className="bg-background/10 border-foreground/10" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project..." 
                    className="bg-background/10 border-foreground/10 min-h-32" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">◌</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="md:col-span-2 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm"
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-dts-blue-light rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <p className="text-dts-purple font-medium mb-1">{item.details}</p>
                      <p className="text-sm text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                variants={itemVariants} 
                className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <FloatingAnimation>
                    <MessageSquare size={120} />
                  </FloatingAnimation>
                </div>
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Clock size={20} className="mr-2 text-dts-purple" />
                  Response Time
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
                <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-dts-purple to-dts-cyan"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-foreground/60">
                  <span>Immediate</span>
                  <span>24 hours</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
