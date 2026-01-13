import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Info, TrendingUp, TrendingDown } from "lucide-react";
import CalculatorSelfEmploymentSEOContent from "@/components/calculator/CalculatorSelfEmploymentSEOContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, generateProductSchema, generateFAQPageSchema } from "@/components/shared/StructuredData";

import {
  calculateSelfEmploymentTax,
  TAX_CONSTANTS_2026,
  formatCurrency,
  formatPercent,
} from "@/lib/taxCalculations";

const CalculatorSelfEmployment = () => {
  const [netEarnings, setNetEarnings] = useState<string>("");
  const [w2Salary, setW2Salary] = useState<string>("");

  // Calculate SE tax
  const seResults = useMemo(() => {
    const earnings = parseFloat(netEarnings) || 0;
    if (earnings <= 0) return null;
    return calculateSelfEmploymentTax(earnings);
  }, [netEarnings]);

  // Calculate W-2 equivalent comparison
  const comparison = useMemo(() => {
    const earnings = parseFloat(netEarnings) || 0;
    const salary = parseFloat(w2Salary) || earnings;
    
    if (salary <= 0) return null;

    // W-2 employee pays half of FICA
    const w2SocialSecurity = Math.min(salary, TAX_CONSTANTS_2026.SOCIAL_SECURITY_WAGE_BASE) * 0.062;
    const w2Medicare = salary * 0.0145;
    const w2AdditionalMedicare = salary > TAX_CONSTANTS_2026.ADDITIONAL_MEDICARE_THRESHOLD_SINGLE 
      ? (salary - TAX_CONSTANTS_2026.ADDITIONAL_MEDICARE_THRESHOLD_SINGLE) * 0.009 
      : 0;
    const w2TotalFICA = w2SocialSecurity + w2Medicare + w2AdditionalMedicare;

    // Employer pays the other half (hidden cost)
    const employerFICA = w2SocialSecurity + w2Medicare;

    // Self-employed pays both
    const seTax = seResults?.totalSETax || 0;

    // Difference
    const extraCost = seTax - w2TotalFICA;

    return {
      w2EmployeeFICA: w2TotalFICA,
      w2EmployerFICA: employerFICA,
      w2TotalFICA: w2TotalFICA + employerFICA,
      selfEmployedFICA: seTax,
      difference: extraCost,
      equivalentSalary: earnings / (1 + TAX_CONSTANTS_2026.SE_TAX_RATE / 100 / 2), // What W-2 salary = same take-home
    };
  }, [netEarnings, w2Salary, seResults]);

  // Visual bar width for 92.35%
  const taxableWidth = 92.35;
  const nontaxableWidth = 100 - taxableWidth;

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Self-Employment Tax Calculator", url: "https://moneygrowtools.com/calculator/self-employment" },
  ];

  return (
    <Layout>
      <SEOHead
        title="Self-Employment Tax Calculator 2026 | 15.3% SE Tax Breakdown"
        description="Calculate your self-employment tax (15.3%) with our free calculator. See Social Security and Medicare breakdown, understand the 92.35% rule, and compare to W-2 taxes."
        canonicalUrl="https://moneygrowtools.com/calculator/self-employment"
        keywords={["self-employment tax calculator", "15.3% SE tax", "Social Security Medicare tax", "1099 vs W-2 tax"]}
      />
      <StructuredData schemas={[
        generateBreadcrumbSchema(breadcrumbItems),
        generateProductSchema({
          name: "Self-Employment Tax Calculator",
          description: "Calculate your 15.3% self-employment tax with Social Security and Medicare breakdown. Free for freelancers.",
          url: "https://moneygrowtools.com/calculator/self-employment"
        }),
        generateFAQPageSchema([
          { question: "What is the self-employment tax rate?", answer: "The self-employment tax rate is 15.3% total: 12.4% for Social Security (on the first $176,100 of net earnings) and 2.9% for Medicare (no income cap)." },
          { question: "Why is only 92.35% of my income taxed for SE tax?", answer: "The IRS reduces your taxable self-employment income by 7.65% to approximate the employer's share of FICA taxes that W-2 employees don't pay directly." },
          { question: "Can I deduct self-employment tax?", answer: "Yes! You can deduct 50% of your self-employment tax as an adjustment to income on your tax return, which lowers your federal taxable income." },
          { question: "How does SE tax compare to W-2 FICA taxes?", answer: "W-2 employees pay 7.65% (half of FICA), with employers paying the other half. Self-employed individuals pay the full 15.3% but can deduct half." },
          { question: "Is there a cap on Social Security tax?", answer: "Yes, Social Security tax (12.4%) only applies to the first $176,100 of net self-employment earnings in 2026. Medicare tax (2.9%) has no cap." }
        ])
      ]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Self-Employment Tax Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-info/10 rounded-xl mb-4">
              <Briefcase className="w-8 h-8 text-info" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              Self-Employment Tax Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand the 15.3% self-employment tax and compare your burden to W-2 employees.
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Calculator Form */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 sm:p-8 shadow-soft">
                <div className="space-y-6">
                  {/* Net Earnings */}
                  <div>
                    <Label htmlFor="netEarnings" className="text-foreground font-medium mb-2 block">
                      Net Self-Employment Earnings
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="netEarnings"
                        type="number"
                        placeholder="80,000"
                        value={netEarnings}
                        onChange={(e) => setNetEarnings(e.target.value)}
                        className="pl-8 calc-input"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This is your gross income minus business expenses
                    </p>
                  </div>

                  {/* W-2 Salary Comparison */}
                  <div>
                    <Label htmlFor="w2Salary" className="text-foreground font-medium mb-2 block">
                      Compare to W-2 Salary (Optional)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="w2Salary"
                        type="number"
                        placeholder="Same as above"
                        value={w2Salary}
                        onChange={(e) => setW2Salary(e.target.value)}
                        className="pl-8 calc-input"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a W-2 salary to compare tax burden
                    </p>
                  </div>
                </div>
              </div>

              {/* 92.35% Visual Explanation */}
              {seResults && (
                <div className="bg-info/10 rounded-lg border border-info/30 p-6">
                  <h3 className="font-heading font-semibold text-info flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5" />
                    Why Only 92.35% Is Taxed
                  </h3>
                  
                  {/* Visual Bar */}
                  <div className="mb-4">
                    <div className="h-8 rounded-lg overflow-hidden flex">
                      <div 
                        className="bg-info flex items-center justify-center text-info-foreground text-xs font-medium"
                        style={{ width: `${taxableWidth}%` }}
                      >
                        92.35% Taxable
                      </div>
                      <div 
                        className="bg-success flex items-center justify-center text-success-foreground text-xs font-medium"
                        style={{ width: `${nontaxableWidth}%` }}
                      >
                        7.65%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    The IRS reduces your taxable self-employment income by 7.65% to approximate the employer's 
                    share of FICA taxes that W-2 employees don't pay directly. This effectively lowers your SE tax base.
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-card rounded-lg p-3">
                      <p className="text-muted-foreground">Your net earnings</p>
                      <p className="font-semibold text-foreground">{formatCurrency(parseFloat(netEarnings) || 0)}</p>
                    </div>
                    <div className="bg-card rounded-lg p-3">
                      <p className="text-muted-foreground">Taxable amount (92.35%)</p>
                      <p className="font-semibold text-foreground">{formatCurrency(seResults.taxableEarnings)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-6">
              {seResults ? (
                <>
                  {/* Total SE Tax */}
                  <div className="result-highlight text-center">
                    <p className="text-muted-foreground text-sm mb-1">Self-Employment Tax (15.3%)</p>
                    <p className="text-4xl sm:text-5xl font-heading font-bold text-primary">
                      {formatCurrency(seResults.totalSETax)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Deductible amount: <span className="font-semibold text-success">{formatCurrency(seResults.seTaxDeduction)}</span>
                    </p>
                  </div>

                  {/* Tax Breakdown */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-4">SE Tax Breakdown</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Social Security (12.4%)</p>
                          <p className="text-xs text-muted-foreground">
                            Capped at ${TAX_CONSTANTS_2026.SOCIAL_SECURITY_WAGE_BASE.toLocaleString()}
                          </p>
                        </div>
                        <span className="font-semibold text-foreground">{formatCurrency(seResults.socialSecurityTax)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Medicare (2.9%)</p>
                          <p className="text-xs text-muted-foreground">No income cap</p>
                        </div>
                        <span className="font-semibold text-foreground">{formatCurrency(seResults.medicareTax)}</span>
                      </div>
                      
                      {seResults.additionalMedicareTax > 0 && (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-foreground">Additional Medicare (0.9%)</p>
                            <p className="text-xs text-muted-foreground">On income over $200k</p>
                          </div>
                          <span className="font-semibold text-foreground">{formatCurrency(seResults.additionalMedicareTax)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-foreground">50% Deduction (Tax Benefit)</p>
                          <span className="font-semibold text-success">-{formatCurrency(seResults.seTaxDeduction)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          This reduces your federal taxable income
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* W-2 Comparison */}
                  {comparison && (
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h2 className="font-heading font-semibold text-lg text-foreground mb-4">1099 vs W-2 Comparison</h2>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Self-Employed (You Pay)</p>
                            <p className="text-2xl font-heading font-bold text-foreground">
                              {formatCurrency(comparison.selfEmployedFICA)}
                            </p>
                            <p className="text-xs text-muted-foreground">(15.3% of earnings)</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">W-2 Employee (You Pay)</p>
                            <p className="text-2xl font-heading font-bold text-foreground">
                              {formatCurrency(comparison.w2EmployeeFICA)}
                            </p>
                            <p className="text-xs text-muted-foreground">(7.65% of salary)</p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                          comparison.difference > 0 ? "bg-destructive/10" : "bg-success/10"
                        }`}>
                          {comparison.difference > 0 ? (
                            <>
                              <TrendingUp className="w-5 h-5 text-destructive" />
                              <span className="font-semibold text-destructive">
                                You pay {formatCurrency(comparison.difference)} MORE than W-2 employee
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-5 h-5 text-success" />
                              <span className="font-semibold text-success">
                                You pay {formatCurrency(Math.abs(comparison.difference))} LESS
                              </span>
                            </>
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground text-center">
                          Note: W-2 employers also pay {formatCurrency(comparison.w2EmployerFICA)} on your behalf (hidden cost)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <Button asChild className="w-full cta-gradient-orange text-accent-foreground">
                    <Link to="/calculator/1099">
                      Calculate Full 1099 Tax Bill
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  
                </>
              ) : (
                <div className="bg-muted/50 rounded-lg border border-border p-8 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your net earnings to calculate self-employment tax
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SEO Content */}
          <CalculatorSelfEmploymentSEOContent />
        </div>
      </main>
    </Layout>
  );
};

export default CalculatorSelfEmployment;
