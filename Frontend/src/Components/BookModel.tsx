import React from "react";
import { X, Calendar, Hash, DollarSign, BookOpen, User, Tag } from "lucide-react";

interface BookModalProps {
    book?: {
        title?: string;
        author?: string;
        category?: string;
        price?: string;
        year?: number;
        isbn?: string;
        description?: string;
    } | null;
    onClose?: () => void;
}

interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string | number;
    children?: React.ReactNode;
}

export default function BookModal({ book, onClose }: BookModalProps) {
    const bookData = book || {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        price: "₹399",
        year: 2020,
        isbn: "978-9390166268",
        description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave."
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-primary-700/30 w-full max-w-2xl rounded-2xl shadow-2xl animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary-900/40 rounded-xl">
                                <BookOpen className="w-8 h-8 text-primary-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Book Details</h2>
                                <p className="text-gray-400 text-sm">Complete information about the book</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                    alt="Book cover"
                                    className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium">
                                        Bestseller
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">{bookData.title}</h3>
                                <p className="text-gray-300">{bookData.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <DetailItem icon={<User className="w-5 h-5" />} label="Author" value={bookData.author} />
                                    <DetailItem icon={<Tag className="w-5 h-5" />} label="Category" value={bookData.category} />
                                    <DetailItem icon={<Calendar className="w-5 h-5" />} label="Published" value={bookData.year} />
                                </div>
                                <div className="space-y-4">
                                    <DetailItem icon={<Hash className="w-5 h-5" />} label="ISBN" value={bookData.isbn} />
                                    <DetailItem icon={<DollarSign className="w-5 h-5" />} label="Price">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-orange-300 bg-clip-text text-transparent">
                                            {bookData.price}
                                        </span>
                                    </DetailItem>
                                    <div>
                                        <span className="text-gray-400 text-sm">Status</span>
                                        <span className="ml-3 px-3 py-1.5 bg-green-900/30 text-green-400 rounded-full text-sm font-medium">
                                            Available
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-800">
                                <div className="flex gap-3">
                                    <button className="btn-primary flex-1">
                                        Borrow Book
                                    </button>
                                    <button className="btn-outline flex-1">
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value, children }: DetailItemProps) {
    return (
        <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                {icon}
                <span>{label}</span>
            </div>
            {children || <p className="text-white font-medium">{value}</p>}
        </div>
    );
}