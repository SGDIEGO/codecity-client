import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/Theme';
import { Moon, Sun } from 'lucide-react';

const Footer: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer className="bg-slate-800 text-slate-200 py-6 dark:bg-slate-900 dark:text-slate-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h2 className="text-2xl font-bold">CodeCity</h2>
                        <p className="text-slate-400 dark:text-slate-500">© 2024 CodeCity. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link to="/about" className="hover:text-slate-400 dark:hover:text-slate-500">About</Link>
                        <Link to="/contact" className="hover:text-slate-400 dark:hover:text-slate-500">Contact</Link>
                        <Link to="/privacy" className="hover:text-slate-400 dark:hover:text-slate-500">Privacy Policy</Link>
                        <button
                            onClick={toggleTheme}
                            className="ml-4 px-4 py-2 bg-slate-600 text-slate-200 rounded hover:bg-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                        >
                            {theme === 'light' ?
                                <Moon /> :
                                <Sun />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;