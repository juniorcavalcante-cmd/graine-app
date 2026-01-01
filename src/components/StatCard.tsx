import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "income" | "expense" | "warning";
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  variant = "default",
}: StatCardProps) => {
  const variantStyles = {
    default: "bg-card",
    income: "bg-income-light",
    expense: "bg-expense-light",
    warning: "bg-warning-light",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    income: "bg-income/20 text-income",
    expense: "bg-expense/20 text-expense",
    warning: "bg-warning/20 text-warning",
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp size={14} />;
    if (trend.value < 0) return <TrendingDown size={14} />;
    return <Minus size={14} />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value > 0) return "text-income";
    if (trend.value < 0) return "text-expense";
    return "text-muted-foreground";
  };

  return (
    <div
      className={`financial-card ${variantStyles[variant]} animate-fade-in`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">
                {trend.value > 0 ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
