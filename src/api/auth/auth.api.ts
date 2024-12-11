import { useMutation } from "@tanstack/react-query"
import { oauthGoogleController, signinController, signupController } from "./auth.controller"

export const Signin = () => {
    return useMutation({
        mutationFn: signinController,
    })
}

export const Signup = () => {
    return useMutation({
        mutationFn: signupController,
    })
}

export const OauthGoogle = () => {
    return useMutation({
        mutationFn: oauthGoogleController
    })
}