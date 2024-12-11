import { useMutation, useQuery } from "@tanstack/react-query"
import { getUserController, getInteractionsController, updateProfileImageController, getAllUserController } from "./user.controller"
import { UserDto } from "./dto/user.dto"

const enum Keys {
    Users = 'users',
    User = 'user',
}

export const getAllUser = () => {
    return useQuery({
        queryKey: [Keys.Users],
        queryFn: async () => { return await getAllUserController() },
    })
}

export const getUser = (user_id: string) => {
    return useQuery({
        queryKey: [Keys.User],
        queryFn: async (): Promise<UserDto> => { return await getUserController(user_id) },
    })
}

export const getInteractions = (user_id: string) => {
    return useQuery({
        queryKey: [Keys.User],
        queryFn: async () => { return await getInteractionsController(user_id) },
    })
}

export const updateProfileImage = () => {
    return useMutation({
        mutationFn: updateProfileImageController,
    })
}