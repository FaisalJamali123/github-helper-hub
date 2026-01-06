import { ArrowRight, Shield, Zap, Lock, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailCaptureModal from "@/components/EmailCaptureModal";

const CTASection = () => {
  return (
    <section className="py-20 sm:py-24 bg-background" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 primary-gradient opacity-95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(25_95%_53%/0.3),transparent_50%)]"></div>
          
          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Takes less than 60 seconds</span>
            </div>
            
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 font-heading">
              Ready to Know Your<br />Exact 1099 Tax Bill?
            </h2>
            
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Stop guessing. Get an accurate estimate in under 60 seconds—no signup required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                asChild
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl group"
              >
                <a href="#tools" aria-label="Start calculating your taxes now">
                  Calculate My Taxes Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </Button>
              
              <EmailCaptureModal 
                trigger={
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
                    Get Deadline Calendar
                  </Button>
                }
              />
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                No signup required
              </div>
              <div className="flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                100% free forever
              </div>
              <div className="flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
                Your data never stored
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
