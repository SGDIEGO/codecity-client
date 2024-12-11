export interface PostMessageDto {
    content: string
    user_id: string
    parent_message_id?: string
    thread_id: string
}