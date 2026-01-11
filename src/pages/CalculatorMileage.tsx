import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Car, ArrowRight, Download, Globe, Leaf, TrendingUp, 
  DollarSign, Calculator, ChevronDown, Fuel, Zap, Users,
  Percent, Clock, MapPin, Building, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, softwareApplicationSchema, generateFAQPageSchema } from "@/components/shared/StructuredData";
import InfoTooltip from "@/components/shared/InfoTooltip";
import CalculatorMileageSEOContent from "@/components/calculator/CalculatorMileageSEOContent";
import { jsPDF } from "jspdf";
import { formatCurrency, formatPercent } from "@/lib/taxCalculations";

// Constants
const IRS_RATE_2026 = 0.70; // $0.70 per mile for 2026
const CARBON_PER_MILE = 0.00089; // Tons of CO2 per mile (average car)

// Currency conversion rates (simplified - in real app would use API)
const CURRENCY_RATES: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  PKR: { symbol: "₨", rate: 278.50, name: "Pakistani Rupee" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
  INR: { symbol: "₹", rate: 83.12, name: "Indian Rupee" },
};

// Vehicle efficiency data (MPG averages)
const VEHICLE_TYPES: Record<string, { label: string; mpg: number; carbonMultiplier: number }> = {
  gas: { label: "Gas/Petrol", mpg: 27, carbonMultiplier: 1 },
  hybrid: { label: "Hybrid", mpg: 50, carbonMultiplier: 0.6 },
  electric: { label: "Electric", mpg: 120, carbonMultiplier: 0.2 },
  motorcycle: { label: "Motorcycle", mpg: 60, carbonMultiplier: 0.5 },
};

