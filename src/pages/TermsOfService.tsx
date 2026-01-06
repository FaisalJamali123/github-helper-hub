import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema } from "@/components/StructuredData";

const breadcrumbItems = [
  { name: "Home", url: "https://moneygrowtools.com/" },
  { name: "Terms of Service", url: "https://moneygrowtools.com/terms" },
];

const TermsOfService = () => {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service | Money Grow Tools"
        description="Read the terms and conditions for using Money Grow Tools tax calculators and services."
        canonicalUrl="https://moneygrowtools.com/terms"
        keywords={["terms of service", "terms and conditions", "money grow tools terms"]}
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
              <li className="text-foreground font-medium">Terms of Service</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 5, 2026</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Money Grow Tools ("the Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Money Grow Tools provides free online tax calculators and educational content for freelancers, self-employed individuals, and 1099 contractors. Our tools include 1099 tax calculators, quarterly tax estimators, self-employment tax calculators, and related financial tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Disclaimer of Tax Advice</h2>
              <p className="text-muted-foreground leading-relaxed font-medium bg-secondary p-4 rounded-xl">
                IMPORTANT: The calculators and content provided on this website are for informational and educational purposes only. They do not constitute tax, legal, or financial advice. Tax laws are complex and subject to change. Always consult with a qualified tax professional, CPA, or tax attorney for advice specific to your situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Money Grow Tools be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or reliance on any information provided, including but not limited to errors in tax calculations, missed tax deadlines, or penalties imposed by tax authorities.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Affiliate Relationships</h2>
              <p className="text-muted-foreground leading-relaxed">
                Money Grow Tools participates in affiliate marketing programs. This means we may receive compensation when you click on links to products or services featured on our website and make a purchase. Our affiliate relationships do not influence our editorial content or calculator functionality. We only recommend products and services we believe provide value to our users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Money Grow Tools and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with the proper working of the website</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Collect user information without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or services that are not owned or controlled by Money Grow Tools. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@moneygrowtools.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TermsOfService;
