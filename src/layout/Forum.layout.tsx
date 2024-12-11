import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "@/components/Header";

export default function ForumLayout() {
    return <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow h-full">
            <Outlet />
        </main>
        <Footer />
    </div>
}