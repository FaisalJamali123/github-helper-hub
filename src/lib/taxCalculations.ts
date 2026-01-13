// 2026 State Income Tax Rates (Top Marginal Rates)
// Source: Tax Foundation 2026 data
export const stateTaxRates: Record<string, { rate: number; name: string; brackets?: { min: number; max: number; rate: number }[] }> = {
  AL: { name: "Alabama", rate: 5.0 },
  AK: { name: "Alaska", rate: 0 },
  AZ: { name: "Arizona", rate: 2.5 },
  AR: { name: "Arkansas", rate: 4.4 },
  CA: { name: "California", rate: 13.3, brackets: [
    { min: 0, max: 10412, rate: 1.0 },
    { min: 10412, max: 24684, rate: 2.0 },
    { min: 24684, max: 38959, rate: 4.0 },
    { min: 38959, max: 54081, rate: 6.0 },
    { min: 54081, max: 68350, rate: 8.0 },
    { min: 68350, max: 349137, rate: 9.3 },
    { min: 349137, max: 418961, rate: 10.3 },
    { min: 418961, max: 698271, rate: 11.3 },
    { min: 698271, max: 1000000, rate: 12.3 },
    { min: 1000000, max: Infinity, rate: 13.3 },
  ]},
  CO: { name: "Colorado", rate: 4.4 },
  CT: { name: "Connecticut", rate: 6.99 },
  DE: { name: "Delaware", rate: 6.6 },
  FL: { name: "Florida", rate: 0 },
  GA: { name: "Georgia", rate: 5.49 },
  HI: { name: "Hawaii", rate: 11.0 },
  ID: { name: "Idaho", rate: 5.8 },
  IL: { name: "Illinois", rate: 4.95 },
  IN: { name: "Indiana", rate: 3.05 },
  IA: { name: "Iowa", rate: 5.7 },
  KS: { name: "Kansas", rate: 5.7 },
  KY: { name: "Kentucky", rate: 4.0 },
  LA: { name: "Louisiana", rate: 4.25 },
  ME: { name: "Maine", rate: 7.15 },
  MD: { name: "Maryland", rate: 5.75 },
  MA: { name: "Massachusetts", rate: 5.0 },
  MI: { name: "Michigan", rate: 4.25 },
  MN: { name: "Minnesota", rate: 9.85 },
  MS: { name: "Mississippi", rate: 5.0 },
  MO: { name: "Missouri", rate: 4.95 },
  MT: { name: "Montana", rate: 5.9 },
  NE: { name: "Nebraska", rate: 5.84 },
  NV: { name: "Nevada", rate: 0 },
  NH: { name: "New Hampshire", rate: 0 },
  NJ: { name: "New Jersey", rate: 10.75 },
  NM: { name: "New Mexico", rate: 5.9 },
  NY: { name: "New York", rate: 10.9, brackets: [
    { min: 0, max: 8500, rate: 4.0 },
    { min: 8500, max: 11700, rate: 4.5 },
    { min: 11700, max: 13900, rate: 5.25 },
    { min: 13900, max: 80650, rate: 5.5 },
    { min: 80650, max: 215400, rate: 6.0 },
    { min: 215400, max: 1077550, rate: 6.85 },
    { min: 1077550, max: 5000000, rate: 9.65 },
    { min: 5000000, max: 25000000, rate: 10.3 },
    { min: 25000000, max: Infinity, rate: 10.9 },
  ]},
  NC: { name: "North Carolina", rate: 5.25 },
  ND: { name: "North Dakota", rate: 2.5 },
  OH: { name: "Ohio", rate: 3.5 },
  OK: { name: "Oklahoma", rate: 4.75 },
  OR: { name: "Oregon", rate: 9.9 },
  PA: { name: "Pennsylvania", rate: 3.07 },
  RI: { name: "Rhode Island", rate: 5.99 },
  SC: { name: "South Carolina", rate: 6.4 },
  SD: { name: "South Dakota", rate: 0 },
  TN: { name: "Tennessee", rate: 0 },
  TX: { name: "Texas", rate: 0 },
  UT: { name: "Utah", rate: 4.65 },
  VT: { name: "Vermont", rate: 8.75 },
  VA: { name: "Virginia", rate: 5.75 },
  WA: { name: "Washington", rate: 0 },
  WV: { name: "West Virginia", rate: 6.5 },
  WI: { name: "Wisconsin", rate: 7.65 },
  WY: { name: "Wyoming", rate: 0 },
  DC: { name: "Washington D.C.", rate: 10.75 },
};

