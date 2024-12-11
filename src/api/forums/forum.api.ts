import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteForumController, getAllForums, getThreadsByForum, postForumCreateController, updateForumController } from "./forum.controller";
import { Keys } from "./keys";

export const getForums = () => {
    return useQuery({
        queryKey: [Keys.Forum],
        queryFn: async () => { return await getAllForums() },
    })
}

export const updateForum = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateForumController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Keys.Forum]
            })
        },
    })
}

export const deleteForum = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteForumController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Keys.Forum]
            })
        },
    })
}

export const getThreads = (forumId: string) => {
    return useQuery({
        queryKey: [Keys.ThreadsbyForum],
        queryFn: async () => { return await getThreadsByForum(forumId) },
    })
}

export const postForumCreate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postForumCreateController,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [Keys.Forum]
            })
        },
    })
}