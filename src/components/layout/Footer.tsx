import { Github, Mail, Phone, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-dts-blue relative">
      <div className="absolute inset-0 bg-footer-gradient opacity-50"></div>
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-foreground/70 max-w-md">
              Providing cutting-edge digital solutions across web development, software, mobile apps, 
              AI solutions, and cybersecurity services.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Github size={20} />} href="#" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
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
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex flex-wrap items-center">
                <div className="flex items-center mr-2 mb-1">
                  <Mail size={16} className="text-dts-purple flex-shrink-0" />
                </div>
                <a 
                  href="mailto:thedreamteamservicespvt@gmail.com" 
                  className="text-foreground/70 hover:text-foreground hover:underline break-all transition-colors"
                >
                  thedreamteamservicespvt@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-dts-purple" />
                <a 
                  href="tel:+919849834102" 
                  className="text-foreground/70 hover:text-foreground hover:underline transition-colors"
                >
                  +91 9849834102
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-12 pt-8 text-center text-foreground/50 text-sm">
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
      className="text-foreground/70 hover:text-foreground transition-colors"
    >
      {children}
    </a>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="bg-muted w-10 h-10 rounded-full flex items-center justify-center hover:bg-dts-purple transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
