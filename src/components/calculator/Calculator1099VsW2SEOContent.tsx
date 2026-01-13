import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  FileText, 
  Users,
  Building,
  TrendingUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  ExternalLink,
  Percent,
  Scale,
  Briefcase
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What's the main difference between 1099 and W-2?",
    answer: "1099 workers are independent contractors without tax withholding or benefits; W-2 are employees with automatic tax withholding and employer-provided benefits like health insurance and retirement contributions."
  },
  {
    question: "Do 1099 workers pay more taxes than W-2?",
    answer: "Yes, 1099 workers pay the full 15.3% self-employment tax (covering both employee and employer portions), while W-2 employees only pay 7.65%. However, 1099 workers can offset this with business deductions."
  },
  {
    question: "Can I switch from W-2 to 1099?",
    answer: "Yes, but it's a significant change that affects taxes, benefits, and legal status. Consult a tax professional before making the switch to understand all implications."
  },
  {
    question: "Is 1099 better for high earners?",
    answer: "Potentially, as 1099 workers can take more deductions and have more flexibility. However, the lack of benefits and higher tax burden means you need to calculate carefully for your specific situation."
  },
  {
    question: "Does the calculator include benefits costs?",
    answer: "Yes, our calculator estimates the value of W-2 benefits like health insurance and retirement matching to provide a true total compensation comparison."
  }
];

const deductions = [
  "Home office and utilities",
  "Mileage (70 cents/mile in 2026)",
  "Supplies and equipment",
  "Health insurance premiums",
  "Retirement contributions (SEP-IRA, Solo 401k)",
  "Professional development and training",
  "Software and subscriptions",
  "Marketing and advertising"
];

const whoShouldUse = [
  { icon: Users, text: "Freelancers considering a full-time job offer" },
  { icon: Building, text: "Employees thinking about going independent" },
  { icon: Briefcase, text: "Gig workers in rideshare, delivery, or platforms" },
  { icon: TrendingUp, text: "Consultants comparing contract vs. salary" },
  { icon: Calculator, text: "Job seekers negotiating work arrangements" },
  { icon: DollarSign, text: "Anyone comparing 1099 vs W-2 taxes" }
];

const taxBrackets = [
  { rate: "10%", single: "$0 – $11,925" },
  { rate: "12%", single: "$11,926 – $48,475" },
  { rate: "22%", single: "$48,476 – $103,350" },
  { rate: "24%", single: "$103,351 – $197,300" },
  { rate: "32%", single: "$197,301 – $250,525" },
  { rate: "35%", single: "$250,526 – $626,350" },
  { rate: "37%", single: "Over $626,350" }
];

const pros1099 = [
  "Higher potential earnings per hour",
  "Flexible schedule and work location",
  "Tax deductions for business expenses",
  "Control over your work and clients"
];

const cons1099 = [
  "No employer benefits or job security",
  "Full self-employment tax burden",
  "Must handle quarterly tax filings",
  "Income instability"
];

const prosW2 = [
  "Steady paycheck and benefits",
  "Employer handles tax withholding",
  "Legal protections (overtime, minimum wage)",
  "Unemployment insurance eligibility"
];

const consW2 = [
  "Less flexibility in schedule",
  "Lower gross pay potential",
  "More oversight and control",
  "Limited tax deduction options"
];

