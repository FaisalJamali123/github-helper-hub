import { Calculator, Users, Percent, Star } from "lucide-react";

const stats = [
  { value: "50,000+", label: "Calculations Completed", icon: Calculator },
  { value: "50", label: "US States Covered", icon: Users },
  { value: "100%", label: "Free Forever", icon: Percent },
  { value: "4.8★", label: "User Rating", icon: Star },
];

const TrustIndicators = () => {
  return (
    <section className="py-8 sm:py-10 bg-card border-y border-border" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-item fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-value text-2xl sm:text-3xl">{stat.value}</div>
              <div className="stat-label text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
