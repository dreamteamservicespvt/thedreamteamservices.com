import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GradientButton from "../ui/GradientButton";
import Logo from "../ui/Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle home navigation click - scroll to top if already on home page
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // If not on home page, let the Link component handle navigation normally
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 sm:py-4 w-full overflow-x-hidden",
        isScrolled ? "bg-dts-blue/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 w-full">
          {/* Logo on left */}
          <div className="flex-shrink-0 relative">
            <Link to="/" className="flex items-center" onClick={handleHomeClick}>
              <Logo className="h-8 sm:h-10 md:h-12 lg:h-14" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block relative">
            <div className="ml-6 xl:ml-10 flex items-center space-x-4 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-foreground/80 hover:text-foreground font-medium transition-colors text-sm xl:text-base",
                    location.pathname === link.href && "text-foreground"
                  )}
                  onClick={link.name === "Home" ? handleHomeClick : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact">
                <GradientButton 
                  gradientDirection="horizontal"
                  highContrast={true}
                  className="text-sm xl:text-base px-4 xl:px-6 py-2"
                >
                  Get Started
                </GradientButton>
              </Link>
            </div>
          </div>

          {/* Mobile menu button on right */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="text-foreground hover:text-accent transition-colors p-2 touch-target-mobile focus:outline-none focus:ring-2 focus:ring-dts-purple rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - add explicit positioning to fix overflow issues */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden relative w-full",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0" 
        )}
        style={{ position: "relative", inset: "unset", left: 0, right: 0 }}
      >
        <div className="px-3 sm:px-4 pt-3 pb-4 space-y-2 bg-dts-blue/95 backdrop-blur-md border-t border-white/10 w-full overflow-x-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all touch-target-mobile",
                location.pathname === link.href && "text-foreground bg-white/10"
              )}
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (link.name === "Home") {
                  handleHomeClick(e);
                }
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-4 py-2">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <GradientButton className="w-full touch-target-mobile text-center justify-center">
                Get Started
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
