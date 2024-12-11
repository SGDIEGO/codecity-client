import { IThread } from "@/domain/models/thread.model"
import { IForum } from "../../domain/models/forum.model"
import { instance } from "../axios"
import { CreateForumDto, UpdateForumDto } from "./dto"
import { getLocal } from "@/shared/utils/localstorage"
export const getAllForums = async (): Promise<IForum[]> => {
    try {
        const response = await instance.get('/forums')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getThreadsByForum = async (forumId: string): Promise<IThread[]> => {
    try {
        const response = await instance.get(`/forums/${forumId}/threads`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const postForumCreateController = async (body: CreateForumDto) => {
    try {
        const yourJwtToken = getLocal("token")
        const response = await instance.post('/forums', body, {
            headers: {
                Authorization: `Bearer ${yourJwtToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateForumController = async ({ forum_id, body }: UpdateForumDto) => {
    try {
        const yourJwtToken = getLocal("token")
        const response = await instance.patch(`/forums/${forum_id}`, body, {
            headers: {
                Authorization: `Bearer ${yourJwtToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteForumController = async (forum_id: string) => {
    try {
        const yourJwtToken = getLocal("token")
        const response = await instance.delete(`/forums/${forum_id}`, {
            headers: {
                Authorization: `Bearer ${yourJwtToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}