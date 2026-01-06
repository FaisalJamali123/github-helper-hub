import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Car, Calculator, Leaf, Globe, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalculatorMileageSEOContentProps {
  scrollToCalculator: () => void;
}

const CalculatorMileageSEOContent = ({ scrollToCalculator }: CalculatorMileageSEOContentProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What is the IRS mileage rate for 2025?", a: "The IRS standard mileage rate for 2025 is $0.70 per mile for business use, $0.21 per mile for medical/moving, and $0.14 per mile for charity." },
    { q: "Who should use a mileage reimbursement calculator?", a: "Freelancers, gig workers (Uber, DoorDash), independent contractors, small business owners, and anyone who uses their personal vehicle for business purposes." },
    { q: "Can I deduct mileage on my 1099 taxes?", a: "Yes! Self-employed individuals can deduct business mileage on Schedule C. You can use either the standard mileage rate or actual expenses method." },
    { q: "How do I track mileage for tax purposes?", a: "Keep a log with date, destination, business purpose, and miles driven. Apps can automate this, but manual logs are also IRS-acceptable." },
    { q: "What's better: standard mileage or actual expenses?", a: "It depends on your situation. Standard rate is simpler; actual expenses may save more if you have high vehicle costs. Our calculator compares both." },
  ];

  return (
    <section className="mt-16 space-y-12">
      {/* Intro */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
          Free Mileage Reimbursement Calculator for Global Freelancers
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Use our <strong>free mileage reimbursement calculator</strong> to estimate your savings from accurate mileage tracking. 
          Unlike basic US-focused tools, this GigSaver optimizer calculates reimbursement savings, tax deductions, and eco-impact 
          for international users with multi-currency support. Perfect for 1099 filers worldwide.
        </p>
        <Button onClick={scrollToCalculator} className="mt-4 gap-2">
          <Calculator className="w-4 h-4" /> Try the Calculator Now
        </Button>
      </div>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <Globe className="w-8 h-8 text-info mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">Multi-Currency Support</h3>
          <p className="text-sm text-muted-foreground">Convert savings to USD, PKR, EUR, GBP, CAD, or INR instantly.</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <Leaf className="w-8 h-8 text-success mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">Eco Impact Tracking</h3>
          <p className="text-sm text-muted-foreground">See your carbon footprint and savings from vehicle efficiency.</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border">
          <DollarSign className="w-8 h-8 text-warning mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">Tax Deduction Estimates</h3>
          <p className="text-sm text-muted-foreground">Integrates with self-employment tax rates for accurate projections.</p>
        </div>
      </div>

      {/* IRS Rates Section */}
      <div className="bg-secondary/50 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4">
          2025 IRS Mileage Rates
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <Car className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">$0.70</p>
            <p className="text-sm text-muted-foreground">Business Use</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <FileText className="w-6 h-6 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">$0.21</p>
            <p className="text-sm text-muted-foreground">Medical/Moving</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <Leaf className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">$0.14</p>
            <p className="text-sm text-muted-foreground">Charity</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                {expandedFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4 text-muted-foreground text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/20">
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">Related Tax Tools</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/calculator/1099" className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary transition-colors text-sm font-medium">
            1099 Tax Calculator
          </Link>
          <Link to="/calculator/self-employment" className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary transition-colors text-sm font-medium">
            Self-Employment Tax
          </Link>
          <Link to="/calculator/quarterly" className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary transition-colors text-sm font-medium">
            Quarterly Payments
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
        <strong>Disclaimer:</strong> This calculator provides estimates based on 2025 IRS rates and industry averages. 
        It's for informational purposes only and doesn't constitute tax advice. Consult a qualified tax professional for personalized guidance.
        <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline ml-1">
          IRS Mileage Rates <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </section>
  );
};

export default CalculatorMileageSEOContent;
