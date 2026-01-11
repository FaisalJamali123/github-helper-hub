import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Download, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import CalculatorQuarterlySEOContent from "@/components/calculator/CalculatorQuarterlySEOContent";
import StructuredData, { generateBreadcrumbSchema, generateProductSchema } from "@/components/shared/StructuredData";
import {
  calculate1099Tax,
  TAX_CONSTANTS_2025,
  calculateQuarterlyPenalty,
  formatCurrency,
  formatPercent,
} from "@/lib/taxCalculations";

const CalculatorQuarterly = () => {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [businessExpenses, setBusinessExpenses] = useState<string>("");
  const [missedPayments, setMissedPayments] = useState<number>(0);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [penaltyAmount, setPenaltyAmount] = useState<number>(0);
  const [penaltyCountUp, setPenaltyCountUp] = useState<number>(0);

  // Get next deadline
  const nextDeadline = useMemo(() => {
    const today = new Date();
    for (const deadline of TAX_CONSTANTS_2025.QUARTERLY_DEADLINES) {
      const dueDate = new Date(deadline.dueDate);
      if (dueDate > today) {
        return deadline;
      }
    }
    return TAX_CONSTANTS_2025.QUARTERLY_DEADLINES[0];
  }, []);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(nextDeadline.dueDate);
      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextDeadline]);

  // Calculate tax results
  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    
    if (income <= 0) return null;
    
    return calculate1099Tax(income, expenses, "TX", "single");
  }, [annualIncome, businessExpenses]);

  // Calculate penalty if payments missed
  useEffect(() => {
    if (results && missedPayments > 0) {
      const quarterlyAmount = results.quarterlyPayment;
      const daysMissed = missedPayments * 90; // Approximate days per quarter
      const penalty = calculateQuarterlyPenalty(quarterlyAmount * missedPayments, daysMissed);
      setPenaltyAmount(penalty);
    } else {
      setPenaltyAmount(0);
    }
  }, [results, missedPayments]);

  // Real-time penalty counter (for dramatic effect)
  useEffect(() => {
    if (penaltyAmount > 0) {
      setPenaltyCountUp(0);
      const increment = penaltyAmount / 100;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= penaltyAmount) {
          setPenaltyCountUp(penaltyAmount);
          clearInterval(interval);
        } else {
          setPenaltyCountUp(current);
        }
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [penaltyAmount]);

  // Generate ICS file for calendar
  const downloadCalendar = () => {
    const events = TAX_CONSTANTS_2025.QUARTERLY_DEADLINES.map((deadline) => {
      const date = new Date(deadline.dueDate);
      const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
      
      return `BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
SUMMARY:${deadline.quarter} Estimated Tax Payment Due
DESCRIPTION:IRS quarterly estimated tax payment due for ${deadline.period}. Amount: ${results ? formatCurrency(results.quarterlyPayment) : "Calculate your amount at moneygrowtools.com"}
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Tax payment due in 7 days
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Tax payment due tomorrow!
END:VALARM
END:VEVENT`;
    }).join("\n");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Money Grow Tools//Quarterly Tax Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${events}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quarterly-tax-calendar-2026.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Quarterly Tax Calculator", url: "https://moneygrowtools.com/calculator/quarterly" },
  ];

  return (
    <Layout>
      <SEOHead
        title="Quarterly Tax Calculator 2026 | 1099 Estimated Tax Payments"
        description="Calculate your quarterly estimated tax payments for 2026. See IRS deadlines, avoid penalties, and download a payment calendar. Free for freelancers."
        canonicalUrl="https://moneygrowtools.com/calculator/quarterly"
        keywords={["quarterly tax calculator", "estimated tax payments", "1099 quarterly taxes", "IRS payment deadlines 2026"]}
      />
      <StructuredData schemas={[
        generateBreadcrumbSchema(breadcrumbItems),
        generateProductSchema({
          name: "Quarterly Tax Calculator",
          description: "Calculate quarterly estimated tax payments for 2026. See IRS deadlines and avoid penalties. Free for freelancers.",
          url: "https://moneygrowtools.com/calculator/quarterly"
        })
      ]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Quarterly Tax Calculator</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-xl mb-4">
              <Calendar className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
              Quarterly Tax Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your estimated tax payments and never miss an IRS deadline.
            </p>
          </header>

          {/* Countdown Timer */}
          {countdown && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <p className="text-muted-foreground mb-2">Next Payment Due: <strong className="text-foreground">{nextDeadline.label}</strong></p>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Minutes" },
                    { value: countdown.seconds, label: "Seconds" },
                  ].map((item) => (
                    <div key={item.label} className="countdown-box">
                      <p className="countdown-number">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Calculator Form */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 sm:p-8 shadow-soft">
                <div className="space-y-6">
                  {/* Annual Income */}
                  <div>
                    <Label htmlFor="annualIncome" className="text-foreground font-medium mb-2 block">
                      Expected Annual 1099 Income
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="annualIncome"
                        type="number"
                        placeholder="80,000"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        className="pl-8 calc-input"
                      />
                    </div>
                  </div>

                  {/* Business Expenses */}
                  <div>
                    <Label htmlFor="businessExpenses" className="text-foreground font-medium mb-2 block">
                      Business Expenses (Optional)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="businessExpenses"
                        type="number"
                        placeholder="10,000"
                        value={businessExpenses}
                        onChange={(e) => setBusinessExpenses(e.target.value)}
                        className="pl-8 calc-input"
                      />
                    </div>
                  </div>

                  {/* Missed Payments */}
                  <div>
                    <Label className="text-foreground font-medium mb-2 block">
                      Missed Quarterly Payments
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setMissedPayments(num)}
                          className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                            missedPayments === num
                              ? num === 0 
                                ? "bg-success text-success-foreground border-success"
                                : "bg-destructive text-destructive-foreground border-destructive"
                              : "bg-card border-border text-muted-foreground hover:border-primary"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select how many quarterly payments you've missed this year
                    </p>
                  </div>
                </div>
              </div>

              {/* Penalty Warning */}
              {penaltyAmount > 0 && (
                <div className="penalty-timer">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">IRS Penalty Estimate</span>
                  </div>
                  <p className="text-3xl font-heading font-bold">
                    {formatCurrency(penaltyCountUp)}
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    Based on {missedPayments} missed payment(s) at ~8% annual rate
                  </p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Quarterly Payment Amount */}
                  <div className="result-highlight text-center">
                    <p className="text-muted-foreground text-sm mb-1">Pay Each Quarter</p>
                    <p className="text-4xl sm:text-5xl font-heading font-bold text-primary">
                      {formatCurrency(results.quarterlyPayment)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Total Annual Tax: {formatCurrency(results.totalTax)}
                    </p>
                  </div>

                  {/* Payment Schedule */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-4">2026 Payment Schedule</h2>
                    
                    <div className="space-y-3">
                      {TAX_CONSTANTS_2025.QUARTERLY_DEADLINES.map((deadline) => {
                        const isPast = new Date(deadline.dueDate) < new Date();
                        const isNext = deadline.quarter === nextDeadline.quarter;
                        
                        return (
                          <div 
                            key={deadline.quarter}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              isNext ? "bg-primary/10 border border-primary" : isPast ? "bg-muted" : "bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isPast ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : isNext ? (
                                <Clock className="w-5 h-5 text-primary animate-pulse" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                              )}
                              <div>
                                <p className={`font-medium ${isNext ? "text-primary" : "text-foreground"}`}>
                                  {deadline.quarter}: {deadline.label}
                                </p>
                                <p className="text-xs text-muted-foreground">{deadline.period}</p>
                              </div>
                            </div>
                            <span className={`font-semibold ${isNext ? "text-primary" : "text-foreground"}`}>
                              {formatCurrency(results.quarterlyPayment)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={downloadCalendar} className="flex-1 cta-gradient-orange text-accent-foreground">
                      <Download className="w-4 h-4 mr-2" />
                      Download Calendar (.ics)
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to="/calculator/1099">
                        Full Tax Breakdown
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Safe Harbor Note */}
                  <div className="bg-success/10 rounded-lg border border-success/30 p-4">
                    <h3 className="font-semibold text-success flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      Safe Harbor Rule
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You can avoid penalties by paying at least <strong>100% of last year's tax</strong> (or 110% if your 
                      income exceeded $150,000). Even if you underpay, meeting safe harbor protects you from penalties.
                    </p>
                  </div>

                  
                </>
              ) : (
                <div className="bg-muted/50 rounded-lg border border-border p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your expected annual income to calculate quarterly payments
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SEO Content */}
          <CalculatorQuarterlySEOContent />
        </div>
      </main>
    </Layout>
  );
};

export default CalculatorQuarterly;
