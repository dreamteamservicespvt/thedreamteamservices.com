import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import GradientButton from "../ui/GradientButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 overflow-x-hidden",
        isScrolled ? "bg-dts-blue/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo on left */}
          <div className="flex-shrink-0 relative">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">DREAM TEAM SERVICES</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-foreground/80 hover:text-foreground font-medium transition-colors",
                    location.pathname === link.href && "text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact">
                <GradientButton>Get Started</GradientButton>
              </Link>
            </div>
          </div>

          {/* Mobile menu button on right */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-foreground hover:text-accent transition-colors p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - add explicit positioning to fix overflow issues */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden relative",
          mobileMenuOpen ? "max-h-96" : "max-h-0" 
        )}
        style={{ position: "relative", inset: "unset" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dts-blue/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground",
                location.pathname === link.href && "text-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <GradientButton className="w-full">Get Started</GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
