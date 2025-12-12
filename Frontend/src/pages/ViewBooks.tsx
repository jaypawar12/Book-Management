import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { fetchBooks, requestDeleteBook } from '../store/slices/bookSlice';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import type { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaSortAmountDown,
    FaPlus,
    FaBookOpen,
    FaFilter,
    FaTimes,
    FaEye,
    FaDollarSign,
    FaCalendar,
    FaUser,
    FaTag,
    FaBarcode
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const ViewBooks: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { books, loading, error } = useAppSelector((state) => state.books);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'title'>('newest');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleBookClick = (book: Book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleDeleteConfirm = async () => {
        if (selectedBook) {
            try {
                await dispatch(requestDeleteBook(selectedBook._id)).unwrap();
                toast.success('Book deleted successfully 📚');
                setSelectedBook(null);
                setIsDeleteModalOpen(false);
            } catch (err: any) {
                toast.error(err as string || 'Failed to delete book');
            }
        }
    };

    const handleUpdate = () => {
        if (selectedBook) {
            navigate('/add-book', { state: { book: selectedBook } });
        }
    };

    // Get unique categories for filtering
    const safeBooks = Array.isArray(books) ? books : [];
    const categories = [...new Set(safeBooks.map(book => book.category))];

    // Filter and Sort
    const filteredBooks = safeBooks
        .filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.category.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = activeFilter === 'all' || book.category === activeFilter;

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return b.publish_year - a.publish_year;
        });

    if (loading && safeBooks.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="relative inline-block">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                            <div className="relative flex flex-col items-center">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-lg opacity-20"></div>
                                    <div className="relative animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-orange-500"></div>
                                </div>
                                <p className="mt-6 text-gray-400 text-lg font-medium">Loading your library...</p>
                                <p className="text-gray-500 text-sm mt-2">Preparing your reading journey</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Error Loading Books</h2>
                            <p className="text-gray-400 mb-8">{error}</p>
                            <Button
                                onClick={() => dispatch(fetchBooks())}
                                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 shadow-lg hover:shadow-xl px-8 py-3"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Retry
                                </span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-[800px] w-[800px] animate-float rounded-full bg-gradient-to-r from-orange-500/5 to-amber-500/5 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-[700px] w-[700px] animate-float-slow rounded-full bg-gradient-to-r from-orange-600/3 to-red-500/3 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] animate-pulse-slow rounded-full bg-gradient-to-r from-orange-400/2 to-orange-500/2 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 shadow-2xl">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg">
                                            <FaBookOpen className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl font-bold text-white">Library Collection</h1>
                                            <p className="text-gray-400 mt-2">Explore your digital bookshelf</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-6">
                                        <div className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full border border-gray-700">
                                            <span className="text-white font-medium">{filteredBooks.length}</span>
                                            <span className="text-gray-400 ml-2">books</span>
                                        </div>
                                        <div className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full border border-gray-700">
                                            <span className="text-orange-400 font-medium">{categories.length}</span>
                                            <span className="text-gray-400 ml-2">categories</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => navigate('/add-book')}
                                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 shadow-lg hover:shadow-xl px-8 py-4 group"
                                >
                                    <span className="flex items-center gap-3 text-lg">
                                        <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                                        Add New Book
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters and Search Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 shadow-xl">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <FaSearch className="h-5 w-5 text-orange-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search books by title, author, or category..."
                                className="w-full pl-12 pr-10 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Category Filters */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <FaFilter className="h-5 w-5 text-orange-500" />
                                    <h3 className="text-lg font-semibold text-white">Categories</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setActiveFilter('all')}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === 'all'
                                            ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'}`}
                                    >
                                        All Books
                                    </button>
                                    {categories.slice(0, 6).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveFilter(category)}
                                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === category
                                                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="lg:w-64">
                                <div className="flex items-center gap-3 mb-4">
                                    <FaSortAmountDown className="h-5 w-5 text-orange-500" />
                                    <h3 className="text-lg font-semibold text-white">Sort By</h3>
                                </div>
                                <div className="relative">
                                    <select
                                        className="w-full pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 cursor-pointer"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="title">Title (A-Z)</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Books Grid */}
                <AnimatePresence>
                    {filteredBooks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-12 text-center shadow-2xl"
                        >
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-8 border border-orange-500/20 shadow-lg">
                                    <span className="text-4xl">📚</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {searchTerm || activeFilter !== 'all' ? 'No matching books found' : 'Your library is empty'}
                                </h3>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    {searchTerm || activeFilter !== 'all'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'Start building your collection by adding your first book!'}
                                </p>
                                <Button
                                    onClick={() => {
                                        navigate('/add-book');
                                        setSearchTerm('');
                                        setActiveFilter('all');
                                    }}
                                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 shadow-lg hover:shadow-xl px-8 py-4 group"
                                >
                                    <span className="flex items-center gap-3">
                                        <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                                        Add Your First Book
                                    </span>
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredBooks.map((book, index) => (
                                <motion.div
                                    key={book._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group relative"
                                >
                                    {/* Card Glow Effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                                        {/* Book Cover */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                            {book.cover_image ? (
                                                <img
                                                    src={book.cover_image}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <div className="text-center p-6">
                                                        <div className="text-5xl mb-2 text-gray-700">📖</div>
                                                        <p className="text-gray-600 text-sm">No Cover</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Price Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full text-white text-sm font-semibold shadow-lg">
                                                    ${book.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Book Info */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-400 transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                                                <FaUser className="h-3 w-3" />
                                                {book.author}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 flex items-center gap-1">
                                                        <FaTag className="h-3 w-3" />
                                                        {book.category}
                                                    </div>
                                                    <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 flex items-center gap-1">
                                                        <FaCalendar className="h-3 w-3" />
                                                        {book.publish_year}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleBookClick(book)}
                                                    className="p-2 bg-gray-800 text-gray-400 hover:bg-orange-600 hover:text-white rounded-lg transition-all duration-300 group-hover:scale-110"
                                                >
                                                    <FaEye className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Book Details Modal */}
                <Modal
                    isOpen={!!selectedBook}
                    onClose={handleCloseModal}
                    theme="dark"
                    maxWidth="max-w-4xl"
                >
                    {selectedBook && (
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Book Cover */}
                                <div className="lg:w-2/5">
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                                        {selectedBook.cover_image ? (
                                            <img
                                                src={selectedBook.cover_image}
                                                alt={selectedBook.title}
                                                className="relative w-full rounded-xl shadow-2xl object-cover border border-orange-500/20"
                                            />
                                        ) : (
                                            <div className="relative w-full aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-orange-500/20">
                                                <div className="text-center p-8">
                                                    <div className="text-6xl mb-4 text-orange-500/30">📚</div>
                                                    <p className="text-gray-500">No Cover Image</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Book Details */}
                                <div className="lg:w-3/5">
                                    <div className="mb-6">
                                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{selectedBook.title}</h2>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-orange-400">
                                                <FaUser className="h-4 w-4" />
                                                <span className="text-lg font-medium">{selectedBook.author}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg">
                                                    <FaTag className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Category</div>
                                                    <div className="text-white font-semibold">{selectedBook.category}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg">
                                                    <FaDollarSign className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Price</div>
                                                    <div className="text-white font-semibold text-xl">${selectedBook.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg">
                                                    <FaCalendar className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Publish Year</div>
                                                    <div className="text-white font-semibold">{selectedBook.publish_year}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg">
                                                    <FaBarcode className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">ISBN Number</div>
                                                    <div className="text-white font-semibold">{selectedBook.isbn_num}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-800">
                                        <Button
                                            variant="danger"
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-0 shadow-lg hover:shadow-xl group py-4"
                                        >
                                            <span className="flex items-center justify-center gap-3">
                                                <FaTrash className="group-hover:scale-110 transition-transform" />
                                                Delete Book
                                            </span>
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={handleUpdate}
                                            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-0 shadow-lg hover:shadow-xl group py-4"
                                        >
                                            <span className="flex items-center justify-center gap-3">
                                                <FaEdit className="group-hover:rotate-12 transition-transform" />
                                                Update Book
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="Confirm Delete"
                    theme="dark"
                    maxWidth="max-w-md"
                >
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                            <FaTrash className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Delete Book</h3>
                        <p className="text-gray-400 mb-8">
                            Are you sure you want to delete "<span className="text-white font-semibold">{selectedBook?.title}</span>"?
                            This action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300 py-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDeleteConfirm}
                                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-0 shadow-lg hover:shadow-xl py-3"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <FaTrash />
                                    Delete Permanently
                                </span>
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* Add these styles to your global CSS */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { 
                        opacity: 0.05; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.15; 
                        transform: scale(1.05); 
                    }
                }
                
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 10s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 6s ease-in-out infinite;
                }
                
                .container {
                    max-width: 1440px;
                }
                
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 10px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #0a0a0a;
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