export interface Message {
    id: string
    content: string
    likes: number
    dislikes: number
    user_id: string
    thread_id: string
    parent_message_id?: string | null
}