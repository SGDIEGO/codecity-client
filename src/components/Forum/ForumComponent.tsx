import { useNavigate } from 'react-router-dom';
import { formatDate } from "@/shared/utils/date";
import { IForum } from "../../domain/models/forum.model";
import { useAuthContext } from "@/context/Authorization";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteForumMutation, useUpdateForumMutation } from '../../hooks/useForums';
import { Button } from '../Button';
import { USER_ROLES } from '@/shared/global/user_roles.global';
import { Upload } from 'lucide-react';

interface ForumComponentProperties {
    data: IForum
}

export const Forum = ({ data }: ForumComponentProperties) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [newName] = useState(data.name);
    const deleteForum = useDeleteForumMutation();
    const updateForum = useUpdateForumMutation();

    const handleClick = () => {
        navigate(`/forums/${data.id}/threads`);
    };

    const handleDelete = async () => {
        try {
            await deleteForum.mutateAsync(data.id);
            toast.success('Forum deleted successfully');
        } catch (error: any) {
            toast.error('Error deleting forum');
        }
    };

    /*     const handleEdit = async () => {
            try {
                await updateForum.mutateAsync({
                    forum_id: data.id,
                    body: {
                        name: newName,
                    }
                });
                toast.success('Forum updated successfully');
                setIsEditing(false);
            } catch (error: any) {
                console.log(error)
                toast.error('Error updating forum');
            }
        }; */

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', newName); // Add other fields if necessary
            try {
                (async () => {
                    await updateForum.mutateAsync({
                        forum_id: data.id,
                        body: formData
                    })

                    console.log(`File uploaded successfully.`);
                })()
            } catch (error: any) {
                toast.error('Error uploading file: ' + error.message);
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md sm:flex-row sm:items-start group">
            <div className="w-full sm:w-1/3 relative">
                <img src={data.image_url} alt="" className="w-full h-48 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none" />
                {
                    (data.creator.id == user?.id) &&
                    <>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
                            <Upload
                                onClick={() => document.getElementById('fileInput')?.click()}
                                className="text-white w-8 h-8"
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
                }
            </div>
            <div className='p-4 w-full sm:w-2/3 sm:flex sm:justify-between'>
                <div>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{data.name}</h3>
                        <div className="text-slate-600 dark:text-slate-400">
                            <span className="mr-2">{data.creator?.name}</span>
                            <span>{data.numberOfPosts} threads</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center sm:text-left flex gap-2">
                        <Button name={'View'} onClickHandler={handleClick} />
                        {
                            user && ((user?.user_role.name === USER_ROLES.Staff) || (data.creator.id == user.id)) &&
                            <>
                                <Button name={'Delete'} onClickHandler={handleDelete} variant='danger' />
                            </>
                        }
                    </div>
                </div>
                {data.lastPost && (
                    <div className="mt-4 text-slate-600 dark:text-slate-400">
                        <div>Last post by {data.lastPost.user.name}</div>
                        <div>{formatDate(data.lastPost.creation_date)}</div>
                    </div>
                )}
            </div>
        </div>
    );
}