// 2026 Federal Income Tax Brackets (Single Filer)
export const federalTaxBrackets2026 = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: Infinity, rate: 37 },
];

// 2026 Federal Income Tax Brackets (Married Filing Jointly)
export const federalTaxBracketsMFJ2026 = [
  { min: 0, max: 23850, rate: 10 },
  { min: 23850, max: 96950, rate: 12 },
  { min: 96950, max: 206700, rate: 22 },
  { min: 206700, max: 394600, rate: 24 },
  { min: 394600, max: 501050, rate: 32 },
  { min: 501050, max: 751600, rate: 35 },
  { min: 751600, max: Infinity, rate: 37 },
];

// 2026 Federal Income Tax Brackets (Head of Household)
export const federalTaxBracketsHOH2026 = [
  { min: 0, max: 17000, rate: 10 },
  { min: 17000, max: 64850, rate: 12 },
  { min: 64850, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250500, rate: 32 },
  { min: 250500, max: 626350, rate: 35 },
  { min: 626350, max: Infinity, rate: 37 },
];

// 2026 Tax Constants
export const TAX_CONSTANTS_2026 = {
  // Self-Employment Tax
  SE_TAX_RATE: 15.3,
  SOCIAL_SECURITY_RATE: 12.4,
  MEDICARE_RATE: 2.9,
  ADDITIONAL_MEDICARE_RATE: 0.9,
  SOCIAL_SECURITY_WAGE_BASE: 176100,
  SE_DEDUCTION_FACTOR: 0.9235,
  SE_TAX_DEDUCTION: 0.5,
  
  // Additional Medicare Thresholds
  ADDITIONAL_MEDICARE_THRESHOLD_SINGLE: 200000,
  ADDITIONAL_MEDICARE_THRESHOLD_MFJ: 250000,
  
  // Standard Deductions 2026
  STANDARD_DEDUCTION_SINGLE: 15000,
  STANDARD_DEDUCTION_MFJ: 30000,
  STANDARD_DEDUCTION_HOH: 22500,
  
  // QBI Deduction
  QBI_DEDUCTION_RATE: 0.20,
  QBI_THRESHOLD_SINGLE: 191950,
  QBI_THRESHOLD_MFJ: 383900,
  
  // Quarterly Tax Deadlines 2026
  QUARTERLY_DEADLINES: [
    { quarter: "Q1", period: "Jan 1 - Mar 31", dueDate: "2026-04-15", label: "April 15, 2026" },
    { quarter: "Q2", period: "Apr 1 - May 31", dueDate: "2026-06-15", label: "June 15, 2026" },
    { quarter: "Q3", period: "Jun 1 - Aug 31", dueDate: "2026-09-15", label: "September 15, 2026" },
    { quarter: "Q4", period: "Sep 1 - Dec 31", dueDate: "2027-01-15", label: "January 15, 2027" },
  ],
  
  // IRS Penalty Rate
  UNDERPAYMENT_PENALTY_RATE: 0.08,
  
  // Mileage Rate 2026
  MILEAGE_RATE: 0.70,
  
  // IRA Contribution Limits 2026
  IRA_LIMIT: 7000,
  IRA_LIMIT_OVER_50: 8000,
  
  // Child Tax Credit 2026
  CHILD_TAX_CREDIT: 2000,
  CHILD_TAX_CREDIT_REFUNDABLE: 1700,
  
  // Dependent Credit (other dependents)
  OTHER_DEPENDENT_CREDIT: 500,
  
  // American Opportunity Credit (max)
  AOTC_MAX: 2500,
  
  // Lifetime Learning Credit (max)
  LLC_MAX: 2000,
  
  // SALT Deduction Cap
  SALT_CAP: 10000,
};

