
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ServiceLevels from "@/components/home/ServiceLevels";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";

const Index = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ServiceLevels />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Index;
