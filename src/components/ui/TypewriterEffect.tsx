import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
  startDelay?: number;
}

const TypewriterEffect = ({
  words,
  className = "",
  typeSpeed = 50,
  deleteSpeed = 30,
  delayBetweenWords = 2000,
  loop = true,
  startDelay = 0
}: TypewriterEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if device is mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setIsStarted(true);
    }
  }, [startDelay]);

  const typewriterLogic = useCallback(() => {
    if (!isStarted) return;

    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting characters
      if (currentText.length > 0) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        // Move to next word
        setIsDeleting(false);
        if (loop || currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prevIndex) => 
            loop ? (prevIndex + 1) % words.length : Math.min(prevIndex + 1, words.length - 1)
          );
        }
      }
    } else {
      // Typing characters
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      } else {
        // Word complete, wait before deleting (only if looping or not on last word)
        if (loop || currentWordIndex < words.length - 1) {
          setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
          return;
        }
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, delayBetweenWords, loop, isStarted]);

  useEffect(() => {
    if (!isStarted) return;

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    intervalRef.current = setTimeout(typewriterLogic, speed);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [typewriterLogic, deleteSpeed, typeSpeed]);

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
        className="relative w-full mx-auto"
      >
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center flex-wrap">
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0.8, y: isMobile ? 2 : 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3 }}
              className="text-foreground/95 leading-relaxed font-medium"
              style={{ 
                textShadow: isMobile ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "0 0 30px rgba(126, 34, 206, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                lineHeight: "1.6",
                fontWeight: "500",
                letterSpacing: "0.02em",
                display: "inline",
                maxWidth: "100%",
                textAlign: "center"
              }}
              role="text"
              aria-live="polite"
              aria-label={`Typewriter text: ${currentText}`}
            >
              {currentText || "\u00A0"}
            </motion.span>
            <motion.span
              animate={!isMobile ? { 
                opacity: [1, 0.3, 1],
                scaleY: [1, 1.05, 1]
              } : {
                opacity: [1, 0.5, 1] // Simpler animation on mobile
              }}
              transition={{ 
                duration: isMobile ? 1.5 : 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block will-change-transform"
              style={{
                width: "3px",
                height: "1.2em",
                background: "linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)",
                borderRadius: "2px",
                boxShadow: isMobile ? "0 0 6px rgba(126, 34, 206, 0.6)" : "0 0 12px rgba(126, 34, 206, 0.8), 0 0 24px rgba(126, 34, 206, 0.4)",
                marginLeft: "4px",
                filter: "brightness(1.2)",
                alignSelf: "center",
                flexShrink: 0,
                transform: "translateY(-0.1em)"
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TypewriterEffect;
