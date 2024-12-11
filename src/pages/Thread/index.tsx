import { getMessagesByThread, postMessage } from "@/api/messages/message.api"
import { getThread } from "@/api/thread/thread.api"
import { Button } from "@/components/Button"
import { MessageComponent } from "@/components/Message"
import { useAuthContext } from "@/context/Authorization"
import { MessageFindDto } from "@/domain/dto/message.dto"
import { hasRequiredRole, USER_ROLES } from "@/shared/global/user_roles.global"
import { AxiosError, HttpStatusCode } from "axios"
import { CirclePlus } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

class TreeMessage {
    public data?: MessageFindDto;
    public next: TreeMessage | null;
    public children: TreeMessage | null;

    constructor(data?: MessageFindDto) {
        this.data = data;
        this.next = null;
        this.children = null;
    }

    public addMessage(data: MessageFindDto) {
        if (!data.parent_message) {
            if (!this.data) this.data = data
            else if (!this.next) this.next = new TreeMessage(data)
            else this.next.addMessage(data)
        } else {
            if (!this.data) return
            else if (this.data.parent_message?.id == data.parent_message.id) {
                if (!this.next) this.next = new TreeMessage(data)
                else this.next.addMessage(data)
            }
            else if (this.data.id === data.parent_message.id) {
                if (!this.children) this.children = new TreeMessage(data)
                else this.children.addMessage(data)
            } else {
                if (this.next) this.next.addMessage(data)
                if (this.children) this.children.addMessage(data)
            }
        }
    }

    public render() {
        return (
            <div>
                {this.data && <MessageComponent message={this.data} children={this.children?.render()} />}
                {this.next && this.next.render()}
            </div>
        )
    }
}

export default function ThreadPage() {
    const { id } = useParams()
    const { user, removeToken } = useAuthContext()

    const threadApi = getThread(id as string)
    const messageApi = getMessagesByThread(id as string)
    const createMessageApi = postMessage()

    const [newMessage, setNewMessage] = useState('');
    const [isAddingMessage, setIsAddingMessage] = useState(false);
    const tree = new TreeMessage()

    useEffect(() => {
        if (messageApi.error) {
            const { status } = messageApi.error as AxiosError

            if (status == HttpStatusCode.Unauthorized) {
                removeToken()
                toast.error('Please, sign in again!');
            }
        }
    }, [threadApi.error, messageApi.error])

    if (threadApi.isLoading) return <div>Loading...</div>

    if (threadApi.error) return <div>Error thread: {threadApi.error.message}</div>

    if (!threadApi.data) return <div>Thread not found</div>

    const renderMessages = () => {
        if (messageApi.isLoading) return <div>Loading...</div>

        if (messageApi.error) return <div>Error message: {messageApi.error.message}</div>

        if (tree.data) return tree.render()

        messageApi.data?.forEach((message) => {
            tree.addMessage(message)
        })

        return tree.render()
    }

    const handleAddMessage = async () => {
        try {
            const res = await createMessageApi.mutateAsync({
                content: newMessage,
                user_id: user?.id!,
                thread_id: id!
            })
            toast.success('Message added successfully');
            setNewMessage('');
            setIsAddingMessage(false);

            console.log(res);
        } catch (error: any) {
            toast.error('Error adding message');
        }
    };

    return <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{threadApi.data.name}</h1>
        <p className="mb-8">{threadApi.data.description}</p>
        <div>
            {renderMessages()}
            {isAddingMessage ? (
                <div className="mt-4">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your message..."
                    />
                    <div className="flex justify-end space-x-4 mt-2">
                        <Button name={"Add Message"} onClickHandler={handleAddMessage} variant="primary" />
                        <Button name={"Cancel"} onClickHandler={() => setIsAddingMessage(false)} />
                    </div>
                </div>
            ) :
                <div className="flex justify-end mt-4">
                    {hasRequiredRole(user?.user_role.name as USER_ROLES, USER_ROLES.Trainee) && (
                        <Button
                            name={"Add Message"}
                            onClickHandler={() => setIsAddingMessage(true)}
                        >
                            <CirclePlus size={24} />
                        </Button>
                    )}
                </div>
            }
        </div>
    </section>
}