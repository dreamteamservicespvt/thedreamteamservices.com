import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Upload, X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createReview } from "@/services/reviewService";
import { CreateReviewData } from "@/types/review";

interface ReviewSubmissionFormProps {
  onSuccess?: () => void;
  className?: string;
}

const serviceTypes = [
  "Web Development",
  "Mobile App Development", 
  "Digital Marketing",
  "Logo & Branding",
  "Software Development",
  "AI Solutions",
  "Cybersecurity",
  "Other"
];

const ReviewSubmissionForm = ({ onSuccess, className }: ReviewSubmissionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState<CreateReviewData>({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 0,
    projectType: ""
  });

  const handleInputChange = (field: keyof CreateReviewData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 5MB."
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please provide a rating for your experience."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        ...formData,
        rating
      };

      await createReview(reviewData, imageFile || undefined);
      
      setIsSubmitted(true);
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. We'll review it and publish it soon."
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your review. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm text-center ${className}`}
      >
        <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-foreground/70 mb-4">
          Your review has been submitted successfully. We'll review it and publish it on our website soon.
        </p>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              position: "",
              company: "",
              content: "",
              rating: 0,
              projectType: ""
            });
            setRating(0);
            setImageFile(null);
            setImagePreview("");
          }}
          variant="outline"
        >
          Submit Another Review
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
        <p className="text-foreground/70">
          Help others by sharing your experience working with Dream Team Services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Your Position *</Label>
            <Input
              id="position"
              placeholder="CEO, Marketing Director, etc."
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectType">Service Type</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Rating *</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 transition-colors"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-foreground/30"
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-foreground/70">
              {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your Review *</Label>
          <Textarea
            id="content"
            placeholder="Tell us about your experience working with Dream Team Services..."
            className="min-h-32"
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Your Photo (Optional)</Label>
          <div className="space-y-4">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-dts-purple/50"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-foreground/30 rounded-full cursor-pointer hover:border-dts-purple/50 transition-colors">
                <Upload size={20} className="text-foreground/50" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-xs text-foreground/60">
              Upload your photo (optional, max 5MB)
            </p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ReviewSubmissionForm;