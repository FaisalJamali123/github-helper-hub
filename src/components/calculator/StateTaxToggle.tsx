import { useState, useEffect } from "react";
import { MapPin, Check, X, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface StateTaxToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  stateName: string;
  stateRate: number;
  stateTaxAmount: number;
}

const StateTaxToggle = ({
  enabled,
  onToggle,
  stateName,
  stateRate,
  stateTaxAmount,
}: StateTaxToggleProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsAnimating(true);
      setShowSavings(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowSavings(false);
    }
  }, [enabled]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 transition-all duration-500 ease-out",
        enabled
          ? "border-primary/30 bg-card"
          : "border-success/50 bg-success/5"
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          !enabled && isAnimating && "opacity-100"
        )}
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--success) / 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Sparkle effects when disabled */}
      {!enabled && isAnimating && (
        <>
          <Sparkles
            className="absolute top-2 right-8 w-4 h-4 text-success animate-ping"
            style={{ animationDuration: "1s" }}
          />
          <Sparkles
            className="absolute bottom-4 left-12 w-3 h-3 text-success animate-ping"
            style={{ animationDuration: "1.5s", animationDelay: "0.2s" }}
          />
        </>
      )}

      <div className="relative p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Icon and info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                enabled
                  ? "bg-primary/10 text-primary"
                  : "bg-success/10 text-success scale-110"
              )}
            >
              <MapPin className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground truncate">
                  {stateName} State Tax
                </span>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-300",
                    enabled
                      ? "bg-muted text-muted-foreground"
                      : "bg-success/20 text-success"
                  )}
                >
                  {enabled ? formatPercent(stateRate) : "Excluded"}
                </span>
              </div>

              {/* Amount display with animation */}
              <div className="mt-1 flex items-center gap-2">
                {enabled ? (
                  <span className="text-sm text-muted-foreground">
                    Adds {formatCurrency(stateTaxAmount)} to your tax
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium text-success transition-all duration-300",
                      isAnimating && "animate-pulse"
                    )}
                  >
                    You save {formatCurrency(stateTaxAmount)}!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Toggle and status */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Status indicator */}
            <div
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                enabled
                  ? "bg-primary/10 text-primary"
                  : "bg-success/10 text-success"
              )}
            >
              {enabled ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Included</span>
                </>
              ) : (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Excluded</span>
                </>
              )}
            </div>

            {/* Custom styled switch */}
            <div className="relative">
              <Switch
                checked={enabled}
                onCheckedChange={onToggle}
                className={cn(
                  "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted transition-all duration-300",
                  !enabled && "ring-2 ring-success/30 ring-offset-2 ring-offset-background"
                )}
              />
              {/* Glow effect when off */}
              {!enabled && (
                <div
                  className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
                  style={{
                    boxShadow: "0 0 12px hsl(var(--success) / 0.4)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Savings callout - appears when state tax is excluded */}
        {showSavings && stateTaxAmount > 0 && (
          <div
            className={cn(
              "mt-4 p-3 rounded-lg bg-success/10 border border-success/20 transition-all duration-500",
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-100 translate-y-0"
            )}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-success font-medium">
                  Considering a no-income-tax state?
                </p>
                <p className="text-muted-foreground mt-0.5">
                  States like Texas, Florida, and Nevada have no state income
                  tax. Toggle this off to see your tax savings!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateTaxToggle;
