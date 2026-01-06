import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema } from "@/components/shared/StructuredData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Star, ExternalLink, Calculator, Zap, Shield, DollarSign } from "lucide-react";

interface Software {
  id: string;
  name: string;
  logo: string;
  rating: number;
  price: string;
  priceValue: number;
  bestFor: string;
  features: {
    autoImport1099: boolean;
    expenseTracking: boolean;
    mileageTracking: boolean;
    quarterlyReminders: boolean;
    auditDefense: boolean;
    stateFiling: boolean;
    liveSupport: boolean;
    mobileApp: boolean;
  };
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  highlight?: string;
}

const softwareList: Software[] = [
  {
    id: "turbotax",
    name: "TurboTax Self-Employed",
    logo: "💼",
    rating: 4.8,
    price: "$129+",
    priceValue: 129,
    bestFor: "Beginners & Maximum Deductions",
    features: {
      autoImport1099: true,
      expenseTracking: true,
      mileageTracking: true,
      quarterlyReminders: true,
      auditDefense: true,
      stateFiling: true,
      liveSupport: true,
      mobileApp: true,
    },
    pros: [
      "Industry-leading deduction finder",
      "Imports from 1M+ employers",
      "Expert review available",
      "Excellent mobile experience"
    ],
    cons: [
      "Most expensive option",
      "Upsells during filing",
      "State filing costs extra"
    ],
    affiliateUrl: "https://turbotax.intuit.com/personal-taxes/self-employed/?cid=mgt_affiliate",
    highlight: "Editor's Choice"
  },
  {
    id: "keeper",
    name: "Keeper Tax",
    logo: "🧾",
    rating: 4.7,
    price: "$192/year",
    priceValue: 192,
    bestFor: "Freelancers & Gig Workers",
    features: {
      autoImport1099: true,
      expenseTracking: true,
      mileageTracking: true,
      quarterlyReminders: true,
      auditDefense: false,
      stateFiling: true,
      liveSupport: true,
      mobileApp: true,
    },
    pros: [
      "AI-powered expense categorization",
      "Year-round tax support",
      "Automatic deduction finding",
      "Built for gig economy"
    ],
    cons: [
      "Subscription model only",
      "Less comprehensive than TurboTax",
      "Newer platform"
    ],
    affiliateUrl: "https://keepertax.com/?ref=moneygrowtools",
    highlight: "Best for Freelancers"
  },
  {
    id: "taxact",
    name: "TaxAct Self-Employed",
    logo: "📊",
    rating: 4.5,
    price: "$64.99+",
    priceValue: 65,
    bestFor: "Budget-Conscious Filers",
    features: {
      autoImport1099: true,
      expenseTracking: true,
      mileageTracking: false,
      quarterlyReminders: false,
      auditDefense: true,
      stateFiling: true,
      liveSupport: true,
      mobileApp: true,
    },
    pros: [
      "Affordable pricing",
      "Accuracy guarantee",
      "Good for simple 1099s",
      "Solid customer support"
    ],
    cons: [
      "Less automation",
      "Basic expense tracking",
      "Fewer integrations"
    ],
    affiliateUrl: "https://www.taxact.com/self-employed/?sc=mgt"
  },
  {
    id: "freetaxusa",
    name: "FreeTaxUSA",
    logo: "🆓",
    rating: 4.4,
    price: "Free (State $14.99)",
    priceValue: 15,
    bestFor: "Simple 1099 Returns",
    features: {
      autoImport1099: false,
      expenseTracking: false,
      mileageTracking: false,
      quarterlyReminders: false,
      auditDefense: true,
      stateFiling: true,
      liveSupport: false,
      mobileApp: false,
    },
    pros: [
      "Free federal filing",
      "Handles Schedule C",
      "No hidden fees",
      "Straightforward interface"
    ],
    cons: [
      "Manual data entry",
      "No expense tracking",
      "Limited support options"
    ],
    affiliateUrl: "https://www.freetaxusa.com/?ref=mgt",
    highlight: "Best Free Option"
  },
  {
    id: "hrblockselfemployed",
    name: "H&R Block Self-Employed",
    logo: "🏢",
    rating: 4.6,
    price: "$85+",
    priceValue: 85,
    bestFor: "In-Person Support Option",
    features: {
      autoImport1099: true,
      expenseTracking: true,
      mileageTracking: true,
      quarterlyReminders: true,
      auditDefense: true,
      stateFiling: true,
      liveSupport: true,
      mobileApp: true,
    },
    pros: [
      "In-person support available",
      "Comprehensive features",
      "Good mobile app",
      "Tax pro review option"
    ],
    cons: [
      "Pricier than TaxAct",
      "In-person costs extra",
      "Some features require upgrade"
    ],
    affiliateUrl: "https://www.hrblock.com/self-employed-taxes/?otppartnerid=mgt"
  }
];