// Advanced input options interface
export interface AdvancedTaxInputs {
  w2Income?: number;
  spouseW2Income?: number;
  spouse1099Income?: number;
  workMileage?: number;
  mortgageInterest?: number;
  studentTuition?: number;
  iraContributions?: number;
  quarterlyPaymentsMade?: number;
  w2TaxesWithheld?: number;
  dependentsUnder17?: number;
  dependentsOver17?: number;
  healthInsurancePremiums?: number;
  homeOfficeSquareFeet?: number;
}

// Federal bracket breakdown interface
export interface BracketBreakdown {
  rate: number;
  min: number;
  max: number;
  taxableInBracket: number;
  taxFromBracket: number;
}

// Calculate Federal Income Tax with bracket breakdown
export const calculateFederalTaxWithBreakdown = (
  taxableIncome: number,
  filingStatus: "single" | "mfj" | "hoh" = "single"
): { total: number; brackets: BracketBreakdown[] } => {
  let brackets;
  if (filingStatus === "mfj") {
    brackets = federalTaxBracketsMFJ2026;
  } else if (filingStatus === "hoh") {
    brackets = federalTaxBracketsHOH2026;
  } else {
    brackets = federalTaxBrackets2026;
  }
  
  let tax = 0;
  let remainingIncome = taxableIncome;
  const breakdownResult: BracketBreakdown[] = [];

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    const taxFromBracket = taxableInBracket * (bracket.rate / 100);
    tax += taxFromBracket;
    remainingIncome -= taxableInBracket;
    
    if (taxableInBracket > 0) {
      breakdownResult.push({
        rate: bracket.rate,
        min: bracket.min,
        max: bracket.max,
        taxableInBracket,
        taxFromBracket,
      });
    }
  }

  return { total: Math.max(0, tax), brackets: breakdownResult };
};

// Calculate Federal Income Tax (backward compatible)
export const calculateFederalTax = (
  taxableIncome: number,
  filingStatus: "single" | "mfj" | "hoh" = "single"
): number => {
  return calculateFederalTaxWithBreakdown(taxableIncome, filingStatus).total;
};

// Calculate State Income Tax
export const calculateStateTax = (taxableIncome: number, stateCode: string): number => {
  const state = stateTaxRates[stateCode];
  if (!state || state.rate === 0) return 0;

  if (state.brackets) {
    let tax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of state.brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableInBracket * (bracket.rate / 100);
      remainingIncome -= taxableInBracket;
    }
    
    return Math.max(0, tax);
  }

  return taxableIncome * (state.rate / 100);
};

// Calculate Self-Employment Tax
export const calculateSelfEmploymentTax = (netEarnings: number, additionalMedicareThreshold: number = TAX_CONSTANTS_2026.ADDITIONAL_MEDICARE_THRESHOLD_SINGLE): {
  totalSETax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  taxableEarnings: number;
  seTaxDeduction: number;
} => {
  const { 
    SE_DEDUCTION_FACTOR, 
    SOCIAL_SECURITY_RATE, 
    MEDICARE_RATE,
    ADDITIONAL_MEDICARE_RATE,
    SOCIAL_SECURITY_WAGE_BASE,
    SE_TAX_DEDUCTION
  } = TAX_CONSTANTS_2026;

  const taxableEarnings = netEarnings * SE_DEDUCTION_FACTOR;
  const socialSecurityTaxable = Math.min(taxableEarnings, SOCIAL_SECURITY_WAGE_BASE);
  const socialSecurityTax = socialSecurityTaxable * (SOCIAL_SECURITY_RATE / 100);
  const medicareTax = taxableEarnings * (MEDICARE_RATE / 100);

  let additionalMedicareTax = 0;
  if (netEarnings > additionalMedicareThreshold) {
    const excessEarnings = netEarnings - additionalMedicareThreshold;
    additionalMedicareTax = excessEarnings * (ADDITIONAL_MEDICARE_RATE / 100);
  }

  const totalSETax = socialSecurityTax + medicareTax + additionalMedicareTax;
  const seTaxDeduction = totalSETax * SE_TAX_DEDUCTION;

  return {
    totalSETax,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    taxableEarnings,
    seTaxDeduction,
  };
};

