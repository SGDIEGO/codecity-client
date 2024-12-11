import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "../layout/App.layout"
import ForumLayout from "../layout/Forum.layout"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import Authenticate from "../pages/Authenticate"
import Forums from "../pages/Forums"
import ForumSingle from "../pages/Forums/Forum"
import NotFoundPage from "@/pages/Error/NotFound"
import PrivateRouter from "./Private.router"
import UserProfile from "@/pages/User"
import { USER_ROLES } from "@/shared/global/user_roles.global"
import ManageForums from "@/pages/AdminPage/ManageForums"
import ManageThreads from "@/pages/AdminPage/ManageThreads"
import ManageMessages from "@/pages/AdminPage/ManageMessages"
import ManageUsers from "@/pages/AdminPage/ManageUsers"
import AdminPage from "@/pages/AdminPage"
import ThreadPage from "@/pages/Thread"
import { Members } from "@/pages/Members"
import { SocketProvider } from "@/context/Socket"
import { MessageModal } from "@/components/MessageModal"

const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [{
        path: "/",
        element: <ForumLayout />,
        children: [{
            path: "/",
            element: <Home />,
        },
        {
            path: "signin",
            element: <Signin />
        },
        {
            path: "signup",
            element: <Signup />
        },
        {
            path: "authenticate",
            element: <Authenticate />
        },
        {
            path: "forums",
            element: <Forums />
        },
        {
            path: "forums/:forum_id/threads",
            element: <ForumSingle />
        },
        {
            path: "*",
            element: <NotFoundPage />
        },
        {
            element: <PrivateRouter />,
            children: [
                {
                    path: "members",
                    element: <SocketProvider>
                        <Members />
                    </SocketProvider>,
                    children: [{
                        path: "message",
                        element: <MessageModal />
                    }],
                },
                {
                    path: "members/:id",
                    element: <UserProfile />
                },
                {
                    path: "thread/:id",
                    element: <ThreadPage />
                }
            ]
        },
        ]
    }
    ],
},
])

export default () => {
    return <RouterProvider router={router} />
}