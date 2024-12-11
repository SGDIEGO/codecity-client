export interface CreateThreadDto {
    threadDto?: CreateThreadBodyDto
    file?: File
}

interface CreateThreadBodyDto {
    name: string
    private: boolean
    access_price?: number
    forum_id: string
    user_id: string
}