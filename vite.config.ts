import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// All routes for sitemap generation
const routes = [
  "/",
  "/calculator/1099",
  "/calculator/quarterly",
  "/calculator/self-employment",
  "/calculator/1099-vs-w2",
  "/calculator/1099-c",
  "/calculator/mileage",
  "/best-1099-tax-software",
  "/blog/how-much-to-set-aside",
  "/blog/missed-quarterly-payment",
  "/blog/write-off-groceries",
  "/blog/2026-1099-tax-guide",
  "/about",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/contact",
  "/advertise",
];

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    Sitemap({
      hostname: "https://moneygrowtools.com",
      dynamicRoutes: routes,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString().split("T")[0],
      generateRobotsTxt: true,
      robots: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/api/", "/admin/"] },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
