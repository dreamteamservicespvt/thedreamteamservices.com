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
import ReviewSubmissionForm from "@/components/ui/ReviewSubmissionForm";
import { createInquiry } from "@/services/inquiryService";
import { useToast } from "@/hooks/use-toast";
import "./contact-mobile-optimizations.css";

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
      details: "thedreamteamservicespvt@gmail.com",
      detailsLink: "mailto:thedreamteamservicespvt@gmail.com",
      description: "For general inquiries and information"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "+91 9849834102 / +91 9390011378",
      detailsLink: "tel:+919849834102",
      description: "Mon-Fri from 9am to 6pm IST"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: "50-6-23, vishnalayam street, Jagannaickpur, Kakinada, Andhra Pradesh 533002",
      description: "Schedule an appointment first"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 contact-mobile-container contact-tablet-container">
          <motion.div 
            className="text-center mb-16 contact-hero-mobile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 contact-title-mobile contact-title-mobile-xs">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto contact-subtitle-mobile contact-subtitle-mobile-xs">
              Have questions or want to work with us? We'd love to hear from you.
              Our team is ready to help you transform your digital presence.
            </p>
          </motion.div>

          {/* Updated grid container for mobile responsiveness */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              className="md:col-span-3 p-4 sm:p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm contact-form-mobile contact-form-mobile-xs contact-form-tablet smooth-scroll-mobile"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 contact-form-title-mobile">Send us a message</motion.h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 contact-form-grid-mobile">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium high-contrast-mobile">Your Name</label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="bg-background/10 border-foreground/10 w-full contact-input-mobile touch-target-large-mobile focus-visible-mobile"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium high-contrast-mobile">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-background/10 border-foreground/10 w-full contact-input-mobile touch-target-large-mobile focus-visible-mobile"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium high-contrast-mobile">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    className="bg-background/10 border-foreground/10 contact-input-mobile touch-target-large-mobile focus-visible-mobile" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium high-contrast-mobile">Your Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project..." 
                    className="bg-background/10 border-foreground/10 min-h-32 contact-textarea-mobile focus-visible-mobile" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto contact-submit-mobile touch-target-large-mobile focus-visible-mobile"
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
              className="md:col-span-2 space-y-6 contact-info-mobile"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm contact-info-card-mobile touch-target-mobile"
                >
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-dts-blue-light rounded-lg contact-info-icon-mobile">
                      {item.icon}
                    </div>
                    <div className="contact-info-content-mobile">
                      <h3 className="text-lg font-medium mb-1 contact-info-title-mobile high-contrast-mobile">{item.title}</h3>
                      <p className="text-dts-purple font-medium mb-1 break-all contact-info-details-mobile">
                        {item.detailsLink ? (
                          <a href={item.detailsLink} className="hover:underline transition-colors break-all touch-target-mobile focus-visible-mobile">
                            {item.details}
                          </a>
                        ) : (
                          <span className="break-all">{item.details}</span>
                        )}
                      </p>
                      <p className="text-sm text-foreground/70 contact-info-description-mobile medium-contrast-mobile">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                variants={itemVariants} 
                className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm relative overflow-hidden response-time-mobile"
              >
                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <FloatingAnimation>
                    <MessageSquare size={120} />
                  </FloatingAnimation>
                </div>
                <h3 className="text-lg font-medium mb-2 flex items-center response-time-title-mobile high-contrast-mobile">
                  <Clock size={20} className="mr-2 text-dts-purple" />
                  Response Time
                </h3>
                <p className="text-sm text-foreground/70 mb-4 response-time-text-mobile medium-contrast-mobile">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
                <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-dts-purple to-dts-cyan"></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-foreground/60 low-contrast-mobile">
                  <span>Immediate</span>
                  <span>24 hours</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Review Submission Section */}
        <section id="review-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 review-section-mobile contact-mobile-container contact-tablet-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 review-title-mobile">Share Your <span className="gradient-text">Experience</span></h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto review-subtitle-mobile medium-contrast-mobile">
              Worked with us before? We'd love to hear about your experience! Your feedback helps us improve and helps others make informed decisions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <ReviewSubmissionForm />
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 social-section-mobile contact-mobile-container contact-tablet-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 social-title-mobile">Follow Us on <span className="gradient-text">Social Media</span></h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto social-subtitle-mobile medium-contrast-mobile">
              Stay connected with us on social media for updates, tips, and behind-the-scenes content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto social-grid-mobile social-grid-mobile-xs social-grid-tablet"
          >
            <a
              href="https://www.instagram.com/dreamteamservicespvt/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-pink-500/30 hover:bg-pink-500/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="5" fill="url(#instagram-gradient-contact)"/>
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                  <defs>
                    <linearGradient id="instagram-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8a3ab9"/>
                      <stop offset="25%" stopColor="#bc2a8d"/>
                      <stop offset="50%" stopColor="#e95950"/>
                      <stop offset="75%" stopColor="#fccc63"/>
                      <stop offset="100%" stopColor="#fbad50"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61579313139498"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#1877F2"/>
                  <path d="M12.5 8.5V11H15L14.5 13.5H12.5V19H10V13.5H8V11H10V8.5C10 6.84315 11.3431 5.5 13 5.5H15V8H13.5C12.9477 8 12.5 8.44772 12.5 9V8.5Z" fill="white"/>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">Facebook</span>
            </a>

            <a
              href="https://www.youtube.com/@DREAMTEAMSERVICES"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#FF0000"/>
                  <path d="M9.5 8.5L15 12L9.5 15.5V8.5Z" fill="white"/>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">YouTube</span>
            </a>

            <a
              href="https://www.linkedin.com/in/dreamteamservices/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-blue-600/30 hover:bg-blue-600/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                  <path d="M6.5 9H9V17H6.5V9ZM7.75 6C8.44036 6 9 6.55964 9 7.25C9 7.94036 8.44036 8.5 7.75 8.5C7.05964 8.5 6.5 7.94036 6.5 7.25C6.5 6.55964 7.05964 6 7.75 6Z" fill="white"/>
                  <path d="M11 9H13.5V10.25C13.8 9.5 14.8 9 16 9C18 9 18.5 10.5 18.5 12.5V17H16V13C16 12 15.5 11.5 14.5 11.5C13.5 11.5 13 12 13 13V17H11V9Z" fill="white"/>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">LinkedIn</span>
            </a>

            <a
              href="https://www.threads.com/@dreamteamservicespvt"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-gray-600/30 hover:bg-gray-600/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#000"/>
                  <path d="M12.9 7.9c-1.5 0-2.7.4-3.6 1.1-.9.7-1.4 1.7-1.4 2.9v.2c0 1.2.5 2.2 1.4 2.9.9.7 2.1 1.1 3.6 1.1s2.7-.4 3.6-1.1c.9-.7 1.4-1.7 1.4-2.9v-.2c0-1.2-.5-2.2-1.4-2.9-.9-.7-2.1-1.1-3.6-1.1zm0 1.2c1.1 0 1.9.3 2.5.7.6.4.9 1 .9 1.7v.1c0 .7-.3 1.3-.9 1.7-.6.4-1.4.7-2.5.7s-1.9-.3-2.5-.7c-.6-.4-.9-1-.9-1.7v-.1c0-.7.3-1.3.9-1.7.6-.4 1.4-.7 2.5-.7z" fill="white"/>
                  <circle cx="12.9" cy="11.9" r="1.8" stroke="#000" strokeWidth="0.8"/>
                  <circle cx="16.3" cy="8.7" r="0.8" fill="white"/>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">Threads</span>
            </a>

            <a
              href="https://x.com/thedtsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm hover:border-gray-800/30 hover:bg-gray-800/10 transition-all duration-300 social-card-mobile social-card-mobile-xs social-card-tablet touch-target-large-mobile focus-visible-mobile"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 social-icon-mobile social-icon-mobile-xs">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#000"/>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
                </svg>
              </div>
              <span className="mt-3 text-sm font-medium social-label-mobile">X (Twitter)</span>
            </a>
          </motion.div>
        </section>

        {/* Map Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 map-section-mobile contact-mobile-container contact-tablet-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 map-title-mobile">Find Us on <span className="gradient-text">Map</span></h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto map-subtitle-mobile medium-contrast-mobile">
              Located at 50-6-23, vishnalayam street, Jagannaickpur, Kakinada, Andhra Pradesh 533002. Visit our office for in-person consultations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="rounded-2xl overflow-hidden border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm p-4 sm:p-6 map-container-mobile"
          >
            <div className="w-full h-64 sm:h-80 md:h-96 map-height-mobile map-height-mobile-xs map-height-tablet">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.4821882771575!2d82.23308589999999!3d16.9388698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a382733579e1d35%3A0xa12a340e55db667b!2sThe%20Dream%20Team%20Services%20Inc!5e1!3m2!1sen!2sin!4v1758361795278!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border: 0, borderRadius: '12px'}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="The Dream Team Services Location"
              />
            </div>
            <div className="mt-4 sm:mt-6 text-center map-info-mobile">
              <p className="text-sm text-foreground/60 mb-2 map-info-title-mobile medium-contrast-mobile">
                <span className="font-medium text-foreground/80">The Dream Team Services Inc</span><br />
                50-6-23, vishnalayam street, Jagannaickpur, Kakinada, Andhra Pradesh 533002
              </p>
              <p className="text-xs text-foreground/50 map-info-note-mobile low-contrast-mobile">
                Please schedule an appointment before visiting our office
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
