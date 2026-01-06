import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhySection = () => {
  // Real 2025 tax data from IRS
  const reasons = [
    {
      number: "1",
      color: "bg-primary/10",
      textColor: "text-primary",
      title: "Self-Employment Tax: 15.3%",
      description: "12.4% Social Security (on first $176,100 in 2025) + 2.9% Medicare (unlimited). High earners pay +0.9% Medicare surtax above $200k.",
    },
    {
      number: "2",
      color: "bg-success/10",
      textColor: "text-success",
      title: "Federal Income Tax: 10-37%",
      description: "Based on your tax bracket after the standard deduction ($15,000 single, $30,000 married filing jointly in 2025).",
    },
    {
      number: "3",
      color: "bg-info/10",
      textColor: "text-info",
      title: "State Income Tax: 0-13.3%",
      description: "Depends where you live. California charges up to 13.3%, New York up to 10.9%, while Texas, Florida, and 7 other states charge 0%.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-muted" aria-labelledby="why-section-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 sm:mb-12">
          <h2 id="why-section-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why You Can't Just Save 15% for Taxes
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            The #1 mistake new freelancers and 1099 contractors make
          </p>
        </header>

        <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border border-border">
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Most self-employed workers think they only owe 15.3% in self-employment tax.{" "}
            <strong className="text-foreground">That's only part of the picture.</strong> Your actual tax burden includes:
          </p>

          <div className="space-y-5 sm:space-y-6 mb-8">
            {reasons.map((reason) => (
              <div key={reason.number} className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 ${reason.color} rounded-full flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <span className={`${reason.textColor} font-bold`}>{reason.number}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base sm:text-lg">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real example with 2025 tax rates */}
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-lg mb-6" role="alert">
            <p className="text-destructive font-semibold text-sm sm:text-base">
              <strong>Real Example:</strong> A California freelancer earning $100,000 pays approximately:
              <br />
              Self-employment tax: $14,130 + Federal tax: ~$11,600 + CA state tax: ~$5,500 = <strong>$31,230 total (31.2%)</strong>
            </p>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="shadow-lg hover:shadow-glow transition-all duration-300 w-full sm:w-auto">
              <a href="#tools" aria-label="Calculate your actual tax bill">
                Calculate Your Real Tax Bill
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
