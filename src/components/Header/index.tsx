import { useState } from 'react';
import { Link } from 'react-router-dom';
import { XIcon, MenuIcon } from 'lucide-react';
import { useAuthContext } from '@/context/Authorization';
import { IconComponent } from '../Icon';

export default function Header() {
    const { user, removeToken } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const toggleSubMenu = (menu: string) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu);
    };

    return (
        <header className="bg-slate-800 text-slate-200 dark:bg-slate-900 dark:text-slate-300 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="text-xl font-bold">
                        <Link to={'/'}>CodeCity</Link>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <div className="relative">
                            <span
                                className="hover:text-slate-400 dark:hover:text-slate-500 cursor-pointer"
                                onClick={() => toggleSubMenu('forums')}
                            >
                                Forums
                            </span>
                            {openSubMenu === 'forums' && (
                                <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                    <Link to="/forums" className="block px-4 py-2">All</Link>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <span
                                className="hover:text-slate-400 dark:hover:text-slate-500 cursor-pointer"
                                onClick={() => toggleSubMenu('members')}
                            >
                                Members
                            </span>
                            {openSubMenu === 'members' && (
                                <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                    <Link to="/members" className="block px-4 py-2">All Members</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="hidden md:flex space-x-4 items-center">
                    {
                        !user ?
                            <>
                                <Link to="/signin" className="hover:text-slate-400 dark:hover:text-slate-500">Sign In</Link>
                                <Link to="/signup" className="hover:text-slate-400 dark:hover:text-slate-500">Sign Up</Link>
                            </> :
                            <>
                                <div className="relative">
                                    <div className="flex items-center cursor-pointer" onClick={() => toggleSubMenu('user')}>
                                        <IconComponent src={user.profile_url ?? ""} alt='User avatar' />
                                        <span>{user.name}</span>
                                    </div>
                                    {openSubMenu === 'user' && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                            <Link to={`/members/${user.id}`} className="block px-4 py-2">Profile</Link>
                                            <button onClick={removeToken} className="block w-full text-left px-4 py-2">Logout</button>
                                        </div>
                                    )}
                                </div>
                            </>
                    }
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-slate-400 dark:hover:text-slate-500 focus:outline-none">
                        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <nav className="md:hidden bg-slate-700 text-slate-200 shadow-md">
                    <div className="block px-4 py-2">
                        <span
                            className="cursor-pointer"
                            onClick={() => toggleSubMenu('forums')}
                        >
                            Forums
                        </span>
                        {openSubMenu === 'forums' && (
                            <div className="mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                <Link to="/forums" className="block px-4 py-2">All</Link>
                            </div>
                        )}
                    </div>
                    <div className="block px-4 py-2">
                        <span
                            className="cursor-pointer"
                            onClick={() => toggleSubMenu('members')}
                        >
                            Members
                        </span>
                        {openSubMenu === 'members' && (
                            <div className="mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                <Link to="/members" className="block px-4 py-2">All Members</Link>
                            </div>
                        )}
                    </div>
                    {user ? (
                        <div className="block px-4 py-2">
                            <div className="flex items-center cursor-pointer" onClick={() => toggleSubMenu('user')}>
                                <IconComponent src={user.profile_url ?? ""} alt='User avatar' />
                                <span>{user.name}</span>
                            </div>
                            {openSubMenu === 'user' && (
                                <div className="mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                                    <Link to={`/members/${user.id}`} className="block px-4 py-2">Profile</Link>
                                    <button onClick={removeToken} className="block w-full text-left px-4 py-2">Logout</button>
                                </div>
                            )}
                        </div>
                    )
                        :
                        <>
                            <div className="block px-4 py-2">
                                <Link to="/signin" className="hover:text-slate-400 dark:hover:text-slate-500">Sign In</Link>
                            </div>

                            <div className="block px-4 py-2">
                                <Link to="/signup" className="hover:text-slate-400 dark:hover:text-slate-500">Sign Up</Link>
                            </div>
                        </>
                    }
                </nav>
            )}
        </header>
    );
}