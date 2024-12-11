export interface CreateForumDto {
    name: string;
    description: string;
}

export interface UpdateForumDto {
    forum_id: string;
    body: FormData;
}