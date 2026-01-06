import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, { generateBreadcrumbSchema } from "@/components/shared/StructuredData";

const breadcrumbItems = [
  { name: "Home", url: "https://moneygrowtools.com/" },
  { name: "Privacy Policy", url: "https://moneygrowtools.com/privacy" },
];

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy | Money Grow Tools"
        description="Learn how Money Grow Tools collects, uses, and protects your personal information. We are committed to your privacy."
        canonicalUrl="https://moneygrowtools.com/privacy"
        keywords={["privacy policy", "data protection", "money grow tools privacy"]}
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
              <li className="text-foreground font-medium">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 24, 2025</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Money Grow Tools ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website moneygrowtools.com and use our tax calculator tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect information about you in various ways:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personal Data:</strong> Email address when you subscribe to our newsletter or download resources.</li>
                <li><strong>Usage Data:</strong> Browser type, operating system, pages visited, time spent on pages, and other analytical data.</li>
                <li><strong>Calculator Inputs:</strong> Income figures and deductions entered into our calculators are processed locally and not stored on our servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and maintain our services</li>
                <li>Send you newsletters and promotional materials (with your consent)</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may employ third-party companies and individuals for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Email marketing services</li>
                <li>Advertising partners</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Affiliate Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                Money Grow Tools participates in affiliate marketing programs. This means we may earn a commission when you click on or make purchases via affiliate links on our website. This does not affect the price you pay or our editorial independence in reviewing products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@moneygrowtools.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PrivacyPolicy;
