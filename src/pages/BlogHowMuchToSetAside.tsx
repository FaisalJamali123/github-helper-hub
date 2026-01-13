import { useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, generateArticleSchema, generateFAQPageSchema } from "@/components/shared/StructuredData";
import { formatCurrency } from "@/lib/taxCalculations";

const BlogHowMuchToSetAside = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);
  const [savePercentage, setSavePercentage] = useState<number>(30);

  const monthlySavings = (monthlyIncome * savePercentage) / 100;
  const annualSavings = monthlySavings * 12;
  const annualIncome = monthlyIncome * 12;

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Blog", url: "https://moneygrowtools.com/blog" },
    { name: "How Much to Set Aside", url: "https://moneygrowtools.com/blog/how-much-to-set-aside" },
  ];

  const articleSchema = generateArticleSchema({
    headline: "How Much to Set Aside for 1099 Taxes in 2026",
    description: "Learn the exact percentage of income freelancers should save for taxes based on income level, state, and filing status.",
    datePublished: "2025-01-01",
    dateModified: "2026-01-12",
    url: "https://moneygrowtools.com/blog/how-much-to-set-aside",
  });

  const faqSchema = generateFAQPageSchema([
    { question: "How much should I set aside for 1099 taxes?", answer: "Most freelancers should save 25-30% of gross income for taxes. High earners ($100k+) in high-tax states (CA, NY, NJ) should save 35-40%. Low earners (<$40k) in no-tax states (TX, FL) can often get away with 20-25%." },
    { question: "Why do I need to save more than 15.3% for self-employment tax?", answer: "The 15.3% is only the self-employment tax (Social Security + Medicare). You also owe federal income tax (10-37%) and potentially state income tax (0-13.3%), which can bring your total tax burden to 25-45%." },
    { question: "Should I open a separate bank account for tax savings?", answer: "Yes! The most effective strategy is to open a separate high-yield savings account specifically for tax money. Transfer your savings percentage immediately when you receive each payment." },
    { question: "Do business deductions lower my tax savings rate?", answer: "Yes. Every dollar you spend on legitimate business expenses reduces your taxable income. If your business expenses are 20% of gross income, you can potentially lower your savings rate by 4-5 percentage points." },
    { question: "When are quarterly tax payments due?", answer: "For 2026: Q1 is April 15, Q2 is June 15, Q3 is September 15, and Q4 is January 15, 2027. Missing these deadlines results in IRS penalties of approximately 8% annually." }
  ]);

  return (
    <Layout>
      <SEOHead
        title="How Much to Set Aside for 1099 Taxes in 2026 | Tax Savings Guide"
        description="Learn exactly how much to save for 1099 taxes. Most freelancers should set aside 25-30% of every payment. Use our interactive slider to calculate your savings."
        canonicalUrl="https://moneygrowtools.com/blog/how-much-to-set-aside"
        ogType="article"
        keywords={["how much to save for 1099 taxes", "freelance tax savings", "set aside for taxes", "1099 tax percentage"]}
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
              <li className="text-foreground font-medium">How Much to Set Aside</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
              <PiggyBank className="w-4 h-4" />
              <span>Tax Planning</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              How Much to Set Aside for 1099 Taxes in 2025
            </h1>
            <p className="text-lg text-muted-foreground">
              The simple answer: <strong className="text-foreground">25-30% of every payment</strong>. But your exact rate depends on your income level, state, and filing status.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Updated: January 2026</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </header>

          {/* TL;DR */}
          <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-6 mb-8">
            <h2 className="font-heading font-semibold text-foreground mb-2">TL;DR</h2>
            <p className="text-muted-foreground">
              Most freelancers should save <strong>25-30%</strong> of gross income for taxes. High earners ($100k+) in high-tax states 
              (CA, NY, NJ) should save <strong>35-40%</strong>. Low earners (&lt;$40k) in no-tax states (TX, FL) can often get away 
              with <strong>20-25%</strong>. Use the slider below to find your number.
            </p>
          </div>

          {/* Interactive Savings Slider */}
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 mb-8 shadow-soft">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Calculate Your Tax Savings
            </h2>

            <div className="space-y-6">
              {/* Monthly Income Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Monthly 1099 Income</label>
                  <span className="text-sm font-bold text-primary">{formatCurrency(monthlyIncome)}</span>
                </div>
                <Slider
                  value={[monthlyIncome]}
                  onValueChange={(value) => setMonthlyIncome(value[0])}
                  min={1000}
                  max={30000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$1,000</span>
                  <span>$30,000</span>
                </div>
              </div>

              {/* Savings Percentage Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Tax Savings Rate</label>
                  <span className="text-sm font-bold text-primary">{savePercentage}%</span>
                </div>
                <Slider
                  value={[savePercentage]}
                  onValueChange={(value) => setSavePercentage(value[0])}
                  min={15}
                  max={45}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>15% (Low tax state, low income)</span>
                  <span>45% (High earner, CA/NY)</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Set aside each month</p>
                  <p className="text-3xl font-heading font-bold text-primary">{formatCurrency(monthlySavings)}</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Annual tax savings</p>
                  <p className="text-3xl font-heading font-bold text-primary">{formatCurrency(annualSavings)}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Based on {formatCurrency(annualIncome)} annual income at {savePercentage}% savings rate
              </p>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none">
            <h2>Why You Need to Save 25-30% (Not 15%)</h2>
            <p>
              Many new freelancers make the mistake of thinking they only need to save 15.3% for self-employment tax. 
              But that's just <em>one piece</em> of your tax bill. Here's the complete picture:
            </p>

            <ul>
              <li><strong>Self-Employment Tax:</strong> 15.3% (Social Security + Medicare)</li>
              <li><strong>Federal Income Tax:</strong> 10-37% depending on your bracket</li>
              <li><strong>State Income Tax:</strong> 0-13.3% depending on where you live</li>
            </ul>

            <h2>Quick Reference: Savings Rate by Situation</h2>
            
            <div className="overflow-x-auto not-prose mb-8">
              <table className="affiliate-table w-full">
                <thead>
                  <tr>
                    <th>Your Situation</th>
                    <th>Save This %</th>
                    <th>Example (on $5,000)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Low income (&lt;$40k), no-tax state (TX, FL, WA)</td>
                    <td className="font-semibold text-success">20-22%</td>
                    <td>$1,000-$1,100</td>
                  </tr>
                  <tr>
                    <td>Moderate income ($40-80k), average state</td>
                    <td className="font-semibold text-primary">25-28%</td>
                    <td>$1,250-$1,400</td>
                  </tr>
                  <tr>
                    <td>Good income ($80-150k), average state</td>
                    <td className="font-semibold text-warning">28-32%</td>
                    <td>$1,400-$1,600</td>
                  </tr>
                  <tr>
                    <td>High income ($150k+), high-tax state (CA, NY, NJ)</td>
                    <td className="font-semibold text-destructive">35-40%</td>
                    <td>$1,750-$2,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>The "Separate Bank Account" Strategy</h2>
            <p>
              The most effective way to save for taxes is to open a <strong>separate savings account</strong> specifically 
              for tax money. Every time you receive a payment:
            </p>
            <ol>
              <li>Immediately transfer your savings percentage to the tax account</li>
              <li>Don't touch this money until quarterly payment time</li>
              <li>Earn interest while it sits (high-yield savings = free money)</li>
            </ol>

            <p>
              Many freelancers recommend automating this transfer. Some banks even offer "buckets" or sub-accounts 
              that make this easy without opening a whole new account.
            </p>

            <h2>Don't Forget: Business Deductions Lower Your Rate</h2>
            <p>
              Every dollar you spend on legitimate business expenses reduces your taxable income. Common deductions include:
            </p>
            <ul>
              <li>Home office ($5/sq ft simplified, up to $1,500)</li>
              <li>Vehicle mileage ($0.70/mile in 2025)</li>
              <li>Software and subscriptions</li>
              <li>Phone and internet (business portion)</li>
              <li>Health insurance premiums</li>
              <li>Retirement contributions (SEP-IRA, Solo 401k)</li>
            </ul>

            <p>
              If your business expenses are 20% of gross income, you can potentially lower your savings rate 
              by 4-5 percentage points.
            </p>

            <h2>When to Pay: Quarterly Deadlines</h2>
            <p>
              The IRS expects you to pay taxes throughout the year, not just in April. The 2025 quarterly deadlines are:
            </p>
            <ul>
              <li><strong>Q1:</strong> April 15, 2025</li>
              <li><strong>Q2:</strong> June 16, 2025</li>
              <li><strong>Q3:</strong> September 15, 2025</li>
              <li><strong>Q4:</strong> January 15, 2026</li>
            </ul>

            <p>
              Use our <Link to="/calculator/quarterly" className="text-primary hover:underline">Quarterly Tax Calculator</Link> to 
              see exactly how much to pay each quarter.
            </p>
          </article>

          {/* CTA */}
          <div className="mt-12 bg-cta-gradient rounded-xl p-8 text-center border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Calculate Your Exact Tax Bill
            </h2>
            <p className="text-muted-foreground mb-6">
              Get a personalized estimate based on your income, state, and deductions.
            </p>
            <Button asChild size="lg" className="cta-gradient-orange text-accent-foreground">
              <Link to="/calculator/1099">
                Try Our 1099 Calculator
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BlogHowMuchToSetAside;
