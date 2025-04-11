"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "./toast";

interface ToastContextType {
    showToast: (
        message: string,
        type?: "success" | "error" | "warning" | "info",
        duration?: number
    ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "warning" | "info">(
        "info"
    );
    const [duration, setDuration] = useState(5000);

    const showToast = (
        message: string,
        type: "success" | "error" | "warning" | "info" = "info",
        duration: number = 5000
    ) => {
        setMessage(message);
        setType(type);
        setDuration(duration);
        setIsOpen(true);
    };

    const closeToast = () => {
        setIsOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast
                message={message}
                type={type}
                duration={duration}
                isOpen={isOpen}
                onClose={closeToast}
            />
        </ToastContext.Provider>
    );
}
