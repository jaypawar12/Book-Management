import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black/40 backdrop-blur-md border-t border-white/5 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
                            BookStore
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Your personal sanctuary for infinite worlds. Discover, track, and manage your reading journey with elegant simplicity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/" className="hover:text-orange-500 transition-colors">Home</a></li>
                            <li><a href="/view-books" className="hover:text-orange-500 transition-colors">Library</a></li>
                            <li><a href="/add-book" className="hover:text-orange-500 transition-colors">Add Book</a></li>
                            <li><a href="/services" className="hover:text-orange-500 transition-colors">Services</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Made with</span>
                        <FaHeart className="text-orange-500 animate-pulse" />
                        <span>for Readers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
