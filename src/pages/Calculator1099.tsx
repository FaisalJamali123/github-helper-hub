import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Download, Mic, MicOff, ChevronDown, Check, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, softwareApplicationSchema } from "@/components/shared/StructuredData";
import ReceiptScanner from "@/components/shared/ReceiptScanner";
import InfoTooltip from "@/components/shared/InfoTooltip";
import TaxBreakdownChart from "@/components/calculator/TaxBreakdownChart";
import FederalBracketBreakdown from "@/components/calculator/FederalBracketBreakdown";
import StateTaxToggle from "@/components/calculator/StateTaxToggle";
import Calculator1099SEOContent from "@/components/calculator/Calculator1099SEOContent";
import { jsPDF } from "jspdf";
import {
  calculate1099TaxAdvanced,
  stateTaxRates,
  TAX_CONSTANTS_2025,
  formatCurrency,
  formatPercent,
  FIELD_TOOLTIPS,
  AdvancedTaxInputs,
} from "@/lib/taxCalculations";

const Calculator1099 = () => {
  // Basic inputs
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [businessExpenses, setBusinessExpenses] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("TX");
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj" | "hoh">("single");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includeStateTax, setIncludeStateTax] = useState(true);
  
  // Voice input
  const [isListening, setIsListening] = useState(false);
  const [voiceField, setVoiceField] = useState<string | null>(null);

  // Advanced inputs (like competitors)
  const [w2Income, setW2Income] = useState<string>("");
  const [workMileage, setWorkMileage] = useState<string>("");
  const [mortgageInterest, setMortgageInterest] = useState<string>("");
  const [studentTuition, setStudentTuition] = useState<string>("");
  const [iraContributions, setIraContributions] = useState<string>("");
  const [quarterlyPayments, setQuarterlyPayments] = useState<string>("");
  const [w2TaxesWithheld, setW2TaxesWithheld] = useState<string>("");
  const [dependentsUnder17, setDependentsUnder17] = useState<number>(0);
  const [dependentsOver17, setDependentsOver17] = useState<number>(0);
  const [healthInsurance, setHealthInsurance] = useState<string>("");
  const [homeOffice, setHomeOffice] = useState<string>("");

  const startVoiceInput = (field: string, setter: (val: string) => void) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice input not supported. Try Chrome or Edge.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.onstart = () => { setIsListening(true); setVoiceField(field); };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const numbers = transcript.match(/\d+/g);
      if (numbers) setter(numbers.join(""));
    };
    recognition.onend = () => { setIsListening(false); setVoiceField(null); };
    recognition.onerror = () => { setIsListening(false); setVoiceField(null); };
    recognition.start();
  };

  const advancedInputs: AdvancedTaxInputs = {
    w2Income: parseFloat(w2Income) || 0,
    workMileage: parseFloat(workMileage) || 0,
    mortgageInterest: parseFloat(mortgageInterest) || 0,
    studentTuition: parseFloat(studentTuition) || 0,
    iraContributions: parseFloat(iraContributions) || 0,
    quarterlyPaymentsMade: parseFloat(quarterlyPayments) || 0,
    w2TaxesWithheld: parseFloat(w2TaxesWithheld) || 0,
    dependentsUnder17,
    dependentsOver17,
    healthInsurancePremiums: parseFloat(healthInsurance) || 0,
    homeOfficeSquareFeet: parseFloat(homeOffice) || 0,
  };

  const results = useMemo(() => {
    const income = parseFloat(grossIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    if (income <= 0) return null;
    const baseResults = calculate1099TaxAdvanced(income, expenses, selectedState, filingStatus, advancedInputs);
    
    // If state tax is disabled, recalculate without it
    if (!includeStateTax) {
      const stateTaxAdjusted = {
        ...baseResults,
        stateTax: 0,
        totalTax: baseResults.totalTax - baseResults.stateTax,
        taxOwedOrRefund: baseResults.taxOwedOrRefund - baseResults.stateTax,
        effectiveRate: baseResults.taxableIncome > 0 
          ? (baseResults.totalTax - baseResults.stateTax) / baseResults.taxableIncome 
          : 0,
      };
      return stateTaxAdjusted;
    }
    return baseResults;
  }, [grossIncome, businessExpenses, selectedState, filingStatus, advancedInputs, includeStateTax]);

  // Calculate the full state tax amount for the toggle display
  const fullStateTaxAmount = useMemo(() => {
    const income = parseFloat(grossIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    if (income <= 0) return 0;
    const baseResults = calculate1099TaxAdvanced(income, expenses, selectedState, filingStatus, advancedInputs);
    return baseResults.stateTax;
  }, [grossIncome, businessExpenses, selectedState, filingStatus, advancedInputs]);

  const exportToPDF = () => {
    if (!results) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("1099 Tax Estimate", pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Money Grow Tools`, pageWidth / 2, 28, { align: "center" });
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
    
    let yPos = 50;
    
    // Main result box
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(14, yPos - 5, pageWidth - 28, 30, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(results.taxOwedOrRefund >= 0 ? "Estimated Tax Owed" : "Estimated Refund", pageWidth / 2, yPos + 5, { align: "center" });
    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text(formatCurrency(Math.abs(results.taxOwedOrRefund)), pageWidth / 2, yPos + 18, { align: "center" });
    doc.setTextColor(0, 0, 0);
    
    yPos += 40;
    
    // Summary section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Tax Summary", 14, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    const summaryItems = [
      ["Gross Income", formatCurrency(results.grossIncome)],
      ["Business Expenses", `-${formatCurrency(results.businessExpenses)}`],
      ["Adjusted Gross Income", formatCurrency(results.adjustedGrossIncome)],
      ["Taxable Income", formatCurrency(results.taxableIncome)],
      ["Effective Tax Rate", formatPercent(results.effectiveRate)],
    ];
    
    summaryItems.forEach(([label, value]) => {
      doc.text(label, 14, yPos);
      doc.text(value, pageWidth - 14, yPos, { align: "right" });
      yPos += 7;
    });
    
    yPos += 10;
    
    // Tax breakdown section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Tax Breakdown", 14, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    const taxItems = [
      ["Self-Employment Tax (15.3%)", formatCurrency(results.selfEmploymentTax)],
      ["Federal Income Tax", formatCurrency(results.federalIncomeTax)],
      ["State Tax", formatCurrency(results.stateTax)],
    ];
    
    if (results.credits.totalCredits > 0) {
      taxItems.push(["Tax Credits", `-${formatCurrency(results.credits.totalCredits)}`]);
    }
    
    taxItems.push(["Total Tax", formatCurrency(results.totalTax)]);
    
    taxItems.forEach(([label, value], index) => {
      if (index === taxItems.length - 1) {
        doc.setFont("helvetica", "bold");
        doc.setFillColor(240, 240, 240);
        doc.rect(14, yPos - 4, pageWidth - 28, 8, 'F');
      }
      doc.text(label, 14, yPos);
      doc.text(value, pageWidth - 14, yPos, { align: "right" });
      yPos += 8;
    });
    
    yPos += 10;
    
    // Federal bracket breakdown
    if (results.federalBracketBreakdown.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Federal Tax Bracket Breakdown", 14, yPos);
      yPos += 10;
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      results.federalBracketBreakdown.forEach((bracket) => {
        const bracketLabel = bracket.max === Infinity 
          ? `Over ${formatCurrency(bracket.min)}`
          : `${formatCurrency(bracket.min)} - ${formatCurrency(bracket.max)}`;
        
        doc.text(`${bracket.rate}% Bracket: ${bracketLabel}`, 14, yPos);
        doc.text(formatCurrency(bracket.taxFromBracket), pageWidth - 14, yPos, { align: "right" });
        yPos += 6;
      });
    }
    
    yPos += 10;
    
    // Quarterly payment
    doc.setFillColor(255, 247, 237);
    doc.roundedRect(14, yPos - 5, pageWidth - 28, 20, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Quarterly Payment:", 20, yPos + 5);
    doc.setTextColor(234, 88, 12);
    doc.text(formatCurrency(results.quarterlyPayment), pageWidth - 20, yPos + 5, { align: "right" });
    doc.setTextColor(0, 0, 0);
    
    // Footer disclaimer
    yPos = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Disclaimer: This is an estimate for informational purposes only. Consult a qualified tax professional.", pageWidth / 2, yPos, { align: "center" });
    doc.text("for personalized advice. Tax laws change frequently.", pageWidth / 2, yPos + 4, { align: "center" });
    
    doc.save("1099-tax-estimate.pdf");
  };

  const handleReceiptAmount = (amount: number) => {
    const current = parseFloat(businessExpenses) || 0;
    setBusinessExpenses((current + amount).toString());
  };

  const stateOptions = Object.entries(stateTaxRates).sort((a, b) => a[1].name.localeCompare(b[1].name));
  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "1099 Tax Calculator", url: "https://moneygrowtools.com/calculator/1099" },
  ];

  return (
    <Layout>
      <SEOHead
        title="Free 1099 Tax Calculator 2026 | Calculate Self-Employment Tax"
        description="Free 1099 tax calculator for freelancers. Calculate federal, state, and self-employment tax with advanced deductions. Updated for 2026."
        canonicalUrl="https://moneygrowtools.com/calculator/1099"
        keywords={["1099 tax calculator", "self-employment tax", "freelance tax calculator", "1099 taxes 2026"]}
      />
      <StructuredData schemas={[softwareApplicationSchema, generateBreadcrumbSchema(breadcrumbItems)]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm"><ol className="flex items-center space-x-2"><li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li><li className="text-muted-foreground">/</li><li className="text-foreground font-medium">1099 Tax Calculator</li></ol></nav>

          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4"><FileText className="w-8 h-8 text-primary" /></div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">Free 1099 Tax Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Calculate your federal, state, and self-employment tax with advanced deductions. Updated for 2026.</p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 sm:p-8 shadow-soft">
                <div className="space-y-5">
                  {/* Gross Income */}
                  <div>
                    <Label className="text-foreground font-medium mb-2 flex items-center gap-2">Gross 1099 Income <InfoTooltip content={FIELD_TOOLTIPS.grossIncome} /></Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span><Input type="number" placeholder="80,000" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="pl-8" /></div>
                      <button onClick={() => startVoiceInput("income", setGrossIncome)} className={`p-3 rounded-lg border ${isListening && voiceField === "income" ? "bg-primary text-primary-foreground" : "bg-card border-border"}`}>{isListening && voiceField === "income" ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}</button>
                    </div>
                  </div>

                  {/* Business Expenses with Receipt Scanner */}
                  <div>
                    <Label className="text-foreground font-medium mb-2 flex items-center gap-2">Business Expenses <InfoTooltip content={FIELD_TOOLTIPS.businessExpenses} /></Label>
                    <div className="flex gap-2 mb-2">
                      <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span><Input type="number" placeholder="10,000" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} className="pl-8" /></div>
                      <button onClick={() => startVoiceInput("expenses", setBusinessExpenses)} className={`p-3 rounded-lg border ${isListening && voiceField === "expenses" ? "bg-primary text-primary-foreground" : "bg-card border-border"}`}>{isListening && voiceField === "expenses" ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}</button>
                    </div>
                    <ReceiptScanner onAmountDetected={handleReceiptAmount} />
                  </div>

                  {/* State */}
                  <div>
                    <Label className="text-foreground font-medium mb-2 flex items-center gap-2">State <InfoTooltip content={FIELD_TOOLTIPS.state} /></Label>
                    <div className="relative">
                      <button type="button" onClick={() => setShowStateDropdown(!showStateDropdown)} className="w-full flex items-center justify-between p-3 bg-background border border-input rounded-lg">
                        <span>{stateTaxRates[selectedState]?.name} ({formatPercent(stateTaxRates[selectedState]?.rate || 0)})</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </button>
                      {showStateDropdown && (
                        <div className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {stateOptions.map(([code, state]) => (
                            <button key={code} type="button" onClick={() => { setSelectedState(code); setShowStateDropdown(false); }} className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted text-left ${selectedState === code ? "bg-primary/10 text-primary" : ""}`}>
                              <span>{state.name}</span><span className={`text-sm ${state.rate === 0 ? "text-success" : "text-muted-foreground"}`}>{state.rate === 0 ? "No tax" : formatPercent(state.rate)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Filing Status */}
                  <div>
                    <Label className="text-foreground font-medium mb-2 flex items-center gap-2">Filing Status <InfoTooltip content={FIELD_TOOLTIPS.filingStatus} /></Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ value: "single", label: "Single" }, { value: "mfj", label: "Married" }, { value: "hoh", label: "Head of Household" }].map((s) => (
                        <button key={s.value} onClick={() => setFilingStatus(s.value as typeof filingStatus)} className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${filingStatus === s.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary"}`}>{s.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Dependents */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm">Children Under 17 <InfoTooltip content={FIELD_TOOLTIPS.dependentsUnder17} /></Label>
                      <div className="flex gap-1">{[0,1,2,3,4].map(n => (<button key={n} onClick={() => setDependentsUnder17(n)} className={`flex-1 py-2 rounded-lg border text-sm ${dependentsUnder17 === n ? "bg-primary text-primary-foreground" : "bg-card border-border"}`}>{n}{n === 4 ? "+" : ""}</button>))}</div>
                    </div>
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm">Other Dependents <InfoTooltip content={FIELD_TOOLTIPS.dependentsOver17} /></Label>
                      <div className="flex gap-1">{[0,1,2,3,4].map(n => (<button key={n} onClick={() => setDependentsOver17(n)} className={`flex-1 py-2 rounded-lg border text-sm ${dependentsOver17 === n ? "bg-primary text-primary-foreground" : "bg-card border-border"}`}>{n}{n === 4 ? "+" : ""}</button>))}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Tax Toggle */}
              {stateTaxRates[selectedState]?.rate > 0 && (
                <StateTaxToggle
                  enabled={includeStateTax}
                  onToggle={setIncludeStateTax}
                  stateName={stateTaxRates[selectedState]?.name || ""}
                  stateRate={stateTaxRates[selectedState]?.rate || 0}
                  stateTaxAmount={fullStateTaxAmount}
                />
              )}

              {/* Advanced Options */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-foreground">Advanced Options <span className="text-sm text-muted-foreground">(W-2, mileage, deductions)</span></span>
                  {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {showAdvanced && (
                  <div className="p-4 pt-0 space-y-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className="text-sm mb-1 flex items-center gap-1">W-2 Income <InfoTooltip content={FIELD_TOOLTIPS.w2Income} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={w2Income} onChange={(e) => setW2Income(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Work Mileage <InfoTooltip content={FIELD_TOOLTIPS.workMileage} /></Label><Input type="number" placeholder="0" value={workMileage} onChange={(e) => setWorkMileage(e.target.value)} className="h-9 text-sm" /></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Mortgage Interest <InfoTooltip content={FIELD_TOOLTIPS.mortgageInterest} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={mortgageInterest} onChange={(e) => setMortgageInterest(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Student Tuition <InfoTooltip content={FIELD_TOOLTIPS.studentTuition} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={studentTuition} onChange={(e) => setStudentTuition(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">IRA Contributions <InfoTooltip content={FIELD_TOOLTIPS.iraContributions} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={iraContributions} onChange={(e) => setIraContributions(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Health Insurance <InfoTooltip content={FIELD_TOOLTIPS.healthInsurance} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Home Office (sq ft) <InfoTooltip content={FIELD_TOOLTIPS.homeOffice} /></Label><Input type="number" placeholder="0" value={homeOffice} onChange={(e) => setHomeOffice(e.target.value)} className="h-9 text-sm" /></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">Quarterly Payments Made <InfoTooltip content={FIELD_TOOLTIPS.quarterlyPayments} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={quarterlyPayments} onChange={(e) => setQuarterlyPayments(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                      <div><Label className="text-sm mb-1 flex items-center gap-1">W-2 Taxes Withheld <InfoTooltip content={FIELD_TOOLTIPS.w2TaxesWithheld} /></Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span><Input type="number" placeholder="0" value={w2TaxesWithheld} onChange={(e) => setW2TaxesWithheld(e.target.value)} className="pl-7 h-9 text-sm" /></div></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {results ? (
                <>
                  <div className="result-highlight text-center">
                    <p className="text-muted-foreground text-sm mb-1">{results.taxOwedOrRefund >= 0 ? "Estimated Tax Owed" : "Estimated Refund"}</p>
                    <p className={`text-4xl sm:text-5xl font-heading font-bold ${results.taxOwedOrRefund < 0 ? "text-success" : "text-primary"}`}>{formatCurrency(Math.abs(results.taxOwedOrRefund))}</p>
                    <p className="text-muted-foreground mt-2">Effective Rate: <span className="font-semibold text-foreground">{formatPercent(results.effectiveRate)}</span></p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Full Tax Breakdown</h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Adjusted Gross Income</span><span className="font-medium">{formatCurrency(results.adjustedGrossIncome)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">{results.deductionUsed === "itemized" ? "Itemized Deductions" : "Standard Deduction"}</span><span className="font-medium text-success">-{formatCurrency(results.deductionUsed === "itemized" ? results.itemizedDeductions : results.standardDeduction)}</span></div>
                      <div className="flex justify-between border-t border-border pt-2"><span className="text-muted-foreground">Taxable Income</span><span className="font-medium">{formatCurrency(results.taxableIncome)}</span></div>
                      <div className="border-t border-border pt-2 space-y-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Self-Employment Tax (15.3%)</span><span className="font-medium">{formatCurrency(results.selfEmploymentTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-medium">{formatCurrency(results.federalIncomeTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">State Tax ({stateTaxRates[selectedState]?.name})</span><span className="font-medium">{formatCurrency(results.stateTax)}</span></div>
                        {results.credits.totalCredits > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Tax Credits</span><span className="font-medium text-success">-{formatCurrency(results.credits.totalCredits)}</span></div>}
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-semibold"><span>Total Tax</span><span>{formatCurrency(results.totalTax)}</span></div>
                      {results.paymentsAndWithholding > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Payments & Withholding</span><span className="font-medium text-success">-{formatCurrency(results.paymentsAndWithholding)}</span></div>}
                    </div>
                  </div>

                  {/* Pie Chart Visualization */}
                  <TaxBreakdownChart
                    selfEmploymentTax={results.selfEmploymentTax}
                    federalIncomeTax={results.federalIncomeTax}
                    stateTax={results.stateTax}
                  />

                  {/* Federal Bracket Breakdown */}
                  <FederalBracketBreakdown
                    brackets={results.federalBracketBreakdown}
                    totalFederalTax={results.federalIncomeTax}
                  />

                  {results.potentialDeductions.max > 0 && (
                    <div className="bg-accent/20 rounded-lg border border-accent/30 p-4">
                      <h3 className="font-semibold text-foreground mb-1">Potential Business Deductions</h3>
                      <p className="text-2xl font-heading font-bold text-accent">{formatCurrency(results.potentialDeductions.min)} - {formatCurrency(results.potentialDeductions.max)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Based on typical deductions for self-employed individuals</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={exportToPDF} className="flex-1"><Download className="w-4 h-4 mr-2" />Download PDF</Button>
                    <Button asChild variant="outline" className="flex-1"><Link to="/calculator/quarterly">Quarterly Payments<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
                  </div>

                  
                </>
              ) : (
                <div className="bg-muted/50 rounded-lg border border-border p-8 text-center"><FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">Enter your income to calculate taxes</p></div>
              )}
            </div>
          </div>

          {/* SEO Content Section */}
          <Calculator1099SEOContent />
        </div>
      </main>
    </Layout>
  );
};

export default Calculator1099;
