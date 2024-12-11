// src/components/CreateThreadModal.tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputForm } from '../Input';
import { patchThread } from '@/api/thread/thread.api';
import { toast } from 'react-toastify';

const formSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'Name is required' }),
    image: z.any().optional(),
    private: z.boolean(),
    access_price: z.number().min(0, { message: 'Price must be a positive number' }).optional(),
});

interface EditThreadModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: z.infer<typeof formSchema>;
}

const EditThreadModal: React.FC<EditThreadModalProps> = ({ isOpen, onClose, initialData }) => {
    const updateThread = patchThread()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const handleSubmit = form.handleSubmit((values) => {
        const file = values.image.files ? values.image.files[0] : undefined;
        const formData = new FormData();
        if (file) formData.append('file', file);
        formData.append('name', values.name);
        formData.append('private', values.private.toString());
        formData.append('access_price', values.access_price?.toString() || '');

        try {
            (async () => {
                const response = await updateThread.mutateAsync({
                    id: initialData.id,
                    body: formData
                });

                console.log("response: ", response);
            })()
            toast.success('Thread updated successfully');
        } catch (error) {
            console.log(error);
            toast.error('Error updating thread');
        }
        form.reset();
        onClose();
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Thread</h2>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputForm name="name" label="Thread Name" />
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                {...form.register('image')}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...form.register('private')}
                                id="private"
                                className="mr-2"
                            />
                            <label htmlFor="private" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Private
                            </label>
                        </div>
                        {form.watch('private') && (
                            <InputForm name="access_price" label="Access Price" type="number" />
                        )}
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
                                Save
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export {
    EditThreadModal
}