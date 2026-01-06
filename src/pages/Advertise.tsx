import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema, organizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Calculator, Mail, TrendingUp, CheckCircle, Star } from "lucide-react";

const breadcrumbItems = [
  { name: "Home", url: "https://moneygrowtools.com/" },
  { name: "Advertise", url: "https://moneygrowtools.com/advertise" },
];

const Advertise = () => {
  const stats = [
    { value: "50K+", label: "Monthly Visitors", icon: Users },
    { value: "100K+", label: "Calculations/Month", icon: Calculator },
    { value: "15K+", label: "Email Subscribers", icon: Mail },
    { value: "45%", label: "Return Visitors", icon: TrendingUp },
  ];

  const adOptions = [
    {
      title: "Calculator Sponsorship",
      price: "$500",
      period: "/month",
      description: "Your brand featured on our most-used calculators",
      features: [
        '"Powered by" placement on calculator pages',
        "Logo + tagline visibility",
        "Direct link to your website",
        "Average 25K+ monthly impressions",
        "Ideal for: Banks, tax software, fintech",
      ],
      popular: true,
    },
    {
      title: "Sponsored Content",
      price: "$750",
      period: "/article",
      description: "In-depth article featuring your product or service",
      features: [
        "1,500+ word professionally written article",
        "Permanent placement on our blog",
        "SEO optimized for long-term traffic",
        "Social media promotion included",
        "Ideal for: SaaS, financial services",
      ],
      popular: false,
    },
    {
      title: "Newsletter Sponsorship",
      price: "$300",
      period: "/send",
      description: "Featured placement in our weekly newsletter",
      features: [
        "15K+ engaged subscribers",
        "40%+ average open rate",
        "Dedicated section for your message",
        "One link + 100 word description",
        "Ideal for: Product launches, promos",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      quote: "Money Grow Tools delivered exactly the audience we were looking for. Our signups increased 40% during our sponsorship.",
      author: "Marketing Director",
      company: "Fintech Startup",
    },
    {
      quote: "The quality of traffic from their calculator sponsorship was exceptional. High-intent freelancers actively looking for solutions.",
      author: "Growth Lead",
      company: "Business Banking App",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Advertise With Us | Money Grow Tools"
        description="Reach 50,000+ freelancers and self-employed professionals. Sponsor our calculators, newsletter, or create sponsored content."
        canonicalUrl="https://moneygrowtools.com/advertise"
        keywords={["advertise to freelancers", "sponsor tax calculator", "fintech advertising", "freelancer marketing"]}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbItems), organizationSchema]} />
      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 hero-gradient">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center space-x-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li className="text-muted-foreground">/</li>
                <li className="text-foreground font-medium">Advertise</li>
              </ol>
            </nav>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-6">
                Partner With Us
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Reach 50,000+ Freelancers <br className="hidden sm:block" />
                & Self-Employed Professionals
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Connect with high-intent users actively managing their taxes and finances. 
                Our audience trusts us for accurate tools and honest recommendations.
              </p>
              <Button asChild size="lg" className="rounded-xl px-8 py-6 text-base">
                <a href="mailto:partnerships@moneygrowtools.com">Request Media Kit</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Audience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                High-intent users actively seeking financial solutions
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Freelancers", percentage: "45%", description: "Designers, developers, writers, consultants" },
                { title: "Gig Workers", percentage: "25%", description: "Uber, DoorDash, Instacart, TaskRabbit" },
                { title: "Small Business Owners", percentage: "20%", description: "Solopreneurs and micro-businesses" },
                { title: "Side Hustlers", percentage: "10%", description: "Part-time 1099 income earners" },
                { title: "Income: $50K-$150K", percentage: "60%", description: "Prime earning demographic" },
                { title: "Age: 25-45", percentage: "75%", description: "Tech-savvy, financially active" },
              ].map((item) => (
                <div key={item.title} className="bg-secondary rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className="text-accent font-bold">{item.percentage}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 sm:py-20 bg-secondary/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Advertising Options</h2>
              <p className="text-muted-foreground">Flexible packages to fit your marketing goals</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {adOptions.map((option) => (
                <div
                  key={option.title}
                  className={`bg-card rounded-2xl p-6 border ${
                    option.popular ? "border-accent shadow-glow" : "border-border"
                  } relative`}
                >
                  {option.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-foreground mb-2">{option.title}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-foreground">{option.price}</span>
                    <span className="text-muted-foreground">{option.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{option.description}</p>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={option.popular ? "default" : "outline"}
                    className="w-full rounded-xl"
                  >
                    <a href="mailto:partnerships@moneygrowtools.com">Get Started</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">What Advertisers Say</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{item.quote}"</p>
                  <div>
                    <p className="font-medium text-foreground">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 primary-gradient">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Reach Our Audience?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Get our media kit with detailed demographics, traffic stats, and case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="rounded-xl px-8">
                <a href="mailto:partnerships@moneygrowtools.com">Request Media Kit</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Advertise;
