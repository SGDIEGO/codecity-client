import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    name: string;
    onClickHandler?: () => void;
    redirect?: string;
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'classic' | 'primary' | 'secondary' | 'danger' | 'success';
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ name, onClickHandler, redirect, isLoading = false, type = 'button', variant = 'classic', children }) => {
    const navigate = useNavigate()
    let baseProperties = "text-sm px-2 py-1 flex items-center rounded-sm"
    switch (variant) {
        case "classic":
            baseProperties = twMerge(baseProperties, "bg-slate-500 dark:bg-slate-700 text-white hover:bg-slate-600 dark:hover:bg-slate-600")
            break
        case "primary":
            baseProperties = twMerge(baseProperties, "bg-blue-500 text-white hover:bg-blue-600")
            break
        case "secondary":
            baseProperties = twMerge(baseProperties, "bg-green-500 text-white hover:bg-green-600")
            break
        case "danger":
            baseProperties = twMerge(baseProperties, "bg-red-500 text-white hover:bg-red-600")
            break
    }

    const onClick = () => {
        if (onClickHandler) {
            onClickHandler()
        }
        if (redirect) {
            navigate(redirect)
        }
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={baseProperties}
            disabled={isLoading}
        >
            {isLoading ? <LoaderCircle className="animate-spin h-5 w-5 mr-3" /> : children}
            {name}
        </button>
    );
};

export { Button };