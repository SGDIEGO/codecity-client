import { getInteractions } from "./user.api"

export const usegetInteractions = (id: string) => {
    return getInteractions(id)
}