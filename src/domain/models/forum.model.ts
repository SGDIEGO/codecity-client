interface UserDto {
    id: string;
    name: string;
    email: string;
}

interface PostDto {
    id: string;
    name: string;
    creation_date: string;
    user: UserDto;
}

export interface IForum {
    id: string;
    name: string;
    image_url?: string
    numberOfPosts: number;
    creator: UserDto;
    lastPost: PostDto | null;
}
