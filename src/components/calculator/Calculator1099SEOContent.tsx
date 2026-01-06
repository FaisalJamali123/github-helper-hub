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
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is a 1099-NEC form?",
    answer: (
      <>
        The 1099-NEC reports non-employee compensation (freelance, contractor, gig work) of $600 or more from a single payer. 
        Learn more from the{" "}
        <a href="https://www.irs.gov/forms-pubs/about-form-1099-nec" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          official IRS 1099-NEC guide <ExternalLink className="w-3 h-3" />
        </a>.
      </>
    ),
  },
  {
    question: "Is 1099 tax higher than W-2?",
    answer: (
      <>
        Yes, because you pay both halves of Social Security and Medicare (15.3% self-employment tax), while W-2 employees split it with their employer. 
        Use our{" "}
        <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">1099 vs W2 calculator</Link> to compare the difference.
      </>
    ),
  },
  {
    question: "Do I pay taxes if I made under $600?",
    answer:
      "Yes — if your total self-employment net profit is $400 or more, you owe self-employment tax even if no 1099 was issued.",
  },
  {
    question: "Can I deduct expenses from 1099 income?",
    answer: (
      <>
        Yes — business expenses reduce your taxable income and are one of the biggest benefits of being self-employed. 
        Check out our guide on{" "}
        <Link to="/blog/write-off-groceries" className="text-primary hover:underline">what you can write off as a business expense</Link>.
      </>
    ),
  },
  {
    question: "Does this calculator include self-employment tax?",
    answer: (
      <>
        Yes — it calculates both federal income tax and the full 15.3% self-employment tax (with the deductible portion automatically applied). 
        For a detailed breakdown, try our dedicated{" "}
        <Link to="/calculator/self-employment" className="text-primary hover:underline">self-employment tax calculator</Link>.
      </>
    ),
  },
];

const deductions = [
  { text: "Home office (square footage method or simplified $5/sq ft)", icon: "🏠" },
  { text: "Internet, phone, and utilities (business-use percentage)", icon: "📱" },
  { text: "Software, apps, subscriptions (Adobe, Canva, QuickBooks, etc.)", icon: "💻" },
  { text: "Mileage (67 cents per mile in 2025) or actual vehicle expenses", icon: "🚗" },
  { text: "Supplies, equipment, and tools", icon: "🔧" },
  { text: "Advertising and marketing costs", icon: "📢" },
  { text: "Professional services (bookkeeping, legal, website)", icon: "👔" },
  { text: "Health insurance premiums (if self-employed)", icon: "🏥" },
  { text: "Retirement contributions (SEP-IRA, Solo 401(k))", icon: "💰" },
];

const whoShouldUse = [
  { icon: Briefcase, text: "Freelancers (writers, designers, developers, marketers)" },
  { icon: Users, text: "Gig workers (Uber, DoorDash, Instacart, TaskRabbit)" },
  { icon: FileText, text: "Independent contractors" },
  { icon: Calculator, text: "Consultants and coaches" },
  { icon: PiggyBank, text: "Self-employed individuals and sole proprietors" },
  { icon: TrendingUp, text: "Anyone with side hustle income on 1099 forms" },
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
  { income: "Low income (< $50k)", range: "25–28%" },
  { income: "Moderate ($50k–$100k)", range: "28–32%" },
  { income: "Higher income ($100k+)", range: "32–35%+" },
];

