import { getLocal } from "@/shared/utils/localstorage"
import { instance } from "../axios"
import { CreateThreadDto } from "./dto"
import { GetThreadDto } from "./dto/GetThread.dto"
import { EditThreadDto } from "./dto/EditThread.dto"

export const getThreadsByForum = async (forumId: string): Promise<GetThreadDto[]> => {
    try {
        const response = await instance.get(`/forums/${forumId}/threads`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getThreadController = async (thread_id: string) => {
    try {
        const response = await instance.get(`/threads/${thread_id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const postThreadController = async ({ threadDto, file }: CreateThreadDto) => {
    try {
        const jwtToken = getLocal("token")
        const response = await instance.post(`/threads`, { threadDto, file }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}

export const patchThreadController = async ({ id, body }: EditThreadDto) => {
    try {
        const jwtToken = getLocal("token")
        const response = await instance.patch(`/threads/${id}`, body, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': `${body.get("file") ? 'multipart/form-data' : 'application/json'}`
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}