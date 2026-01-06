import { Link } from "react-router-dom";
import { PiggyBank, AlertTriangle, Receipt, ArrowRight, Clock, Calendar, Sparkles, TrendingUp } from "lucide-react";

const blogPosts = [
  {
    icon: TrendingUp,
    gradientFrom: "from-success",
    gradientTo: "to-info",
    category: "2026 Planning",
    categoryColor: "text-success",
    categoryBg: "bg-success/10",
    title: "Preparing for Your 2026 1099 Taxes: Complete Guide",
    description: "Everything freelancers need to know for 2026: OBBBA changes, new thresholds, top deductions, quarterly dates, and state tax resources.",
    href: "/blog/2026-1099-tax-guide",
    readTime: "8 min read",
    publishDate: "January 2026",
    isNew: true,
    isFeatured: true,
  },
  {
    icon: PiggyBank,
    gradientFrom: "from-primary",
    gradientTo: "to-primary/70",
    category: "Tax Savings",
    categoryColor: "text-primary",
    categoryBg: "bg-primary/10",
    title: "How Much to Set Aside for 1099 Taxes in 2026",
    description: "The simple rule: save 25-35% of every payment. Learn exactly how much based on your income bracket and state.",
    href: "/blog/how-much-to-set-aside",
    readTime: "5 min read",
    publishDate: "January 2026",
    isNew: false,
    isFeatured: false,
  },
  {
    icon: AlertTriangle,
    gradientFrom: "from-destructive",
    gradientTo: "to-destructive/70",
    category: "Avoid Penalties",
    categoryColor: "text-destructive",
    categoryBg: "bg-destructive/10",
    title: "What Happens If I Miss Quarterly Tax Payment in 2026",
    description: "IRS charges 0.5% per month on unpaid taxes. A $10,000 bill can cost you $1,100+ in penalties. Here's how to catch up.",
    href: "/blog/missed-quarterly-payment",
    readTime: "4 min read",
    publishDate: "January 2026",
    isNew: false,
    isFeatured: false,
  },
  {
    icon: Receipt,
    gradientFrom: "from-warning",
    gradientTo: "to-warning/70",
    category: "Deductions",
    categoryColor: "text-warning",
    categoryBg: "bg-warning/10",
    title: "Can I Write Off Groceries as a 1099 Worker?",
    description: "The surprising answer depends on your profession. Food bloggers can, but most freelancers can't. See the full breakdown.",
    href: "/blog/write-off-groceries",
    readTime: "6 min read",
    publishDate: "January 2026",
    isNew: false,
    isFeatured: false,
  },
];

const BlogSection = () => {
  const featuredPost = blogPosts.find(p => p.isFeatured);
  const otherPosts = blogPosts.filter(p => !p.isFeatured);

  return (
    <section id="blog" className="py-20 sm:py-24 bg-muted/50" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Free Tax Guides • Updated for 2026
          </span>
          <h2 id="blog-heading" className="font-heading text-foreground mb-4">
            Tax Guides for <span className="gradient-text">Freelancers</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical tax tips to help 1099 workers save money and stay compliant
          </p>
        </header>

        {/* Featured Post - 2026 Guide */}
        {featuredPost && (
          <div className="mb-10">
            <Link 
              to={featuredPost.href}
              className="group block bg-gradient-to-br from-success/10 via-info/5 to-primary/10 rounded-2xl border-2 border-success/30 hover:border-success/50 overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Visual */}
                <div className={`h-48 md:h-auto bg-gradient-to-br ${featuredPost.gradientFrom} ${featuredPost.gradientTo} flex items-center justify-center relative overflow-hidden`}>
                  <featuredPost.icon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    NEW FOR 2026
                  </div>
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                </div>
                
                {/* Right: Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${featuredPost.categoryBg} ${featuredPost.categoryColor}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {featuredPost.publishDate}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-success transition-colors font-heading">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                    {featuredPost.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-success font-semibold inline-flex items-center text-sm group/link">
                      Read the 2026 Guide
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <article
              key={post.title}
              className="blog-card group flex flex-col"
              itemScope
              itemType="https://schema.org/Article"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Image Area */}
              <div
                className={`h-48 bg-gradient-to-br ${post.gradientFrom} ${post.gradientTo} flex items-center justify-center relative overflow-hidden`}
                aria-hidden="true"
              >
                <post.icon className="w-16 h-16 text-primary-foreground/90 group-hover:scale-110 transition-transform duration-300" />
                {post.isNew && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-success text-success-foreground text-xs font-bold rounded-full">
                    NEW
                  </div>
                )}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                {/* Category and date */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${post.categoryBg} ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <time itemProp="datePublished">{post.publishDate}</time>
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-heading" itemProp="headline">
                  <Link to={post.href} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-grow" itemProp="description">
                  {post.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <Link
                    to={post.href}
                    className="text-primary hover:text-primary/80 font-semibold inline-flex items-center text-sm group/link"
                    aria-label={`Read full guide: ${post.title}`}
                    itemProp="url"
                  >
                    Read Guide
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* All articles link */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            More tax guides coming soon. Follow us on{" "}
            <a href="https://twitter.com/moneygrowtools" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Twitter
            </a>{" "}
            for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
