// src/components/InputForm.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface InputFormProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const InputForm: React.FC<InputFormProps> = ({ name, label, type = 'text', placeholder }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        id={name}
                        placeholder={placeholder}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-300 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                    />
                )}
            />
            {errors[name] && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors[name]?.message as string}</p>
            )}
        </div>
    );
};

export { InputForm };