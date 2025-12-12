import React from 'react';
import { FaBook, FaPlus, FaSearch, FaMobileAlt, FaSyncAlt, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        name: 'Comprehensive Library',
        description: 'Access a wide range of books with detailed information including cover, author, and price.',
        icon: FaBook,
        gradient: 'from-orange-500 to-amber-500',
        delay: 0.1
    },
    {
        name: 'Easy Management',
        description: 'Add, update, and remove books from your collection with an intuitive interface.',
        icon: FaPlus,
        gradient: 'from-orange-600 to-red-500',
        delay: 0.2
    },
    {
        name: 'Quick Search',
        description: 'Find exactly what you are looking for with our fast and responsive search functionality.',
        icon: FaSearch,
        gradient: 'from-amber-500 to-orange-500',
        delay: 0.3
    },
    {
        name: 'Responsive Design',
        description: 'Enjoy a seamless experience on any device, from desktop to mobile.',
        icon: FaMobileAlt,
        gradient: 'from-orange-500 to-yellow-500',
        delay: 0.4
    },
    {
        name: 'Real-time Sync',
        description: 'Keep your library updated across all devices with automatic synchronization.',
        icon: FaSyncAlt,
        gradient: 'from-red-500 to-orange-500',
        delay: 0.5
    },
    {
        name: 'Advanced Analytics',
        description: 'Track your reading habits and get personalized recommendations.',
        icon: FaChartLine,
        gradient: 'from-orange-700 to-amber-600',
        delay: 0.6
    },
    {
        name: 'Community Features',
        description: 'Connect with other readers, share reviews, and discover new books together.',
        icon: FaUsers,
        gradient: 'from-amber-600 to-orange-500',
        delay: 0.7
    },
    {
        name: 'Secure Platform',
        description: 'Your data is protected with enterprise-grade security and privacy controls.',
        icon: FaShieldAlt,
        gradient: 'from-orange-500 to-red-600',
        delay: 0.8
    },
];

export const Services: React.FC = () => {
    return (
        <div className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-orange-900/20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] animate-float-slow rounded-full bg-gradient-to-r from-orange-600/10 to-red-500/10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] animate-pulse-slow rounded-full bg-gradient-to-r from-orange-400/5 to-orange-500/5 blur-3xl"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            {/* Main Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/20 p-8 sm:p-12 lg:p-16 mb-16">
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-orange-500/10 via-transparent to-orange-600/10"></div>

                    <div className="relative text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="inline-block"
                        >
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-600/20 to-amber-600/20 px-4 py-2 text-sm font-semibold leading-6 text-orange-300 ring-1 ring-inset ring-orange-500/30 shadow-sm">
                                <span className="mr-2">🚀</span>
                                Premium Features
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                        >
                            <span className="block text-white">Everything you need to</span>
                            <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent mt-2">
                                manage your books
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
                        >
                            Our platform is designed to make book management distinct, effortless, and enjoyable.
                            Experience the future of digital libraries with our comprehensive suite of features.
                        </motion.p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: feature.delay,
                                type: "spring",
                                stiffness: 100
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            {/* Card Background Glow */}
                            <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-20 blur transition-all duration-500 group-hover:opacity-30 group-hover:blur-xl`}></div>

                            {/* Main Card */}
                            <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-orange-500/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                                {/* Icon Container */}
                                <div className={`relative mb-6 inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                                        {feature.name}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-orange-500 group-hover:from-transparent group-hover:to-transparent transition-all duration-300 rounded-full"></div>

                                {/* Decorative Elements */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 rounded-3xl p-8 lg:p-12 border border-orange-500/20 backdrop-blur-sm"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { value: '99.9%', label: 'Uptime', icon: '⚡' },
                            { value: '10M+', label: 'Books Served', icon: '📚' },
                            { value: '50K+', label: 'Happy Readers', icon: '😊' },
                            { value: '<100ms', label: 'Search Speed', icon: '⚡' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <span className="text-xl">{stat.icon}</span>
                                    <span className="text-sm font-medium text-gray-400">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-12 overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to transform your book collection?
                            </h3>
                            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of readers who are already enjoying our premium features.
                                Start your journey today!
                            </p>
                            <button className="group inline-flex items-center justify-center gap-3 bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <span>Get Started Now</span>
                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Add these styles to your global CSS */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-15px) rotate(1deg); }
                    66% { transform: translateY(-8px) rotate(-1deg); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-25px); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { 
                        opacity: 0.1; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.3; 
                        transform: scale(1.05); 
                    }
                }
                
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 7s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 5s ease-in-out infinite;
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
                
                /* Smooth scroll reveal */
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .reveal-on-scroll.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};