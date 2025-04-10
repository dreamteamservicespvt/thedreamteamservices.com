
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechInnovate",
    content: "DTS transformed our online presence completely. Their web development services helped us increase conversions by 45% in just two months!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO",
    company: "GlobalSoft",
    content: "The mobile app DTS developed for us has received incredible feedback from our users. Their attention to detail and performance optimization is unmatched.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Director of Security",
    company: "SecureNet",
    content: "As a cybersecurity firm ourselves, we have high standards. DTS exceeded them all with their Level 3 security implementation and AI threat detection.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Marketing Director",
    company: "GrowthVision",
    content: "The digital marketing strategy from DTS delivered ROI beyond our expectations. They truly understand how to drive meaningful traffic and conversions.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    setIsAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setIsAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="section-container py-24 relative">
      <div className="absolute inset-0 bg-dts-blue-dark/50 rounded-2xl -mx-4 sm:-mx-6 lg:-mx-8" />
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4">Client <span className="gradient-text">Success Stories</span></h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            See what our clients have to say about working with Dream Team Services.
          </p>
        </div>

        <div className="flex flex-col items-center relative">
          {/* Testimonial Card */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative h-80 sm:h-64 overflow-hidden">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full"
              >
                <div className="glass-card rounded-xl p-8 h-full flex flex-col md:flex-row items-center md:items-start">
                  <div className="shrink-0 mb-6 md:mb-0 md:mr-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dts-purple/50">
                        <img 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-dts-purple text-white p-1 rounded-full">
                        <Quote size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg italic mb-6">{testimonials[currentIndex].content}</p>
                    <div>
                      <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-foreground/70">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-muted hover:bg-dts-purple/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoplay(false);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentIndex === index 
                      ? "w-8 bg-dts-purple" 
                      : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-muted hover:bg-dts-purple/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
