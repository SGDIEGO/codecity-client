import { postThread } from "@/api/thread/thread.api"

export const useCreateThreadMutation = () => {
    return postThread()
}