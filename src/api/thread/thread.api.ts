import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getThreadController, getThreadsByForum, patchThreadController, postThreadController } from "./thread.controller"

const enum Keys {
    Thread = 'Thread',
}

export const getThread = (thread_id: string) => {
    return useQuery({
        queryKey: [Keys.Thread],
        queryFn: async () => { return await getThreadController(thread_id) },
    })
}

export const getThreads = (forumId: string) => {
    return useQuery({
        queryKey: [Keys.Thread],
        queryFn: async () => { return await getThreadsByForum(forumId) },
    })
}

export const postThread = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postThreadController,
        onSuccess: () => {
            {
                queryClient.invalidateQueries({
                    queryKey: [Keys.Thread]
                })
            }
        }
    })
}

export const patchThread = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: patchThreadController,
        onSuccess: () => {
            {
                queryClient.invalidateQueries({
                    queryKey: [Keys.Thread]
                })
            }
        }
    })
}