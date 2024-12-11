import { createContext, useContext } from "react";
import { State, useShowNotification } from "./reducers/useShow";

interface INotificationContext {
    state: State
    showNotification: (payload: any) => void
}

const NotificationContext = createContext<INotificationContext>({} as INotificationContext)

export const NotificationContextProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useShowNotification({
        show: false
    })

    const showNotification = (payload: State) => {
        dispatch({
            type: "show",
            payload
        })

        const hideNot = setTimeout(() => {
            dispatch({
                type: "hide"
            })

            clearTimeout(hideNot)
        }, 4000)
    }

    return <NotificationContext.Provider value={{ state, showNotification }}>
        {children}
    </NotificationContext.Provider>
}

export const useNotificationContext = () => {
    return useContext(NotificationContext)
}