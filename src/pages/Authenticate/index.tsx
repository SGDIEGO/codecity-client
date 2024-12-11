import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/Authorization";
import { toast } from "react-toastify";

export default function Authenticate() {
    const navigate = useNavigate()
    const { saveToken } = useAuthContext()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token')
        if (!token) {
            toast('Invalid token')
            return
        }
        saveToken(token)
        navigate("/", {
            relative: "path"
        })
    }, [])

    return <div>
        <h1>Authenticated</h1>
    </div>
}