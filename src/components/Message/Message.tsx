import { useEffect, useState } from 'react';
import { deleteMessage, dislikeMessage, likeMessage } from "@/api/messages/message.api";
import { useAuthContext } from "@/context/Authorization";
import { MessageFindDto } from "@/domain/dto/message.dto";
import { formatDate } from "@/shared/utils/date";
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from "react-toastify";

import { postMessage } from "../../api/messages/message.api"
import { useParams } from 'react-router-dom';
import { Button } from '../Button';

interface MessageComponentProps {
    message: MessageFindDto;
    children?: JSX.Element
}

const MessageComponent = ({ message, children }: MessageComponentProps) => {
    const { user } = useAuthContext();
    const { id } = useParams();

    const like = likeMessage();
    const dislike = dislikeMessage();
    const createMessage = postMessage()
    const removeMessage = deleteMessage()

    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [showReplies, setShowReplies] = useState(false);

    const handleLike = async () => {
        try {
            await like.mutateAsync({
                id: message.id!,
                user_id: user?.id!
            });
            toast.success('Message liked');
        } catch (error: any) {
            console.log(error);
            toast.error('Error liking message');
        }
    };

    const handleDislike = async () => {
        try {
            await dislike.mutateAsync({
                id: message.id!,
                user_id: user?.id!
            });
            toast.success('Message disliked');
        } catch (error: any) {
            console.log(error);
            toast.error('Error disliking message');
        }
    };

    const handleAddReply = () => {
        createMessage.mutate({
            content: replyContent,
            user_id: user?.id!,
            thread_id: id!,
            parent_message_id: message.id
        })
        setReplyContent('');
        setIsReplying(false);
    };

    const handleDelete = async () => {
        try {
            await removeMessage.mutateAsync(message.id!);
            toast.success('Message deleted');
        } catch (error: any) {
            console.log(error);
            toast.error('Error deleting message');
        }
    }

    useEffect(() => {
        if (createMessage.error) {
            toast.error('Error adding reply');
        }
        if (createMessage.isSuccess) {
            toast.success('Reply added');
        }
    }, [createMessage.error, createMessage.isSuccess])

    return (
        <div className="p-4 mb-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <img src={message.creator.profile_url ?? ""} alt="Creator" className="w-8 h-8 rounded-full" />
                    <h4 className="text-lg font-bold">{message.creator.name}</h4>
                </div>
                <p className="text-sm text-slate-500">{formatDate(message.creation_date)}</p>
            </div>
            <div className="mb-2">
                <p className="text-lg">{message.content}</p>
            </div>
            <div className="flex flex-wrap space-x-4 mt-4">
                <span className="flex items-center cursor-pointer" onClick={handleLike}>
                    {message.likes}
                    <ThumbsUp className="ml-1" />
                </span>
                <span className="flex items-center cursor-pointer" onClick={handleDislike}>
                    {message.dislikes}
                    <ThumbsDown className="ml-1" />
                </span>
                <span className="flex items-center cursor-pointer" onClick={() => setIsReplying(!isReplying)}>
                    Reply
                </span>
                <span className="flex items-center cursor-pointer" onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? <ChevronUp /> : <ChevronDown />}
                    {showReplies ? 'Hide Replies' : 'Show Replies'}
                </span>
                {user?.id === message.creator.id && (
                    <>
                        <Button name={'Edit'} variant={'classic'} />
                        <Button name={'Delete'} variant={'danger'} onClickHandler={handleDelete} />
                    </>
                )}
            </div>
            {isReplying && (
                <div className="mt-4">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your reply..."
                        disabled={createMessage.isPending}
                    />
                    <div className="flex justify-end space-x-4 mt-2">
                        <Button name={'Add Reply'} onClickHandler={handleAddReply} isLoading={createMessage.isPending} variant='primary' />
                        <Button name={'Cancel'} variant='danger' onClickHandler={() => setIsReplying(false)} />
                    </div>
                </div>
            )}
            {showReplies && children}
        </div>
    );
};

export {
    MessageComponent
}