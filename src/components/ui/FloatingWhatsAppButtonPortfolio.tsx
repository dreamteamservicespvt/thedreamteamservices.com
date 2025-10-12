import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const FloatingWhatsAppButtonPortfolio = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // WhatsApp number for Portfolio page: +91 9390011378
  const whatsappNumber = "919390011378";
  
  // Predefined message that will be sent
  const predefinedMessage = "Hello! I'm interested in learning more about your services. Can you help me?";
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(predefinedMessage);
  
  // WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 p-1 hover:bg-muted rounded text-card-foreground"
            >
              <X size={16} />
            </button>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-card-foreground">Chat with Us!</h3>
              <p className="text-xs text-muted-foreground">
                Have questions? Message us on WhatsApp and we'll get back to you right away!
              </p>
              <Button 
                size="sm" 
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                onClick={handleWhatsAppClick}
              >
                <WhatsAppIcon size={14} />
                <span className="ml-2">Message Us</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X size={24} />
          ) : (
            <WhatsAppIcon size={24} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsAppButtonPortfolio;
