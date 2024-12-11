import { OauthGoogle, Signin, Signup } from "../api/auth/auth.api"

export const useSignin = () => {
    return Signin()
}

export const useSignup = () => {
    return Signup()
}

export const useOauthGoogle = () => {
    return OauthGoogle()
}