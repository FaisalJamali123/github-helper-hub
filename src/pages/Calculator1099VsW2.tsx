import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema, softwareApplicationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Calculator1099VsW2SEOContent from "@/components/Calculator1099VsW2SEOContent";
import { 
  calculateFederalTax, 
  calculateSelfEmploymentTax,
  stateTaxRates,
  formatCurrency,
  formatPercent
} from "@/lib/taxCalculations";
import { ArrowRight, Check, X, DollarSign, TrendingUp, Calculator, Users, Building } from "lucide-react";

const STANDARD_DEDUCTION_SINGLE = 15000;
const STANDARD_DEDUCTION_MARRIED = 30000;
const SOCIAL_SECURITY_RATE = 0.124;
const MEDICARE_RATE = 0.029;

const Calculator1099VsW2 = () => {
  const [grossIncome, setGrossIncome] = useState(75000);
  const [state, setState] = useState("CA");
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj" | "hoh">("single");
  const [employerBenefits, setEmployerBenefits] = useState({
    healthInsurance: 6000,
    retirement401k: 3000,
    paidTimeOff: 2000,
    otherBenefits: 1000
  });
  const [freelancerExpenses, setFreelancerExpenses] = useState({
    businessExpenses: 8000,
    healthInsurance: 7200,
    retirementContributions: 6000,
    homeOffice: 2400
  });

  const calculations = useMemo(() => {
    const stateRate = stateTaxRates[state]?.rate || 0;
    
    // W-2 Calculations
    const w2GrossIncome = grossIncome;
    const w2TaxableIncome = w2GrossIncome - (filingStatus === "mfj" ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE);
    const w2FederalTax = calculateFederalTax(Math.max(0, w2TaxableIncome), filingStatus);
    const w2StateTax = w2TaxableIncome * (stateRate / 100);
    const w2SocialSecurityTax = w2GrossIncome * (SOCIAL_SECURITY_RATE / 2);
    const w2MedicareTax = w2GrossIncome * (MEDICARE_RATE / 2);
    const w2TotalTax = w2FederalTax + w2StateTax + w2SocialSecurityTax + w2MedicareTax;
    const w2TotalBenefitsValue = Object.values(employerBenefits).reduce((a, b) => a + b, 0);
    const w2NetIncome = w2GrossIncome - w2TotalTax;
    const w2TotalCompensation = w2NetIncome + w2TotalBenefitsValue;

    // 1099 Calculations
    const f1099GrossIncome = grossIncome;
    const f1099TotalDeductions = Object.values(freelancerExpenses).reduce((a, b) => a + b, 0);
    const f1099NetBusinessIncome = f1099GrossIncome - f1099TotalDeductions;
    const f1099SEResult = calculateSelfEmploymentTax(f1099NetBusinessIncome);
    const f1099SETax = f1099SEResult.totalSETax;
    const f1099SEDeduction = f1099SEResult.seTaxDeduction;
    const f1099TaxableIncome = f1099NetBusinessIncome - f1099SEDeduction - 
      (filingStatus === "mfj" ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE);
    const f1099FederalTax = calculateFederalTax(Math.max(0, f1099TaxableIncome), filingStatus);
    const f1099StateTax = Math.max(0, f1099TaxableIncome) * (stateRate / 100);
    const f1099TotalTax = f1099FederalTax + f1099StateTax + f1099SETax;
    const f1099NetIncome = f1099GrossIncome - f1099TotalTax - f1099TotalDeductions + freelancerExpenses.healthInsurance + freelancerExpenses.retirementContributions;

    // Comparison
    const difference = f1099NetIncome - w2NetIncome;
    const w2EffectiveRate = (w2TotalTax / w2GrossIncome) * 100;
    const f1099EffectiveRate = (f1099TotalTax / f1099GrossIncome) * 100;

    return {
      w2: {
        grossIncome: w2GrossIncome,
        federalTax: w2FederalTax,
        stateTax: w2StateTax,
        socialSecurityTax: w2SocialSecurityTax,
        medicareTax: w2MedicareTax,
        totalTax: w2TotalTax,
        benefitsValue: w2TotalBenefitsValue,
        netIncome: w2NetIncome,
        totalCompensation: w2TotalCompensation,
        effectiveRate: w2EffectiveRate
      },
      f1099: {
        grossIncome: f1099GrossIncome,
        deductions: f1099TotalDeductions,
        netBusinessIncome: f1099NetBusinessIncome,
        seTax: f1099SETax,
        federalTax: f1099FederalTax,
        stateTax: f1099StateTax,
        totalTax: f1099TotalTax,
        netIncome: f1099NetIncome,
        effectiveRate: f1099EffectiveRate
      },
      comparison: {
        difference,
        winner: difference > 0 ? "1099" : "W-2"
      }
    };
  }, [grossIncome, state, filingStatus, employerBenefits, freelancerExpenses]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://moneygrowtools.com" },
    { name: "1099 vs W-2 Calculator", url: "https://moneygrowtools.com/calculator/1099-vs-w2" }
  ]);

  return (
    <Layout>
      <SEOHead
        title="1099 vs W-2 Calculator 2026 | Compare Take-Home Pay"
        description="Compare 1099 contractor vs W-2 employee income side-by-side. Calculate taxes, benefits, and true take-home pay."
        canonicalUrl="https://moneygrowtools.com/calculator/1099-vs-w2"
        keywords={["1099 vs W2 calculator", "contractor vs employee", "freelance vs W2 taxes", "take home pay comparison"]}
      />
      <StructuredData schemas={[breadcrumbSchema, softwareApplicationSchema]} />

      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center space-x-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li className="text-muted-foreground">/</li>
                <li className="text-foreground font-medium">1099 vs W-2 Calculator</li>
              </ol>
            </nav>
            <div className="text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">2026 Tax Rates</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">1099 vs W-2 Calculator</h1>
              <p className="text-lg text-muted-foreground">Compare your true take-home pay side-by-side.</p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-card rounded-xl border border-border p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Your Details</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Annual Gross Income</label>
                  <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-border bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background">
                    {Object.keys(stateTaxRates).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Filing Status</label>
                  <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as typeof filingStatus)} className="w-full px-4 py-3 rounded-lg border border-border bg-background">
                    <option value="single">Single</option>
                    <option value="mfj">Married Filing Jointly</option>
                    <option value="hoh">Head of Household</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2"><Building className="w-5 h-5" /> W-2 Benefits</h3>
                  <div className="space-y-3">
                    <input type="number" placeholder="Health Insurance" value={employerBenefits.healthInsurance} onChange={(e) => setEmployerBenefits({...employerBenefits, healthInsurance: Number(e.target.value)})} className="w-full px-3 py-2 rounded border border-border bg-background" />
                    <input type="number" placeholder="401k Match" value={employerBenefits.retirement401k} onChange={(e) => setEmployerBenefits({...employerBenefits, retirement401k: Number(e.target.value)})} className="w-full px-3 py-2 rounded border border-border bg-background" />
                  </div>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2"><Users className="w-5 h-5" /> 1099 Deductions</h3>
                  <div className="space-y-3">
                    <input type="number" placeholder="Business Expenses" value={freelancerExpenses.businessExpenses} onChange={(e) => setFreelancerExpenses({...freelancerExpenses, businessExpenses: Number(e.target.value)})} className="w-full px-3 py-2 rounded border border-border bg-background" />
                    <input type="number" placeholder="Health Insurance" value={freelancerExpenses.healthInsurance} onChange={(e) => setFreelancerExpenses({...freelancerExpenses, healthInsurance: Number(e.target.value)})} className="w-full px-3 py-2 rounded border border-border bg-background" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl border-2 border-primary p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Building className="w-5 h-5 text-primary" /> W-2 Employee</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span>Total Tax</span><span className="text-destructive">-{formatCurrency(calculations.w2.totalTax)}</span></div>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Net Take-Home</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(calculations.w2.netIncome)}</div>
                  <div className="text-xs mt-1">Rate: {formatPercent(calculations.w2.effectiveRate)}</div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Badge className={`text-lg px-4 py-2 bg-primary text-primary-foreground`}>
                  {calculations.comparison.winner} Wins
                </Badge>
                <div className="text-xl font-bold mt-4">{formatCurrency(Math.abs(calculations.comparison.difference))}</div>
                <div className="text-sm text-muted-foreground">more per year</div>
              </div>

              <div className="bg-card rounded-xl border-2 border-primary p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> 1099 Contractor</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span>Total Tax</span><span className="text-destructive">-{formatCurrency(calculations.f1099.totalTax)}</span></div>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Net Take-Home</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(calculations.f1099.netIncome)}</div>
                  <div className="text-xs mt-1">Rate: {formatPercent(calculations.f1099.effectiveRate)}</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" asChild><Link to="/calculator/1099">Use Full 1099 Calculator</Link></Button>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <Calculator1099VsW2SEOContent />
      </div>
    </Layout>
  );
};

export default Calculator1099VsW2;
