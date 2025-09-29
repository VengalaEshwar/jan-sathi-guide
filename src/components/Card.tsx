import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  gradient?: boolean;
  children?: ReactNode;
}

export const Card = ({
  icon: Icon,
  title,
  description,
  onClick,
  gradient = false,
  children,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        gradient
          ? "bg-gradient-card text-white border-transparent shadow-glow"
          : "bg-card border-border shadow-card hover:shadow-glow"
      } ${onClick ? "cursor-pointer hover:scale-[1.02]" : ""} p-6 animate-fade-in`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl ${
            gradient
              ? "bg-white/20 backdrop-blur-sm"
              : "bg-gradient-primary"
          } flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`w-6 h-6 ${gradient ? "text-white" : "text-white"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-2 ${
              gradient ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${
              gradient ? "text-white/90" : "text-muted-foreground"
            } leading-relaxed`}
          >
            {description}
          </p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
};