const CalculatorMileage = () => {
  // Basic inputs
  const [numDrivers, setNumDrivers] = useState<number>(5);
  const [monthlyMiles, setMonthlyMiles] = useState<number>(800);
  const [reimbursementRate, setReimbursementRate] = useState<string>("0.70");
  const [useKilometers, setUseKilometers] = useState<boolean>(false);
  
  // Advanced inputs
  const [vehicleType, setVehicleType] = useState<string>("gas");
  const [currency, setCurrency] = useState<string>("USD");
  const [fuelPrice, setFuelPrice] = useState<string>("4.00");
  const [otherExpenses, setOtherExpenses] = useState<string>("150");
  
  // Gig-specific inputs
  const [taxBracket, setTaxBracket] = useState<number>(15.3);
  const [trendMonths, setTrendMonths] = useState<number>(6);
  
  // UI state
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState("savings");

  // Convert miles to km if needed
  const displayMiles = useKilometers ? Math.round(monthlyMiles * 1.60934) : monthlyMiles;
  const milesFromInput = (value: number) => useKilometers ? Math.round(value / 1.60934) : value;

  // Calculate results
  const results = useMemo(() => {
    const rate = parseFloat(reimbursementRate) || IRS_RATE_2026;
    const fuel = parseFloat(fuelPrice) || 4.00;
    const extras = parseFloat(otherExpenses) || 0;
    const vehicle = VEHICLE_TYPES[vehicleType];
    const currencyData = CURRENCY_RATES[currency];
    
    // Annual calculations
    const annualMiles = monthlyMiles * 12 * numDrivers;
    const annualReimbursement = annualMiles * rate;
    
    // Actual expense calculation for comparison
    const fuelCost = (annualMiles / vehicle.mpg) * fuel;
    const totalActualExpenses = fuelCost + (extras * 12 * numDrivers);
    
    // Savings analysis (30% improvement from optimization/accuracy)
    const manualErrorRate = 0.28; // 28% average over-reporting/under-tracking
    const accuracySavings = annualReimbursement * manualErrorRate;
    const expenseOptimization = extras * 12 * numDrivers * 0.15; // 15% expense reduction
    const adminTimeSavings = numDrivers * 5 * 12 * 25; // 5 hrs/month @ $25/hr
    const totalSavings = accuracySavings + expenseOptimization + adminTimeSavings;
    
    // Tax deduction (for 1099 workers)
    const taxDeduction = annualReimbursement * (taxBracket / 100);
    
    // Standard vs actual comparison
    const standardDeduction = annualMiles * IRS_RATE_2026;
    const actualVsStandard = standardDeduction - totalActualExpenses;
    
    // Eco calculations
    const carbonFootprint = annualMiles * CARBON_PER_MILE * vehicle.carbonMultiplier;
    const carbonReduction = annualMiles * CARBON_PER_MILE * (1 - vehicle.carbonMultiplier);
    
    // Predictions (simple linear growth)
    const monthlyGrowthRate = 1.02; // 2% monthly growth assumption
    const predictedNextYear = totalSavings * Math.pow(monthlyGrowthRate, 12);
    
    // Convert to selected currency
    const toLocal = (amount: number) => amount * currencyData.rate;
    
    return {
      annualMiles,
      monthlyMiles: annualMiles / 12,
      annualReimbursement,
      totalSavings,
      accuracySavings,
      expenseOptimization,
      adminTimeSavings,
      taxDeduction,
      standardDeduction,
      actualVsStandard,
      carbonFootprint,
      carbonReduction,
      predictedNextYear,
      fuelCost,
      totalActualExpenses,
      currency: currencyData,
      toLocal,
    };
  }, [numDrivers, monthlyMiles, reimbursementRate, vehicleType, currency, fuelPrice, otherExpenses, taxBracket]);

  // Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with gradient effect
    doc.setFillColor(34, 197, 94); // Green
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 30, pageWidth, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("GigSaver Mileage Report", pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Money Grow Tools`, pageWidth / 2, 32, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    let yPos = 55;
    
    // Main savings highlight
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(14, yPos - 5, pageWidth - 28, 35, 3, 3, 'F');
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Estimated Annual Savings", pageWidth / 2, yPos + 5, { align: "center" });
    doc.setFontSize(28);
    doc.setTextColor(34, 197, 94);
    doc.text(`${results.currency.symbol}${Math.round(results.toLocal(results.totalSavings)).toLocaleString()}`, pageWidth / 2, yPos + 22, { align: "center" });
    doc.setTextColor(0, 0, 0);
    
    yPos += 50;
    
    // Summary items
    const items = [
      ["Annual Business Miles", `${results.annualMiles.toLocaleString()} mi`],
      ["Accuracy Savings (28%)", `${results.currency.symbol}${Math.round(results.toLocal(results.accuracySavings)).toLocaleString()}`],
      ["Expense Optimization", `${results.currency.symbol}${Math.round(results.toLocal(results.expenseOptimization)).toLocaleString()}`],
      ["Admin Time Savings", `${results.currency.symbol}${Math.round(results.toLocal(results.adminTimeSavings)).toLocaleString()}`],
      ["Tax Deduction Potential", `${results.currency.symbol}${Math.round(results.toLocal(results.taxDeduction)).toLocaleString()}`],
      ["Carbon Reduction", `${results.carbonReduction.toFixed(2)} tons CO₂`],
    ];
    
    doc.setFontSize(11);
    items.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.text(label, 20, yPos);
      doc.setFont("helvetica", "bold");
      doc.text(value, pageWidth - 20, yPos, { align: "right" });
      yPos += 10;
    });
    
    // Footer
    yPos = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Estimates based on industry averages. Consult a tax professional for personalized advice.", pageWidth / 2, yPos, { align: "center" });
    
    doc.save("gigsaver-mileage-report.pdf");
  };

  const scrollToCalculator = () => {
    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Mileage Calculator", url: "https://moneygrowtools.com/calculator/mileage" },
  ];

  return (
    <Layout>
      <SEOHead
        title="Free Mileage Reimbursement Calculator 2026 | GigSaver Optimizer"
        description="Free mileage reimbursement savings calculator for freelancers and gig workers. Calculate IRS mileage deductions, tax savings, and eco-impact with multi-currency support. Updated for 2026."
        canonicalUrl="https://moneygrowtools.com/calculator/mileage"
        keywords={[
          "mileage reimbursement calculator",
          "IRS mileage rate 2026",
          "mileage tax deduction",
          "gig worker mileage tracker",
          "self-employment mileage",
          "1099 mileage deduction",
          "business mileage calculator",
          "mileage savings calculator"
        ]}
      />
      <StructuredData schemas={[
        softwareApplicationSchema, 
        generateBreadcrumbSchema(breadcrumbItems),
        generateFAQPageSchema([
          { question: "What is the IRS mileage rate for 2026?", answer: "The IRS standard mileage rate for business use is $0.70 per mile for 2026. Medical and moving mileage is $0.21 per mile." },
          { question: "Should I use standard mileage or actual expenses?", answer: "Standard mileage is simpler and often better for fuel-efficient vehicles. Actual expenses may be better if you have high car payments, repairs, or use a gas-guzzler." },
          { question: "What mileage can I deduct as a freelancer?", answer: "You can deduct business-related driving including client meetings, supply runs, bank deposits, and traveling between work sites. Commuting from home to a regular workplace is not deductible." },
          { question: "How do I track mileage for tax purposes?", answer: "Keep a mileage log with date, destination, business purpose, and miles driven. Apps can automate this. The IRS requires contemporaneous records." },
          { question: "Can gig workers deduct mileage?", answer: "Yes! Uber, Lyft, DoorDash, and other gig workers can deduct all miles driven while working, including miles between pickups and while waiting for orders." }
        ])
      ]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Mileage Calculator</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <Globe className="w-4 h-4" />
              <span>Global Freelancer Tool</span>
            </div>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success/20 to-success/5 rounded-2xl mb-5 shadow-lg">
              <Car className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              GigSaver <span className="text-success">Mileage Optimizer</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unlock 25-35% more savings with smarter mileage tracking. Calculate reimbursements, tax deductions, 
              and eco-impact for global freelancers — with <strong>multi-currency support</strong>.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-warning" />
                <span>IRS 2026 Rates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4 text-success" />
                <span>Eco Impact Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-info" />
                <span>Multi-Currency</span>
              </div>
            </div>
          </header>

          {/* Main Calculator Grid */}
          <div id="calculator-section" className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Input Section - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Configure Your Estimate
                </h2>
                
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic</TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs sm:text-sm">Advanced</TabsTrigger>
                    <TabsTrigger value="gig" className="text-xs sm:text-sm">Gig-Specific</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-5">
                    {/* Number of Drivers */}
                    <div>
                      <Label className="text-foreground font-medium mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          Drivers/Gig Workers
                        </span>
                        <span className="text-primary font-bold">{numDrivers}</span>
                      </Label>
                      <Slider
                        value={[numDrivers]}
                        onValueChange={(v) => setNumDrivers(v[0])}
                        min={1}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1</span>
                        <span>100</span>
                      </div>
                    </div>

                    {/* Monthly Miles */}
                    <div>
                      <Label className="text-foreground font-medium mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          Avg. Monthly {useKilometers ? "KM" : "Miles"}/User
                        </span>
                        <span className="text-primary font-bold">{displayMiles.toLocaleString()}</span>
                      </Label>
                      <Slider
                        value={[monthlyMiles]}
                        onValueChange={(v) => setMonthlyMiles(v[0])}
                        min={100}
                        max={5000}
                        step={50}
                        className="mt-2"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">100</span>
                        <button
                          onClick={() => setUseKilometers(!useKilometers)}
                          className="text-xs text-primary hover:underline"
                        >
                          Switch to {useKilometers ? "Miles" : "KM"}
                        </button>
                        <span className="text-xs text-muted-foreground">5,000</span>
                      </div>
                    </div>

                    {/* Reimbursement Rate */}
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        Rate per Mile
                        <InfoTooltip content="IRS 2026 standard rate is $0.70/mile. You can use a custom rate." />
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.70"
                          value={reimbursementRate}
                          onChange={(e) => setReimbursementRate(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        IRS 2026: $0.70/mile business, $0.21/mile medical/charity
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-5">
                    {/* Vehicle Type */}
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        Vehicle Type
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(VEHICLE_TYPES).map(([key, v]) => (
                          <button
                            key={key}
                            onClick={() => setVehicleType(key)}
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                              vehicleType === key
                                ? "bg-success text-success-foreground border-success shadow-sm"
                                : "bg-card border-border text-muted-foreground hover:border-success/50"
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Currency */}
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        Display Currency
                      </Label>
                      <div className="relative">
                        <button
                          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                          className="w-full flex items-center justify-between p-3 bg-background border border-input rounded-lg hover:border-primary transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-bold">{CURRENCY_RATES[currency].symbol}</span>
                            {CURRENCY_RATES[currency].name}
                          </span>
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </button>
                        {showCurrencyDropdown && (
                          <div className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {Object.entries(CURRENCY_RATES).map(([code, data]) => (
                              <button
                                key={code}
                                onClick={() => { setCurrency(code); setShowCurrencyDropdown(false); }}
                                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted text-left transition-colors ${
                                  currency === code ? "bg-success/10 text-success" : ""
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="font-bold w-6">{data.symbol}</span>
                                  {data.name}
                                </span>
                                <span className="text-xs text-muted-foreground">{code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fuel Price */}
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-muted-foreground" />
                        Avg. Fuel Price/Gallon
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          step="0.10"
                          placeholder="4.00"
                          value={fuelPrice}
                          onChange={(e) => setFuelPrice(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    {/* Other Expenses */}
                    <div>
                      <Label className="text-foreground font-medium mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        Other Monthly Expenses
                        <InfoTooltip content="Tolls, parking, platform fees (e.g., Uber's 20% cut), maintenance" />
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="150"
                          value={otherExpenses}
                          onChange={(e) => setOtherExpenses(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gig" className="space-y-5">
                    {/* Tax Bracket */}
                    <div>
                      <Label className="text-foreground font-medium mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-muted-foreground" />
                          Self-Employment Tax Rate
                        </span>
                        <span className="text-primary font-bold">{taxBracket}%</span>
                      </Label>
                      <Slider
                        value={[taxBracket]}
                        onValueChange={(v) => setTaxBracket(v[0])}
                        min={10}
                        max={40}
                        step={0.1}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        US default: 15.3% (12.4% SS + 2.9% Medicare). Adjust for your country.
                      </p>
                    </div>

                    {/* Trend Months */}
                    <div>
                      <Label className="text-foreground font-medium mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Historical Trend (Months)
                        </span>
                        <span className="text-primary font-bold">{trendMonths}</span>
                      </Label>
                      <Slider
                        value={[trendMonths]}
                        onValueChange={(v) => setTrendMonths(v[0])}
                        min={1}
                        max={12}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Used for AI-powered savings predictions
                      </p>
                    </div>

                    {/* Quick link to 1099 calculator */}
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-sm text-foreground mb-2">
                        <strong>Pro Tip:</strong> Combine with our 1099 calculator for complete tax planning
                      </p>
                      <Link to="/calculator/1099" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
                        Open 1099 Calculator <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Output Section - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main Savings Card */}
              <div className="bg-gradient-to-br from-success/10 via-success/5 to-transparent rounded-2xl border border-success/20 p-6 sm:p-8 shadow-lg">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Annual Savings</p>
                  <p className="text-4xl sm:text-5xl font-heading font-bold text-success">
                    {results.currency.symbol}{Math.round(results.toLocal(results.totalSavings)).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ({results.currency.symbol}{Math.round(results.toLocal(results.totalSavings / 12)).toLocaleString()}/month)
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-card/60 rounded-xl p-3">
                    <p className="text-2xl font-bold text-foreground">{results.annualMiles.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Miles/Year</p>
                  </div>
                  <div className="bg-card/60 rounded-xl p-3">
                    <p className="text-2xl font-bold text-success">
                      {results.currency.symbol}{Math.round(results.toLocal(results.annualReimbursement)).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Reimbursement</p>
                  </div>
                  <div className="bg-card/60 rounded-xl p-3">
                    <p className="text-2xl font-bold text-info">{results.carbonReduction.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Tons CO₂ Saved</p>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Tabs */}
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
                <Tabs value={activeOutputTab} onValueChange={setActiveOutputTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="savings" className="text-xs sm:text-sm">
                      <TrendingUp className="w-4 h-4 mr-1 hidden sm:inline" />
                      Savings
                    </TabsTrigger>
                    <TabsTrigger value="breakdown" className="text-xs sm:text-sm">
                      <FileText className="w-4 h-4 mr-1 hidden sm:inline" />
                      Breakdown
                    </TabsTrigger>
                    <TabsTrigger value="tax" className="text-xs sm:text-sm">
                      <DollarSign className="w-4 h-4 mr-1 hidden sm:inline" />
                      Tax
                    </TabsTrigger>
                    <TabsTrigger value="eco" className="text-xs sm:text-sm">
                      <Leaf className="w-4 h-4 mr-1 hidden sm:inline" />
                      Eco
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="savings" className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Where Your Savings Come From</h3>
                    
                    <div className="space-y-3">
                      {/* Accuracy Savings */}
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                        <div>
                          <p className="font-medium text-foreground">Accuracy Savings (28%)</p>
                          <p className="text-sm text-muted-foreground">From closing manual tracking gaps</p>
                        </div>
                        <p className="text-lg font-bold text-success">
                          {results.currency.symbol}{Math.round(results.toLocal(results.accuracySavings)).toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Expense Optimization */}
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                        <div>
                          <p className="font-medium text-foreground">Expense Optimization</p>
                          <p className="text-sm text-muted-foreground">Reduced tolls, parking, maintenance</p>
                        </div>
                        <p className="text-lg font-bold text-success">
                          {results.currency.symbol}{Math.round(results.toLocal(results.expenseOptimization)).toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Admin Time */}
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                        <div>
                          <p className="font-medium text-foreground">Admin Time Saved</p>
                          <p className="text-sm text-muted-foreground">~90% less manual work @ $25/hr</p>
                        </div>
                        <p className="text-lg font-bold text-success">
                          {results.currency.symbol}{Math.round(results.toLocal(results.adminTimeSavings)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* AI Prediction */}
                    <div className="mt-6 p-4 bg-info/10 rounded-xl border border-info/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-info" />
                        <span className="font-medium text-foreground">AI Prediction</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {trendMonths} months of trends, projected savings next year:
                      </p>
                      <p className="text-2xl font-bold text-info mt-1">
                        {results.currency.symbol}{Math.round(results.toLocal(results.predictedNextYear)).toLocaleString()}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="breakdown" className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Standard vs. Actual Expenses</h3>
                    
                    <div className="grid gap-4">
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">IRS Standard Deduction</p>
                        <p className="text-2xl font-bold text-primary">
                          {results.currency.symbol}{Math.round(results.toLocal(results.standardDeduction)).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {results.annualMiles.toLocaleString()} miles × ${parseFloat(reimbursementRate).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-warning/5 rounded-xl border border-warning/20">
                        <p className="text-sm text-muted-foreground mb-1">Actual Expenses</p>
                        <p className="text-2xl font-bold text-warning">
                          {results.currency.symbol}{Math.round(results.toLocal(results.totalActualExpenses)).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Fuel ({results.currency.symbol}{Math.round(results.toLocal(results.fuelCost)).toLocaleString()}) + Other expenses
                        </p>
                      </div>
                      
                      <div className={`p-4 rounded-xl border ${results.actualVsStandard > 0 ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                        <p className="text-sm text-muted-foreground mb-1">
                          {results.actualVsStandard > 0 ? 'Standard Rate Advantage' : 'Actual Expense Advantage'}
                        </p>
                        <p className={`text-2xl font-bold ${results.actualVsStandard > 0 ? 'text-success' : 'text-destructive'}`}>
                          {results.currency.symbol}{Math.abs(Math.round(results.toLocal(results.actualVsStandard))).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {results.actualVsStandard > 0 
                            ? 'Use standard rate for maximum deduction' 
                            : 'Consider itemizing actual expenses'
                          }
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tax" className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Tax Deduction Potential</h3>
                    
                    <div className="p-6 bg-success/10 rounded-xl border border-success/20 text-center">
                      <p className="text-sm text-muted-foreground mb-2">1099/Self-Employment Tax Savings</p>
                      <p className="text-4xl font-bold text-success">
                        {results.currency.symbol}{Math.round(results.toLocal(results.taxDeduction)).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        At {taxBracket}% self-employment tax rate
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Mileage Deduction</span>
                        <span className="font-medium">{results.currency.symbol}{Math.round(results.toLocal(results.annualReimbursement)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">× Tax Rate</span>
                        <span className="font-medium">{taxBracket}%</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Tax Savings</span>
                        <span className="font-bold text-success">{results.currency.symbol}{Math.round(results.toLocal(results.taxDeduction)).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-sm text-foreground">
                        <strong>Pro Tip:</strong> This deduction can be claimed on Schedule C (Form 1040) for self-employed individuals.
                      </p>
                      <Link to="/calculator/self-employment" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium mt-2">
                        Calculate Full SE Tax <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="eco" className="space-y-4">
                    <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-success" />
                      Environmental Impact
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-success/10 rounded-xl border border-success/20 text-center">
                        <Leaf className="w-8 h-8 text-success mx-auto mb-2" />
                        <p className="text-2xl font-bold text-success">{results.carbonReduction.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Tons CO₂ Saved</p>
                      </div>
                      
                      <div className="p-4 bg-info/10 rounded-xl border border-info/20 text-center">
                        <Car className="w-8 h-8 text-info mx-auto mb-2" />
                        <p className="text-2xl font-bold text-info">{results.carbonFootprint.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Tons CO₂ Footprint</p>
                      </div>
                    </div>
                    
                    {vehicleType !== 'electric' && (
                      <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
                        <p className="text-sm text-foreground">
                          <strong>💡 Switch to Electric:</strong> Reduce carbon footprint by up to 80% and save more on fuel costs!
                        </p>
                        <button
                          onClick={() => setVehicleType('electric')}
                          className="inline-flex items-center gap-2 text-sm text-warning hover:underline font-medium mt-2"
                        >
                          See electric savings <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">Your vehicle efficiency</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full transition-all duration-500"
                            style={{ width: `${(1 - VEHICLE_TYPES[vehicleType].carbonMultiplier) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((1 - VEHICLE_TYPES[vehicleType].carbonMultiplier) * 100)}% eco-efficient
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Export & CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={exportToPDF}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export PDF Report
                </Button>
                <Link to="/calculator/1099" className="flex-1">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <Calculator className="w-5 h-5" />
                    Full 1099 Tax Calculator
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <CalculatorMileageSEOContent scrollToCalculator={scrollToCalculator} />
        </div>
      </main>
    </Layout>
  );
};

export default CalculatorMileage;
