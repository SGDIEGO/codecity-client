interface UserDto {
    id: string;
    name: string;
    email: string;
}

interface MessageDto {
    id: string;
    content: string;
    creation_date: string;
    user: UserDto;
}

export interface IThread {
    id: string;
    name: string;
    creation_date: string;
    creator: UserDto;
    image_url: string | null;
    numberOfMessages: number;
    lastMessage: MessageDto | null;
    private: boolean;
}