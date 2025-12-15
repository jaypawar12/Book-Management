import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookReader, FaBars, FaTimes } from 'react-icons/fa';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Add Book', path: '/add-book' },
        { name: 'View Books', path: '/view-books' },
    ];

    return (
        <nav className="bg-black/40 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-500/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <FaBookReader className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight group-hover:text-orange-400 transition-colors">
                                BookStore
                            </span>
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-8 md:flex md:items-center md:space-x-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-white'
                                        : 'text-gray-300 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                                        )}
                                        <span className={`absolute inset-0 bg-white/5 rounded-xl scale-95 opacity-0 transition-all duration-300 ${!isActive && 'group-hover:scale-100 group-hover:opacity-100'}`}></span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                        <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all duration-300">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors"
                        >
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-gray-900/95 backdrop-blur-xl border-b border-orange-500/10 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="px-4 py-6 space-y-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/5 text-orange-400 border border-orange-500/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
