import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Mail, Heart } from "lucide-react";
import logoImage from "@/assets/logo.png";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { href: "/calculator/1099", label: "1099 Tax Calculator" },
    { href: "/calculator/quarterly", label: "Quarterly Tax Calculator" },
    { href: "/calculator/self-employment", label: "Self-Employment Calculator" },
    { href: "/calculator/1099-vs-w2", label: "1099 vs W-2 Calculator" },
    { href: "/calculator/mileage", label: "Mileage Optimizer" },
  ];

  const resourceLinks = [
    { href: "/blog/2026-1099-tax-guide", label: "2026 Tax Guide" },
    { href: "/#blog", label: "Tax Guides" },
    { href: "/#faq", label: "FAQs" },
    { href: "/best-1099-tax-software", label: "Best Tax Software" },
    { href: "/contact", label: "Contact Us" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  ];

  return (
    <footer ref={ref} className="bg-foreground text-background">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={logoImage} 
                alt="Money Grow Tools Logo" 
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-xl font-bold block font-heading">Money Grow Tools</span>
                <span className="text-xs text-muted-foreground">Free Tax Calculators</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Free 1099 tax calculators for freelancers and self-employed workers. Accurate federal, state, and self-employment tax estimates in seconds.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/moneygrowtools"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/moneygrowtools"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@moneygrowtools.com"
                className="w-10 h-10 rounded-lg bg-muted-foreground/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold text-lg mb-6 font-heading">Calculators</h3>
            <ul className="space-y-4">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 font-heading">Resources</h3>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6 font-heading">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-muted-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm flex items-center">
              © {currentYear} Money Grow Tools. Made with <Heart className="w-4 h-4 mx-1 text-destructive" /> for freelancers
            </p>
            <p className="text-muted-foreground text-xs text-center md:text-right max-w-md">
              This calculator is for informational purposes only. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;