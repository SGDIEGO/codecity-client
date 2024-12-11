const OauthButton = () => {
    return <div className="flex justify-center items-center mt-4">
        <a href={`${import.meta.env.VITE_SERVER_ADDRESS}/auth/google`} className="px-4 py-2 bg-slate-300 rounded flex justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#4285F4" d="M24 9.5c3.9 0 7.1 1.4 9.5 3.6l7-7C35.8 2.5 30.3 0 24 0 14.6 0 6.9 5.4 3.2 13.2l8.3 6.5C13.3 13.1 18.2 9.5 24 9.5z" />
                <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3.1-2.4 5.7-5 7.4l8.3 6.5c4.8-4.4 7.6-10.9 7.6-18.4z" />
                <path fill="#FBBC05" d="M10.9 28.7c-1.1-3.1-1.1-6.5 0-9.6L2.6 12.6C-1.1 19.4-1.1 28.6 2.6 35.4l8.3-6.7z" />
                <path fill="#EA4335" d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-8.3-6.5c-2.3 1.5-5.2 2.4-8.2 2.4-5.8 0-10.7-3.6-12.5-8.6l-8.3 6.5C6.9 42.6 14.6 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span>Sign in with Google</span>
        </a>
    </div>
}

export {
    OauthButton
}