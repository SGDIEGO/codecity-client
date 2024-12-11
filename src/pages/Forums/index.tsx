import { useState } from 'react';
import { Forum, CreateForumModal } from '../../components/Forum';
import { useForumsMutation, useCreateForumMutation } from '../../hooks/useForums';
import { useAuthContext } from '@/context/Authorization';
import { USER_ROLES, hasRequiredRole } from '@/shared/global/user_roles.global';
import { toast } from 'react-toastify';
import { useDebounce } from '@/hooks/useDebounce';

export default function Forums() {
    const { user } = useAuthContext();
    const { data, isLoading, error } = useForumsMutation();
    const createForum = useCreateForumMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 1000);

    const handleCreateForum = async (values: { name: string }) => {
        try {
            await createForum.mutateAsync({
                name: values.name,
                creation_date: new Date(),
                creator_id: user?.id as string
            });
            toast.success('Forum created!');
        } catch (error: any) {
            toast.error('Error creating forum');
            console.log("error: ", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin border-t-blue-400 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-500">
                <p>Error fetching forums: {error.message}</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    const renderForums = () => {
        const filteredData = data?.filter((forum) => forum.name.toLowerCase().includes(debouncedFilter.toLowerCase()));
        return filteredData?.map((d, i) => <Forum key={i} data={d} />);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Forums</h1>
                {
                    hasRequiredRole(user?.user_role.name as USER_ROLES, USER_ROLES.Staff) && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
                        >
                            Create Forum
                        </button>
                    )
                }
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search forums..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid gap-6">
                {renderForums()}
            </div>
            <CreateForumModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateForum}
            />
        </div>
    );
}