const Calculator1099VsW2SEOContent = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllDeductions, setShowAllDeductions] = useState(false);
  const [showAllBrackets, setShowAllBrackets] = useState(false);

  const scrollToCalculator = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      {/* Hero CTA Section */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Free • No Signup • 2026 Rates
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Free 1099 vs W-2 Calculator
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instantly compare the financial differences between working as an independent contractor (1099) and a traditional employee (W-2). Enter your gross income, expected deductions, filing status, and state to see breakdowns of taxes, net pay, and potential benefits costs — all updated for the 2026 tax year.
            </p>
            <p className="text-muted-foreground">
              No signup required. Accurate estimates based on current IRS rates. Start comparing now.
            </p>
            <Button size="lg" onClick={scrollToCalculator} className="gap-2">
              <Calculator className="w-5 h-5" />
              Launch the Free 1099 vs W-2 Calculator
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            What Is a 1099 vs W-2 Calculator and How Does It Work?
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              A <strong className="text-foreground">1099 vs W-2 calculator</strong> (also known as a contractor vs employee calculator) is an online tool that estimates the tax and financial impacts of two common work classifications: 1099 independent contractors and W-2 employees.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">1099 Workers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive Form 1099-NEC for non-employee compensation and handle their own taxes, including the full self-employment tax.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">W-2 Employees</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get Form W-2, with employers withholding taxes and covering half of Social Security and Medicare contributions.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The calculator uses your inputs to compute net take-home pay, factoring in federal income taxes, self-employment taxes (for 1099), FICA taxes (split for W-2), deductions, and state taxes. It's essential for understanding why 1099 income often requires setting aside more for taxes despite potentially higher gross pay.
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Who Should Use a 1099 vs W-2 Calculator?
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool is perfect for anyone comparing contractor vs employee status:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {whoShouldUse.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6">
            If you're debating between contractor vs employee status, this free calculator reveals the real bottom-line differences.
          </p>
        </div>
      </section>

      {/* How To Calculate Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            How to Calculate 1099 vs W-2 Differences Using This Tool
          </h2>
          <p className="text-muted-foreground mb-6">
            Follow these steps for accurate results:
          </p>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Enter your gross annual income",
                description: "Input the total earnings before taxes or deductions — use the same amount for both scenarios to compare apples-to-apples."
              },
              {
                step: 2,
                title: "Add deductions (primarily for 1099)",
                description: "Include business expenses like home office, mileage, or supplies that reduce taxable income for contractors."
              },
              {
                step: 3,
                title: "Select filing status and state",
                description: "Choose single, married filing jointly, etc., and your state for precise tax estimates."
              },
              {
                step: 4,
                title: "Review the side-by-side comparison",
                description: "See breakdowns: taxes owed, net pay, self-employment tax impact, and estimated benefits value."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-card border border-border rounded-lg p-5">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button onClick={scrollToCalculator} variant="outline" className="gap-2">
              <Calculator className="w-4 h-4" />
              Estimate Your 1099 vs W-2 Take-Home Pay
            </Button>
          </div>
        </div>
      </section>

      {/* Key Differences Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Key Differences Between 1099 and W-2 Workers
          </h2>
          <p className="text-muted-foreground mb-6">
            Understanding the core distinctions is crucial for making an informed decision:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-card border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Aspect</th>
                  <th className="text-left p-4 font-semibold text-foreground">1099 Contractor</th>
                  <th className="text-left p-4 font-semibold text-foreground">W-2 Employee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-medium text-foreground">Classification</td>
                  <td className="p-4 text-muted-foreground">Independent with flexibility</td>
                  <td className="p-4 text-muted-foreground">Employee with set hours</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">Tax Handling</td>
                  <td className="p-4 text-muted-foreground">Pay quarterly estimates</td>
                  <td className="p-4 text-muted-foreground">Automatic withholding</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">Benefits</td>
                  <td className="p-4 text-muted-foreground">Cover your own</td>
                  <td className="p-4 text-muted-foreground">Employer-provided</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">Stability</td>
                  <td className="p-4 text-muted-foreground">Variable income</td>
                  <td className="p-4 text-muted-foreground">Steady paycheck</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tax Implications Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Tax Implications: 1099 vs W-2
          </h2>
          <p className="text-muted-foreground mb-6">
            Taxes are the biggest differentiator between these work classifications:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Self-Employment Tax (1099)</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                <strong className="text-foreground">15.3%</strong> on net earnings: 12.4% Social Security (up to $176,100) + 2.9% Medicare (no limit). You pay the full amount but deduct half.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">FICA Tax (W-2)</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                <strong className="text-foreground">7.65%</strong> withheld from your pay. Your employer pays a matching 7.65% on your behalf.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Federal Income Tax Brackets (2026 Single Filer)</h3>
            <div className="space-y-2">
              {taxBrackets.slice(0, showAllBrackets ? undefined : 4).map((bracket, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="font-medium text-primary">{bracket.rate}</span>
                  <span className="text-muted-foreground">{bracket.single}</span>
                </div>
              ))}
            </div>
            {taxBrackets.length > 4 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAllBrackets(!showAllBrackets)}
                className="mt-4 w-full"
              >
                {showAllBrackets ? (
                  <><ChevronUp className="w-4 h-4 mr-2" /> Show Less</>
                ) : (
                  <><ChevronDown className="w-4 h-4 mr-2" /> Show All Brackets</>
                )}
              </Button>
            )}
          </div>

          <p className="text-muted-foreground mt-6">
            1099 workers often "pay more" due to the full self-employment tax but can offset with business deductions.
          </p>
        </div>
      </section>

      {/* Benefits Comparison Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Benefits and Perks: 1099 vs W-2 Comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                W-2 Benefits
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Employer-sponsored health insurance, 401(k) matching, paid vacation, unemployment insurance — often worth <strong className="text-foreground">20-30% of salary</strong>.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                1099 Perks
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                None provided, but you can deduct health premiums and set up your own retirement plans (e.g., SEP-IRA). However, costs add up quickly.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-6">
            The calculator estimates the "hidden value" of W-2 benefits to show true total compensation.
          </p>
        </div>
      </section>

      {/* Pros and Cons Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Pros and Cons of 1099 vs W-2
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1099 Pros/Cons */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                1099 Contractor
              </h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Pros
                </h4>
                <ul className="space-y-2">
                  {pros1099.map((pro, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" /> Cons
                </h4>
                <ul className="space-y-2">
                  {cons1099.map((con, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* W-2 Pros/Cons */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                W-2 Employee
              </h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Pros
                </h4>
                <ul className="space-y-2">
                  {prosW2.map((pro, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" /> Cons
                </h4>
                <ul className="space-y-2">
                  {consW2.map((con, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Difference Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            How Much More Do 1099 Workers Pay in Taxes?
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              On average, 1099 workers effectively pay about <strong className="text-foreground">7.65% more</strong> in payroll taxes since they cover the employer's share.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">$15,300</div>
                <div className="text-sm text-muted-foreground">1099 self-employment tax on $100K</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">$7,650</div>
                <div className="text-sm text-muted-foreground">W-2 FICA withheld on $100K</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Deductions can reduce this gap — input yours in the calculator to see your personalized comparison.
            </p>
          </div>
        </div>
      </section>

      {/* Deductions Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            1099 vs W-2 Calculator With Deductions
          </h2>
          <p className="text-muted-foreground mb-6">
            Deductions are a 1099 advantage that can significantly reduce your tax burden:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {deductions.slice(0, showAllDeductions ? undefined : 6).map((deduction, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{deduction}</span>
              </div>
            ))}
          </div>
          {deductions.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllDeductions(!showAllDeductions)}
              className="mt-4"
            >
              {showAllDeductions ? (
                <><ChevronUp className="w-4 h-4 mr-2" /> Show Less</>
              ) : (
                <><ChevronDown className="w-4 h-4 mr-2" /> Show All Deductions</>
              )}
            </Button>
          )}
          <p className="text-muted-foreground mt-6">
            The tool factors these deductions in to show how they lower 1099 taxes, potentially making net pay comparable to W-2.
          </p>
        </div>
      </section>

      {/* State Taxes Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            State Taxes: 1099 vs W-2 Considerations
          </h2>
          <p className="text-muted-foreground mb-6">
            State income taxes apply similarly to both classifications, but 1099 workers may face additional considerations. No-tax states (e.g., Texas, Florida) benefit both, but high-tax states (e.g., California) can hit 1099 workers harder without automatic withholdings.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-3">No Income Tax States</h3>
              <p className="text-sm text-muted-foreground">
                Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-3">High Tax States</h3>
              <p className="text-sm text-muted-foreground">
                California (up to 13.3%), New York (up to 10.9%), Hawaii (up to 11%)
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-6">
            Select your state in the calculator above for customized estimates.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Frequently Asked Questions About 1099 vs W-2
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">
              Important Tax Disclaimer
            </h2>
            <p className="text-sm text-muted-foreground">
              This 1099 vs W-2 calculator provides estimates based on 2026 federal and state rates. It's not official tax or financial advice and doesn't account for all credits, unique situations, or changes in law. Results may vary; consult a CPA or tax professional for personalized guidance. Use{" "}
              <a 
                href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                IRS resources <ExternalLink className="w-3 h-3" />
              </a>{" "}
              for verification.
            </p>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Related Tax Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              to="/calculator/1099"
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
            >
              <Calculator className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">1099 Tax Calculator</div>
                <div className="text-sm text-muted-foreground">Full 1099 income tax estimates</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </Link>
            <Link 
              to="/calculator/self-employment"
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
            >
              <Briefcase className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">Self-Employment Tax Calculator</div>
                <div className="text-sm text-muted-foreground">Calculate SE tax obligations</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </Link>
            <Link 
              to="/calculator/quarterly"
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">Quarterly Tax Calculator</div>
                <div className="text-sm text-muted-foreground">Plan your estimated payments</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </Link>
            <Link 
              to="/blog/how-much-to-set-aside"
              className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
            >
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">How Much to Set Aside</div>
                <div className="text-sm text-muted-foreground">Tax savings guide for freelancers</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Ready to Compare Your Options?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use our free 1099 vs W-2 calculator to see which work arrangement puts more money in your pocket.
          </p>
          <Button size="lg" onClick={scrollToCalculator} className="gap-2">
            <Scale className="w-5 h-5" />
            Try the Free 1099 vs W-2 Calculator Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Calculator1099VsW2SEOContent;
