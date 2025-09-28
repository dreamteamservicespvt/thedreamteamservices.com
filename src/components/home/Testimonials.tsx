import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight, Star, PenTool } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Review } from "@/types/review";
import { getApprovedReviews } from "@/services/reviewService";
import { useToast } from "@/hooks/use-toast";

// Fallback testimonials for when there are no approved reviews yet
const fallbackTestimonials: Review[] = [
  {
    id: "fallback-1",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechInnovate",
    content: "DTS transformed our online presence completely. Their web development services helped us increase conversions by 45% in just two months!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    status: "approved",
    submittedAt: new Date(),
    isPublic: true
  },
  {
    id: "fallback-2",
    name: "Michael Chen",
    position: "CTO",
    company: "GlobalSoft",
    content: "The mobile app DTS developed for us has received incredible feedback from our users. Their attention to detail and performance optimization is unmatched.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    status: "approved",
    submittedAt: new Date(),
    isPublic: true
  },
  {
    id: "fallback-3",
    name: "Emma Rodriguez",
    position: "Director of Security",
    company: "SecureNet",
    content: "As a cybersecurity firm ourselves, we have high standards. DTS exceeded them all with their Level 3 security implementation and AI threat detection.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    status: "approved",
    submittedAt: new Date(),
    isPublic: true
  },
  {
    id: "fallback-4",
    name: "David Thompson",
    position: "Marketing Director",
    company: "GrowthVision",
    content: "The digital marketing strategy from DTS delivered ROI beyond our expectations. They truly understand how to drive meaningful traffic and conversions.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    status: "approved",
    submittedAt: new Date(),
    isPublic: true
  },
];

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Review[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Set to false to show fallback testimonials immediately
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Load approved reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const approvedReviews = await getApprovedReviews();
        if (approvedReviews.length > 0) {
          setTestimonials(approvedReviews);
        }
        // If no approved reviews, keep fallback testimonials
      } catch (error) {
        console.error("Error loading reviews:", error);
        // Keep fallback testimonials on error
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [toast]);

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
    if (isAutoplay && testimonials.length > 1) {
      autoplayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, testimonials.length]);

  // Reset current index if it's out of bounds
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [testimonials.length, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  if (isLoading) {
    return (
      <section className="section-container py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-dts-blue-dark/50 rounded-xl sm:rounded-2xl -mx-4 sm:-mx-6 lg:-mx-8" />
        <div className="relative z-10 text-center">
          <div className="animate-pulse">
            <div className="mb-12 sm:mb-16">
              <div className="h-8 sm:h-12 bg-foreground/10 rounded-lg mb-4 max-w-md mx-auto"></div>
              <div className="h-4 sm:h-6 bg-foreground/10 rounded-lg max-w-lg mx-auto"></div>
            </div>
            <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 min-h-[400px] sm:min-h-[280px] bg-foreground/5"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentTestimonial) {
    return null;
  }

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
    <section className="section-container py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-dts-blue-dark/50 rounded-xl sm:rounded-2xl -mx-4 sm:-mx-6 lg:-mx-8" />
      
      <div className="relative z-10">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            See what our clients have to say about working with Dream Team Services.
          </p>
        </div>

        <div className="flex flex-col items-center relative">
          {/* Testimonial Card */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative min-h-[400px] sm:min-h-[280px] overflow-hidden">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full"
              >
                <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left min-h-[400px] sm:min-h-[280px]">
                  {/* Profile Section */}
                  <div className="shrink-0 mb-6 sm:mb-0 sm:mr-8 flex flex-col items-center sm:items-start">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-dts-purple/50 shadow-lg">
                        {currentTestimonial.image ? (
                          <OptimizedImage 
                            src={currentTestimonial.image} 
                            alt={currentTestimonial.name} 
                            className="w-full h-full object-cover"
                            width={80}
                            height={80}
                            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=7c3aed&color=fff`}
                            showErrorOverlay={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-dts-purple/20 flex items-center justify-center">
                            <span className="text-dts-purple font-semibold text-lg sm:text-xl">
                              {currentTestimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-dts-purple text-white p-1.5 rounded-full shadow-md">
                        <Quote size={12} className="sm:w-4 sm:h-4" />
                      </div>
                    </div>
                    
                    {/* Author Info */}
                    <div className="text-center sm:text-left">
                      <h4 className="font-bold text-base sm:text-lg mb-1">{currentTestimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-foreground/70 mb-1">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-xs sm:text-sm text-dts-cyan font-medium">
                        {currentTestimonial.company}
                      </p>
                      {currentTestimonial.projectType && (
                        <p className="text-xs text-dts-purple/80 mt-2 bg-dts-purple/10 px-2 py-1 rounded-full inline-block">
                          {currentTestimonial.projectType}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Star Rating */}
                    <div className="flex justify-center sm:justify-start space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= currentTestimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Content */}
                    <blockquote className="text-sm sm:text-lg text-foreground/90 leading-relaxed italic font-medium">
                      "{currentTestimonial.content}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 sm:mt-12 space-x-6">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-card/80 hover:bg-dts-purple/20 border border-border hover:border-dts-purple/30 transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-foreground/80 hover:text-dts-purple" />
            </button>
            
            <div className="flex space-x-2 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoplay(false);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200",
                    "touch-manipulation focus:outline-none",
                    currentIndex === index 
                      ? "bg-dts-purple" 
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-card/80 hover:bg-dts-purple/20 border border-border hover:border-dts-purple/30 transition-all duration-300 hover:scale-110 shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-foreground/80 hover:text-dts-purple" />
            </button>
          </div>

          {/* Write Review CTA */}
          <div className="mt-8 sm:mt-10 text-center px-4">
            <p className="text-sm sm:text-base text-foreground/70 mb-4">Worked with us? Share your experience!</p>
            <Link to="/contact#review-form">
              <Button 
                className="bg-dts-purple hover:bg-dts-purple/90 text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <PenTool size={16} className="mr-2" />
                Write Your Review
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
