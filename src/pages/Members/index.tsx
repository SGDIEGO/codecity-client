import { getAllUser } from "@/api/user/user.api";
import { Member } from "@/components/Member";
import { useAuthContext } from "@/context/Authorization";
import { Outlet } from "react-router-dom";
import 'tailwindcss/tailwind.css';

const Members = () => {
    const { user } = useAuthContext();

    const userMutate = getAllUser();

    const renderUsers = () => {
        if (userMutate.isLoading)
            return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;

        if (userMutate.isError)
            return <p className="text-red-500 dark:text-red-400">Error: {userMutate.error.message}</p>;

        if (!userMutate.data)
            return null;

        return userMutate.data.map((u, ind) => {
            if (u.id !== user?.id)
                return (<Member key={ind} member={u} />);
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Members</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderUsers()}
            </div>
            <Outlet />
        </div>
    );
};

export {
    Members
};