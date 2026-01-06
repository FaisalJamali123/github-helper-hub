import { ArrowRight, AlertTriangle, CheckCircle, Sparkles, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import StateFinder from "./StateFinder";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Calculate days into 2026
  const now = new Date();
  const currentYear = now.getFullYear();
  const startOf2026 = new Date('2026-01-01T00:00:00');
  const daysInto2026 = Math.floor((now.getTime() - startOf2026.getTime()) / (1000 * 60 * 60 * 24));
  const isEarly2026 = currentYear === 2026 && daysInto2026 <= 30;

  return (
    <section id="home" className="mesh-gradient py-16 sm:py-20 lg:py-28" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in">
            {/* New Year Banner - Show for first 30 days of 2026 */}
            {isEarly2026 && (
              <div className="bg-gradient-to-r from-success/20 via-success/10 to-transparent border border-success/30 rounded-xl p-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">🎊 Welcome to 2026!</p>
                    <p className="text-xs text-muted-foreground">
                      Start the year right with accurate tax planning
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Q1 Tax Reminder - Show after Jan 30 through April 15 */}
            {currentYear === 2026 && daysInto2026 > 30 && daysInto2026 <= 105 && (
              <div className="bg-gradient-to-r from-warning/20 via-warning/10 to-transparent border border-warning/30 rounded-xl p-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Q1 2026 Quarterly Taxes Due April 15!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Calculate your estimated payment now to avoid penalties
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Year Toggle Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span className="text-sm font-medium text-foreground">2026 Tax Rates Updated</span>
              </div>
              <Link 
                to="/blog/2026-1099-tax-guide"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 hover:bg-success/20 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">2026 Tax Guide</span>
              </Link>
            </div>
            
            <h1 id="hero-heading" className="font-heading">
              <span className="gradient-text">Free 1099 Tax Calculator</span>
              <br />
              <span className="text-foreground">for Freelancers & Self-Employed</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Calculate your <strong className="text-foreground">federal income tax, state tax, and 15.3% self-employment tax</strong> instantly. 
              Trusted by over <strong className="text-primary">50,000+ freelancers</strong>. 
              Updated for 2026 tax planning and quarterly payments.
            </p>
            
            {/* Warning Box - Real IRS statistic */}
            <div className="bg-accent/5 border-l-4 border-accent p-5 rounded-xl" role="alert">
              <p className="text-foreground flex items-start text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-accent">79% of self-employed workers underestimate their taxes.</strong> Don't be one of them - calculate your exact liability in seconds.
                </span>
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="xl" 
                className="group"
              >
                <a href="#tools" aria-label="Start calculating your 1099 taxes now">
                  Calculate My Taxes Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="xl"
              >
                <Link to="/blog/2026-1099-tax-guide" aria-label="Read our 2026 tax preparation guide">
                  <Calendar className="mr-2 w-5 h-5" />
                  2026 Tax Guide
                </Link>
              </Button>
            </div>
            
            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              {["No signup required", "100% free forever", "All 50 states"].map((text) => (
                <span key={text} className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  {text}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Content - State Finder Widget */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="floating w-full max-w-md">
              <StateFinder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;