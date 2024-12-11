import { getLocal } from "@/shared/utils/localstorage";
import { instance } from "../axios";
import { PostMessageDto } from "./dto";
import { InteractionMessageUserDto } from "./dto/interaction-message.dto";
import { MessageFindDto } from "@/domain/dto/message.dto";

export const getMessagesByThreadController = async (thread_id: string): Promise<MessageFindDto[]> => {
    try {
        const jwtToken = getLocal('token')
        const response = await instance.get(`/threads/${thread_id}/messages`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error;
    }
}

export const postMessageController = async (data: PostMessageDto) => {
    try {
        const jwtToken = getLocal('token')
        const response = await instance.post(`/messages`, data, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error;
    }
}

export const deleteMessageController = async (id: string) => {
    try {
        const jwtToken = getLocal('token')
        const response = await instance.delete(`/messages/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error;
    }
}

export const likeMessageController = async (data: InteractionMessageUserDto) => {
    try {
        const jwtToken = getLocal('token')
        const response = await instance.patch(`/messages/${data.id}/like`, data, {
            headers: {
                ' Authorization': `Bearer ${jwtToken}`
            }
        })
        return response.data
    }
    catch (error) {
        throw error;
    }
}

export const dislikeMessageController = async (data: InteractionMessageUserDto) => {
    try {
        const jwtToken = getLocal('token')
        const response = await instance.patch(`/messages/${data.id}/dislike`, data, {
            headers: {
                ' Authorization': `Bearer ${jwtToken}`
            }
        })
        return response.data
    }
    catch (error) {
        throw error;
    }
}