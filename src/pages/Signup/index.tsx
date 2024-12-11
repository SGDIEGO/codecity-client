import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/Authorization";
import { useSignup } from "@/hooks/useAuth";
import { formSchema } from "@/shared/validations/zod";
import { InputForm } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Signup() {
    const { saveToken } = useAuthContext();
    const signup = useSignup();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await signup.mutateAsync({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });
        } catch (error: any) {
            toast.error(JSON.stringify(error.message))
        }
    };

    useEffect(() => {
        if (signup.isSuccess && signup.data) {
            toast.success("Sign up success!");
            saveToken(signup.data.token);
            navigate("/");
        }
    }, [signup.data, saveToken, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white text-slate-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <InputForm name="name" label="Name" />
                        <InputForm name="email" label="Email" type="email" />
                        <InputForm name="password" label="Password" type="password" />
                        <InputForm name="confirmPassword" label="Confirm Password" type="password" />
                        <Button name={"Sign Up"} isLoading={signup.isPending} type="submit" />
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}