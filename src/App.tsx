import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Calculator1099 from "./pages/Calculator1099";
import CalculatorQuarterly from "./pages/CalculatorQuarterly";
import CalculatorSelfEmployment from "./pages/CalculatorSelfEmployment";
import Calculator1099VsW2 from "./pages/Calculator1099VsW2";
import Calculator1099C from "./pages/Calculator1099C";
import CalculatorMileage from "./pages/CalculatorMileage";
import Best1099TaxSoftware from "./pages/Best1099TaxSoftware";
import BlogHowMuchToSetAside from "./pages/BlogHowMuchToSetAside";
import BlogMissedQuarterlyPayment from "./pages/BlogMissedQuarterlyPayment";
import BlogWriteOffGroceries from "./pages/BlogWriteOffGroceries";
import Blog2026TaxGuide from "./pages/Blog2026TaxGuide";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import Contact from "./pages/Contact";
import Advertise from "./pages/Advertise";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator/1099" element={<Calculator1099 />} />
            <Route path="/calculator/quarterly" element={<CalculatorQuarterly />} />
            <Route path="/calculator/self-employment" element={<CalculatorSelfEmployment />} />
            <Route path="/calculator/1099-vs-w2" element={<Calculator1099VsW2 />} />
            <Route path="/calculator/1099-c" element={<Calculator1099C />} />
            <Route path="/calculator/mileage" element={<CalculatorMileage />} />
            <Route path="/best-1099-tax-software" element={<Best1099TaxSoftware />} />
            <Route path="/blog/how-much-to-set-aside" element={<BlogHowMuchToSetAside />} />
            <Route path="/blog/missed-quarterly-payment" element={<BlogMissedQuarterlyPayment />} />
            <Route path="/blog/write-off-groceries" element={<BlogWriteOffGroceries />} />
            <Route path="/blog/2026-1099-tax-guide" element={<Blog2026TaxGuide />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
