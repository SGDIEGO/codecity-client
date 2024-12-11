interface UserDto {
    id: string;
    name: string;
    email: string;
    profile_url: string | null
}

export interface MessageFindDto {
    id: string;
    content: string;
    creator: UserDto;
    likes: number;
    dislikes: number;
    creation_date: string;
    parent_message?: {
        id: string
    } | null;
}