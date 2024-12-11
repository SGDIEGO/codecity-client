import { twMerge } from "tailwind-merge";
import { State } from "../../context/Notification/reducers/useShow";

interface NotificationProperties {
    state: State
}

export default function Notification({state}: NotificationProperties) {
    const baseClass = "absolute border rounded-lg top-0 right-0 p-5"

    const mergeClass = (): string => {
        switch (state.type) {
            case "error":
                return twMerge(baseClass, "bg-yellow-500")
            case "warning":
                return twMerge(baseClass, "")
            default:
                return twMerge(baseClass, "bg-white")
        }
    }

    return <div className={mergeClass()}>
        <span>{state.message}</span>
    </div>
}