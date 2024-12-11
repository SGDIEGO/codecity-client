import { useReducer } from "react";

export type NotificationType = "default" | "error" | "warning"

export interface State {
    show: boolean
    message?: string
    type?: NotificationType
}

interface Action {
    type: 'show' | 'hide'
    payload?: any
}

const reducer = (state: State, action: any) => {
    switch (action.type) {
        case 'show':
            return {
                show: true,
                type: action.payload!.type,
                message: action.payload!.message
            }
        case 'hide':
            return {
                show: false,
                type: undefined,
                message: undefined
            }
        default:
            return state
    }
}

export const useShowNotification = (state: State) => {
    return useReducer(reducer, state)
}

export type interfaceShowNotification = [boolean, React.Dispatch<Action>]