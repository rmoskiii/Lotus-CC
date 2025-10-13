import type { ReactNode } from "react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null;

    const handleOverlayClick = () => {
        onOpenChange(false); // call the prop to close the dialog
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick} // clicking the overlay closes dialog
        >
            {/* prevent clicks inside content from closing */}
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
}

export function DialogContent({
                                  children,
                                  className = "",
                              }: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={`bg-white p-6 rounded-lg ${className}`}>{children}</div>;
}

export function DialogHeader({ children }: { children: ReactNode }) {
    return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
}
