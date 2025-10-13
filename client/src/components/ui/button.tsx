import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "default" | "ghost" | "secondary";
    size?: "sm" | "md" | "lg";
}

export function Button({ children, variant = "default", size = "md", className = "", ...props }: ButtonProps) {
    const base = "rounded font-medium transition";
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    };
    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}
