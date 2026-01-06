import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Briefcase,
  MapPin,
  PiggyBank,
  Receipt,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Percent,
  Sparkles,
  ExternalLink,
  Building,
  Car,
  Home,
  AlertTriangle,
  Wallet,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is self-employment tax?",
    answer:
      "It's the 15.3% tax on net business earnings to fund Social Security and Medicare. Self-employed individuals pay both the employee and employer portions.",
  },
  {
    question: "Is self-employment tax higher than employee taxes?",
    answer: (
      <>
        Yes, because you pay both the employee and employer portions (15.3% vs. 7.65% each for W-2 workers), 
        but deductions help offset this. Compare with our{" "}
        <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">1099 vs W-2 calculator</Link>.
      </>
    ),
  },
  {
    question: "Do I pay self-employment tax if earnings are under $400?",
    answer:
      "No — the threshold is $400 net profit; below that, no self-employment tax is due.",
  },
  {
    question: "Can I deduct expenses before calculating self-employment tax?",
    answer: (
      <>
        Yes — deductions reduce net earnings, lowering your tax base. See our guide on{" "}
        <Link to="/blog/write-off-groceries" className="text-primary hover:underline">common business deductions</Link>.
      </>
    ),
  },
  {
    question: "Does the calculator include the wage base limit?",
    answer:
      "Yes — it caps Social Security at $176,100 for 2025. Earnings above this threshold are only subject to Medicare tax.",
  },
];

const deductions = [
  { text: "Home office (based on square footage or simplified method)", icon: Home },
  { text: "Business mileage (67 cents per mile in 2025) or vehicle expenses", icon: Car },
  { text: "Supplies, equipment, and office materials", icon: Receipt },
  { text: "Internet, phone, and utilities (business portion)", icon: Building },
  { text: "Advertising, marketing, and website costs", icon: TrendingUp },
  { text: "Professional fees (e.g., accounting, legal)", icon: Briefcase },
  { text: "Health insurance premiums", icon: Shield },
  { text: "Retirement plan contributions (e.g., SEP-IRA)", icon: PiggyBank },
  { text: "Half of your self-employment tax (automatically calculated)", icon: Percent },
];

const whoShouldUse = [
  { icon: FileText, text: "Freelancers and consultants" },
  { icon: Briefcase, text: "Sole proprietors and small business owners" },
  { icon: Users, text: "Gig economy participants (e.g., rideshare, delivery, or online sellers)" },
  { icon: Receipt, text: "Independent contractors with 1099 forms" },
  { icon: TrendingUp, text: "Side hustlers earning extra income" },
  { icon: Calculator, text: "Anyone with Schedule C income on their tax return" },
];

const taxBrackets = [
  { range: "$0 – $11,925", rate: "10%" },
  { range: "$11,926 – $48,475", rate: "12%" },
  { range: "$48,476 – $103,350", rate: "22%" },
  { range: "$103,351 – $197,300", rate: "24%" },
  { range: "$197,301 – $250,525", rate: "32%" },
  { range: "$250,526 – $626,350", rate: "35%" },
  { range: "Above $626,350", rate: "37%" },
];

const savingsGuide = [
  { income: "Under $50,000 net", range: "20–25%" },
  { income: "$50,000–$100,000", range: "25–30%" },
  { income: "Over $100,000", range: "30–40%+" },
];

const stateTaxExamples = [
  { type: "No income tax", states: "Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming" },
  { type: "Flat-rate", states: "Colorado (4.4%), Illinois (4.95%)" },
  { type: "Progressive high rates", states: "California (up to 13.3%), New York (up to 10.9%)" },
];

