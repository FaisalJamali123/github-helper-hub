import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";

import WhySection from "@/components/home/WhySection";
import ToolsSection from "@/components/home/ToolsSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";
import SEOHead from "@/components/shared/SEOHead";
import StructuredData, {
  organizationSchema,
  websiteSchema,
  faqSchema,
  softwareApplicationSchema,
  howToSchema,
  localBusinessSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/components/shared/StructuredData";

const Index = () => {
  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
  ];

  const webPageSchema = generateWebPageSchema({
    name: "Free 1099 Tax Calculator for Freelancers",
    description: "Calculate federal, state, and self-employment taxes instantly. Free tax calculators for freelancers, gig workers, and self-employed professionals.",
    url: "https://moneygrowtools.com/",
    datePublished: "2024-01-01",
    dateModified: "2026-01-05",
  });

  return (
    <Layout>
      <SEOHead
        title="Free 1099 Tax Calculator 2026 | Freelancer Tax Estimator"
        description="Free 1099 tax calculator for freelancers. Calculate federal, state & 15.3% self-employment tax instantly. Updated for 2026 tax planning and filing."
        canonicalUrl="https://moneygrowtools.com/"
        keywords={[
          "1099 tax calculator",
          "1099 tax calculator 2026",
          "1099 tax calculator 2026",
          "self-employment tax calculator",
          "quarterly tax calculator",
          "freelance tax calculator",
          "gig worker tax",
          "independent contractor taxes",
          "IRS estimated taxes 2026",
          "self-employment tax rate 2026",
          "freelancer tax estimator",
        ]}
      />
      <StructuredData
        schemas={[
          organizationSchema,
          websiteSchema,
          webPageSchema,
          faqSchema,
          softwareApplicationSchema,
          howToSchema,
          localBusinessSchema,
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />
      <main id="main-content">
        <HeroSection />
        
        <WhySection />
        <ToolsSection />
        <BlogSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
      </main>
    </Layout>
  );
};

export default Index;
