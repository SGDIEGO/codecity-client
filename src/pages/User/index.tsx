import React, { useEffect } from 'react';
import { useAuthContext } from '@/context/Authorization';
import {  getUser, updateProfileImage } from '@/api/user/user.api';
import { useParams } from 'react-router-dom';
import { formatDate } from '@/shared/utils/date';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';

const UserProfile: React.FC = () => {
    const { id } = useParams();
    const { updateUser } = useAuthContext()
    const updatePI = updateProfileImage()
    const userApi = getUser(id as string)

    useEffect(() => {
        updateUser({ profile_url: userApi.data?.profile_url })
    }, [userApi.data])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            try {
                (async () => {
                    const formdata = new FormData();

                    formdata.append('file', file);
                    await updatePI.mutateAsync({
                        user_id: id as string,
                        formdata
                    })

                    console.log(`File uploaded successfully.`);
                    window.location.reload()
                })()
            } catch (error: any) {
                toast.error('Error uploading file: ' + error.message);
            }
        }
    };

    if (userApi.isLoading) {
        return <div>Loading...</div>
    }

    if (!userApi.data)
        return <div>User not found</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-slate-300 shadow-md rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative group">
                <img
                    src={userApi?.data?.profile_url ?? ""}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full cursor-pointer"
                />
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
                </div>
                <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-800">{userApi?.data.name}</h2>
                <p className="text-slate-600">{userApi?.data.email}</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2">
                    <span className="text-slate-600">Joined: {userApi?.data.join_date ? formatDate(userApi?.data.join_date) : 'N/A'}</span>
                </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-slate-800">Role</h3>
                <p className="text-slate-700">{userApi?.data.user_role.name}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-slate-800">Email</h3>
                <p className="text-slate-700">{userApi?.data.email}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-slate-800">Interactions</h3>
                <p className="text-slate-700">{userApi?.data.interactions}</p>
            </div>
            </div>
        </div>
    );
};

export default UserProfile;