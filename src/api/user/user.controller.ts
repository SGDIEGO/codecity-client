import { getLocal } from "@/shared/utils/localstorage"
import { instance } from "../axios"
import { UserDto } from "./dto/user.dto"

export const getAllUserController = async (): Promise<UserDto[]> => {
    try {
        const token = getLocal('token')
        const response = await instance.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserController = async (user_id: string) => {
    try {
        const token = getLocal('token')
        const response = await instance.get(`/users/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getInteractionsController = async (user_id: string) => {
    try {
        const response = await instance.get(`/users/${user_id}/interactions`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateProfileImageController = async ({ user_id, formdata }: {
    user_id: string, formdata: FormData
}) => {
    try {
        const token = getLocal('token')
        const response = await instance.patch(`/users/${user_id}`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}