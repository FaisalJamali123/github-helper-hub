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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "When are quarterly taxes due in 2025?",
    answer: (
      <>
        The due dates are April 15, June 16, September 15, 2025, and January 15, 2026. Check the{" "}
        <a href="https://www.irs.gov/payments/pay-as-you-go-so-you-wont-owe-a-guide-to-withholding-estimated-taxes-and-ways-to-avoid-the-estimated-tax-penalty" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          IRS estimated tax guide <ExternalLink className="w-3 h-3" />
        </a> for more details.
      </>
    ),
  },
  {
    question: "Do I have to pay quarterly taxes if I made under a certain amount?",
    answer:
      "No, if you expect to owe less than $1,000 after withholding and credits, you don't need to make estimated payments.",
  },
  {
    question: "What's the penalty for not paying quarterly taxes?",
    answer: (
      <>
        Underpayment penalty is typically 5–8% annually, based on the federal short-term rate plus 3%. Learn more about{" "}
        <Link to="/blog/missed-quarterly-payment" className="text-primary hover:underline">what happens when you miss a payment</Link>.
      </>
    ),
  },
  {
    question: "Can I use deductions in my quarterly estimates?",
    answer: (
      <>
        Yes — include them to lower your payments; true up at year-end filing. See our guide on{" "}
        <Link to="/blog/write-off-groceries" className="text-primary hover:underline">common business deductions</Link>.
      </>
    ),
  },
  {
    question: "Does this calculator handle state taxes?",
    answer:
      "Yes, it provides estimates for most states. Confirm with your state's revenue department for exact rates and due dates, which often align with federal ones.",
  },
];

const deductions = [
  { text: "Home office expenses (actual costs or simplified method at $5/sq ft)", icon: Home },
  { text: "Vehicle mileage (67 cents per mile for 2025) or actual expenses", icon: Car },
  { text: "Supplies, equipment, and software", icon: Receipt },
  { text: "Advertising and marketing fees", icon: TrendingUp },
  { text: "Professional services (e.g., accounting, legal)", icon: Briefcase },
  { text: "Health insurance premiums for self-employed", icon: Shield },
  { text: "Retirement contributions (e.g., SEP-IRA up to 25% of net earnings)", icon: PiggyBank },
  { text: "Half of your self-employment tax (automatically deducted)", icon: Percent },
];

const whoShouldUse = [
  { icon: Briefcase, text: "Self-employed individuals and sole proprietors" },
  { icon: FileText, text: "Freelancers and independent contractors receiving 1099 forms" },
  { icon: Users, text: "Gig economy workers (e.g., rideshare drivers, delivery apps)" },
  { icon: Building, text: "Business owners with S-corp or partnership income" },
  { icon: TrendingUp, text: "Investors with significant capital gains or rental income" },
  { icon: PiggyBank, text: "Retirees with pension or investment income not fully withheld" },
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
  { income: "Low earners", range: "20–25%" },
  { income: "Mid-range", range: "25–30%" },
  { income: "High earners", range: "30–40%+" },
];