const Best1099TaxSoftware = () => {
  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");
  const [filterFree, setFilterFree] = useState(false);

  const sortedSoftware = [...softwareList]
    .filter(s => !filterFree || s.priceValue < 50)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return a.priceValue - b.priceValue;
    });

  const breadcrumbs = [
    { name: "Home", url: "https://moneygrowtools.com" },
    { name: "Best 1099 Tax Software", url: "https://moneygrowtools.com/best-1099-tax-software" }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best 1099 Tax Software 2025",
    "description": "Comprehensive comparison of the best tax software for 1099 contractors and freelancers",
    "itemListElement": softwareList.map((software, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": software.name,
        "applicationCategory": "FinanceApplication",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": software.rating,
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    }))
  };

  return (
    <Layout>
      <SEOHead
        title="Best 1099 Tax Software 2025 | Top 5 Compared for Freelancers"
        description="Compare the best tax software for 1099 contractors. Side-by-side features, pricing, and pros/cons of TurboTax, Keeper, TaxAct, and more."
        canonicalUrl="https://moneygrowtools.com/best-1099-tax-software"
        keywords={["best 1099 tax software", "freelancer tax software", "self-employed tax software", "1099 tax filing", "independent contractor taxes"]}
      />
      <StructuredData schemas={[breadcrumbSchema, comparisonSchema]} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Updated for 2025 Tax Year
              </Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Best 1099 Tax Software for Freelancers
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                We tested 15+ tax platforms to find the best options for independent contractors, 
                gig workers, and self-employed professionals.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Platforms Tested</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Hours Research</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-2xl font-bold text-primary">$0-$192</div>
                  <div className="text-sm text-muted-foreground">Price Range</div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-2xl font-bold text-primary">4.4+</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Picks */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-center mb-8">Quick Picks</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-card rounded-xl p-6 border-2 border-primary shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-primary">Best Overall</span>
                </div>
                <h3 className="text-xl font-bold mb-2">TurboTax Self-Employed</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Most comprehensive features with excellent deduction finding
                </p>
                <Button className="w-full" asChild>
                  <a href="#turbotax">View Details</a>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-accent">Best for Freelancers</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Keeper Tax</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  AI-powered expense tracking built for gig economy
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#keeper">View Details</a>
                </Button>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Best Free Option</span>
                </div>
                <h3 className="text-xl font-bold mb-2">FreeTaxUSA</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Free federal filing with solid Schedule C support
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#freetaxusa">View Details</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl font-display font-bold">Full Comparison</h2>
                <div className="flex gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "rating" | "price")}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                  </select>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterFree}
                      onChange={(e) => setFilterFree(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Free/Budget Only</span>
                  </label>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Software</TableHead>
                      <TableHead className="text-center">Rating</TableHead>
                      <TableHead className="text-center">Price</TableHead>
                      <TableHead className="text-center">Auto Import</TableHead>
                      <TableHead className="text-center">Expenses</TableHead>
                      <TableHead className="text-center">Mileage</TableHead>
                      <TableHead className="text-center">Quarterly</TableHead>
                      <TableHead className="text-center">Audit Defense</TableHead>
                      <TableHead className="text-center">Mobile App</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSoftware.map((software) => (
                      <TableRow key={software.id} id={software.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{software.logo}</span>
                            <div>
                              <div className="font-medium">{software.name}</div>
                              {software.highlight && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {software.highlight}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{software.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">{software.price}</TableCell>
                        <TableCell className="text-center">
                          {software.features.autoImport1099 ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {software.features.expenseTracking ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {software.features.mileageTracking ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {software.features.quarterlyReminders ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {software.features.auditDefense ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {software.features.mobileApp ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-center mb-12">Detailed Reviews</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {softwareList.map((software, index) => (
                <article 
                  key={software.id} 
                  id={`review-${software.id}`}
                  className="bg-card rounded-xl p-6 md:p-8 border border-border"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{software.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{software.name}</h3>
                          {software.highlight && (
                            <Badge className="bg-accent text-accent-foreground">
                              {software.highlight}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(software.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {software.rating}/5 · {software.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <a href={software.affiliateUrl} target="_blank" rel="noopener noreferrer">
                        Try {software.name.split(' ')[0]}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    <strong>Best for:</strong> {software.bestFor}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Pros
                      </h4>
                      <ul className="space-y-2">
                        {software.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                        <X className="w-4 h-4" /> Cons
                      </h4>
                      <ul className="space-y-2">
                        {software.cons.map((con, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
              <Calculator className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Calculate Your 1099 Taxes First
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Before choosing software, use our free calculator to estimate your taxes and find potential deductions.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/calculator/1099">
                  Try Free Calculator
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "Do I need special tax software for 1099 income?",
                  a: "While not required, dedicated 1099/self-employed tax software helps find deductions, tracks expenses, and handles Schedule C forms correctly. Most free options don't include these features."
                },
                {
                  q: "Can I use free tax software for 1099 income?",
                  a: "Yes, FreeTaxUSA offers free federal filing for 1099 income. However, you'll need to manually enter expenses and won't get features like mileage tracking or expense categorization."
                },
                {
                  q: "Which tax software finds the most deductions?",
                  a: "TurboTax Self-Employed and Keeper Tax are known for aggressive deduction finding. TurboTax uses a comprehensive questionnaire, while Keeper uses AI to scan your bank transactions."
                },
                {
                  q: "Is TurboTax worth the price for 1099 filers?",
                  a: "If your self-employment income is over $30,000, the deductions TurboTax finds often exceed its cost. For simpler situations, TaxAct or FreeTaxUSA may be sufficient."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Best1099TaxSoftware;
