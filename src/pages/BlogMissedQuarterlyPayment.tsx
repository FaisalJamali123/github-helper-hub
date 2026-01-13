import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Calculator, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, generateArticleSchema, generateFAQPageSchema } from "@/components/shared/StructuredData";
import { TAX_CONSTANTS_2026, formatCurrency } from "@/lib/taxCalculations";

const BlogMissedQuarterlyPayment = () => {
  const [amountOwed, setAmountOwed] = useState<string>("5000");
  const [daysMissed, setDaysMissed] = useState<string>("90");
  const [penaltyAmount, setPenaltyAmount] = useState<number>(0);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [displayPenalty, setDisplayPenalty] = useState<number>(0);

  // Calculate penalty
  useEffect(() => {
    const owed = parseFloat(amountOwed) || 0;
    const days = parseFloat(daysMissed) || 0;
    const dailyRate = TAX_CONSTANTS_2026.UNDERPAYMENT_PENALTY_RATE / 365;
    const penalty = owed * dailyRate * days;
    setPenaltyAmount(penalty);
  }, [amountOwed, daysMissed]);

  // Dramatic count-up effect
  useEffect(() => {
    if (isCountingUp && penaltyAmount > 0) {
      setDisplayPenalty(0);
      let current = 0;
      const increment = penaltyAmount / 50;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= penaltyAmount) {
          setDisplayPenalty(penaltyAmount);
          setIsCountingUp(false);
          clearInterval(interval);
        } else {
          setDisplayPenalty(current);
        }
      }, 40);
      
      return () => clearInterval(interval);
    } else {
      setDisplayPenalty(penaltyAmount);
    }
  }, [isCountingUp, penaltyAmount]);

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Blog", url: "https://moneygrowtools.com/blog" },
    { name: "Missed Quarterly Payment", url: "https://moneygrowtools.com/blog/missed-quarterly-payment" },
  ];

  const articleSchema = generateArticleSchema({
    headline: "What Happens If You Miss a Quarterly Tax Payment in 2026",
    description: "Learn about IRS penalties for missed estimated tax payments and how to minimize the damage.",
    datePublished: "2025-01-01",
    dateModified: "2026-01-13",
    url: "https://moneygrowtools.com/blog/missed-quarterly-payment",
  });

  const faqSchema = generateFAQPageSchema([
    { question: "What is the IRS penalty for missing quarterly payments?", answer: "The IRS charges approximately 8% annually (federal short-term rate + 3%) on underpayments, calculated daily from the due date until you pay. A $10,000 underpayment for one quarter could cost $200+ in penalties." },
    { question: "What is the safe harbor rule for quarterly taxes?", answer: "You can avoid penalties by paying at least 90% of your current year's tax liability, OR 100% of last year's tax (110% if income exceeded $150,000), OR if you owe less than $1,000 when you file." },
    { question: "Can I get IRS penalties waived?", answer: "Yes, in some cases. The IRS may waive or reduce penalties for reasonable cause (serious illness, natural disaster), first-time penalty abatement (clean record for 3 years), or if you became disabled or retired during the tax year." },
    { question: "What should I do if I've already missed a payment?", answer: "Pay as soon as possible (penalty accrues daily), pay online at IRS.gov using Direct Pay, increase remaining quarterly payments to catch up, and don't skip the next payment—missing multiple quarters compounds penalties." },
    { question: "How can I prevent missing quarterly payments?", answer: "Set calendar reminders 2 weeks before each deadline, use EFTPS to schedule payments in advance, and save 25-30% of every payment in a dedicated tax savings account." }
  ]);

  return (
    <Layout>
      <SEOHead
        title="What Happens If You Miss a Quarterly Tax Payment | IRS Penalties 2026"
        description="Missed a quarterly estimated tax payment? Learn about IRS penalties (approximately 8% annually), how to calculate what you owe, and strategies to minimize damage."
        canonicalUrl="https://moneygrowtools.com/blog/missed-quarterly-payment"
        ogType="article"
        keywords={["missed quarterly tax payment", "IRS underpayment penalty", "estimated tax penalty", "late tax payment"]}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbItems), articleSchema, faqSchema]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li><Link to="/#blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Missed Quarterly Payment</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-destructive text-sm font-medium mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Avoid Penalties</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              What Happens If You Miss a Quarterly Tax Payment
            </h1>
            <p className="text-lg text-muted-foreground">
              The IRS charges approximately <strong className="text-destructive">8% annual interest</strong> on underpayments. 
              Here's exactly what you owe and how to minimize the damage.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Updated: January 2026</span>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </header>

          {/* TL;DR */}
          <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-lg p-6 mb-8">
            <h2 className="font-heading font-semibold text-foreground mb-2">TL;DR</h2>
            <p className="text-muted-foreground">
              If you miss a quarterly payment, the IRS charges a penalty based on the federal short-term rate + 3% 
              (about <strong>8% annually</strong> in 2026). Penalty is calculated daily from the due date until you pay. 
              A $10,000 underpayment for one quarter could cost <strong>$200+ in penalties</strong>. But there's a 
              <strong className="text-success"> safe harbor</strong> that can protect you.
            </p>
          </div>

          {/* Interactive Penalty Calculator */}
          <div className="bg-card rounded-xl border-2 border-destructive/30 p-6 sm:p-8 mb-8 shadow-soft">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-destructive" />
              IRS Penalty Calculator
            </h2>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amountOwed" className="text-foreground font-medium mb-2 block">
                    Amount Underpaid
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amountOwed"
                      type="number"
                      value={amountOwed}
                      onChange={(e) => setAmountOwed(e.target.value)}
                      className="pl-9 calc-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="daysMissed" className="text-foreground font-medium mb-2 block">
                    Days Past Due
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="daysMissed"
                      type="number"
                      value={daysMissed}
                      onChange={(e) => setDaysMissed(e.target.value)}
                      className="pl-9 calc-input"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setIsCountingUp(true)}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Calculate My Penalty
              </Button>

              {/* Penalty Display */}
              <div className="bg-destructive/10 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Estimated IRS Penalty</p>
                <p className="text-4xl font-heading font-bold text-destructive">
                  {formatCurrency(displayPenalty)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on ~{(TAX_CONSTANTS_2026.UNDERPAYMENT_PENALTY_RATE * 100).toFixed(0)}% annual rate
                </p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Note: This is an estimate. Actual penalty calculated using IRS Form 2210.
              </p>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none">
            <h2>How the IRS Underpayment Penalty Works</h2>
            <p>
              The IRS underpayment penalty is essentially <strong>interest on late taxes</strong>. It's calculated using 
              the federal short-term rate plus 3 percentage points. As of 2026, this works out to approximately 
              <strong> 8% annually</strong>, or about <strong>0.022% per day</strong>.
            </p>

            <p>The penalty is calculated from the quarterly due date until either:</p>
            <ul>
              <li>You pay the underpaid amount</li>
              <li>April 15 of the following year (whichever comes first)</li>
            </ul>

            <h2>Real Example: How Much You'd Owe</h2>
            
            <div className="overflow-x-auto not-prose mb-8">
              <table className="affiliate-table w-full">
                <thead>
                  <tr>
                    <th>Underpaid Amount</th>
                    <th>90 Days Late</th>
                    <th>180 Days Late</th>
                    <th>365 Days Late</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$2,500</td>
                    <td>~$49</td>
                    <td>~$99</td>
                    <td>~$200</td>
                  </tr>
                  <tr>
                    <td>$5,000</td>
                    <td>~$99</td>
                    <td>~$197</td>
                    <td>~$400</td>
                  </tr>
                  <tr>
                    <td>$10,000</td>
                    <td>~$197</td>
                    <td>~$395</td>
                    <td>~$800</td>
                  </tr>
                  <tr>
                    <td>$20,000</td>
                    <td>~$395</td>
                    <td>~$789</td>
                    <td>~$1,600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>The Safe Harbor Rule (Your Get-Out-of-Jail Card)</h2>
            <p>
              Here's the good news: you can <strong>completely avoid</strong> underpayment penalties if you meet 
              one of these "safe harbor" requirements:
            </p>

            <div className="bg-success/10 border border-success/30 rounded-lg p-6 not-prose mb-6">
              <h3 className="font-heading font-semibold text-success mb-3">Safe Harbor Options</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">1.</span>
                  <span>Pay at least <strong>90%</strong> of your current year's tax liability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">2.</span>
                  <span>Pay <strong>100%</strong> of your previous year's tax (110% if income exceeded $150,000)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">3.</span>
                  <span>Owe less than <strong>$1,000</strong> when you file</span>
                </li>
              </ul>
            </div>

            <p>
              <strong>Pro tip:</strong> If your income varies significantly, use the "100% of last year's tax" rule. 
              Even if you earn much more this year, paying what you paid last year protects you from penalties.
            </p>

            <h2>What to Do If You've Already Missed a Payment</h2>
            <ol>
              <li>
                <strong>Pay as soon as possible.</strong> The penalty accrues daily, so every day you wait costs more.
              </li>
              <li>
                <strong>Pay online at IRS.gov.</strong> Use IRS Direct Pay (free) or pay by card. This is the fastest method.
              </li>
              <li>
                <strong>Catch up on future quarters.</strong> Increase your remaining quarterly payments to make up the difference.
              </li>
              <li>
                <strong>Don't skip the next payment.</strong> Missing multiple quarters compounds the penalty significantly.
              </li>
            </ol>

            <h2>Can You Get the Penalty Waived?</h2>
            <p>
              In some cases, yes. The IRS may waive or reduce penalties if you can show:
            </p>
            <ul>
              <li><strong>Reasonable cause:</strong> Serious illness, natural disaster, or other circumstances beyond your control</li>
              <li><strong>First-time penalty abatement:</strong> If you have a clean record for the past 3 years</li>
              <li><strong>Retirement or disability:</strong> If you became disabled or retired during the tax year</li>
            </ul>

            <p>
              To request a waiver, file Form 2210 with your tax return and attach a written explanation of your circumstances.
            </p>

            <h2>Prevention: Set Up Automatic Quarterly Payments</h2>
            <p>
              The best way to avoid penalties is to never miss a payment. Consider:
            </p>
            <ul>
              <li>Setting calendar reminders 2 weeks before each deadline</li>
              <li>Using EFTPS (Electronic Federal Tax Payment System) to schedule payments in advance</li>
              <li>Saving 25-30% of every payment in a dedicated tax savings account</li>
            </ul>
          </article>

          {/* CTA */}
          <div className="mt-12 bg-cta-gradient rounded-xl p-8 text-center border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Never Miss Another Payment
            </h2>
            <p className="text-muted-foreground mb-6">
              Download our payment calendar with reminders for all 2026 deadlines.
            </p>
            <Button asChild size="lg" className="cta-gradient-orange text-accent-foreground">
              <Link to="/calculator/quarterly">
                Get Quarterly Calendar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BlogMissedQuarterlyPayment;
