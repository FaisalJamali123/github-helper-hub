import { Link } from "react-router-dom";
import { FileText, Calendar, Briefcase, Check, ArrowRight, ArrowLeftRight, Award, Scale, Car, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "1099 Tax Calculator",
    description: "Estimate your total tax bill from freelance income. Includes federal, state, and self-employment tax in one view.",
    features: [
      "All 50 states supported",
      "Shows quarterly payment amounts",
      "Calculates 92.35% deduction automatically",
    ],
    href: "/calculator/1099",
    buttonText: "Try 1099 Calculator →",
    buttonVariant: "default" as const,
  },
  {
    icon: Calendar,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    title: "Quarterly Tax Calculator",
    description: "Never miss a payment deadline. Calculate exactly how much to pay the IRS each quarter to avoid penalties.",
    features: [
      "Auto-shows next deadline",
      "Penalty estimator if late",
      "Download payment calendar (.ics)",
    ],
    href: "/calculator/quarterly",
    buttonText: "Try Quarterly Calculator →",
    buttonVariant: "default" as const,
  },
  {
    icon: Briefcase,
    iconBg: "bg-info/10",
    iconColor: "text-info",
    title: "Self-Employment Tax Calculator",
    description: "Understand the 15.3% rule. See your Social Security and Medicare tax breakdown before you file.",
    features: [
      "Shows why only 92.35% is taxed",
      "Calculates QBI deduction eligibility",
      "Compares 1099 vs W-2 burden",
    ],
    href: "/calculator/self-employment",
    buttonText: "Try SE Tax Calculator →",
    buttonVariant: "default" as const,
  },
  {
    icon: ArrowLeftRight,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    title: "1099 vs W-2 Calculator",
    description: "Compare freelance vs employee income side-by-side. See the real difference in taxes, benefits, and take-home pay.",
    features: [
      "Side-by-side tax comparison",
      "Benefits value calculation",
      "True take-home pay analysis",
    ],
    href: "/calculator/1099-vs-w2",
    buttonText: "Compare 1099 vs W-2 →",
    buttonVariant: "accent" as const,
  },
  {
    icon: Award,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    title: "Best 1099 Tax Software",
    description: "Compare top tax software for freelancers. Side-by-side features, pricing, and honest reviews of TurboTax, Keeper, and more.",
    features: [
      "5 top platforms compared",
      "Feature-by-feature breakdown",
      "Pros, cons & pricing",
    ],
    href: "/best-1099-tax-software",
    buttonText: "Compare Tax Software →",
    buttonVariant: "default" as const,
  },
  {
    icon: Scale,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "1099-C Debt Forgiveness Calculator",
    description: "Got canceled debt? Calculate if you owe taxes or qualify for the insolvency exclusion. Includes IRS Form 982 guidance.",
    features: [
      "Insolvency worksheet included",
      "All exclusion types covered",
      "Form 982 instructions",
    ],
    href: "/calculator/1099-c",
    buttonText: "Calculate Debt Tax →",
    buttonVariant: "default" as const,
  },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 sm:py-24 section-gradient" aria-labelledby="tools-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Free Tax Tools
          </span>
          <h2 id="tools-heading" className="font-heading text-foreground mb-4">
            Free Tax Calculators for <span className="gradient-text">Freelancers</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            All calculators include state tax support—something most free tools ignore
          </p>
        </header>

        {/* Featured New Tool - GigSaver Mileage Optimizer */}
        <div className="mb-12">
          <Link 
            to="/calculator/mileage"
            className="block group relative overflow-hidden rounded-3xl bg-gradient-to-br from-success/10 via-success/5 to-info/10 border-2 border-success/20 hover:border-success/40 transition-all duration-500 p-6 sm:p-8 lg:p-10"
          >
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 text-success text-xs font-bold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              New Tool
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-success to-success/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Car className="w-7 h-7 sm:w-8 sm:h-8 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                      GigSaver Mileage Optimizer
                    </h3>
                    <p className="text-success font-medium text-sm">For Global Freelancers & Gig Workers</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Unlock 25-35% more savings with smarter mileage tracking. Calculate reimbursements, 
                  IRS deductions, and eco-impact with <strong>multi-currency support</strong> for worldwide freelancers.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-border text-xs font-medium text-muted-foreground">
                    <Globe className="w-3.5 h-3.5 text-info" /> 6 Currencies
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-border text-xs font-medium text-muted-foreground">
                    <Leaf className="w-3.5 h-3.5 text-success" /> Eco Tracking
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-border text-xs font-medium text-muted-foreground">
                    <Car className="w-3.5 h-3.5 text-warning" /> $0.70/mi Rate
                  </span>
                </div>
                
                <Button className="mt-2 gap-2 bg-success hover:bg-success/90 text-success-foreground group-hover:gap-3 transition-all">
                  Try Mileage Optimizer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Visual preview mockup */}
              <div className="hidden lg:block relative">
                <div className="bg-card rounded-2xl p-6 shadow-xl border border-border transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-center mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Estimated Annual Savings</p>
                    <p className="text-3xl font-heading font-bold text-success">$12,500</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <p className="text-sm font-bold text-foreground">48,000</p>
                      <p className="text-[10px] text-muted-foreground">Miles</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <p className="text-sm font-bold text-success">$33,600</p>
                      <p className="text-[10px] text-muted-foreground">Deduction</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <p className="text-sm font-bold text-info">2.4t</p>
                      <p className="text-[10px] text-muted-foreground">CO₂ Saved</p>
                    </div>
                  </div>
                </div>
                {/* Floating currency badges */}
                <div className="absolute -top-2 -left-2 bg-card rounded-lg px-2 py-1 shadow-lg border border-border text-xs font-bold text-primary">
                  $USD
                </div>
                <div className="absolute -bottom-2 -right-2 bg-card rounded-lg px-2 py-1 shadow-lg border border-border text-xs font-bold text-info">
                  ₨PKR
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tools.map((tool, index) => (
            <article
              key={tool.title}
              className="tool-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 ${tool.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                aria-hidden="true"
              >
                <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">{tool.title}</h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{tool.description}</p>

              <ul className="space-y-3 mb-8" aria-label={`Features of ${tool.title}`}>
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-success" aria-hidden="true" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild variant={tool.buttonVariant} className="w-full group/btn">
                <Link to={tool.href} aria-label={`Use the ${tool.title}`}>
                  {tool.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
        
        {/* Trust signals */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            ✓ Updated for 2025 tax year • ✓ Based on official IRS tax rates and state tax brackets
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
