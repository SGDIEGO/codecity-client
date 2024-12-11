import { z } from "zod"

export const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string().optional()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (!confirmPassword) return

    if (password != confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "The password did not match",
            path: ["confirmPassword"]
        })
    }
})