import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { IconType } from 'react-icons';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: IconType;
    theme?: 'light' | 'dark';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, icon: Icon, theme = 'dark', ...props }, ref) => {
    const isDark = theme === 'dark';

    return (
        <div className="w-full">
            {label && (
                <label className={cn(
                    "block text-sm font-medium mb-2 transition-colors",
                    isDark ? "text-gray-300" : "text-gray-700"
                )}>
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                        isDark ? "text-gray-500 group-focus-within:text-orange-500" : "text-gray-400 group-focus-within:text-indigo-600"
                    )}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-300 outline-none",
                        Icon && "pl-12",
                        isDark
                            ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:border-gray-600 hover:bg-gray-800"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-2 animate-fade-in">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
