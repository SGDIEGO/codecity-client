// src/components/AdminSidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`h-full bg-slate-800 text-slate-200 dark:bg-slate-900 dark:text-slate-300 ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300 overflow-hidden`}>
            <div className="p-4 flex justify-between items-center">
                {!isCollapsed && <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>}
                <button onClick={toggleSidebar} className="text-slate-200 dark:text-slate-300 focus:outline-none">
                    {isCollapsed ? <CircleChevronRight /> : <CircleChevronLeft />}
                </button>
            </div>
            <nav className="space-y-2">
                <Link to="/admin/forums" className={`block px-4 py-2 hover:bg-slate-700 rounded ${isCollapsed ? 'text-center' : ''}`}>
                    {!isCollapsed && 'Manage Forums'}
                </Link>
                <Link to="/admin/threads" className={`block px-4 py-2 hover:bg-slate-700 rounded ${isCollapsed ? 'text-center' : ''}`}>
                    {!isCollapsed && 'Manage Threads'}
                </Link>
                <Link to="/admin/messages" className={`block px-4 py-2 hover:bg-slate-700 rounded ${isCollapsed ? 'text-center' : ''}`}>
                    {!isCollapsed && 'Manage Messages'}
                </Link>
                <Link to="/admin/users" className={`block px-4 py-2 hover:bg-slate-700 rounded ${isCollapsed ? 'text-center' : ''}`}>
                    {!isCollapsed && 'Manage Users'}
                </Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;