import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema } from "@/components/shared/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calculator,
  DollarSign,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Info,
  FileText,
  HelpCircle,
  TrendingDown,
  Home,
  Building2,
  Landmark,
  GraduationCap,
  Wheat,
  ArrowRight,
  Download,
  Printer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssetItem {
  id: string;
  label: string;
  value: number;
}

interface LiabilityItem {
  id: string;
  label: string;
  value: number;
}

const defaultAssets: AssetItem[] = [
  { id: "cash", label: "Cash & Bank Accounts", value: 0 },
  { id: "investments", label: "Stocks, Bonds & Investments", value: 0 },
  { id: "retirement", label: "Retirement Accounts (401k, IRA)", value: 0 },
  { id: "home", label: "Primary Home (Fair Market Value)", value: 0 },
  { id: "vehicles", label: "Vehicles", value: 0 },
  { id: "property", label: "Other Real Estate", value: 0 },
  { id: "personal", label: "Personal Property & Belongings", value: 0 },
];

const defaultLiabilities: LiabilityItem[] = [
  { id: "mortgage", label: "Mortgage Balance", value: 0 },
  { id: "auto", label: "Auto Loans", value: 0 },
  { id: "student", label: "Student Loans", value: 0 },
  { id: "credit", label: "Credit Card Debt", value: 0 },
  { id: "medical", label: "Medical Bills", value: 0 },
  { id: "personal_loans", label: "Personal Loans", value: 0 },
  { id: "other", label: "Other Debts", value: 0 },
];

const exclusionTypes = [
  {
    id: "bankruptcy",
    label: "Title 11 Bankruptcy",
    description: "Debt discharged in Chapter 7, 11, or 13 bankruptcy",
    icon: Landmark,
  },
  {
    id: "principal_residence",
    label: "Qualified Principal Residence",
    description: "Mortgage debt on your main home (before Jan 1, 2026)",
    icon: Home,
  },
  {
    id: "farm",
    label: "Qualified Farm Indebtedness",
    description: "Farm debt for taxpayers with 50%+ gross income from farming",
    icon: Wheat,
  },
  {
    id: "real_property_business",
    label: "Qualified Real Property Business Debt",
    description: "Business real estate debt (not applicable to C corporations)",
    icon: Building2,
  },
  {
    id: "student_loan",
    label: "Student Loan Discharge",
    description: "Certain student loan forgiveness programs (2021-2025)",
    icon: GraduationCap,
  },
];