const Calculator1099SEOContent = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllDeductions, setShowAllDeductions] = useState(false);
  const [showAllBrackets, setShowAllBrackets] = useState(false);

  const scrollToCalculator = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mt-16 space-y-12">
      {/* Hero intro section with animated gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border p-8 sm:p-12 group">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Free Tool • 2025 Updated
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            Free 1099 Tax Calculator
            <span className="block text-xl sm:text-2xl font-normal text-muted-foreground mt-2">
              Estimate Your Self-Employment Taxes Accurately
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Use our <strong className="text-foreground">free 1099 tax calculator</strong> to 
            instantly estimate how much tax you owe on <strong className="text-foreground">1099 income</strong>. 
            Simply enter your total self-employment income, add any business deductions, select your state, 
            and get a clear breakdown of your federal income tax,{" "}
            <Link to="/calculator/self-employment" className="text-primary hover:underline">self-employment tax</Link>, and estimated state tax —
            updated for the <strong className="text-foreground">2025 tax year</strong> based on{" "}
            <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              IRS guidelines <ExternalLink className="w-3 h-3" />
            </a>.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {["No signup required", "No hidden fees", "Accurate estimates in seconds"].map(
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
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Calculating Now
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
            What Is a 1099 Tax Calculator and How Does It Work?
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">1099 tax calculator</strong> (also called a 
              <strong className="text-foreground"> 1099 income tax calculator</strong> or 
              <Link to="/calculator/self-employment" className="text-primary hover:underline"> self-employment tax calculator</Link>) is an online tool 
              that estimates the total taxes you owe on income reported on{" "}
              <a href="https://www.irs.gov/forms-pubs/about-form-1099-nec" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                1099-NEC <ExternalLink className="w-3 h-3" />
              </a> or{" "}
              <a href="https://www.irs.gov/forms-pubs/about-form-1099-misc" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                1099-MISC <ExternalLink className="w-3 h-3" />
              </a> forms.
            </p>
            <p>
              Unlike{" "}
              <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">W-2 employees</Link>, people who receive 1099 income (freelancers, contractors, gig workers) 
              have no taxes withheld by clients or platforms. This means you're responsible for both:
            </p>
          </div>
          
          <div className="grid gap-3 pt-2">
            {[
              { icon: DollarSign, text: "Federal income tax" },
              { icon: Percent, text: "Self-employment tax (Social Security + Medicare)" },
              { icon: MapPin, text: "State income tax (in most states)" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground">
            The calculator handles the math for you by applying current{" "}
            <a href="https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              federal tax brackets <ExternalLink className="w-3 h-3" />
            </a>, self-employment tax rates, standard deduction options, and common business deductions.
          </p>
        </div>

        {/* Who should use */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border hover:border-primary/20 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Who Should Use a 1099 Tax Calculator?
            </h3>
          </div>

          <p className="text-muted-foreground mb-6">
            This free tool is designed for:
          </p>

          <div className="grid gap-3">
            {whoShouldUse.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/80 border border-transparent hover:border-primary/20 transition-all duration-300 group cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            If you earn money outside of traditional employment and want to know how much to set aside for taxes, 
            this calculator is for you.
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
            How to Calculate 1099 Taxes Using This Calculator
          </h3>
        </div>

        <p className="text-muted-foreground mb-8">Follow these four simple steps:</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Enter your total 1099 income",
              desc: "Add up all payments received from clients, platforms, or apps (before any expenses).",
              icon: DollarSign,
              color: "from-emerald-500/20 to-emerald-500/5",
            },
            {
              step: "2",
              title: "Add your tax deductions",
              desc: "Input business expenses you can reasonably deduct (home office, supplies, mileage, software, etc.).",
              icon: Receipt,
              color: "from-blue-500/20 to-blue-500/5",
            },
            {
              step: "3",
              title: "Select your filing status and state",
              desc: "Choose single/married filing jointly and your state of residence.",
              icon: MapPin,
              color: "from-violet-500/20 to-violet-500/5",
            },
            {
              step: "4",
              title: "View your estimated tax results",
              desc: "See a breakdown of federal income tax, self-employment tax, estimated state tax, and total liability.",
              icon: Calculator,
              color: "from-orange-500/20 to-orange-500/5",
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 z-10">
                {item.step}
              </div>
              <div className={cn(
                "pt-8 p-5 rounded-2xl bg-gradient-to-br h-full border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1",
                item.color
              )}>
                <item.icon className="w-10 h-10 text-primary/70 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-semibold text-foreground mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions section */}
      <div className="grid lg:grid-cols-5 gap-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              1099 Tax Calculator With Deductions
            </h3>
          </div>
          
          <p className="text-muted-foreground mb-2">
            Deductions are the <strong className="text-foreground">#1 way 1099 workers lower their tax bill</strong>. 
            The more legitimate business expenses you claim, the less tax you pay.
          </p>
          <p className="text-muted-foreground mb-6">
            This calculator lets you input deductions directly so you can see real-world savings.
          </p>

          <h4 className="font-semibold text-foreground mb-4">Common 1099 Tax Deductions</h4>

          <div className="grid sm:grid-cols-2 gap-3">
            {deductions
              .slice(0, showAllDeductions ? deductions.length : 6)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-success/5 border border-transparent hover:border-success/20 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <span className="text-xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                  <span className="text-sm text-foreground">{item.text}</span>
                </div>
              ))}
          </div>

          {deductions.length > 6 && (
            <button
              onClick={() => setShowAllDeductions(!showAllDeductions)}
              className="mt-4 flex items-center gap-2 text-primary font-medium hover:underline transition-all duration-200 group"
            >
              {showAllDeductions ? "Show less" : `Show all ${deductions.length} deductions`}
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-300",
                showAllDeductions && "rotate-180"
              )} />
            </button>
          )}

          <p className="text-sm text-muted-foreground mt-6 p-4 rounded-xl bg-muted/30 border border-border">
            <strong className="text-foreground">Pro tip:</strong> The more accurately you track expenses, 
            the more powerful this 1099 deductions calculator becomes. Not sure what counts?{" "}
            <Link to="/blog/write-off-groceries" className="text-primary hover:underline">Learn what you can write off</Link>.
          </p>
        </div>

        {/* Tax rates card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-lg">What Is the Tax Rate for 1099 Income?</h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/80 border border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Self-Employment Tax</div>
                <div className="text-3xl font-bold text-primary">15.3%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  (12.4% Social Security + 2.9% Medicare)
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: You get to deduct 50% of the self-employment tax from your adjusted gross income.
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
                <div className="text-sm text-muted-foreground">Total Effective Tax Rate</div>
                <div className="text-xl font-bold text-foreground">25 – 33%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Most 1099 workers should plan to save this much of net profit
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
            How Much Should You Save for Taxes on 1099 Income?
          </h3>
        </div>

        <p className="text-muted-foreground mb-6 max-w-3xl">
          A safe rule of thumb based on your net profit level:
        </p>

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
            <strong>Best practice:</strong> Move 25–35% of every payment you receive into a separate tax savings 
            account immediately. This calculator helps you determine your exact target percentage.
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
              1099 Estimated Tax Payments Explained
            </h3>
          </div>

          <p className="text-muted-foreground mb-6 max-w-3xl">
            If you expect to owe <strong className="text-foreground">$1,000 or more</strong> in taxes for the year, 
            you're generally required to make quarterly estimated tax payments.
          </p>

          <h4 className="font-semibold text-foreground mb-4">Due dates (2025):</h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { date: "April 15", period: "Q1", note: "Jan-Mar income" },
              { date: "June 15", period: "Q2", note: "Apr-May income" },
              { date: "September 15", period: "Q3", note: "Jun-Aug income" },
              { date: "January 15", period: "Q4", note: "Sep-Dec income" },
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

          <p className="text-sm text-muted-foreground">
            Use our <Link to="/calculator/quarterly" className="text-primary hover:underline font-medium">quarterly tax calculator</Link> to estimate each 
            quarter's payment. Wondering{" "}
            <Link to="/blog/how-much-to-set-aside" className="text-primary hover:underline">how much to set aside for taxes</Link>? 
            We've got you covered. Pay via{" "}
            <a href="https://www.irs.gov/payments/direct-pay" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              IRS Direct Pay <ExternalLink className="w-3 h-3" />
            </a> to stay penalty-free.
          </p>
        </div>
      </div>

      {/* State taxes section */}
      <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            State Taxes on 1099 Income
          </h3>
        </div>

        <p className="text-muted-foreground mb-6">
          State income tax rates vary dramatically:
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
            <div className="font-semibold text-foreground mb-3">Low Rate States</div>
            <p className="text-sm text-muted-foreground">
              North Dakota, Pennsylvania (~3%)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-muted/50 border border-border hover:shadow-lg transition-all duration-300">
            <div className="font-semibold text-foreground mb-3">High Rate States</div>
            <p className="text-sm text-muted-foreground">
              California (up to 13.3%), New York (up to 10.9%), Oregon, Minnesota
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          This calculator includes state tax estimates for most states — select your state in the form above to see your specific rate. 
          For more details on state tax rates, visit your{" "}
          <a href="https://www.taxadmin.org/state-tax-agencies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            state's tax agency <ExternalLink className="w-3 h-3" />
          </a>.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["1099 tax calculator California", "1099 tax calculator Texas", "Michigan 1099 tax calculator", "New York 1099 tax calculator"].map((term) => (
            <span key={term} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Is this free section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-3xl border border-primary/20 p-8 sm:p-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">
            Is This a Free 1099 Tax Calculator?
          </h3>
        </div>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
          Yes — <strong className="text-foreground">100% free</strong>. Perfect for freelancers, gig workers, 
          and new self-employed individuals who want fast, no-strings estimates. Looking for more tools? 
          Check out our <Link to="/calculator/self-employment" className="text-primary hover:underline">self-employment tax calculator</Link>,{" "}
          <Link to="/calculator/quarterly" className="text-primary hover:underline">quarterly tax calculator</Link>, or{" "}
          <Link to="/calculator/1099-vs-w2" className="text-primary hover:underline">1099 vs W2 comparison tool</Link>.
        </p>

        <div className="flex flex-wrap gap-4">
          {["No email required", "No credit card needed", "No account creation", "Unlimited calculations"].map((item, index) => (
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
            Frequently Asked Questions About 1099 Taxes
          </h3>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                expandedFaq === index
                  ? "border-primary/30 bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/20"
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
                      ? "bg-primary text-primary-foreground rotate-180"
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
              This 1099 tax calculator provides estimates only based on current 2025 federal and state tax rates. 
              Results are not official tax advice, not guaranteed to match your final tax liability, and do not 
              account for every possible credit, deduction, or special situation. For personalized advice, consult 
              a certified tax professional or CPA, or use the official{" "}
              <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                IRS Tax Withholding Estimator <ExternalLink className="w-3 h-3" />
              </a>. Tax laws can change, and individual circumstances vary.
            </p>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      <div className="rounded-2xl bg-card border border-border p-6 animate-fade-in" style={{ animationDelay: "550ms" }}>
        <h4 className="font-semibold text-foreground mb-4 text-lg">Related Tax Resources</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/calculator/self-employment" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <Calculator className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Self-Employment Tax Calculator</div>
            <div className="text-sm text-muted-foreground">Calculate SE tax breakdown</div>
          </Link>
          <Link to="/calculator/quarterly" className="p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group">
            <Calendar className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Quarterly Tax Calculator</div>
            <div className="text-sm text-muted-foreground">Plan estimated payments</div>
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

export default Calculator1099SEOContent;
