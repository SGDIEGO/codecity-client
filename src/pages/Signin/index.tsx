import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/Authorization";
import { useSignin } from "@/hooks/useAuth";
import { formSchema } from "@/shared/validations/zod";
import { z } from "zod";
import { InputForm } from "@/components/Input";
import { Button, OauthButton } from "@/components/Button";

export default function Signin() {
    const { saveToken } = useAuthContext();
    const signin = useSignin();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await signin.mutateAsync({
                email: values.email,
                password: values.password,
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (signin.isSuccess && signin.data) {
            toast.success("Sign in success!");
            saveToken(signin.data.token);
            navigate("/");
        }
    }, [signin.data]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white text-slate-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <InputForm name="email" label="Email" type="email" />
                        <InputForm name="password" label="Password" type="password" />
                        <Button
                            name="Sign In"
                            isLoading={signin.isPending}
                            type="submit"
                        />
                    </form>
                </FormProvider>
                <OauthButton />
                <div className="flex justify-center mt-4">
                    <Link to="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}