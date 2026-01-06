import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/taxCalculations";

interface TaxBreakdownChartProps {
  selfEmploymentTax: number;
  federalIncomeTax: number;
  stateTax: number;
}

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"];

const TaxBreakdownChart = ({ selfEmploymentTax, federalIncomeTax, stateTax }: TaxBreakdownChartProps) => {
  const data = [
    { name: "Self-Employment Tax", value: selfEmploymentTax, color: COLORS[0] },
    { name: "Federal Income Tax", value: federalIncomeTax, color: COLORS[1] },
    { name: "State Tax", value: stateTax, color: COLORS[2] },
  ].filter(item => item.value > 0);

  if (data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = ((value / total) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-primary font-semibold">{formatCurrency(value)}</p>
          <p className="text-sm text-muted-foreground">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Tax Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={90}
              innerRadius={40}
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Tax</span>
          <span className="font-heading font-bold text-lg text-foreground">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default TaxBreakdownChart;