// Calculate Tax Credits
export const calculateTaxCredits = (
  dependentsUnder17: number = 0,
  dependentsOver17: number = 0,
  studentTuition: number = 0,
  filingStatus: "single" | "mfj" | "hoh" = "single"
): {
  childTaxCredit: number;
  otherDependentCredit: number;
  educationCredit: number;
  totalCredits: number;
} => {
  const childTaxCredit = dependentsUnder17 * TAX_CONSTANTS_2026.CHILD_TAX_CREDIT;
  const otherDependentCredit = dependentsOver17 * TAX_CONSTANTS_2026.OTHER_DEPENDENT_CREDIT;
  
  // American Opportunity Credit (simplified - 100% of first $2000, 25% of next $2000)
  let educationCredit = 0;
  if (studentTuition > 0) {
    const firstTier = Math.min(studentTuition, 2000);
    const secondTier = Math.min(Math.max(studentTuition - 2000, 0), 2000) * 0.25;
    educationCredit = Math.min(firstTier + secondTier, TAX_CONSTANTS_2026.AOTC_MAX);
  }
  
  return {
    childTaxCredit,
    otherDependentCredit,
    educationCredit,
    totalCredits: childTaxCredit + otherDependentCredit + educationCredit,
  };
};

// Advanced 1099 Tax Calculation
export interface TaxCalculationResult {
  grossIncome: number;
  w2Income: number;
  totalIncome: number;
  businessExpenses: number;
  mileageDeduction: number;
  homeOfficeDeduction: number;
  healthInsuranceDeduction: number;
  totalDeductions: number;
  netEarnings: number;
  selfEmploymentTax: number;
  seTaxDeduction: number;
  iraDeduction: number;
  adjustedGrossIncome: number;
  standardDeduction: number;
  itemizedDeductions: number;
  deductionUsed: "standard" | "itemized";
  taxableIncome: number;
  federalIncomeTax: number;
  federalBracketBreakdown: BracketBreakdown[];
  stateTax: number;
  credits: {
    childTaxCredit: number;
    otherDependentCredit: number;
    educationCredit: number;
    totalCredits: number;
  };
  taxAfterCredits: number;
  paymentsAndWithholding: number;
  totalTax: number;
  taxOwedOrRefund: number;
  effectiveRate: number;
  quarterlyPayment: number;
  breakdown: {
    socialSecurityTax: number;
    medicareTax: number;
    additionalMedicareTax: number;
  };
  potentialDeductions: {
    min: number;
    max: number;
  };
}

