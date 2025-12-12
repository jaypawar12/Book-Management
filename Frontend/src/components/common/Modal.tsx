import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    theme?: 'light' | 'dark';
    maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    theme = 'dark',
    maxWidth = 'max-w-lg'
}) => {
    const isDark = theme === 'dark';

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto w-screen h-screen">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal Panel */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div
                    className={cn(
                        "relative transform overflow-hidden rounded-3xl text-left shadow-2xl transition-all sm:my-8 w-full animate-scale-in border",
                        maxWidth,
                        isDark
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-transparent"
                    )}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Header */}
                    {(title || onClose) && (
                        <div className={cn(
                            "px-6 py-4 flex justify-between items-center border-b",
                            isDark
                                ? "bg-gray-800/50 border-gray-800"
                                : "bg-gray-50 border-gray-100"
                        )}>
                            {title && (
                                <h3 className={cn(
                                    "text-lg font-bold",
                                    isDark ? "text-white" : "text-gray-900"
                                )} id="modal-title">
                                    {title}
                                </h3>
                            )}
                            <button
                                onClick={onClose}
                                className={cn(
                                    "rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2",
                                    isDark
                                        ? "text-gray-400 hover:text-white hover:bg-gray-700/50 focus:ring-orange-500"
                                        : "text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:ring-indigo-500"
                                )}
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className={cn(
                        "px-6 py-6",
                        isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
