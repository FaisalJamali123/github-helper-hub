import { Link } from "react-router-dom";
import { Users, Target, Shield, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema, organizationSchema } from "@/components/StructuredData";

const About = () => {
  const breadcrumbItems = [
    { name: "Home", url: "https://moneygrowtools.com/" },
    { name: "About Us", url: "https://moneygrowtools.com/about" },
  ];

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description: "We use official IRS tax rates and update our calculators annually. Our tools are reviewed by tax professionals."
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your data never leaves your browser. We don't store, track, or sell any information you enter in our calculators."
    },
    {
      icon: Heart,
      title: "Free Forever",
      description: "All our core calculators are 100% free with no paywalls, signup requirements, or hidden fees."
    },
    {
      icon: Users,
      title: "Built for Freelancers",
      description: "Created by freelancers who understand the unique tax challenges of self-employment."
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="About Money Grow Tools | Free Tax Calculators for Freelancers"
        description="Learn about Money Grow Tools - our mission to provide free, accurate tax calculators for freelancers, gig workers, and self-employed professionals."
        canonicalUrl="https://moneygrowtools.com/about"
        keywords={["about money grow tools", "freelance tax calculator", "1099 tax tools"]}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbItems), organizationSchema]} />

      <main className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">About Us</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              About Money Grow Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free, accurate tax calculators built specifically for the 60+ million Americans 
              who work for themselves.
            </p>
          </header>

          {/* Mission */}
          <section className="bg-card rounded-xl border border-border p-8 mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              When we started freelancing, we were shocked at how hard it was to get a straight answer about taxes. 
              Most tools were either too basic (ignoring state tax), required signup, or pushed expensive software.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We built Money Grow Tools to give every freelancer, gig worker, and self-employed professional 
              access to <strong className="text-foreground">accurate, free tax calculations</strong>—no signup, 
              no paywall, no BS. Our calculators include state tax for all 50 states, something most "free" tools skip.
            </p>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl border border-border p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How We're Different */}
          <section className="bg-primary/5 rounded-xl border border-primary/20 p-8 mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">How We're Different</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-semibold text-foreground">Feature</th>
                    <th className="text-center py-3 text-sm font-semibold text-foreground">Other Calculators</th>
                    <th className="text-center py-3 text-sm font-semibold text-primary">Money Grow Tools</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">State tax included</td>
                    <td className="py-3 text-center text-destructive">❌ Often missing</td>
                    <td className="py-3 text-center text-success">✓ All 50 states</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Signup required</td>
                    <td className="py-3 text-center text-destructive">❌ Usually required</td>
                    <td className="py-3 text-center text-success">✓ Never</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Data privacy</td>
                    <td className="py-3 text-center text-destructive">❌ Data stored/sold</td>
                    <td className="py-3 text-center text-success">✓ Nothing stored</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Updated annually</td>
                    <td className="py-3 text-center text-warning">⚠️ Sometimes</td>
                    <td className="py-3 text-center text-success">✓ Every January</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-muted-foreground">Hidden upsells</td>
                    <td className="py-3 text-center text-destructive">❌ Common</td>
                    <td className="py-3 text-center text-success">✓ None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-muted/50 rounded-xl p-6 mb-12">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Important Disclaimer</h2>
            <p className="text-sm text-muted-foreground">
              Money Grow Tools provides calculators and educational content for informational purposes only. 
              We are not tax advisors, accountants, or attorneys. Our tools provide estimates based on publicly 
              available tax rates and rules. For personalized tax advice, please consult a qualified tax professional. 
              Tax laws change frequently; while we strive for accuracy, we cannot guarantee our calculations 
              reflect the most current regulations.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Ready to Calculate Your Taxes?
            </h2>
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

export default About;
