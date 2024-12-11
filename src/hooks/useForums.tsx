import { deleteForum, getForums, getThreads, postForumCreate, updateForum } from "../api/forums/forum.api"

export const useForumsMutation = () => {
    return getForums()
}

export const useCreateForumMutation = () => {
    return postForumCreate()
}

export const useUpdateForumMutation = () => {
    return updateForum()
}

export const useDeleteForumMutation = () => {
    return deleteForum()
}

export const useThreadsQuery = (forum_id: string) => {
    return getThreads(forum_id)
}