const CalculatorQuarterlySEOContent = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllDeductions, setShowAllDeductions] = useState(false);
  const [showAllBrackets, setShowAllBrackets] = useState(false);

  const scrollToCalculator = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mt-16 space-y-12">
      {/* Hero intro section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-success/10 via-background to-primary/10 border border-border p-8 sm:p-12 group">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-success/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Free Tool • 2025 Updated
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            Free Quarterly Tax Calculator
            <span className="block text-xl sm:text-2xl font-normal text-muted-foreground mt-2">
              Estimate Your Estimated Payments Accurately
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Use our <strong className="text-foreground">free quarterly tax calculator</strong> to quickly estimate your 
            required estimated tax payments for the year. Input your projected income, deductions, and filing status to 
            get a breakdown of federal income tax,{" "}
            <Link to="/calculator/self-employment" className="text-primary hover:underline">self-employment tax</Link>, and 
            state tax estimates — divided into four quarterly installments. Updated for the{" "}
            <strong className="text-foreground">2025 tax year</strong>, this tool helps you avoid underpayment penalties 
            and plan your cash flow effectively based on{" "}
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              IRS guidelines <ExternalLink className="w-3 h-3" />
            </a>.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {["No registration needed", "Instant results", "Avoid penalties"].map(
              (tag, index) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-4 h-4 text-success" />
                  {tag}
                </span>
              )
            )}
          </div>

          <button
            onClick={scrollToCalculator}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-success text-success-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Launch the Free Quarterly Tax Calculator
            <Calendar className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
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
            What Is a Quarterly Tax Calculator and How Does It Work?
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">quarterly tax calculator</strong> (also known as an 
              <strong className="text-foreground"> estimated tax calculator</strong> or 
              <strong className="text-foreground"> 1099 quarterly tax estimator</strong>) is an online tool 
              designed to help self-employed individuals and others with non-withheld income figure out how 
              much to pay the IRS each quarter.
            </p>
            <p>
              Unlike traditional employees whose taxes are withheld from paychecks, people with{" "}
              <Link to="/calculator/1099" className="text-primary hover:underline">1099 income</Link>, 
              business profits, or other untaxed earnings must make proactive payments.
            </p>
          </div>
          
          <div className="space-y-3 pt-2">
            <p className="text-sm font-medium text-foreground">The calculator uses your inputs to:</p>
            {[
              "Estimate annual tax liability based on current rates",
              "Divide that amount into four quarterly payments",
              "Account for self-employment tax (15.3% for 2025), federal income tax brackets, and state taxes",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 group"
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-sm">
            It applies{" "}
            <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              IRS rules <ExternalLink className="w-3 h-3" />
            </a>, like the $1,000 threshold for required payments, to ensure accuracy.
          </p>
        </div>

        {/* Who should use */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-success/5 to-primary/5 border border-border hover:border-success/20 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Who Should Use a Quarterly Tax Calculator?
            </h3>
          </div>

          <p className="text-muted-foreground mb-4">
            This tool is essential for anyone who doesn't have taxes automatically withheld and expects to owe 
            at least <strong className="text-foreground">$1,000 in taxes</strong> for the year:
          </p>

          <div className="grid gap-3">
            {whoShouldUse.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/80 border border-transparent hover:border-success/20 transition-all duration-300 group cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-success/20 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-success" />
                </div>
                <span className="text-foreground text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            If your income fluctuates or you're new to self-employment, using a{" "}
            <strong className="text-foreground">free estimated tax calculator</strong> can prevent surprises at tax time.
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
            How to Calculate Quarterly Taxes Using This Calculator
          </h3>
        </div>

        <p className="text-muted-foreground mb-8">
          Estimating quarterly taxes is straightforward with our tool. Here's a step-by-step guide:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Enter your projected annual income",
              desc: "Include all expected earnings from self-employment, gigs, or other sources before deductions.",
              icon: DollarSign,
              color: "from-emerald-500/20 to-emerald-500/5",
            },
            {
              step: "2",
              title: "Input your business deductions and credits",
              desc: "Add expenses like home office, mileage, supplies, and any tax credits to reduce your taxable income.",
              icon: Receipt,
              color: "from-blue-500/20 to-blue-500/5",
            },
            {
              step: "3",
              title: "Select your filing status and state",
              desc: "Choose single, married filing jointly, etc., and your residence state for accurate estimates.",
              icon: MapPin,
              color: "from-violet-500/20 to-violet-500/5",
            },
            {
              step: "4",
              title: "Review your quarterly breakdown",
              desc: "See total estimated annual tax, amount due per quarter, and due dates for 2025 payments.",
              icon: Calendar,
              color: "from-orange-500/20 to-orange-500/5",
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 z-10">
                {item.step}
              </div>
              <div className={cn(
                "pt-8 p-5 rounded-2xl bg-gradient-to-br h-full border border-border hover:border-success/30 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1",
                item.color
              )}>
                <item.icon className="w-10 h-10 text-success/70 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-semibold text-foreground mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 text-center">
          This helps you <strong className="text-foreground">calculate quarterly taxes</strong> precisely and set aside funds accordingly.
        </p>
      </div>

      {/* Deductions section */}
      <div className="grid lg:grid-cols-5 gap-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Quarterly Tax Calculator With Deductions
            </h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Deductions play a crucial role in lowering your estimated payments. By subtracting legitimate business 
            expenses from your gross income, you reduce your net profit — and thus your tax liability. Our quarterly 
            tax calculator includes a deductions section for easy input.
          </p>

          <h4 className="font-semibold text-foreground mb-4">Common Deductions for Quarterly Tax Estimates</h4>

          <div className="grid sm:grid-cols-2 gap-3">
            {deductions
              .slice(0, showAllDeductions ? deductions.length : 6)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-success/5 border border-transparent hover:border-success/20 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
          </div>

          {deductions.length > 6 && (
            <button
              onClick={() => setShowAllDeductions(!showAllDeductions)}
              className="mt-4 flex items-center gap-2 text-success font-medium hover:underline transition-all duration-200 group"
            >
              {showAllDeductions ? "Show less" : `Show all ${deductions.length} deductions`}
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-300",
                showAllDeductions && "rotate-180"
              )} />
            </button>
          )}

          <p className="text-sm text-muted-foreground mt-6 p-4 rounded-xl bg-muted/30 border border-border">
            <strong className="text-foreground">Pro tip:</strong> Tracking these throughout the year makes your quarterly 
            estimates more accurate and can significantly cut what you owe. Need help with deductions?{" "}
            <Link to="/blog/write-off-groceries" className="text-primary hover:underline">Learn what you can write off</Link>.
          </p>
        </div>

        {/* Tax rates card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl border border-success/20 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-success" />
              </div>
              <h4 className="font-semibold text-foreground text-lg">What Are the Tax Rates?</h4>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Quarterly payments cover the same taxes as your annual return, broken into installments.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/80 border border-success/10">
                <div className="text-sm text-muted-foreground mb-1">Self-Employment Tax (2025)</div>
                <div className="text-3xl font-bold text-success">15.3%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  12.4% Social Security (up to $176,100) + 2.9% Medicare (no limit)
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  You can deduct 50% of this from your income tax. Use our{" "}
                  <Link to="/calculator/self-employment" className="text-primary hover:underline">SE tax calculator</Link> for details.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/80 border border-border">
                <div className="text-sm text-muted-foreground mb-2">Federal Income Tax (2025 – Single)</div>
                <div className="space-y-1.5">
                  {taxBrackets.slice(0, showAllBrackets ? taxBrackets.length : 4).map((bracket, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{bracket.range}</span>
                      <span className="font-semibold text-foreground">{bracket.rate}</span>
                    </div>
                  ))}
                </div>
                {taxBrackets.length > 4 && (
                  <button
                    onClick={() => setShowAllBrackets(!showAllBrackets)}
                    className="mt-2 text-xs text-primary hover:underline"
                  >
                    {showAllBrackets ? "Show less" : "Show all brackets"}
                  </button>
                )}
              </div>

              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                <div className="text-sm text-muted-foreground">Typical Effective Rate</div>
                <div className="text-xl font-bold text-foreground">25 – 35%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Many set aside this much, but use the calculator for a personalized estimate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How much to save section */}
      <div className="bg-gradient-to-r from-success/5 via-background to-success/5 rounded-3xl border border-success/20 p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "250ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <PiggyBank className="w-6 h-6 text-success" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            How Much Should You Save for Quarterly Taxes?
          </h3>
        </div>

        <p className="text-muted-foreground mb-4 max-w-3xl">
          To avoid penalties, aim to pay at least <strong className="text-foreground">90% of your current year's tax</strong> or{" "}
          <strong className="text-foreground">100% of last year's</strong> (110% if AGI &gt; $150,000).
        </p>

        <p className="text-muted-foreground mb-6">Saving strategy based on your net income:</p>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {savingsGuide.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-card border border-border hover:border-success/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="text-sm text-muted-foreground mb-2">{item.income}</div>
              <div className="text-3xl font-bold text-success group-hover:scale-105 transition-transform duration-300">
                {item.range}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-sm text-foreground">
            <strong>Best practice:</strong> Update your estimates quarterly as income changes. Use the calculator 
            to adjust savings monthly. Learn more in our guide:{" "}
            <Link to="/blog/how-much-to-set-aside" className="text-primary hover:underline">How much to set aside for 1099 taxes</Link>.
          </p>
        </div>
      </div>

      {/* Quarterly payments section */}
      <div className="relative overflow-hidden rounded-3xl bg-warning/5 border border-warning/20 p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="absolute top-4 right-4 opacity-10">
          <Clock className="w-32 h-32 text-warning" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Quarterly Estimated Tax Payments Explained
            </h3>
          </div>

          <p className="text-muted-foreground mb-6 max-w-3xl">
            Estimated taxes are prepaid installments to cover what you owe. For 2025, here are the due dates:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { date: "April 15, 2025", period: "Q1", note: "Covers Jan–March" },
              { date: "June 16, 2025", period: "Q2", note: "Covers April–May (June 15 = Sunday)" },
              { date: "September 15, 2025", period: "Q3", note: "Covers June–August" },
              { date: "January 15, 2026", period: "Q4", note: "Covers September–December" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-background border border-warning/20 hover:border-warning/40 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-xs font-semibold text-warning uppercase tracking-wider mb-1">
                  {item.period}
                </div>
                <div className="text-xl font-bold text-foreground group-hover:text-warning transition-colors duration-200">
                  {item.date}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.note}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <p>
              Pay via{" "}
              <a href="https://www.irs.gov/payments/direct-pay" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                IRS Direct Pay <ExternalLink className="w-3 h-3" />
              </a>,{" "}
              <a href="https://www.eftps.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                EFTPS <ExternalLink className="w-3 h-3" />
              </a>, or your tax software.
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2 text-destructive font-medium mb-1">
              <AlertTriangle className="w-4 h-4" />
              Penalty Warning
            </div>
            <p className="text-sm text-muted-foreground">
              Late payments incur penalties (about 0.5% per month). Not sure what happens?{" "}
              <Link to="/blog/missed-quarterly-payment" className="text-primary hover:underline">Read our guide on missed payments</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* State taxes section */}
      <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            State Taxes in Quarterly Estimates
          </h3>
        </div>

        <p className="text-muted-foreground mb-6">
          While federal quarterly payments go to the IRS, many states require their own estimated payments. Rates vary dramatically:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-success/10 border border-success/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-semibold text-foreground">No State Income Tax</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/50 border border-border hover:shadow-lg transition-all duration-300">
            <div className="font-semibold text-foreground mb-3">Flat Rate States</div>
            <p className="text-sm text-muted-foreground">
              Illinois (4.95%), Pennsylvania (3.07%)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/50 border border-border hover:shadow-lg transition-all duration-300">
            <div className="font-semibold text-foreground mb-3">Progressive High Rates</div>
            <p className="text-sm text-muted-foreground">
              California (up to 13.3%), Hawaii (up to 11%)
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Our calculator includes state estimates; check your{" "}
          <a href="https://www.taxadmin.org/state-tax-agencies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            state's revenue department <ExternalLink className="w-3 h-3" />
          </a> for exact due dates, which often align with federal ones.
        </p>
      </div>

      {/* Is this free section */}
      <div className="bg-gradient-to-br from-success/10 via-background to-primary/10 rounded-3xl border border-success/20 p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-success" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            Is This a Free Quarterly Tax Calculator?
          </h3>
        </div>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
          Yes — <strong className="text-foreground">completely free</strong>. Ideal for quick checks or detailed planning 
          without commitment. Looking for more tools? Try our{" "}
          <Link to="/calculator/1099" className="text-primary hover:underline">1099 tax calculator</Link>,{" "}
          <Link to="/calculator/self-employment" className="text-primary hover:underline">self-employment tax calculator</Link>, or{" "}
          <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">1099 vs W2 comparison tool</Link>.
        </p>

        <div className="flex flex-wrap gap-4">
          {["No sign-up or email required", "Unlimited uses", "Mobile-friendly interface"].map((item, index) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CheckCircle className="w-4 h-4" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: "450ms" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            Frequently Asked Questions About Quarterly Taxes
          </h3>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                expandedFaq === index
                  ? "border-success/30 bg-success/5 shadow-md"
                  : "border-border bg-card hover:border-success/20"
              )}
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-foreground pr-4 text-lg">
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                    expandedFaq === index
                      ? "bg-success text-success-foreground rotate-180"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  expandedFaq === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl bg-muted/50 border border-border p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-lg">
              Important Tax Disclaimer
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              This quarterly tax calculator offers estimates based on 2025 federal and state rates. It's not official 
              tax advice, doesn't guarantee exact amounts, and may not cover all credits, deductions, or unique situations. 
              Tax laws change, so consult a tax professional or CPA for personalized guidance. Use{" "}
              <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                IRS resources <ExternalLink className="w-3 h-3" />
              </a> for official information.
            </p>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in" style={{ animationDelay: "550ms" }}>
        <h4 className="font-semibold text-foreground mb-4 text-lg">Related Tax Resources</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/calculator/1099" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <Calculator className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">1099 Tax Calculator</div>
            <div className="text-sm text-muted-foreground">Full tax breakdown</div>
          </Link>
          <Link to="/calculator/self-employment" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <Percent className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Self-Employment Tax Calculator</div>
            <div className="text-sm text-muted-foreground">Calculate SE tax breakdown</div>
          </Link>
          <Link to="/calculator/1099-vs-w2" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <TrendingUp className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">1099 vs W2 Calculator</div>
            <div className="text-sm text-muted-foreground">Compare take-home pay</div>
          </Link>
          <Link to="/blog/how-much-to-set-aside" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <PiggyBank className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Tax Savings Guide</div>
            <div className="text-sm text-muted-foreground">How much to set aside</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorQuarterlySEOContent;
