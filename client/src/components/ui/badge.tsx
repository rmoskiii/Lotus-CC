import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "destructive" | "secondary";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
    const variants = {
        default: "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs",
        destructive: "bg-red-500 text-white px-2 py-1 rounded-full text-xs",
        secondary: "bg-blue-500 text-white px-2 py-1 rounded-full text-xs",
    };
    return <span className={variants[variant]}>{children}</span>;
}
