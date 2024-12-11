import { useAuthContext } from "@/context/Authorization"
import { USER_ROLES, hasRequiredRole } from "@/shared/global/user_roles.global"
import { Outlet } from "react-router-dom"

interface PrivateRouterProps {
    minimum_rol?: USER_ROLES
}

export default function PrivateRouter({ minimum_rol }: PrivateRouterProps) {
    const { user } = useAuthContext()

    if (!user) {
        window.location.href = '/signin'
    }

    if (minimum_rol && !hasRequiredRole(user?.user_role?.name as USER_ROLES, minimum_rol)) {
        return <h1>Unauthorized, you have not minimum rol required.</h1>
    }

    return <Outlet />
}