export const calculate1099TaxAdvanced = (
  grossIncome: number,
  businessExpenses: number = 0,
  stateCode: string = "TX",
  filingStatus: "single" | "mfj" | "hoh" = "single",
  advanced: AdvancedTaxInputs = {}
): TaxCalculationResult => {
  const {
    w2Income = 0,
    spouseW2Income = 0,
    spouse1099Income = 0,
    workMileage = 0,
    mortgageInterest = 0,
    studentTuition = 0,
    iraContributions = 0,
    quarterlyPaymentsMade = 0,
    w2TaxesWithheld = 0,
    dependentsUnder17 = 0,
    dependentsOver17 = 0,
    healthInsurancePremiums = 0,
    homeOfficeSquareFeet = 0,
  } = advanced;

  // Mileage deduction
  const mileageDeduction = workMileage * TAX_CONSTANTS_2026.MILEAGE_RATE;
  
  // Home office deduction (simplified method: $5/sq ft, max 300 sq ft)
  const homeOfficeDeduction = Math.min(homeOfficeSquareFeet * 5, 1500);
  
  // Health insurance deduction (self-employed can deduct 100%)
  const healthInsuranceDeduction = healthInsurancePremiums;
  
  // Total business deductions
  const totalDeductions = businessExpenses + mileageDeduction + homeOfficeDeduction;
  
  // Net self-employment earnings
  const total1099Income = grossIncome + spouse1099Income;
  const netEarnings = total1099Income - totalDeductions;
  
  // Total W-2 income
  const totalW2Income = w2Income + spouseW2Income;
  const totalIncome = total1099Income + totalW2Income;
  
  // Medicare threshold based on filing status
  const medicareThreshold = filingStatus === "mfj" 
    ? TAX_CONSTANTS_2026.ADDITIONAL_MEDICARE_THRESHOLD_MFJ 
    : TAX_CONSTANTS_2026.ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  
  // Calculate SE Tax
  const seResult = calculateSelfEmploymentTax(Math.max(0, netEarnings), medicareThreshold);
  
  // IRA deduction (capped at limit)
  const iraLimit = TAX_CONSTANTS_2026.IRA_LIMIT;
  const iraDeduction = Math.min(iraContributions, iraLimit);
  
  // Calculate AGI
  const adjustedGrossIncome = Math.max(0, 
    netEarnings + totalW2Income - seResult.seTaxDeduction - iraDeduction - healthInsuranceDeduction
  );
  
  // Standard deduction
  const standardDeduction = filingStatus === "mfj" 
    ? TAX_CONSTANTS_2026.STANDARD_DEDUCTION_MFJ 
    : filingStatus === "hoh"
    ? TAX_CONSTANTS_2026.STANDARD_DEDUCTION_HOH
    : TAX_CONSTANTS_2026.STANDARD_DEDUCTION_SINGLE;
  
  // Itemized deductions (mortgage interest + state/local taxes up to SALT cap)
  const stateLocalTaxes = Math.min(calculateStateTax(adjustedGrossIncome - standardDeduction, stateCode), TAX_CONSTANTS_2026.SALT_CAP);
  const itemizedDeductions = mortgageInterest + stateLocalTaxes;
  
  // Use higher of standard or itemized
  const deductionUsed = itemizedDeductions > standardDeduction ? "itemized" : "standard";
  const deductionAmount = Math.max(standardDeduction, itemizedDeductions);
  
  // Taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionAmount);
  
  // Federal income tax with bracket breakdown
  const federalResult = calculateFederalTaxWithBreakdown(taxableIncome, filingStatus);
  const federalIncomeTax = federalResult.total;
  const federalBracketBreakdown = federalResult.brackets;
  
  // State tax
  const stateTax = calculateStateTax(taxableIncome, stateCode);
  
  // Tax credits
  const credits = calculateTaxCredits(dependentsUnder17, dependentsOver17, studentTuition, filingStatus);
  
  // Tax after credits (can't go below zero for federal)
  const federalTaxAfterCredits = Math.max(0, federalIncomeTax - credits.totalCredits);
  const taxAfterCredits = federalTaxAfterCredits + seResult.totalSETax;
  
  // Payments and withholding
  const paymentsAndWithholding = quarterlyPaymentsMade + w2TaxesWithheld;
  
  // Total tax and what's owed/refund
  const totalTax = taxAfterCredits + stateTax;
  const taxOwedOrRefund = totalTax - paymentsAndWithholding;
  
  // Effective rate
  const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;
  
  // Quarterly payment (for remaining payments in year)
  const quarterlyPayment = Math.max(0, taxOwedOrRefund) / 4;
  
  // Potential deductions estimate (industry-specific)
  const potentialDeductionsMin = Math.round(total1099Income * 0.10);
  const potentialDeductionsMax = Math.round(total1099Income * 0.25);

  return {
    grossIncome,
    w2Income: totalW2Income,
    totalIncome,
    businessExpenses,
    mileageDeduction,
    homeOfficeDeduction,
    healthInsuranceDeduction,
    totalDeductions,
    netEarnings,
    selfEmploymentTax: seResult.totalSETax,
    seTaxDeduction: seResult.seTaxDeduction,
    iraDeduction,
    adjustedGrossIncome,
    standardDeduction,
    itemizedDeductions,
    deductionUsed,
    taxableIncome,
    federalIncomeTax,
    federalBracketBreakdown,
    stateTax,
    credits,
    taxAfterCredits,
    paymentsAndWithholding,
    totalTax,
    taxOwedOrRefund,
    effectiveRate,
    quarterlyPayment,
    breakdown: {
      socialSecurityTax: seResult.socialSecurityTax,
      medicareTax: seResult.medicareTax,
      additionalMedicareTax: seResult.additionalMedicareTax,
    },
    potentialDeductions: {
      min: potentialDeductionsMin,
      max: potentialDeductionsMax,
    },
  };
};

