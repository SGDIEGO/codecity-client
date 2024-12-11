// src/pages/AdminPage.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSideBar';

const AdminPage: React.FC = () => {
    return (
        <div className="flex h-full">
            <AdminSidebar />
            <div className="flex-grow p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;