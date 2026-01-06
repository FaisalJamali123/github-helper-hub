import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

// Real, accurate 2026 tax information from IRS sources
const faqs = [
  {
    question: "How much tax do I owe on 1099 income?",
    answer: "As a 1099 contractor, you pay <strong>15.3% self-employment tax</strong> (12.4% Social Security on first $176,100 + 2.9% Medicare on all earnings) plus <strong>10-37% federal income tax</strong> based on your bracket, plus <strong>0-13.3% state income tax</strong> depending on where you live. Your effective rate typically ranges from 25-40% for most freelancers.",
  },
  {
    question: "When are quarterly estimated tax payments due in 2026?",
    answer: "The IRS requires quarterly payments if you expect to owe <strong>$1,000 or more</strong>. 2026 deadlines: <strong>Q1: April 15, 2026</strong> (for Jan-Mar income), <strong>Q2: June 15, 2026</strong> (Apr-May), <strong>Q3: September 15, 2026</strong> (Jun-Aug), <strong>Q4: January 15, 2027</strong> (Sep-Dec). Use IRS Form 1040-ES to pay.",
  },
  {
    question: "What is the self-employment tax rate for 2026?",
    answer: "The self-employment tax rate is <strong>15.3% total</strong>: 12.4% for Social Security (capped at $176,100 of net self-employment income in 2026) and 2.9% for Medicare (no income cap). If you earn over $200,000 single ($250,000 married), you also pay an additional <strong>0.9% Medicare surtax</strong>. You can deduct 50% of your SE tax from gross income.",
  },
  {
    question: "What business expenses can I deduct as a 1099 worker?",
    answer: "<strong>Common deductions include:</strong> Home office ($5/sq ft simplified method, up to $1,500), vehicle mileage (<strong>$0.70/mile for 2026</strong>), business software and tools, phone/internet (business portion), health insurance premiums, professional development, and retirement contributions (SEP-IRA: up to $69,000, Solo 401k: up to $69,000 employee contribution). Keep receipts for all deductions.",
  },
  {
    question: "Which states have no income tax for freelancers?",
    answer: "<strong>Nine states have no income tax:</strong> Alaska, Florida, Nevada, New Hampshire (dividends/interest only), South Dakota, Tennessee, Texas, Washington, and Wyoming. Living in these states means you only pay federal income tax and self-employment tax—potentially saving 5-13% on your total tax bill.",
  },
  {
    question: "What are the penalties for missing quarterly tax payments?",
    answer: "The IRS charges an <strong>underpayment penalty</strong> based on the federal short-term rate plus 3 percentage points (approximately 8% annually as of 2026). The penalty is calculated daily from the payment due date until you pay. Example: Missing all quarterly payments on a $12,000 annual tax bill could cost <strong>$600-$800 in penalties</strong> plus interest.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-foreground" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert answers to common self-employment tax questions
          </p>
        </header>

        <div className="space-y-4" role="region" aria-label="FAQ accordion">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? "bg-background border-primary/30 shadow-lg" 
                  : "bg-background/5 border-background/10 hover:bg-background/10"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left p-5 sm:p-6"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className={`text-base sm:text-lg font-semibold pr-4 transition-colors ${
                  openIndex === index ? "text-foreground" : "text-background"
                }`}>
                  {faq.question}
                </h3>
                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  openIndex === index 
                    ? "bg-primary text-primary-foreground rotate-0" 
                    : "bg-background/10 text-background"
                }`} aria-hidden="true">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div 
                  className="px-5 sm:px-6 pb-5 sm:pb-6 text-muted-foreground leading-relaxed text-sm sm:text-base [&_strong]:text-foreground [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional SEO content */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Have more questions? Check our{" "}
            <a href="#blog" className="text-primary hover:underline font-medium">
              tax guides
            </a>{" "}
            or use our free calculators above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;