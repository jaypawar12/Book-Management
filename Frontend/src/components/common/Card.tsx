import React from 'react';
import type { Book } from '../../types/book';

interface CardProps {
    book: Book;
    onClick: (book: Book) => void;
}

export const Card: React.FC<CardProps> = ({ book, onClick }) => {
    return (
        <div
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onClick(book)}
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                {book.cover_image ? (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <span>No Cover</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium truncate w-full">View Details</p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {book.category}
                    </span>
                    <span className="text-sm font-bold text-gray-900">${book.price.toFixed(2)}</span>
                </div>

                <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {book.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
            </div>
        </div>
    );
};