const CalculatorSelfEmploymentSEOContent = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllDeductions, setShowAllDeductions] = useState(false);
  const [showAllBrackets, setShowAllBrackets] = useState(false);

  const scrollToCalculator = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mt-16 space-y-12">
      {/* Hero intro section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-info/10 via-background to-primary/10 border border-border p-8 sm:p-12 group">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-info/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-info/10 text-info text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Free Tool • 2025 Updated
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            Free Self-Employment Tax Calculator
            <span className="block text-xl sm:text-2xl font-normal text-muted-foreground mt-2">
              Estimate Your Taxes Accurately
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Use our <strong className="text-foreground">free self-employment tax calculator</strong> to quickly estimate your 
            self-employment taxes based on your net earnings. Input your self-employment income, deductions, filing status, 
            and state to get a detailed breakdown of Social Security, Medicare, federal income tax, and any state taxes — 
            all updated for the <strong className="text-foreground">2025 tax year</strong>. No sign-up needed, just accurate 
            results in moments to help you plan ahead based on{" "}
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              IRS guidelines <ExternalLink className="w-3 h-3" />
            </a>.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {["No sign-up needed", "Instant results", "2025 rates"].map(
              (tag, index) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-4 h-4 text-info" />
                  {tag}
                </span>
              )
            )}
          </div>

          <button
            onClick={scrollToCalculator}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-info text-info-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Try the Free Self-Employment Tax Calculator Now
            <Briefcase className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* What is section */}
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="space-y-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors duration-300">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            What Is a Self-Employment Tax Calculator and How Does It Work?
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">self-employment tax calculator</strong> is an online tool 
              that helps independent workers estimate the taxes they owe on their business income. Self-employment 
              tax primarily covers Social Security and Medicare contributions, which aren't withheld from your 
              payments like they are for W-2 employees.
            </p>
            <p>
              Unlike regular income tax, self-employment tax is calculated on your net profit after deductions. 
              The tool applies the current rates — <strong className="text-foreground">15.3% total for 2025</strong> — 
              and factors in income tax brackets, deductions, and state variations to provide an estimate of your 
              total liability. It also shows how much of the tax is deductible, reducing your overall bill.
            </p>
          </div>
          
          <div className="mt-4 p-4 rounded-xl bg-info/5 border border-info/20">
            <p className="text-sm text-muted-foreground">
              Need to calculate your full{" "}
              <Link to="/calculator/1099" className="text-primary hover:underline">1099 tax liability</Link>? 
              Or plan your{" "}
              <Link to="/calculator/quarterly" className="text-primary hover:underline">quarterly estimated payments</Link>?
            </p>
          </div>
        </div>

        {/* Who should use */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-info/5 to-primary/5 border border-border hover:border-info/20 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Who Should Use a Self-Employment Tax Calculator?
            </h3>
          </div>

          <p className="text-muted-foreground mb-4">
            This calculator is ideal for anyone responsible for paying their own taxes on business income:
          </p>

          <div className="grid gap-3">
            {whoShouldUse.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/80 border border-transparent hover:border-info/20 transition-all duration-300 group cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-info/20 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-info" />
                </div>
                <span className="text-foreground text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            If you're self-employed and want to avoid surprises or penalties, this{" "}
            <strong className="text-foreground">free self-employment tax calculator</strong> helps you budget effectively.
          </p>
        </div>
      </div>

      {/* How to use section */}
      <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            How to Calculate Self-Employment Taxes Using This Calculator
          </h3>
        </div>

        <p className="text-muted-foreground mb-8">
          Estimating your taxes is simple — follow these steps:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Enter your net self-employment income",
              desc: "This is your total business revenue minus expenses (we'll help with deductions next).",
              icon: DollarSign,
              color: "from-emerald-500/20 to-emerald-500/5",
            },
            {
              step: "2",
              title: "Add deductions and adjustments",
              desc: "Input common business expenses to lower your taxable net earnings.",
              icon: Receipt,
              color: "from-blue-500/20 to-blue-500/5",
            },
            {
              step: "3",
              title: "Select your filing status and state",
              desc: "Choose single, married, etc., and your state for comprehensive estimates.",
              icon: MapPin,
              color: "from-violet-500/20 to-violet-500/5",
            },
            {
              step: "4",
              title: "Get your results",
              desc: "View a breakdown: self-employment tax amount, deductible portion, estimated federal income tax, and total due.",
              icon: Calculator,
              color: "from-orange-500/20 to-orange-500/5",
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-info text-info-foreground flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 z-10">
                {item.step}
              </div>
              <div className={cn(
                "pt-8 p-5 rounded-2xl bg-gradient-to-br h-full border border-border hover:border-info/30 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1",
                item.color
              )}>
                <item.icon className="w-10 h-10 text-info/70 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-semibold text-foreground mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 text-center">
          Use these results to plan your{" "}
          <Link to="/calculator/quarterly" className="text-primary hover:underline">quarterly payments</Link> effectively.
        </p>
      </div>

      {/* Deductions section */}
      <div className="grid lg:grid-cols-5 gap-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Self-Employment Tax Calculator With Deductions
            </h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Deductions are crucial for self-employed individuals, as they directly reduce the net income subject 
            to self-employment tax. This lowers both your self-employment and income tax bills. Our calculator 
            includes a deductions input to show immediate savings.
          </p>

          <h4 className="font-semibold text-foreground mb-4">Common Self-Employment Tax Deductions</h4>

          <div className="grid sm:grid-cols-2 gap-3">
            {deductions
              .slice(0, showAllDeductions ? deductions.length : 6)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-info/5 border border-transparent hover:border-info/20 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <item.icon className="w-4 h-4 text-info" />
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
          </div>

          {deductions.length > 6 && (
            <button
              onClick={() => setShowAllDeductions(!showAllDeductions)}
              className="mt-4 text-primary hover:underline text-sm flex items-center gap-1 mx-auto"
            >
              {showAllDeductions ? "Show less" : `Show ${deductions.length - 6} more deductions`}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showAllDeductions && "rotate-180")} />
            </button>
          )}

          <p className="text-muted-foreground mt-6 text-sm">
            Accurate tracking ensures you maximize these to minimize taxes. Learn more about{" "}
            <Link to="/blog/write-off-groceries" className="text-primary hover:underline">what you can write off</Link>.
          </p>
        </div>

        {/* Savings guide */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-info/5 to-success/5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              How Much Should You Save?
            </h3>
          </div>

          <p className="text-muted-foreground mb-6 text-sm">
            A good benchmark is 25–35% of your net profit, depending on income level:
          </p>

          <div className="space-y-3">
            {savingsGuide.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-success/30 transition-colors"
              >
                <span className="text-foreground font-medium">{item.income}</span>
                <span className="text-success font-bold text-lg">{item.range}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Factor in deductions and use the calculator for a precise percentage. Set aside funds from each 
            payment to cover{" "}
            <Link to="/calculator/quarterly" className="text-primary hover:underline">quarterly estimates</Link>.
            See our guide on{" "}
            <Link to="/blog/how-much-to-set-aside" className="text-primary hover:underline">how much to set aside</Link>.
          </p>
        </div>
      </div>

      {/* SE Tax Rate section */}
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "250ms" }}>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              What Is the Self-Employment Tax Rate?
            </h3>
          </div>

          <p className="text-muted-foreground mb-6">
            The self-employment tax rate for 2025 is <strong className="text-foreground">15.3%</strong> on net earnings. 
            This breaks down into:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-info/5 border border-info/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-info" />
                Social Security Portion
              </h4>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">12.4%</strong> on net earnings up to the wage base of{" "}
                <strong className="text-foreground">$176,100</strong> in 2025. Earnings above this are exempt from the 
                Social Security part.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-success/5 border border-success/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Medicare Portion
              </h4>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">2.9%</strong> on all net earnings, with no upper limit. High earners 
                (over $200,000 single/$250,000 married) pay an additional <strong className="text-foreground">0.9%</strong> Medicare surtax.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                50% Deduction Benefit
              </h4>
              <p className="text-muted-foreground text-sm">
                You can deduct <strong className="text-foreground">50%</strong> of your self-employment tax from your 
                adjusted gross income, effectively reducing the rate to about <strong className="text-foreground">14.13%</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Federal Income Tax */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Federal Income Tax on Self-Employment
            </h3>
          </div>

          <p className="text-muted-foreground mb-4">
            In addition to self-employment tax, you'll pay federal income tax on your net business income. 
            Rates are progressive for 2025 (single filer example):
          </p>

          <div className="space-y-2">
            {taxBrackets
              .slice(0, showAllBrackets ? taxBrackets.length : 4)
              .map((bracket, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-success/5 transition-colors"
                >
                  <span className="text-foreground text-sm">{bracket.range}</span>
                  <span className="font-semibold text-success">{bracket.rate}</span>
                </div>
              ))}
          </div>

          {taxBrackets.length > 4 && (
            <button
              onClick={() => setShowAllBrackets(!showAllBrackets)}
              className="mt-3 text-primary hover:underline text-sm flex items-center gap-1"
            >
              {showAllBrackets ? "Show less" : `Show all ${taxBrackets.length} brackets`}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showAllBrackets && "rotate-180")} />
            </button>
          )}

          <p className="text-muted-foreground mt-4 text-sm">
            The calculator combines these with self-employment tax for a full picture. Compare with{" "}
            <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">W-2 employment taxes</Link>.
          </p>
        </div>
      </div>

      {/* State taxes section */}
      <div className="bg-gradient-to-br from-muted/50 to-card rounded-3xl border border-border p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            State Taxes on Self-Employment Income
          </h3>
        </div>

        <p className="text-muted-foreground mb-6 max-w-3xl">
          Most states tax self-employment income similarly to federal, but rates differ significantly:
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {stateTaxExamples.map((item, index) => (
            <div key={index} className="p-4 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">{item.type}</h4>
              <p className="text-muted-foreground text-sm">{item.states}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-6 text-sm">
          Select your state in the calculator for tailored estimates. Some states allow deductions mirroring federal ones. 
          Visit{" "}
          <a href="https://www.taxadmin.org/state-tax-rates" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            TaxAdmin.org <ExternalLink className="w-3 h-3" />
          </a>{" "}
          for current state tax rates.
        </p>
      </div>

      {/* Estimated payments section */}
      <div className="grid lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Self-Employment Estimated Tax Payments Explained
            </h3>
          </div>

          <p className="text-muted-foreground mb-4">
            Self-employed individuals must pay estimated taxes quarterly if expecting to owe{" "}
            <strong className="text-foreground">$1,000 or more</strong> annually. For 2025:
          </p>

          <div className="space-y-3">
            {[
              { quarter: "Q1", date: "April 15, 2025", period: "Jan–March" },
              { quarter: "Q2", date: "June 16, 2025", period: "April–May" },
              { quarter: "Q3", date: "September 15, 2025", period: "June–August" },
              { quarter: "Q4", date: "January 15, 2026", period: "Sep–December" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-info/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info font-bold text-sm">
                    {item.quarter}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{item.date}</p>
                    <p className="text-xs text-muted-foreground">{item.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-4 text-sm">
            The calculator can divide your annual estimate into quarters. Learn{" "}
            <Link to="/blog/missed-quarterly-payment" className="text-primary hover:underline">
              what happens if you miss a payment
            </Link>.
          </p>
        </div>

        {/* Is it free section */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-info/10 to-success/10 border border-info/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Is This a Free Self-Employment Tax Calculator?
            </h3>
          </div>

          <p className="text-muted-foreground mb-6">
            <strong className="text-foreground">Yes — fully free</strong> with:
          </p>

          <div className="space-y-3">
            {[
              { icon: Shield, text: "No registration or fees" },
              { icon: Calculator, text: "Unlimited estimates" },
              { icon: Users, text: "Easy-to-use interface for beginners" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <item.icon className="w-5 h-5 text-success" />
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Best for quick planning; for complex situations, pair with{" "}
            <Link to="/best-1099-tax-software" className="text-primary hover:underline">professional tax software</Link>.
          </p>

          <button
            onClick={scrollToCalculator}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-info text-info-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Calculate Your Self-Employment Tax Now
            <Briefcase className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            Frequently Asked Questions About Self-Employment Taxes
          </h3>
        </div>

        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-200"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    expandedFaq === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedFaq === index ? "max-h-48" : "max-h-0"
                )}
              >
                <div className="p-4 text-muted-foreground text-sm leading-relaxed border-t border-border bg-background">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "450ms" }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Important Tax Disclaimer</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This self-employment tax calculator provides estimates based on 2025 rates and is for informational purposes only. 
              It doesn't constitute tax advice, guarantee accuracy, or cover all scenarios like credits or special deductions. 
              Consult a tax professional or CPA for personalized guidance, as tax laws can change. Visit the{" "}
              <a href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                IRS self-employment tax page <ExternalLink className="w-3 h-3" />
              </a>{" "}
              for official information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSelfEmploymentSEOContent;
