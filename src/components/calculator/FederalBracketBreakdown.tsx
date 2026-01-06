import { BracketBreakdown, formatCurrency, formatPercent } from "@/lib/taxCalculations";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FederalBracketBreakdownProps {
  brackets: BracketBreakdown[];
  totalFederalTax: number;
}

const FederalBracketBreakdown = ({ brackets, totalFederalTax }: FederalBracketBreakdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (brackets.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="text-left">
          <span className="font-medium text-foreground">Federal Tax Bracket Breakdown</span>
          <p className="text-sm text-muted-foreground">See how your income is taxed across brackets</p>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-border">
          <div className="space-y-3">
            {brackets.map((bracket, index) => {
              const bracketLabel = bracket.max === Infinity 
                ? `Over ${formatCurrency(bracket.min)}`
                : `${formatCurrency(bracket.min)} - ${formatCurrency(bracket.max)}`;
              
              const percentage = totalFederalTax > 0 ? (bracket.taxFromBracket / totalFederalTax) * 100 : 0;
              
              return (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-12 h-6 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {bracket.rate}%
                      </span>
                      <span className="text-sm text-muted-foreground">{bracketLabel}</span>
                    </div>
                    <span className="font-medium text-foreground">{formatCurrency(bracket.taxFromBracket)}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Taxable: {formatCurrency(bracket.taxableInBracket)}</span>
                    <span>{formatPercent(percentage)} of federal tax</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="font-medium text-foreground">Total Federal Income Tax</span>
            <span className="font-heading font-bold text-lg text-primary">{formatCurrency(totalFederalTax)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FederalBracketBreakdown;
