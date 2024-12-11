import { UserInputCreate } from "../../domain/dto/user.dto"
import { instance } from "../axios"
import { getUserController } from "../user/user.controller"

export const signinController = async (body: UserInputCreate) => {
    try {
        const response = await instance.post('/auth/signin', body)
        const data = await response.data
        return await fetchUserDataMiddleware(data)
    } catch (error) {
        throw error.response.data
    }
}

export const signupController = async (body: UserInputCreate) => {
    try {
        const response = await instance.post('/auth/signup', body)
        const data = await response.data
        return await fetchUserDataMiddleware(data)
    } catch (error) {
        throw error.response.data
    }
}

export const oauthGoogleController = async () => {
    try {
        const response = await instance.get('/auth/google')
        const data = await response.data
        return await fetchUserDataMiddleware(data)
    } catch (error) {
        throw error.response.data
    }
}

const fetchUserDataMiddleware = async (authResponse: any) => {
    const userId = authResponse.id;
    if (!userId) {
        throw new Error("User ID not found in authentication response");
    }

    const userData = await getUserController(userId);

    return {
        ...authResponse,
        userData
    };
}