import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="px-4 py-2 bg-slate-500 dark:bg-slate-300 text-white dark:text-slate-700 rounded">Go to Home</Link>
        </div>
    );
}