import type { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
    return (
        <div
            className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardContent({ children, className = "", ...props }: CardProps) {
    return <div className={`p-4 ${className}`} {...props}>{children}</div>;
}
