import { Outlet } from "react-router-dom";
// import { NotificationContextProvider } from "../context/Notification";
import { AuthContextProvider } from "../context/Authorization";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/context/Theme";

export default function AppLayout() {
    return <ThemeProvider>
        <AuthContextProvider>
            <div className="min-h-screen bg-slate-200 dark:bg-slate-500">
                <Outlet />
                <ToastContainer />
            </div>
        </AuthContextProvider>
    </ThemeProvider>
}