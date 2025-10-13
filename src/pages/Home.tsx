import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HighDemandServices from "@/components/home/HighDemandServices";
import MissionVision from "@/components/home/MissionVision";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import SEO from "@/components/SEO";
import { organizationSchema, localBusinessSchema, websiteSchema, servicesSchema } from "@/lib/schema";

const Home = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      websiteSchema,
      ...servicesSchema
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Dream Team Services | AI Commercial Ads, Digital Marketing, Web & Software Development in Kakinada"
        description="Leading digital solutions provider in Kakinada offering AI commercial ads, digital marketing, social media management, website development, and custom software development. Transform your business with world-class technology services."
        keywords="AI commercial ads Kakinada, digital marketing services India, social media management Kakinada, website development Andhra Pradesh, software development India, web design Kakinada, mobile app development, SEO services, brand strategy, custom software solutions, digital transformation, business automation, e-commerce development, AI solutions"
        url="/"
        schema={combinedSchema}
      />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HighDemandServices />
        <MissionVision />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Home;
