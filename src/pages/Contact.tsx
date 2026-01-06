import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import StructuredData, { generateBreadcrumbSchema, organizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Building2, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const breadcrumbItems = [
  { name: "Home", url: "https://moneygrowtools.com/" },
  { name: "Contact", url: "https://moneygrowtools.com/contact" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactReasons = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      email: "hello@moneygrowtools.com",
      description: "Questions about our tools or content",
    },
    {
      icon: Building2,
      title: "Partnership & Sponsorship",
      email: "partnerships@moneygrowtools.com",
      description: "Advertising, sponsorships, and collaborations",
    },
    {
      icon: Mail,
      title: "Press & Media",
      email: "press@moneygrowtools.com",
      description: "Media inquiries and interview requests",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Contact Us | Money Grow Tools"
        description="Get in touch with the Money Grow Tools team. We're here to help with questions about our tax calculators, partnerships, and more."
        canonicalUrl="https://moneygrowtools.com/contact"
        keywords={["contact money grow tools", "tax calculator support", "freelancer help", "1099 tax questions"]}
      />
      <StructuredData schemas={[generateBreadcrumbSchema(breadcrumbItems), organizationSchema]} />
      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Contact</li>
            </ol>
          </nav>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or partnership inquiry? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="rounded-xl resize-none"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl py-6">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactReasons.map((reason) => (
                    <div
                      key={reason.title}
                      className="bg-secondary rounded-xl p-5 hover:bg-secondary/80 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <reason.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{reason.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{reason.description}</p>
                          <a
                            href={`mailto:${reason.email}`}
                            className="text-sm text-accent hover:underline"
                          >
                            {reason.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24-48 business hours. For urgent partnership inquiries, please mention "URGENT" in your subject line.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Looking to Advertise?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Reach over 50,000 freelancers and self-employed professionals monthly. We offer sponsored content, calculator sponsorships, and newsletter placements.
                </p>
                <a
                  href="mailto:partnerships@moneygrowtools.com"
                  className="text-accent text-sm font-medium hover:underline"
                >
                  Request our media kit →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
