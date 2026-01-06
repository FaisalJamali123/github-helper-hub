import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema } from "@/components/StructuredData";
import { Link } from "react-router-dom";
import { ExternalLink, CheckCircle } from "lucide-react";

const breadcrumbItems = [
  { name: "Home", url: "https://moneygrowtools.com/" },
  { name: "Affiliate Disclosure", url: "https://moneygrowtools.com/affiliate-disclosure" },
];

const AffiliateDisclosure = () => {
  return (
    <Layout>
      <SEOHead
        title="Affiliate Disclosure | Money Grow Tools"
        description="Full transparency about our affiliate relationships and how we earn revenue while keeping our calculators free."
        canonicalUrl="https://moneygrowtools.com/affiliate-disclosure"
        keywords={["affiliate disclosure", "FTC disclosure", "money grow tools affiliates"]}
        noindex={true}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbItems)]} />
      <main className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Affiliate Disclosure</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Affiliate Disclosure</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Full transparency about how we keep our tools free
          </p>
          
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 mb-10">
            <p className="text-foreground leading-relaxed">
              <strong>TL;DR:</strong> We earn commissions when you sign up for products we recommend through our links. This keeps our calculators 100% free. We only recommend products we genuinely believe will help freelancers.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">How We Make Money</h2>
              <p className="text-muted-foreground leading-relaxed">
                Money Grow Tools is a free service. We don't charge for our tax calculators, guides, or educational content. Instead, we earn revenue through affiliate partnerships with companies whose products we recommend.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                When you click on certain links on our website and sign up for a product or service, we may receive a commission at no additional cost to you. This commission helps us maintain and improve our free tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Our Affiliate Partners</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We partner with the following types of companies:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Tax Software:</strong> TurboTax, Keeper, TaxAct, H&R Block, FreeTaxUSA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Business Banking:</strong> Lili, Found, Novo, Mercury</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Payroll & HR:</strong> Gusto, Deel, Remote</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>Accounting Software:</strong> QuickBooks, FreshBooks, Wave</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Our Editorial Standards</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We maintain strict editorial independence. Our affiliate relationships do NOT influence:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Which products we recommend or rank highest</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Our calculator formulas or tax rate accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">The content of our educational guides</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Our honest reviews and comparisons</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We only recommend products and services we have researched and believe provide genuine value to freelancers and self-employed individuals. If a product isn't good, we won't recommend it regardless of commission rates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">How to Identify Affiliate Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Affiliate links on our website are typically marked with an external link icon (<ExternalLink className="w-4 h-4 inline" />) or labeled as "sponsored" or "partner" content. Product recommendation pages and comparison articles contain affiliate links.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">FTC Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This disclosure is provided in accordance with the Federal Trade Commission's 16 CFR Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our affiliate relationships or this disclosure, please contact us at partnerships@moneygrowtools.com.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Related: <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link> · <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AffiliateDisclosure;