// Simple version for backward compatibility
export const calculate1099Tax = (
  grossIncome: number,
  businessExpenses: number = 0,
  stateCode: string = "TX",
  filingStatus: "single" | "mfj" | "hoh" = "single"
) => {
  const result = calculate1099TaxAdvanced(grossIncome, businessExpenses, stateCode, filingStatus);
  return {
    grossIncome: result.grossIncome,
    businessExpenses: result.businessExpenses,
    netEarnings: result.netEarnings,
    selfEmploymentTax: result.selfEmploymentTax,
    seTaxDeduction: result.seTaxDeduction,
    adjustedGrossIncome: result.adjustedGrossIncome,
    standardDeduction: result.standardDeduction,
    taxableIncome: result.taxableIncome,
    federalIncomeTax: result.federalIncomeTax,
    stateTax: result.stateTax,
    totalTax: result.totalTax,
    effectiveRate: result.effectiveRate,
    quarterlyPayment: result.quarterlyPayment,
    breakdown: result.breakdown,
  };
};

// Calculate Quarterly Tax Penalty
export const calculateQuarterlyPenalty = (
  amountOwed: number,
  daysMissed: number
): number => {
  const dailyRate = TAX_CONSTANTS_2026.UNDERPAYMENT_PENALTY_RATE / 365;
  return amountOwed * dailyRate * daysMissed;
};

// Get next quarterly deadline
export const getNextQuarterlyDeadline = (): typeof TAX_CONSTANTS_2026.QUARTERLY_DEADLINES[0] | null => {
  const today = new Date();
  
  for (const deadline of TAX_CONSTANTS_2026.QUARTERLY_DEADLINES) {
    const dueDate = new Date(deadline.dueDate);
    if (dueDate > today) {
      return deadline;
    }
  }
  
  return TAX_CONSTANTS_2026.QUARTERLY_DEADLINES[0];
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Field tooltips/explanations
export const FIELD_TOOLTIPS = {
  grossIncome: "Your total 1099 income before any deductions. Include all freelance, consulting, and self-employment income reported on 1099-NEC or 1099-MISC forms.",
  businessExpenses: "Ordinary and necessary expenses for your business. Includes office supplies, software subscriptions, advertising, professional services, and more.",
  w2Income: "Income from traditional employment where taxes are withheld. Enter the gross wages from Box 1 of your W-2.",
  workMileage: "Business miles driven for work (not commuting). The 2026 IRS rate is $0.70 per mile. Keep a mileage log for documentation.",
  mortgageInterest: "Interest paid on your mortgage for your primary residence. Found on Form 1098 from your lender. Can help if you itemize deductions.",
  studentTuition: "Tuition and required fees for higher education. May qualify for the American Opportunity Credit (up to $2,500) or Lifetime Learning Credit.",
  iraContributions: "Contributions to a Traditional IRA are tax-deductible (up to $7,000 for 2026, $8,000 if 50+). Roth IRA contributions are not deductible.",
  quarterlyPayments: "Estimated tax payments already made to the IRS this year. Enter the total of all 1040-ES payments made.",
  w2TaxesWithheld: "Federal taxes withheld from your W-2 wages. Found in Box 2 of your W-2. This reduces your tax owed or increases your refund.",
  dependentsUnder17: "Children under 17 at year-end who qualify for the Child Tax Credit ($2,000 per child). Must have a valid Social Security number.",
  dependentsOver17: "Qualifying relatives or dependents 17+ who don't qualify for the Child Tax Credit. Eligible for a $500 Other Dependent Credit.",
  healthInsurance: "Self-employed individuals can deduct 100% of health insurance premiums for themselves, spouse, and dependents.",
  homeOffice: "Square footage of your dedicated home office space. The simplified method allows $5 per square foot (max 300 sq ft = $1,500).",
  filingStatus: "Your tax filing status affects your tax brackets and standard deduction. Single, Married Filing Jointly, or Head of Household.",
  state: "Your state of residence for state income tax purposes. Nine states (TX, FL, NV, WA, WY, SD, AK, TN, NH) have no state income tax.",
};
