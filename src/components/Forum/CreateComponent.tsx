import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputForm } from '../Input';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
});

interface CreateForumModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const CreateForumModal: React.FC<CreateForumModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const handleSubmit = form.handleSubmit((values) => {
        onSubmit(values);
        form.reset();
        onClose();
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create Forum</h2>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputForm name="name" label="Forum Name" />
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};