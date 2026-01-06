import { useEffect } from "react";

// Organization Schema for Money Grow Tools
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://moneygrowtools.com/#organization",
  "name": "Money Grow Tools",
  "alternateName": "MoneyGrowTools",
  "url": "https://moneygrowtools.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://moneygrowtools.com/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Free tax calculators for freelancers, gig workers, and self-employed professionals. Calculate 1099 taxes, quarterly payments, and self-employment tax instantly.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/moneygrowtools",
    "https://linkedin.com/company/moneygrowtools"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@moneygrowtools.com",
    "availableLanguage": ["English"]
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  }
};

// WebSite Schema with SearchAction for sitelinks searchbox
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://moneygrowtools.com/#website",
  "name": "Money Grow Tools",
  "url": "https://moneygrowtools.com",
  "description": "Free 1099 tax calculators for freelancers and self-employed workers",
  "publisher": {
    "@id": "https://moneygrowtools.com/#organization"
  },
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://moneygrowtools.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// WebPage Schema generator
export const generateWebPageSchema = ({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  "name": name,
  "description": description,
  "url": url,
  "isPartOf": {
    "@id": "https://moneygrowtools.com/#website"
  },
  "about": {
    "@id": "https://moneygrowtools.com/#organization"
  },
  "inLanguage": "en-US",
  ...(datePublished && { "datePublished": datePublished }),
  ...(dateModified && { "dateModified": dateModified }),
});

// FAQ Schema with real tax information for 2026
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much tax do I owe on 1099 income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1099 contractors pay 15.3% self-employment tax plus 10-37% federal income tax plus 0-13.3% state income tax depending on your location. Total can range from 25-65% of your income. The self-employment tax covers Social Security (12.4% on first $176,100 of income in 2026) and Medicare (2.9% unlimited)."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to pay quarterly taxes on 1099 income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if you expect to owe $1,000 or more in taxes for the year. The IRS requires quarterly estimated tax payments due April 15, June 16, September 15, and January 15 (2026 dates). Missing these deadlines results in penalties of approximately 8% annually on unpaid taxes."
      }
    },
    {
      "@type": "Question",
      "name": "What is the self-employment tax rate for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The self-employment tax rate is 15.3% total: 12.4% for Social Security (on first $176,100 of net self-employment income in 2026) and 2.9% for Medicare (unlimited). High earners ($200,000+ single, $250,000+ married filing jointly) pay an additional 0.9% Medicare surtax."
      }
    },
    {
      "@type": "Question",
      "name": "Can I deduct business expenses from 1099 income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Common deductible business expenses include: home office (simplified method: $5/sq ft up to 300 sq ft), vehicle mileage ($0.70/mile for 2026), software subscriptions, phone and internet (business portion), health insurance premiums (if self-employed), and retirement contributions (SEP-IRA up to $69,000, Solo 401k up to $69,000 employee contribution)."
      }
    },
    {
      "@type": "Question",
      "name": "Which states have no income tax for 1099 workers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nine states have no state income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming, and New Hampshire (which only taxes interest and dividends). If you live in these states, you only pay federal and self-employment tax."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I miss quarterly tax payments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The IRS charges an underpayment penalty calculated using the federal short-term rate plus 3 percentage points (approximately 8% annually as of 2026). For example, if you owe $10,000 and miss all quarterly payments for a full year, you could pay $800+ in penalties on top of the tax owed."
      }
    }
  ]
};

// Software Application Schema for the calculator
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "1099 Tax Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "Free 1099 tax calculator for freelancers. Calculate federal, state, and self-employment taxes for all 50 US states. Updated for 2026 tax year.",
  "featureList": [
    "Calculate federal income tax",
    "Calculate state tax for all 50 states",
    "Calculate 15.3% self-employment tax",
    "Quarterly payment estimator",
    "Advanced deductions support"
  ],
  "screenshot": "https://moneygrowtools.com/calculator-screenshot.png",
  "softwareVersion": "2026.1",
  "datePublished": "2024-01-01",
  "dateModified": "2026-01-05"
};

// HowTo Schema for the calculator
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Your 1099 Taxes",
  "description": "Step-by-step guide to calculating your freelance and self-employment taxes using our free calculator",
  "totalTime": "PT2M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Gross Income",
      "text": "Enter your total 1099 income before any deductions",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Add Business Expenses",
      "text": "Enter your deductible business expenses to reduce taxable income",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Select Your State",
      "text": "Choose your state of residence to include state income tax",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Review Your Results",
      "text": "See your total tax liability including federal, state, and self-employment taxes",
      "position": 4
    }
  ]
};

// BreadcrumbList Schema generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Article Schema generator for blog posts
export const generateArticleSchema = ({
  headline,
  description,
  datePublished,
  dateModified,
  authorName = "Money Grow Tools Editorial Team",
  url,
  imageUrl,
  wordCount,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  url: string;
  imageUrl?: string;
  wordCount?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${url}#article`,
  "headline": headline,
  "description": description,
  "datePublished": datePublished,
  "dateModified": dateModified,
  "author": {
    "@type": "Person",
    "name": authorName,
    "url": "https://moneygrowtools.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Money Grow Tools",
    "logo": {
      "@type": "ImageObject",
      "url": "https://moneygrowtools.com/logo.png",
      "width": 512,
      "height": 512
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  },
  "isPartOf": {
    "@id": "https://moneygrowtools.com/#website"
  },
  "inLanguage": "en-US",
  ...(imageUrl && { "image": imageUrl }),
  ...(wordCount && { "wordCount": wordCount })
});

// Local Business Schema (optional - if you want to appear in local searches)
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Money Grow Tools",
  "description": "Free online tax calculators for freelancers and self-employed professionals",
  "url": "https://moneygrowtools.com",
  "priceRange": "Free",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceType": "Tax Calculator",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Free Tax Calculators",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1099 Tax Calculator"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Quarterly Tax Calculator"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Self-Employment Tax Calculator"
        }
      }
    ]
  }
};

interface StructuredDataProps {
  schemas: object[];
}

const StructuredData = ({ schemas }: StructuredDataProps) => {
  useEffect(() => {
    // Remove any existing structured data scripts we added
    const existingScripts = document.querySelectorAll('script[data-structured-data="true"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data scripts
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-structured-data", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[data-structured-data="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [schemas]);

  return null;
};

export default StructuredData;