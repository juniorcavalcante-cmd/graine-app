import { Sprout } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ variant = "dark", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-lg p-1.5 ${
          variant === "light"
            ? "bg-primary-foreground/10"
            : "bg-primary/10"
        }`}
      >
        <Sprout
          size={iconSizes[size]}
          className={variant === "light" ? "text-primary-foreground" : "text-primary"}
          strokeWidth={2.5}
        />
      </div>
      <span
        className={`font-bold tracking-tight ${sizeClasses[size]} ${
          variant === "light" ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        GRAINE
      </span>
    </div>
  );
};