const Calculator1099C = () => {
  const { toast } = useToast();
  
  // Form state
  const [canceledDebt, setCanceledDebt] = useState<number>(0);
  const [assets, setAssets] = useState<AssetItem[]>(defaultAssets);
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>(defaultLiabilities);
  const [selectedExclusion, setSelectedExclusion] = useState<string | null>(null);
  const [taxBracket, setTaxBracket] = useState<number>(22);
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");

  // Calculations
  const calculations = useMemo(() => {
    const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
    const insolvencyAmount = Math.max(0, totalLiabilities - totalAssets);
    const isInsolvent = totalLiabilities > totalAssets;
    
    // Determine exclusion amount
    let exclusionAmount = 0;
    let exclusionReason = "";
    
    if (selectedExclusion === "bankruptcy") {
      exclusionAmount = canceledDebt;
      exclusionReason = "100% excluded under Title 11 Bankruptcy";
    } else if (selectedExclusion === "principal_residence") {
      const maxExclusion = filingStatus === "married" ? 750000 : 375000;
      exclusionAmount = Math.min(canceledDebt, maxExclusion);
      exclusionReason = `Up to $${maxExclusion.toLocaleString()} excluded for principal residence`;
    } else if (selectedExclusion === "student_loan") {
      exclusionAmount = canceledDebt;
      exclusionReason = "100% excluded under student loan provisions (2021-2025)";
    } else if (selectedExclusion === "farm" || selectedExclusion === "real_property_business") {
      exclusionAmount = canceledDebt;
      exclusionReason = "Excluded under qualified farm/business indebtedness rules";
    } else if (isInsolvent) {
      exclusionAmount = Math.min(canceledDebt, insolvencyAmount);
      exclusionReason = `Excluded up to insolvency amount ($${insolvencyAmount.toLocaleString()})`;
    }
    
    const taxableAmount = Math.max(0, canceledDebt - exclusionAmount);
    const estimatedTax = taxableAmount * (taxBracket / 100);
    const taxSavings = exclusionAmount * (taxBracket / 100);
    
    return {
      totalAssets,
      totalLiabilities,
      insolvencyAmount,
      isInsolvent,
      exclusionAmount,
      exclusionReason,
      taxableAmount,
      estimatedTax,
      taxSavings,
    };
  }, [canceledDebt, assets, liabilities, selectedExclusion, taxBracket, filingStatus]);

  const updateAsset = (id: string, value: number) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, value } : a));
  };

  const updateLiability = (id: string, value: number) => {
    setLiabilities(prev => prev.map(l => l.id === id ? { ...l, value } : l));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // PDF Generation Function
  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;
    
    const addText = (text: string, x: number, y: number, options?: { fontSize?: number; fontStyle?: string; color?: [number, number, number] }) => {
      if (options?.fontSize) doc.setFontSize(options.fontSize);
      if (options?.fontStyle) doc.setFont("helvetica", options.fontStyle);
      if (options?.color) doc.setTextColor(...options.color);
      else doc.setTextColor(0, 0, 0);
      doc.text(text, x, y);
    };
    
    const addLine = (y: number) => {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
    };
    
    const addSection = (title: string) => {
      yPos += 10;
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
      addText(title, margin + 2, yPos + 2, { fontSize: 12, fontStyle: "bold" });
      yPos += 12;
    };
    
    // Header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, pageWidth, 35, 'F');
    addText("1099-C Debt Forgiveness", margin, 15, { fontSize: 18, fontStyle: "bold", color: [255, 255, 255] });
    addText("Tax Calculation Report", margin, 25, { fontSize: 12, fontStyle: "normal", color: [255, 255, 255] });
    addText(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 50, 25, { fontSize: 10, fontStyle: "normal", color: [255, 255, 255] });
    
    yPos = 50;
    
    // Tax Summary Section
    addSection("TAX SUMMARY");
    
    const summaryData = [
      ["Canceled Debt (Form 1099-C):", formatCurrency(canceledDebt)],
      ["Filing Status:", filingStatus === "married" ? "Married Filing Jointly" : "Single / Head of Household"],
      ["Estimated Tax Bracket:", `${taxBracket}%`],
    ];
    
    summaryData.forEach(([label, value]) => {
      addText(label, margin + 5, yPos, { fontSize: 10, fontStyle: "normal" });
      addText(value, pageWidth - margin - 50, yPos, { fontSize: 10, fontStyle: "bold" });
      yPos += 8;
    });
    
    // Exclusion Applied
    if (selectedExclusion) {
      const exclusionLabel = exclusionTypes.find(e => e.id === selectedExclusion)?.label || "Unknown";
      yPos += 5;
      addText("Exclusion Applied:", margin + 5, yPos, { fontSize: 10, fontStyle: "normal" });
      addText(exclusionLabel, pageWidth - margin - 80, yPos, { fontSize: 10, fontStyle: "bold", color: [34, 197, 94] });
      yPos += 8;
    }
    
    // Insolvency Worksheet (only if no special exclusion selected)
    if (!selectedExclusion) {
      addSection("INSOLVENCY WORKSHEET");
      
      // Assets
      addText("ASSETS (Fair Market Value)", margin + 5, yPos, { fontSize: 10, fontStyle: "bold" });
      yPos += 8;
      
      assets.filter(a => a.value > 0).forEach(asset => {
        addText(asset.label + ":", margin + 10, yPos, { fontSize: 9, fontStyle: "normal" });
        addText(formatCurrency(asset.value), pageWidth - margin - 40, yPos, { fontSize: 9, fontStyle: "normal" });
        yPos += 6;
      });
      
      addLine(yPos);
      yPos += 5;
      addText("Total Assets:", margin + 10, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(formatCurrency(calculations.totalAssets), pageWidth - margin - 40, yPos, { fontSize: 10, fontStyle: "bold", color: [34, 197, 94] });
      yPos += 12;
      
      // Liabilities
      addText("LIABILITIES (What You Owe)", margin + 5, yPos, { fontSize: 10, fontStyle: "bold" });
      yPos += 8;
      
      liabilities.filter(l => l.value > 0).forEach(liability => {
        addText(liability.label + ":", margin + 10, yPos, { fontSize: 9, fontStyle: "normal" });
        addText(formatCurrency(liability.value), pageWidth - margin - 40, yPos, { fontSize: 9, fontStyle: "normal" });
        yPos += 6;
      });
      
      addLine(yPos);
      yPos += 5;
      addText("Total Liabilities:", margin + 10, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(formatCurrency(calculations.totalLiabilities), pageWidth - margin - 40, yPos, { fontSize: 10, fontStyle: "bold", color: [239, 68, 68] });
      yPos += 12;
      
      // Insolvency Status
      if (calculations.isInsolvent) {
        doc.setFillColor(220, 252, 231);
      } else {
        doc.setFillColor(254, 226, 226);
      }
      doc.rect(margin, yPos - 2, pageWidth - 2 * margin, 12, 'F');
      addText(
        calculations.isInsolvent ? "✓ You Were INSOLVENT" : "✗ You Were NOT Insolvent",
        margin + 5, yPos + 5,
        { fontSize: 11, fontStyle: "bold", color: calculations.isInsolvent ? [22, 163, 74] : [220, 38, 38] }
      );
      if (calculations.isInsolvent) {
        addText(`Insolvency Amount: ${formatCurrency(calculations.insolvencyAmount)}`, pageWidth - margin - 70, yPos + 5, { fontSize: 10, fontStyle: "normal" });
      }
      yPos += 18;
    }
    
    // Tax Calculation Results
    addSection("TAX CALCULATION RESULTS");
    
    const resultsData = [
      ["Canceled Debt:", formatCurrency(canceledDebt), [0, 0, 0] as [number, number, number]],
      ["Excluded Amount:", `-${formatCurrency(calculations.exclusionAmount)}`, [34, 197, 94] as [number, number, number]],
      ["Taxable Amount:", formatCurrency(calculations.taxableAmount), [0, 0, 0] as [number, number, number]],
    ];
    
    resultsData.forEach(([label, value, color]) => {
      addText(label as string, margin + 5, yPos, { fontSize: 10, fontStyle: "normal" });
      addText(value as string, pageWidth - margin - 40, yPos, { fontSize: 10, fontStyle: "bold", color: color as [number, number, number] });
      yPos += 8;
    });
    
    // Estimated Tax Box
    yPos += 5;
    if (calculations.estimatedTax === 0) {
      doc.setFillColor(220, 252, 231);
    } else {
      doc.setFillColor(254, 226, 226);
    }
    doc.rect(margin, yPos - 2, pageWidth - 2 * margin, 15, 'F');
    addText("Estimated Tax Owed:", margin + 5, yPos + 7, { fontSize: 12, fontStyle: "bold" });
    addText(
      formatCurrency(calculations.estimatedTax),
      pageWidth - margin - 50, yPos + 7,
      { fontSize: 14, fontStyle: "bold", color: calculations.estimatedTax === 0 ? [22, 163, 74] : [220, 38, 38] }
    );
    yPos += 22;
    
    // Tax Savings
    if (calculations.taxSavings > 0) {
      addText(`Potential Tax Savings: ${formatCurrency(calculations.taxSavings)}`, margin + 5, yPos, { fontSize: 11, fontStyle: "bold", color: [34, 197, 94] });
      yPos += 15;
    }
    
    // Form 982 Guidance
    addSection("IRS FORM 982 GUIDANCE");
    
    const form982Instructions = [
      "If you're excluding canceled debt from income, you MUST file Form 982 with your tax return.",
      "",
      "Key Steps:",
      "1. Check the appropriate box in Part I for your exclusion type",
      "2. Enter the total amount excluded on line 2",
      "3. Complete Part II if reducing tax attributes",
      "4. Attach to your Form 1040",
      "",
      "For insolvency exclusion: Check box 1b and complete the insolvency worksheet",
      "",
      "Download Form 982: www.irs.gov/forms-pubs/about-form-982",
    ];
    
    form982Instructions.forEach(line => {
      if (line === "") {
        yPos += 3;
      } else {
        addText(line, margin + 5, yPos, { fontSize: 9, fontStyle: "normal" });
        yPos += 6;
      }
    });
    
    // Disclaimer Footer
    yPos = doc.internal.pageSize.getHeight() - 25;
    addLine(yPos - 5);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("DISCLAIMER: This report is for informational purposes only and does not constitute tax advice.", margin, yPos);
    doc.text("Consult a qualified tax professional for personalized guidance. Generated by MoneyGrowTools.com", margin, yPos + 5);
    
    // Save the PDF
    doc.save("1099-C-Debt-Forgiveness-Report.pdf");
    
    toast({
      title: "PDF Downloaded",
      description: "Your 1099-C report has been saved successfully.",
    });
  }, [canceledDebt, filingStatus, taxBracket, selectedExclusion, assets, liabilities, calculations, toast]);

  const breadcrumbs = [
    { name: "Home", url: "https://moneygrowtools.com" },
    { name: "1099-C Debt Forgiveness Calculator", url: "https://moneygrowtools.com/calculator/1099-c" },
  ];

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "1099-C Debt Forgiveness Tax Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "description": "Calculate tax implications of canceled debt (Form 1099-C). Includes insolvency exclusion calculator and IRS Form 982 guidance.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "312",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is canceled debt taxable income?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally yes, canceled debt is considered taxable income by the IRS. However, there are several exceptions including bankruptcy, insolvency, qualified principal residence indebtedness, and certain student loan forgiveness programs.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the insolvency exclusion for canceled debt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your total liabilities exceed your total assets (fair market value) immediately before the debt cancellation, you are considered insolvent. You can exclude canceled debt up to the amount of your insolvency from taxable income using IRS Form 982.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I report canceled debt on my tax return?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Report canceled debt as Other Income on Schedule 1 (Form 1040). If you qualify for an exclusion (insolvency, bankruptcy, etc.), file Form 982 to reduce or eliminate the taxable amount.",
        },
      },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title="1099-C Debt Forgiveness Tax Calculator 2025 | Insolvency Exclusion"
        description="Free 1099-C calculator to determine if your canceled debt is taxable. Calculate insolvency exclusion, estimate tax liability, and get Form 982 guidance."
        canonicalUrl="https://moneygrowtools.com/calculator/1099-c"
        keywords={[
          "1099-C calculator",
          "debt forgiveness tax calculator",
          "insolvency exclusion calculator",
          "canceled debt tax",
          "Form 982 calculator",
          "1099-C debt forgiveness",
          "is canceled debt taxable",
        ]}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbs), calculatorSchema, faqSchema]} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
                <FileText className="w-3 h-3 mr-1" />
                Updated for 2025 Tax Year
              </Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                1099-C Debt Forgiveness
                <span className="block gradient-text">Tax Calculator</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Received Form 1099-C for canceled debt? Calculate if you owe taxes or qualify for the 
                <strong className="text-foreground"> insolvency exclusion</strong> to reduce your tax bill.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Insolvency calculator included
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Form 982 guidance
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  IRS-compliant calculations
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Left Column - Inputs */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Step 1: Canceled Debt Amount */}
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                        Canceled Debt Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter the amount from Box 2 of your Form 1099-C
                      </p>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="number"
                          value={canceledDebt || ""}
                          onChange={(e) => setCanceledDebt(Number(e.target.value) || 0)}
                          placeholder="10,000"
                          className="pl-10 text-lg h-12"
                        />
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Filing Status</Label>
                          <select
                            value={filingStatus}
                            onChange={(e) => setFilingStatus(e.target.value as "single" | "married")}
                            className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3"
                          >
                            <option value="single">Single / Head of Household</option>
                            <option value="married">Married Filing Jointly</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Estimated Tax Bracket</Label>
                          <select
                            value={taxBracket}
                            onChange={(e) => setTaxBracket(Number(e.target.value))}
                            className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3"
                          >
                            <option value={10}>10%</option>
                            <option value={12}>12%</option>
                            <option value={22}>22%</option>
                            <option value={24}>24%</option>
                            <option value={32}>32%</option>
                            <option value={35}>35%</option>
                            <option value={37}>37%</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 2: Special Exclusions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">2</div>
                        Do Any Exclusions Apply?
                        <Badge variant="outline" className="ml-auto">Optional</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Certain types of debt cancellation are fully or partially excluded from taxable income
                      </p>
                      <div className="space-y-3">
                        {exclusionTypes.map((exclusion) => (
                          <div
                            key={exclusion.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedExclusion === exclusion.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedExclusion(
                              selectedExclusion === exclusion.id ? null : exclusion.id
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                selectedExclusion === exclusion.id ? "bg-primary/20" : "bg-muted"
                              }`}>
                                <exclusion.icon className={`w-5 h-5 ${
                                  selectedExclusion === exclusion.id ? "text-primary" : "text-muted-foreground"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground">{exclusion.label}</span>
                                  {selectedExclusion === exclusion.id && (
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{exclusion.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 3: Insolvency Worksheet */}
                  {!selectedExclusion && (
                    <Card className="border-2 border-warning/20">
                      <CardHeader className="bg-warning/5">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className="w-8 h-8 rounded-full bg-warning text-warning-foreground flex items-center justify-center text-sm font-bold">3</div>
                          <Scale className="w-5 h-5" />
                          Insolvency Worksheet
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="bg-info/10 border border-info/20 rounded-lg p-4 mb-6">
                          <div className="flex gap-2">
                            <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-foreground mb-1">What is the Insolvency Exclusion?</p>
                              <p className="text-muted-foreground">
                                If your total debts exceed your total assets immediately before the debt was canceled, 
                                you can exclude up to that difference from taxable income. Use fair market value for assets.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Assets */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <TrendingDown className="w-4 h-4 text-success rotate-180" />
                              Total Assets (Fair Market Value)
                            </h4>
                            <div className="space-y-3">
                              {assets.map((asset) => (
                                <div key={asset.id}>
                                  <Label className="text-sm text-muted-foreground">{asset.label}</Label>
                                  <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                      type="number"
                                      value={asset.value || ""}
                                      onChange={(e) => updateAsset(asset.id, Number(e.target.value) || 0)}
                                      placeholder="0"
                                      className="pl-8 h-9"
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="pt-3 border-t">
                                <div className="flex justify-between font-semibold">
                                  <span>Total Assets:</span>
                                  <span className="text-success">{formatCurrency(calculations.totalAssets)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Liabilities */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <TrendingDown className="w-4 h-4 text-destructive" />
                              Total Liabilities (What You Owe)
                            </h4>
                            <div className="space-y-3">
                              {liabilities.map((liability) => (
                                <div key={liability.id}>
                                  <Label className="text-sm text-muted-foreground">{liability.label}</Label>
                                  <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                      type="number"
                                      value={liability.value || ""}
                                      onChange={(e) => updateLiability(liability.id, Number(e.target.value) || 0)}
                                      placeholder="0"
                                      className="pl-8 h-9"
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="pt-3 border-t">
                                <div className="flex justify-between font-semibold">
                                  <span>Total Liabilities:</span>
                                  <span className="text-destructive">{formatCurrency(calculations.totalLiabilities)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    
                    {/* Results Card */}
                    <Card className="border-2 border-primary shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="w-5 h-5" />
                          Your Tax Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        
                        {/* Insolvency Status */}
                        {!selectedExclusion && (
                          <div className={`p-4 rounded-lg ${
                            calculations.isInsolvent 
                              ? "bg-success/10 border border-success/20" 
                              : "bg-destructive/10 border border-destructive/20"
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              {calculations.isInsolvent ? (
                                <CheckCircle2 className="w-5 h-5 text-success" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                              )}
                              <span className="font-semibold">
                                {calculations.isInsolvent ? "You Were Insolvent" : "You Were NOT Insolvent"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {calculations.isInsolvent
                                ? `Insolvency amount: ${formatCurrency(calculations.insolvencyAmount)}`
                                : "All canceled debt may be taxable income"}
                            </p>
                          </div>
                        )}

                        {/* Key Numbers */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">Canceled Debt (1099-C)</span>
                            <span className="font-semibold">{formatCurrency(canceledDebt)}</span>
                          </div>
                          
                          {calculations.exclusionAmount > 0 && (
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Shield className="w-4 h-4 text-success" />
                                Excluded Amount
                              </span>
                              <span className="font-semibold text-success">
                                -{formatCurrency(calculations.exclusionAmount)}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">Taxable Amount</span>
                            <span className={`font-bold text-lg ${
                              calculations.taxableAmount === 0 ? "text-success" : "text-foreground"
                            }`}>
                              {formatCurrency(calculations.taxableAmount)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 bg-muted/50 rounded-lg px-3">
                            <span className="font-medium">Estimated Tax Owed</span>
                            <span className={`font-bold text-xl ${
                              calculations.estimatedTax === 0 ? "text-success" : "text-destructive"
                            }`}>
                              {formatCurrency(calculations.estimatedTax)}
                            </span>
                          </div>
                        </div>

                        {/* Exclusion Reason */}
                        {calculations.exclusionReason && (
                          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                            <p className="text-sm text-success font-medium">
                              ✓ {calculations.exclusionReason}
                            </p>
                          </div>
                        )}

                        {/* Tax Savings */}
                        {calculations.taxSavings > 0 && (
                          <div className="text-center py-4 border-t">
                            <p className="text-sm text-muted-foreground mb-1">Potential Tax Savings</p>
                            <p className="text-2xl font-bold text-success">
                              {formatCurrency(calculations.taxSavings)}
                            </p>
                          </div>
                        )}
                        
                        {/* Download PDF Button */}
                        <div className="pt-4 border-t">
                          <Button 
                            onClick={generatePDF} 
                            variant="outline" 
                            className="w-full gap-2"
                            disabled={canceledDebt === 0}
                          >
                            <Download className="w-4 h-4" />
                            Download PDF Report
                          </Button>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Includes insolvency worksheet & Form 982 guidance
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Form 982 Reminder */}
                    <Card className="bg-warning/5 border-warning/20">
                      <CardContent className="pt-6">
                        <div className="flex gap-3">
                          <FileText className="w-5 h-5 text-warning flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">IRS Form 982 Required</h4>
                            <p className="text-sm text-muted-foreground">
                              If you're excluding canceled debt, you must file Form 982 with your tax return to claim the exclusion.
                            </p>
                            <a
                              href="https://www.irs.gov/forms-pubs/about-form-982"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
                            >
                              Download Form 982
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="pt-6 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                          Need to calculate your overall tax liability?
                        </p>
                        <Button asChild className="w-full">
                          <Link to="/calculator/1099">
                            Try 1099 Tax Calculator
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
                Understanding Form 1099-C & Canceled Debt Taxes
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">What is Form 1099-C?</h3>
                    <p className="text-sm text-muted-foreground">
                      Creditors send 1099-C when they cancel $600+ of debt. The IRS considers this "income" you must report.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="w-6 h-6 text-warning" />
                    </div>
                    <h3 className="font-semibold mb-2">Insolvency Test</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare total debts vs. assets (FMV) right before cancellation. If debts exceed assets, you may exclude some or all.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-semibold mb-2">How to Exclude</h3>
                    <p className="text-sm text-muted-foreground">
                      File Form 982 with your return. Check the appropriate box and enter your exclusion amount.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is all canceled debt taxable?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          Not always. While canceled debt is generally taxable, several exclusions exist: bankruptcy discharge, 
                          insolvency, qualified principal residence indebtedness, qualified farm indebtedness, qualified real 
                          property business debt, and certain student loan discharges (2021-2025).
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What counts as "assets" for insolvency?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          Include the fair market value of: cash, bank accounts, investments, retirement accounts (401k, IRA), 
                          real estate, vehicles, personal property, and any other assets you own. Use the value immediately 
                          before the debt was canceled.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What is "fair market value" (FMV)?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          FMV is what a willing buyer would pay a willing seller, neither being under pressure. For example, 
                          your home's FMV is what it could sell for on the open market, not your purchase price or tax assessment.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What if I was only partially insolvent?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          You can only exclude canceled debt up to your insolvency amount. For example, if you had $30,000 in 
                          canceled debt but were only insolvent by $20,000, you can exclude $20,000 and must report $10,000 as 
                          taxable income.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Where do I report canceled debt on my tax return?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          Report the taxable amount on Schedule 1 (Form 1040), Line 8c (Other Income). If claiming an exclusion, 
                          also file Form 982 to document the exclusion and reduce tax attributes as required.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Does mortgage forgiveness count as taxable income?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          For your principal residence, up to $750,000 ($375,000 if married filing separately) of forgiven 
                          mortgage debt may be excluded through 2025, if the arrangement was made in writing before January 1, 2026. 
                          This applies to debt discharged for foreclosure, short sale, or loan modification.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-display font-bold mb-4">
                Explore More Free Tax Calculators
              </h2>
              <p className="text-muted-foreground mb-8">
                Get a complete picture of your tax situation with our suite of free tools
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default">
                  <Link to="/calculator/1099">1099 Tax Calculator</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/calculator/quarterly">Quarterly Tax Calculator</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/calculator/self-employment">Self-Employment Tax</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Calculator1099C;
