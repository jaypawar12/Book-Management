import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-orange-900/20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-[800px] w-[800px] animate-float rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] animate-float-slow rounded-full bg-gradient-to-r from-orange-600/5 to-orange-700/5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] animate-pulse-slow rounded-full bg-gradient-to-r from-orange-400/5 to-orange-500/5 blur-3xl"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Main Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                {/* Hero Section Container */}
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/20 overflow-hidden">
                    {/* Container Decorative Borders */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-orange-500/10 via-transparent to-orange-600/10"></div>

                    {/* Content Grid */}
                    <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 p-8 sm:p-12 lg:p-16">

                        {/* Left Column - Text Content */}
                        <div className="flex flex-col justify-center space-y-8 animate-fade-in">
                            {/* Badge */}
                            <div className="inline-flex">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                                    <span className="relative rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-sm font-semibold leading-6 text-white shadow-lg">
                                        📚 Books for everyone
                                    </span>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                                    <span className="block text-white animate-slide-up">
                                        A Sanctuary for
                                    </span>
                                    <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent animate-slide-up animation-delay-200">
                                        Book Lovers
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in animation-delay-300">
                                    Discover, manage, and explore a vast collection of books. Whether you are adding to your personal library or browsing for your next adventure, we have you covered.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
                                <NavLink to="/view-books" className="group relative flex-1">
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 opacity-75 blur transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg"></div>
                                    <Button
                                        size="lg"
                                        className="relative w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform group"
                                    >
                                        <span className="flex items-center justify-center gap-3 text-lg font-semibold">
                                            Explore Books
                                            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </Button>
                                </NavLink>

                                <NavLink to="/add-book" className="group relative flex-1">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="relative w-full h-14 bg-gray-800/50 backdrop-blur-sm border-2 border-orange-500/30 hover:border-orange-500 text-gray-200 hover:text-orange-300 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] transform shadow-lg hover:shadow-xl group"
                                    >
                                        <span className="flex items-center justify-center gap-3 text-lg font-semibold">
                                            Add to Collection
                                            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 rounded-2xl"></span>
                                    </Button>
                                </NavLink>
                            </div>

                            {/* Stats Container */}
                            <div className="grid grid-cols-2 gap-6 pt-8 animate-fade-in animation-delay-500">
                                {[
                                    { value: "10K+", label: "Books Collection", icon: "📚" },
                                    { value: "5K+", label: "Active Readers", icon: "👥" },
                                    { value: "24/7", label: "Access", icon: "⏰" },
                                    { value: "4.9", label: "Rating", icon: "⭐" }
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative animate-float-slow">
                            <div className="relative group">
                                {/* Floating Elements */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-tr from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>

                                {/* Image Frame */}
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10 z-10"></div>

                                    {/* Book Decorative Elements */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float border border-orange-500/20">
                                            <span className="text-2xl text-orange-400">📖</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 z-20">
                                        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float animation-delay-500 border border-orange-500/20">
                                            <span className="text-2xl text-orange-400">✨</span>
                                        </div>
                                    </div>

                                    {/* Main Image */}
                                    <img
                                        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                        alt="Bookshelf"
                                        className="w-full h-[500px] lg:h-[600px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Image Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
                                </div>
                            </div>

                            {/* Floating Quote */}
                            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-orange-500/20 animate-fade-in animation-delay-700 max-w-xs">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl text-orange-500">💭</div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 italic">
                                            "A room without books is like a body without a soul."
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">- Cicero</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Container Bottom Decoration */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: "🔍",
                            title: "Smart Search",
                            description: "Find exactly what you're looking for with our intelligent search system",
                            color: "from-orange-500/10 to-amber-500/10"
                        },
                        {
                            icon: "📊",
                            title: "Advanced Analytics",
                            description: "Track your reading habits and discover new preferences",
                            color: "from-orange-600/10 to-orange-700/10"
                        },
                        {
                            icon: "🔄",
                            title: "Sync Across Devices",
                            description: "Access your library anytime, anywhere on any device",
                            color: "from-amber-500/10 to-orange-600/10"
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="group relative"
                            style={{ animationDelay: `${800 + index * 100}ms` }}
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl cursor-pointer animate-fade-in">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 text-orange-400">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-12">
                    <div className="animate-bounce">
                        <div className="w-8 h-12 border-2 border-orange-500/30 rounded-full flex justify-center">
                            <div className="w-1.5 h-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mt-2 animate-scroll"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add these styles to your global CSS or Tailwind config */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(1deg); }
                    66% { transform: translateY(-5px) rotate(-1deg); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(50px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes scroll {
                    0% { 
                        transform: translateY(0); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(12px); 
                        opacity: 0; 
                    }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { 
                        opacity: 0.2; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.4; 
                        transform: scale(1.05); 
                    }
                }
                
                @keyframes glow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .animate-scroll {
                    animation: scroll 1.8s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
                
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
                
                .animation-delay-300 {
                    animation-delay: 300ms;
                }
                
                .animation-delay-400 {
                    animation-delay: 400ms;
                }
                
                .animation-delay-500 {
                    animation-delay: 500ms;
                }
                
                .animation-delay-700 {
                    animation-delay: 700ms;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1000ms;
                }
                
                .shadow-2xl {
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                
                .backdrop-blur-xl {
                    backdrop-filter: blur(12px);
                }
                
                .container {
                    max-width: 1280px;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 10px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #f97316, #ea580c);
                    border-radius: 5px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #ea580c, #c2410c);
                }
                
                /* Smooth transitions */
                * {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 300ms;
                }
            `}</style>
        </div>
    );
};