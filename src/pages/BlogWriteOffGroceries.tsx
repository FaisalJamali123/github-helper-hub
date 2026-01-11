import { useState } from "react";
import { Link } from "react-router-dom";
import { Receipt, ArrowRight, Check, X, AlertTriangle, Calculator, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema, generateArticleSchema, generateFAQPageSchema } from "@/components/shared/StructuredData";
import { formatCurrency } from "@/lib/taxCalculations";

const BlogWriteOffGroceries = () => {
  const [businessMeals, setBusinessMeals] = useState<number>(500);
  const [travelMeals, setTravelMeals] = useState<number>(300);
  const mealDeduction = (businessMeals * 0.5) + (travelMeals * 0.5);
  const taxSavings = mealDeduction * 0.25; // Assuming 25% tax bracket

  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "Blog", url: "https://moneygrowtools.com/blog" },
    { name: "Write Off Groceries", url: "https://moneygrowtools.com/blog/write-off-groceries" },
  ];

  const articleSchema = generateArticleSchema({
    headline: "Can You Write Off Groceries as a 1099 Contractor?",
    description: "The IRS rules on deducting food expenses as a freelancer. When you can and can't claim groceries as a business expense.",
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
    url: "https://moneygrowtools.com/blog/write-off-groceries",
  });

  const faqSchema = generateFAQPageSchema([
    { question: "Can freelancers deduct groceries as a business expense?", answer: "Generally no. Regular groceries for personal consumption are not deductible—you'd eat regardless of working. However, food bloggers, caterers, and those buying food for business meals with clients (50% deductible) may have legitimate deductions." },
    { question: "What food expenses CAN 1099 contractors deduct?", answer: "Business meals with clients (50% deductible if business is discussed), travel meals when traveling overnight for business (50%), food ingredients for content creation (food bloggers, recipe developers), and office snacks for employees if you have staff." },
    { question: "Can I deduct my lunch if I work from home?", answer: "No. Working from home doesn't change the nature of personal meals. You would eat lunch whether you were working or not, so it's not a business expense." },
    { question: "Are DoorDash driver meals deductible?", answer: "No. The food you eat while delivering is personal consumption. The only food expense a delivery driver might deduct is food purchased for actual business meetings." },
    { question: "What deductions should freelancers focus on instead of groceries?", answer: "Focus on larger legitimate deductions: home office ($5/sq ft up to $1,500), vehicle mileage ($0.70/mile in 2025), software/subscriptions (100% deductible), health insurance (full deduction if self-employed), and retirement contributions (SEP-IRA up to $69,000)." }
  ]);

  const deductionCategories = [
    {
      category: "Generally YES",
      color: "success",
      icon: Check,
      items: [
        { profession: "Food bloggers/recipe creators", reason: "Ingredients for content creation" },
        { profession: "Caterers/personal chefs", reason: "Supplies for client meals" },
        { profession: "Restaurant critics", reason: "Professional meals for reviews" },
        { profession: "Cooking instructors", reason: "Demo ingredients for classes" },
        { profession: "Product photographers (food)", reason: "Props and styling materials" },
      ]
    },
    {
      category: "MAYBE (with proper documentation)",
      color: "warning",
      icon: AlertTriangle,
      items: [
        { profession: "Business meals with clients", reason: "50% deductible if business discussed" },
        { profession: "Office snacks for employees", reason: "If you have a business location with staff" },
        { profession: "Travel meals", reason: "Only while traveling overnight for business" },
        { profession: "Networking events", reason: "Food provided at business events you host" },
      ]
    },
    {
      category: "Generally NO",
      color: "destructive",
      icon: X,
      items: [
        { profession: "Regular freelancers", reason: "Personal meals not deductible" },
        { profession: "Remote workers", reason: "Working from home doesn't make lunch deductible" },
        { profession: "Gig workers (Uber, DoorDash)", reason: "Your own meals while working are personal" },
        { profession: "Consultants", reason: "Coffee while working isn't a business expense" },
        { profession: "Most 1099 contractors", reason: "You'd eat regardless of working" },
      ]
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="Can You Write Off Groceries as a 1099 Worker? | Tax Deduction Guide"
        description="Can 1099 contractors deduct groceries? Generally no, but food bloggers, caterers, and business meals have exceptions. See the complete IRS rules for food deductions."
        canonicalUrl="https://moneygrowtools.com/blog/write-off-groceries"
        ogType="article"
        keywords={["write off groceries 1099", "can freelancers deduct food", "business meal deduction", "1099 food expenses"]}
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
              <li className="text-foreground font-medium">Write Off Groceries</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-success text-sm font-medium mb-3">
              <Receipt className="w-4 h-4" />
              <span>Deductions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Can You Write Off Groceries as a 1099 Contractor?
            </h1>
            <p className="text-lg text-muted-foreground">
              The short answer: <strong className="text-destructive">Usually no</strong>. But there are important exceptions 
              based on your profession and how you use the food.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Updated: January 2025</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </header>

          {/* Quick Deduction Checker - Embedded Tool */}
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8 mb-8 shadow-soft">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Quick Meal Deduction Checker
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Business Meals with Clients (Annual)</label>
                  <span className="text-sm font-bold text-primary">{formatCurrency(businessMeals)}</span>
                </div>
                <Slider
                  value={[businessMeals]}
                  onValueChange={(value) => setBusinessMeals(value[0])}
                  min={0}
                  max={5000}
                  step={100}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Travel Meals (Overnight Business Trips)</label>
                  <span className="text-sm font-bold text-primary">{formatCurrency(travelMeals)}</span>
                </div>
                <Slider
                  value={[travelMeals]}
                  onValueChange={(value) => setTravelMeals(value[0])}
                  min={0}
                  max={3000}
                  step={50}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="bg-success/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Meal Deduction (50%)</p>
                  <p className="text-2xl font-heading font-bold text-success">{formatCurrency(mealDeduction)}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Est. Tax Savings (~25% bracket)</p>
                  <p className="text-2xl font-heading font-bold text-primary">{formatCurrency(taxSavings)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Note: Regular groceries for personal consumption are NOT deductible. Only business & travel meals qualify.
              </p>
            </div>
          </div>

          {/* TL;DR */}
          <div className="bg-success/10 border-l-4 border-success rounded-r-lg p-6 mb-8">
            <h2 className="font-heading font-semibold text-foreground mb-2">TL;DR</h2>
            <p className="text-muted-foreground">
              Regular groceries for personal consumption are <strong>not deductible</strong>—you'd eat regardless of working. 
              However, <strong>food bloggers</strong>, <strong>caterers</strong>, and those buying food for 
              <strong> business meals with clients</strong> (50% deductible) may have legitimate deductions. 
              The key test: Is the food <em>necessary for your business</em> or just for yourself?
            </p>
          </div>

          {/* Deduction Categories Table */}
          <div className="space-y-6 mb-12">
            {deductionCategories.map((cat) => (
              <div 
                key={cat.category}
                className={`bg-card rounded-xl border-2 border-${cat.color}/30 overflow-hidden`}
              >
                <div className={`bg-${cat.color}/10 px-6 py-4 flex items-center gap-3`}>
                  <cat.icon className={`w-5 h-5 text-${cat.color}`} />
                  <h2 className={`font-heading font-semibold text-${cat.color}`}>{cat.category}</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 text-sm font-medium text-muted-foreground">Profession/Situation</th>
                          <th className="text-left py-2 text-sm font-medium text-muted-foreground">Why It Qualifies (or Doesn't)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-border last:border-0">
                            <td className="py-3 text-sm font-medium text-foreground">{item.profession}</td>
                            <td className="py-3 text-sm text-muted-foreground">{item.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Article Content */}
          <article className="prose prose-slate max-w-none">
            <h2>The IRS "Ordinary and Necessary" Test</h2>
            <p>
              For any expense to be deductible, the IRS requires it to be <strong>ordinary and necessary</strong> for 
              your business. This means:
            </p>
            <ul>
              <li><strong>Ordinary:</strong> Common and accepted in your trade or business</li>
              <li><strong>Necessary:</strong> Helpful and appropriate for your business</li>
            </ul>

            <p>
              For most freelancers, groceries fail this test because you would eat regardless of whether you were working. 
              The food sustains <em>you</em>, not your business.
            </p>

            <h2>When Food IS Deductible</h2>

            <h3>1. Food as a Product or Ingredient</h3>
            <p>
              If you're a <strong>food blogger, recipe developer, caterer, or cooking instructor</strong>, the ingredients 
              you purchase are genuinely business expenses. The food is integral to the service or content you create.
            </p>
            <p>
              <strong>Example:</strong> A food blogger buys $200 in ingredients to create 10 recipe posts. The ingredients 
              are necessary to create the content that generates income. This is deductible.
            </p>

            <h3>2. Business Meals with Clients (50% Deductible)</h3>
            <p>
              If you take a client or potential client to lunch to discuss business, you can deduct <strong>50% of the cost</strong>. 
              The key requirements:
            </p>
            <ul>
              <li>You or an employee must be present</li>
              <li>Business must be discussed before, during, or after the meal</li>
              <li>The expense must be reasonable (not lavish)</li>
              <li>You must keep records: date, who attended, business purpose</li>
            </ul>

            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 not-prose my-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-warning">Important:</strong> "Entertainment" expenses (like taking a client to a 
                sporting event or concert) are no longer deductible under the Tax Cuts and Jobs Act. Only the food portion 
                of an entertainment event may qualify.
              </p>
            </div>

            <h3>3. Travel Meals</h3>
            <p>
              When traveling overnight for business, you can deduct <strong>50% of meal costs</strong>. You can either:
            </p>
            <ul>
              <li>Deduct actual expenses (keep all receipts)</li>
              <li>Use the per diem rate (no receipts needed, but lower deduction)</li>
            </ul>

            <h3>4. Office Snacks for Employees</h3>
            <p>
              If you have a business location and provide snacks for employees, this is generally <strong>50% deductible</strong>. 
              However, if you're a solo freelancer working from home, this doesn't apply to your own snacks.
            </p>

            <h2>Common Myths Busted</h2>

            <h3>"I work from home, so my lunch is deductible"</h3>
            <p>
              <strong>False.</strong> Working from home doesn't change the nature of your personal meals. You'd eat lunch 
              whether you were working or not.
            </p>

            <h3>"I'm a DoorDash driver, so my meals while working are deductible"</h3>
            <p>
              <strong>False.</strong> The food you eat while delivering food is personal consumption. The only food expense 
              a delivery driver might deduct is food purchased for business meetings.
            </p>

            <h3>"I can deduct coffee because it helps me work"</h3>
            <p>
              <strong>False.</strong> Coffee is a personal expense. The exception would be if you purchased coffee for a 
              client meeting (50% deductible) or provided coffee at a business event you hosted.
            </p>

            <h2>How to Document Food Deductions</h2>
            <p>If you do have legitimate food deductions, proper documentation is essential:</p>
            <ol>
              <li><strong>Keep receipts</strong> for all purchases</li>
              <li><strong>Note the business purpose</strong> on each receipt</li>
              <li><strong>Record who was present</strong> (for business meals)</li>
              <li><strong>Separate personal and business purchases</strong></li>
              <li><strong>Use a business credit card</strong> for business meals</li>
            </ol>

            <h2>Better Deductions for Freelancers</h2>
            <p>
              Instead of trying to deduct groceries, focus on these legitimate (and often larger) deductions:
            </p>
            <ul>
              <li><strong>Home office:</strong> $5/sq ft simplified method, up to $1,500</li>
              <li><strong>Vehicle mileage:</strong> $0.70/mile in 2025</li>
              <li><strong>Software/subscriptions:</strong> 100% deductible</li>
              <li><strong>Health insurance:</strong> Full deduction if self-employed</li>
              <li><strong>Retirement contributions:</strong> SEP-IRA up to $69,000</li>
            </ul>
          </article>

          {/* CTA */}
          <div className="mt-12 bg-cta-gradient rounded-xl p-8 text-center border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              See How Deductions Lower Your Tax Bill
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter your income and expenses to see the real impact on your taxes.
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

export default BlogWriteOffGroceries;
