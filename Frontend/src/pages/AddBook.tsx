import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../utils/hooks';
import { requestAddBook, requestUpdateBook } from '../store/slices/bookSlice';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import type { Book } from '../types/book';
import { toast } from 'react-hot-toast';
import { FaCloudUploadAlt, FaArrowLeft, FaBook, FaUserEdit, FaTag, FaDollarSign, FaCalendarAlt, FaBarcode, FaImage } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationState {
    book?: Book;
}

interface FormErrors {
    title?: string;
    author?: string;
    category?: string;
    price?: string;
    publish_year?: string;
    isbn_num?: string;
    cover_image?: string;
}

export const AddBook: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const state = location.state as LocationState;
    const isEditMode = !!state?.book;

    const [formData, setFormData] = useState<Omit<Book, '_id' | 'cover_image' | 'created_at' | 'updated_at'>>({
        title: '',
        author: '',
        category: '',
        price: 0,
        publish_year: new Date().getFullYear(),
        isbn_num: 0,
    });

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isEditMode && state.book) {
            const { _id, cover_image, ...rest } = state.book;
            setFormData(rest);
            if (cover_image) {
                setPreviewImage(cover_image);
            }
        }
    }, [isEditMode, state]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        const currentYear = new Date().getFullYear();

        if (!formData.title || formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters.';
        if (!formData.author) newErrors.author = 'Author is required.';
        if (!formData.category) newErrors.category = 'Category is required.';
        if (formData.price <= 0) newErrors.price = 'Price must be a positive number.';
        if (formData.publish_year < 1900 || formData.publish_year > currentYear) {
            newErrors.publish_year = `Year must be between 1900 and ${currentYear}.`;
        }
        if (!formData.isbn_num || formData.isbn_num <= 0) newErrors.isbn_num = 'Valid ISBN number is required.';
        if (!isEditMode && !coverImage) {
            newErrors.cover_image = 'Cover image is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setCoverImage(file);
                setPreviewImage(URL.createObjectURL(file));
                setErrors(prev => ({ ...prev, cover_image: undefined }));
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Please upload an image file');
            }
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);
            setPreviewImage(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, cover_image: undefined }));
            toast.success('Image uploaded successfully!');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            if (isEditMode && state.book) {
                await dispatch(requestUpdateBook({
                    id: state.book._id,
                    book: formData,
                    coverImage: coverImage
                })).unwrap();
                toast.success('Book updated successfully! 🎉');
            } else {
                await dispatch(requestAddBook({
                    book: formData,
                    coverImage: coverImage!
                })).unwrap();
                toast.success('Book added successfully! 📚');
            }
            navigate('/view-books');
        } catch (err: any) {
            toast.error(typeof err === 'string' ? err : 'Operation failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900/20 py-8">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-[600px] w-[600px] animate-float rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] animate-float-slow rounded-full bg-gradient-to-r from-orange-600/5 to-orange-700/5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] animate-pulse-slow rounded-full bg-gradient-to-r from-orange-400/5 to-orange-500/5 blur-3xl"></div>
            </div>

            {/* Main Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                {isEditMode ? 'Update Book' : 'Add New Book'}
                            </h1>
                            <p className="text-gray-300 mt-2">
                                {isEditMode
                                    ? 'Update the book details below'
                                    : 'Fill in the details to add a new book to your collection'
                                }
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 text-gray-300 hover:text-orange-400 border-gray-700 hover:border-orange-500"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Books
                        </Button>
                    </div>
                </motion.div>

                {/* Main Form Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative"
                >
                    {/* Container Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 via-orange-500/20 to-orange-400/20 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-500/20 overflow-hidden">
                        {/* Header Decoration */}
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <FaBook className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        Book Information
                                    </h2>
                                    <p className="text-orange-100 mt-1">
                                        {isEditMode ? 'Edit book details' : 'Enter new book details'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                            {/* Book Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Input
                                        label="Book Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        error={errors.title}
                                        placeholder="The Great Gatsby"
                                        icon={FaBook}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Input
                                        label="Author Name"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        error={errors.author}
                                        placeholder="F. Scott Fitzgerald"
                                        icon={FaUserEdit}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Input
                                        label="Category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        error={errors.category}
                                        placeholder="Fiction, Action, etc."
                                        icon={FaTag}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <Input
                                        label="ISBN Number"
                                        name="isbn_num"
                                        type="number"
                                        value={formData.isbn_num || ''}
                                        onChange={handleInputChange}
                                        error={errors.isbn_num}
                                        placeholder="9783161484100"
                                        icon={FaBarcode}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Input
                                        label="Price ($)"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        error={errors.price}
                                        icon={FaDollarSign}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <Input
                                        label="Publish Year"
                                        name="publish_year"
                                        type="number"
                                        value={formData.publish_year}
                                        onChange={handleInputChange}
                                        error={errors.publish_year}
                                        icon={FaCalendarAlt}
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                                        theme="dark"
                                    />
                                </motion.div>
                            </div>

                            {/* Cover Image Upload Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-orange-500/20 p-6"
                            >
                                <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <FaImage className="text-orange-500" />
                                    Book Cover Image
                                </label>

                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative rounded-xl border-2 border-dashed ${isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700'} transition-all duration-300 overflow-hidden group cursor-pointer`}
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    <AnimatePresence>
                                        {previewImage ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="relative"
                                            >
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <FaCloudUploadAlt className="mx-auto h-10 w-10 text-white mb-2" />
                                                        <span className="text-white font-medium">Click to change image</span>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCoverImage(null);
                                                        setPreviewImage(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                                                    title="Remove Image"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-12 px-6"
                                            >
                                                <div className="relative mx-auto w-20 h-20 mb-4">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                                                    <FaCloudUploadAlt className="relative h-20 w-20 text-gray-500 mx-auto" />
                                                </div>
                                                <p className="text-gray-300 font-medium">
                                                    Drag & drop your cover image here
                                                </p>
                                                <p className="text-gray-400 text-sm mt-2">
                                                    or click to browse files
                                                </p>
                                                <p className="text-gray-500 text-xs mt-4">
                                                    Supports: PNG, JPG, GIF • Max: 10MB
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <input
                                        id="file-upload"
                                        name="cover_image"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>

                                <AnimatePresence>
                                    {errors.cover_image && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-2 text-sm text-orange-400 flex items-center gap-2"
                                        >
                                            ⚠️ {errors.cover_image}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                className="pt-6 border-t border-gray-800"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                        className="w-full sm:w-auto border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        isLoading={isSubmitting}
                                        className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-xl group border-0"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            {isEditMode ? (
                                                <>
                                                    Update Book
                                                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </>
                                            ) : (
                                                <>
                                                    Add Book
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {[
                        {
                            icon: '📚',
                            title: 'High-quality Images',
                            desc: 'Use clear, high-resolution cover images for better presentation',
                            color: 'from-orange-500/10 to-orange-600/10'
                        },
                        {
                            icon: '✍️',
                            title: 'Accurate Details',
                            desc: 'Ensure all book details are accurate and up-to-date',
                            color: 'from-orange-600/10 to-orange-700/10'
                        },
                        {
                            icon: '🔍',
                            title: 'ISBN Validation',
                            desc: 'Double-check ISBN numbers for accuracy',
                            color: 'from-orange-700/10 to-orange-800/10'
                        }
                    ].map((tip, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${tip.color} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-orange-500/10 hover:border-orange-500/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{tip.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-white">{tip.title}</h4>
                                        <p className="text-sm text-gray-400">{tip.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
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
                        opacity: 0.1; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.3; 
                        transform: scale(1.05); 
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
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
                    background: #f97316;
                    border-radius: 5px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #ea580c;
                }
                
                /* Smooth input transitions */
                input, textarea, select {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                input:focus, textarea:focus, select:focus {
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};