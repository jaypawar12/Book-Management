import { useState } from "react";
import { Save, X, Upload, Book, PenTool as Tool } from "lucide-react";

interface BookFormProps {
    book?: {
        title?: string;
        author?: string;
        category?: string;
        year?: string | number;
        isbn?: string;
        price?: string | number;
        coverUrl?: string;
        description?: string;
    } | null;
    onClose?: () => void;
}

export default function BookForm({ book, onClose }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: book?.title || "",
        author: book?.author || "",
        category: book?.category || "",
        year: book?.year || "",
        isbn: book?.isbn || "",
        price: book?.price || "",
        coverUrl: book?.coverUrl || "",
        description: book?.description || ""
    });

    const categories = [
        "Fiction", "Non-Fiction", "Science", "Technology",
        "Business", "Biography", "Self-Help", "Fantasy"
    ];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        onClose?.();
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gradient-to-br from-black to-gray-900 shadow-2xl rounded-2xl p-8 border border-primary-700/30 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl">
                        <Tool className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {book ? "Edit Book" : "Add New Book"}
                        </h2>
                        <p className="text-gray-400">Fill in the details below</p>
                    </div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Book Title <span className="text-primary-500">*</span>
                        </label>
                        <div className="relative">
                            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="Enter book title"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Author <span className="text-primary-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Author name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Publish Year
                        </label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="2024"
                            min="1900"
                            max="2024"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            ISBN Number
                        </label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="978-3-16-148410-0"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="499"
                            min="0"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Cover Image URL
                        </label>
                        <div className="relative">
                            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="url"
                                name="coverUrl"
                                value={formData.coverUrl}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="https://example.com/book-cover.jpg"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="input-field"
                            placeholder="Brief description about the book..."
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button
                        type="submit"
                        className="btn-gradient flex items-center gap-2 flex-1 justify-center"
                    >
                        <Save className="w-5 h-5" />
                        {book ? "Update Book" : "Save Book"}
                    </button>
                    <button
                        type="reset"
                        className="btn-outline flex-1"
                        onClick={() => setFormData({
                            title: "", author: "", category: "", year: "",
                            isbn: "", price: "", coverUrl: "", description: ""
                        })}
                    >
                        Clear All
                    </button>
                </div>
            </form>
        </div>
    );
}