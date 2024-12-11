import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MessageKey } from "./key"
import { deleteMessageController, dislikeMessageController, getMessagesByThreadController, likeMessageController, postMessageController } from "./message.controller"

export const getMessagesByThread = (thread_id: string) => {
    return useQuery({
        queryKey: [MessageKey.Message],
        queryFn: async () => { return await getMessagesByThreadController(thread_id) }
    })
}

export const postMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postMessageController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [MessageKey.Message]
            })
        }
    })
}

export const deleteMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteMessageController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [MessageKey.Message]
            })
        }
    })
}

export const likeMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: likeMessageController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [MessageKey.Message]
            })
        }
    })
}

export const dislikeMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: dislikeMessageController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [MessageKey.Message]
            })
        }
    })
}