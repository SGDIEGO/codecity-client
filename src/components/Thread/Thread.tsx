// src/components/Thread.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IThread } from '@/domain/models/thread.model';
import { formatDate } from '@/shared/utils/date';
import Tag from '@/components/Tag';
import { toast } from 'react-toastify';
import { patchThread } from '@/api/thread/thread.api';
import { Upload } from 'lucide-react';
import { useAuthContext } from '@/context/Authorization';
import { EditThreadModal } from '@/components/Thread/EditThread';

interface ThreadProps {
    threadData: IThread;
}

const Thread: React.FC<ThreadProps> = ({ threadData }) => {
    const { user } = useAuthContext()
    const updateThread = patchThread()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                (async () => {
                    await updateThread.mutateAsync({
                        id: threadData.id,
                        body: formData
                    })

                    console.log(`File uploaded successfully.`);
                })()
            } catch (error: any) {
                toast.error('Error uploading file: ' + error.message);
            }
        }
    };

    const handleEdit = () => {
        setIsModalOpen(true)
        console.log('Edit thread');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        // Implement delete functionality
        console.log('Delete thread');
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-600 dark:bg-zinc-800 rounded shadow-md">
                <div className="relative group">
                    <img
                        src={threadData.image_url ?? ""}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full cursor-pointer"
                    />
                    {
                        (threadData.creator.id == user?.id) ?
                            <>
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
                                    <Upload
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    />
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </>
                            :
                            null
                    }
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center mb-2">
                        <Link to={`/thread/${threadData.id}`} className="flex gap-3 items-center cursor-pointer">
                            <Tag content={threadData.name} />
                        </Link>
                        {threadData.creator.id == user?.id && (
                            <div className="flex gap-2">
                                <button onClick={handleEdit} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <div className="flex gap-2 items-center">
                            <span className="text-sm text-slate-400">{formatDate(threadData.creation_date)}</span>
                            <span className="text-sm text-slate-400">by {threadData.creator.name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <div className="flex gap-3">
                            <div className="flex gap-1 items-center">
                                <span className="font-semibold text-slate-300">Replies:</span>
                                <span className="text-slate-400">{threadData.numberOfMessages}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="text-slate-400">{threadData.private ? "Private" : "Public"}</span>
                            </div>
                        </div>
                    </div>
                    {threadData.lastMessage && (
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="flex gap-3">
                                <div className="flex gap-1 items-center">
                                    <span className="font-semibold text-slate-300">Last Message:</span>
                                    <span className="text-slate-400">{threadData.lastMessage.content}</span>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="text-slate-400">by {threadData.lastMessage.user.name}</span>
                                    <span className="text-sm text-slate-400">{formatDate(threadData.lastMessage.creation_date)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <EditThreadModal
                    initialData={threadData}
                    onClose={handleCloseModal}
                    isOpen={isModalOpen}
                />
            )}
        </>
    );
};

export { Thread }