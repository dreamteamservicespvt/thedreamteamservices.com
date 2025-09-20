import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FloatingReviewButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <h3 className="font-semibold text-sm text-card-foreground">Share Your Experience</h3>
              <p className="text-xs text-muted-foreground">
                Worked with us? We'd love to hear about your experience!
              </p>
              <Link to="/contact#review-form">
                <Button 
                  size="sm" 
                  className="w-full bg-dts-purple hover:bg-dts-purple/90 text-white"
                  onClick={() => setIsExpanded(false)}
                >
                  <Star size={14} className="mr-2" />
                  Write Review
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-dts-purple hover:bg-dts-purple/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
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
            <div className="relative">
              <MessageSquare size={24} />
              <Star size={12} className="absolute -top-1 -right-1 fill-current" />
            </div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingReviewButton;