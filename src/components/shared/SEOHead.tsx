import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  keywords?: string[];
  author?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonicalUrl = "https://moneygrowtools.com",
  ogImage = "https://moneygrowtools.com/og-image.png",
  ogType = "website",
  articlePublishedTime,
  articleModifiedTime,
  keywords = [],
  author = "Money Grow Tools",
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title (under 60 chars for SEO)
    const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
    document.title = truncatedTitle;

    // Helper to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        const [attr, value] = selector.replace('meta[', '').replace(']', '').replace(/"/g, '').split('=');
        meta.setAttribute(attr, value);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update meta description (under 160 chars for SEO)
    const truncatedDesc = description.length > 160 ? description.substring(0, 157) + "..." : description;
    updateMetaTag('meta[name="description"]', "content", truncatedDesc);
    updateMetaTag('meta[name="title"]', "content", truncatedTitle);

    // Robots meta
    const robotsContent = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    updateMetaTag('meta[name="robots"]', "content", robotsContent);
    updateMetaTag('meta[name="googlebot"]', "content", noindex ? "noindex" : "index, follow");

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', "content", truncatedTitle);
    updateMetaTag('meta[property="og:description"]', "content", truncatedDesc);
    updateMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    updateMetaTag('meta[property="og:image"]', "content", ogImage);
    updateMetaTag('meta[property="og:type"]', "content", ogType);
    updateMetaTag('meta[property="og:site_name"]', "content", "Money Grow Tools");
    updateMetaTag('meta[property="og:locale"]', "content", "en_US");

    if (articlePublishedTime) {
      updateMetaTag('meta[property="article:published_time"]', "content", articlePublishedTime);
    }
    if (articleModifiedTime) {
      updateMetaTag('meta[property="article:modified_time"]', "content", articleModifiedTime);
    }
    if (author) {
      updateMetaTag('meta[property="article:author"]', "content", author);
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    updateMetaTag('meta[name="twitter:site"]', "content", "@moneygrowtools");
    updateMetaTag('meta[name="twitter:creator"]', "content", "@moneygrowtools");
    updateMetaTag('meta[name="twitter:title"]', "content", truncatedTitle);
    updateMetaTag('meta[name="twitter:description"]', "content", truncatedDesc);
    updateMetaTag('meta[name="twitter:image"]', "content", ogImage);
    updateMetaTag('meta[name="twitter:image:alt"]', "content", truncatedTitle);

    // Keywords meta tag
    if (keywords.length > 0) {
      updateMetaTag('meta[name="keywords"]', "content", keywords.join(", "));
    }

    // Author meta
    updateMetaTag('meta[name="author"]', "content", author);

  }, [title, description, canonicalUrl, ogImage, ogType, articlePublishedTime, articleModifiedTime, keywords, author, noindex]);

  return null;
};

export default SEOHead;
