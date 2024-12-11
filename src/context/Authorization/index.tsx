import { createContext, useContext, useState } from "react";
import { getLocal, removeLocal, savelocal } from "../../shared/utils/localstorage";
import { jwtDecode } from "jwt-decode"
import { UserJwtPayload } from "@/domain/dto/user-jwt-payload.dto";

const enum Keys {
    TOKEN = 'token'
}

interface IAuthContext {
    user: UserJwtPayload | null,
    token: string | null,
    saveToken: (token: string) => void
    removeToken: () => void;
    updateUser: (updatedAttributes: Partial<UserJwtPayload>) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
    const [token, setToken] = useState(getLocal<string | null>('token'))
    const [user, setUser] = useState(token ? jwtDecode<UserJwtPayload>(token) : null)

    const removeToken = () => {
        removeLocal(Keys.TOKEN)
        setToken(null)
        setUser(null)
    }

    const saveToken = (token: string) => {
        savelocal(Keys.TOKEN, token)
        setToken(token)

        const user = jwtDecode<UserJwtPayload>(token)
        setUser(user)
    }

    const updateUser = (updatedAttributes: Partial<UserJwtPayload>) => {
        if (user) {
            const updatedUser = { ...user, ...updatedAttributes }
            setUser(updatedUser)
        }
    }

    return <AuthContext.Provider value={{ user, token, saveToken, removeToken, updateUser }}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
