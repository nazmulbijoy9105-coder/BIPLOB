import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden",
        onClick && "cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50",
    ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg font-medium",
    icon: "p-2",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ 
  children, 
  className, 
  variant = 'default',
  onClick
}: { 
  children: ReactNode, 
  className?: string, 
  variant?: 'default' | 'success' | 'warning' | 'danger',
  onClick?: () => void
}) {
  const variants = {
    default: "bg-neutral-100 text-neutral-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span 
      onClick={onClick}
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-semibold", 
        variants[variant], 
        className
      )}
    >
      {children}
    </span>
  );
}
