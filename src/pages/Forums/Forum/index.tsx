import { useState } from 'react';
import { Thread } from "@/components/Thread";
import { useCreateThreadMutation } from "@/hooks";
import { useParams } from "react-router-dom";
import { CreateThreadModal } from '@/components/Thread';
import { useAuthContext } from '@/context/Authorization';
import { toast } from 'react-toastify';
import { useDebounce } from '@/hooks/useDebounce';
import { getThreads } from '@/api/forums/forum.api';
import { Button } from '@/components/Button';
import { hasRequiredRole, USER_ROLES } from '@/shared/global/user_roles.global';

export default function ForumSingle() {
    const { forum_id } = useParams();
    const { user } = useAuthContext();
    const threads = getThreads(forum_id!);
    const createThread = useCreateThreadMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 1000);

    const handleCreateThread = async (values: { name: string; image?: FileList; private: boolean; access_price?: number }) => {
        try {
            const file = values.image && values.image.length > 0 ? values.image[0] : undefined;
            await createThread.mutateAsync({
                threadDto: {
                    name: values.name,
                    private: values.private,
                    access_price: values.access_price,
                    forum_id: forum_id as string,
                    user_id: user?.id as string
                },
                file: file
            });
            toast.success('Thread created successfully');
        } catch (error: any) {
            console.log("error: ", error);
            toast.error('Error creating thread');
        }
    };

    const renderThreads = () => {
        if (threads.isLoading) return <div>Loading...</div>;
        if (threads.isError) return <div>Error</div>;
        if (!threads.data) return null;

        console.log("data: ", threads.data);
        const filteredThreads = threads.data.filter((thread) =>
            thread.name.toLowerCase().includes(debouncedFilter.toLowerCase())
        );

        return filteredThreads?.map((thread, index) => {
            return <Thread key={index} threadData={thread} />;
        });
    };

    return (
        <div className="mx-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Threads</h3>
                {hasRequiredRole(user?.user_role.name! as USER_ROLES, USER_ROLES.Middle) ? 
                (<Button name={'Create Thread'} onClickHandler={() => setIsModalOpen(true)} variant='secondary'/>) 
                : 
                null}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search threads..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid gap-3">
                {renderThreads()}
            </div>
            <CreateThreadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateThread}
            />
        </div>
    );
}