import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-dts-blue relative w-full overflow-x-hidden">
      <div className="absolute inset-0 bg-footer-gradient opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 relative z-10 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 lg:mb-6">
              <Logo className="h-10 sm:h-12" />
            </div>
            <p className="text-foreground/70 max-w-md text-sm sm:text-base leading-relaxed">
              Providing cutting-edge digital solutions across web development, software, mobile apps, 
              AI solutions, and cybersecurity services.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
              <SocialIcon 
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect width="24" height="24" rx="5" fill="url(#instagram-gradient)"/>
                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="white" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8a3ab9"/>
                        <stop offset="25%" stopColor="#bc2a8d"/>
                        <stop offset="50%" stopColor="#e95950"/>
                        <stop offset="75%" stopColor="#fccc63"/>
                        <stop offset="100%" stopColor="#fbad50"/>
                      </linearGradient>
                    </defs>
                  </svg>
                } 
                href="https://www.instagram.com/dreamteamservicespvt/" 
                ariaLabel="Follow us on Instagram"
                className="hover:scale-110"
              />
              <SocialIcon 
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect width="24" height="24" rx="12" fill="#1877F2"/>
                    <path d="M12.5 8.5V11H15L14.5 13.5H12.5V19H10V13.5H8V11H10V8.5C10 6.84315 11.3431 5.5 13 5.5H15V8H13.5C12.9477 8 12.5 8.44772 12.5 9V8.5Z" fill="white"/>
                  </svg>
                } 
                href="https://www.facebook.com/profile.php?id=61579313139498" 
                ariaLabel="Follow us on Facebook"
                className="hover:scale-110"
              />
              <SocialIcon 
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect width="24" height="24" rx="4" fill="#FF0000"/>
                    <path d="M9.5 8.5L15 12L9.5 15.5V8.5Z" fill="white"/>
                  </svg>
                } 
                href="https://www.youtube.com/@DREAMTEAMSERVICES" 
                ariaLabel="Subscribe to our YouTube channel"
                className="hover:scale-110"
              />
              <SocialIcon 
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                    <path d="M6.5 9H9V17H6.5V9ZM7.75 6C8.44036 6 9 6.55964 9 7.25C9 7.94036 8.44036 8.5 7.75 8.5C7.05964 8.5 6.5 7.94036 6.5 7.25C6.5 6.55964 7.05964 6 7.75 6Z" fill="white"/>
                    <path d="M11 9H13.5V10.25C13.8 9.5 14.8 9 16 9C18 9 18.5 10.5 18.5 12.5V17H16V13C16 12 15.5 11.5 14.5 11.5C13.5 11.5 13 12 13 13V17H11V9Z" fill="white"/>
                  </svg>
                } 
                href="https://www.linkedin.com/in/dreamteamservices/" 
                ariaLabel="Connect with us on LinkedIn"
                className="hover:scale-110"
              />
              <SocialIcon 
                icon={
                  <img 
                    src="/images/image.png" 
                    alt="Threads"
                    width="18" 
                    height="18"
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                } 
                href="https://www.threads.com/@dreamteamservicespvt" 
                ariaLabel="Follow us on Threads"
                className="hover:scale-110"
              />
              <SocialIcon 
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect width="24" height="24" rx="12" fill="#000"/>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
                  </svg>
                } 
                href="https://x.com/thedtsofficial" 
                ariaLabel="Follow us on X (Twitter)"
                className="hover:scale-110"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="order-2 sm:order-none">
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/Services">Services</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div className="order-3 sm:order-none">
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2">
              <FooterLink href="/services#level-one">Web Development</FooterLink>
              <FooterLink href="/services#level-one">Digital Marketing</FooterLink>
              <FooterLink href="/services#level-two">Software Development</FooterLink>
              <FooterLink href="/services#level-two">Mobile Apps</FooterLink>
              <FooterLink href="/services#level-three">AI Solutions</FooterLink>
              <FooterLink href="/services#level-three">Cybersecurity</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="order-1 sm:order-none col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex flex-wrap items-start">
                <div className="flex items-center mr-2 mb-1 flex-shrink-0">
                  <Mail size={14} className="text-dts-purple sm:w-4 sm:h-4" />
                </div>
                <a 
                  href="mailto:thedreamteamservicespvt@gmail.com" 
                  className="text-foreground/70 hover:text-foreground hover:underline break-all transition-colors text-sm leading-relaxed"
                >
                  thedreamteamservicespvt@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="mr-2 text-dts-purple flex-shrink-0 sm:w-4 sm:h-4" />
                <a 
                  href="tel:+919849834102" 
                  className="text-foreground/70 hover:text-foreground hover:underline transition-colors text-sm"
                >
                  +91 9849834102
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="mr-2 text-dts-purple flex-shrink-0 sm:w-4 sm:h-4" />
                <a 
                  href="tel:+919390011378" 
                  className="text-foreground/70 hover:text-foreground hover:underline transition-colors text-sm"
                >
                  +91 9390011378
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={14} className="mr-2 mt-1 text-dts-purple flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="text-foreground/70 text-sm leading-relaxed">
                  50-6-23, vishnalayam street, Jagannaickpur, Kakinada, Andhra Pradesh 533002
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-8 sm:mt-12 pt-6 sm:pt-8 pb-6 sm:pb-8 text-center text-foreground/50 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Dream Team Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-foreground/70 hover:text-foreground transition-colors text-sm block touch-target-mobile py-1"
    >
      {children}
    </a>
  </li>
);

const SocialIcon = ({ icon, href, ariaLabel, className = "" }: { icon: React.ReactNode; href: string; ariaLabel?: string; className?: string }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-300 bg-white/5 hover:bg-white/10 touch-target-mobile ${className}`}
  >
    {icon}
  </a>
);

export default Footer;
