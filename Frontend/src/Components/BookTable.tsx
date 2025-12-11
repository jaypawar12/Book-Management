import { Eye, Edit2, Trash2, BookOpen, Plus } from "lucide-react";

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    price: string;
    year: number;
    isbn: string;
    status: string;
}

interface BookTableProps {
    openModal?: () => void;
    onEdit?: (book: Book) => void;
    onDelete?: (book: Book) => void;
    onView?: (book: Book) => void;
}

export default function BookTable({ openModal, onEdit, onDelete, onView }: BookTableProps) {
    const books = [
        { id: 1, title: "The Psychology of Money", author: "Morgan Housel", category: "Finance", price: "₹399", year: 2020, isbn: "978-9390166268", status: "available" },
        { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-Help", price: "₹499", year: 2018, isbn: "978-0735211292", status: "available" },
        { id: 3, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", price: "₹299", year: 1988, isbn: "978-0062315007", status: "borrowed" },
    ];

    return (
        <div className="bg-gradient-to-br from-black to-gray-900 shadow-2xl rounded-2xl p-8 border border-primary-700/30 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent flex items-center gap-3">
                        <BookOpen className="w-8 h-8" />
                        Book Collection
                    </h2>
                    <p className="text-gray-400 mt-2">Manage your library efficiently</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-4 py-2 bg-primary-900/50 text-primary-300 rounded-lg text-sm font-medium">
                        {books.length} Books
                    </span>
                    <button className="btn-gradient flex items-center gap-2 group">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Add Book
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
                            <th className="p-4 text-left text-primary-300 font-semibold">Title</th>
                            <th className="p-4 text-left text-primary-300 font-semibold">Author</th>
                            <th className="p-4 text-left text-primary-300 font-semibold">Category</th>
                            <th className="p-4 text-left text-primary-300 font-semibold">Price</th>
                            <th className="p-4 text-left text-primary-300 font-semibold">Status</th>
                            <th className="p-4 text-center text-primary-300 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className="border-b border-gray-800 hover:bg-gray-900/50 transition-all duration-200 group"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-md flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{book.title}</p>
                                            <p className="text-sm text-gray-400">ISBN: {book.isbn}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-white font-medium">{book.author}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 bg-primary-900/40 text-primary-300 rounded-full text-sm">
                                        {book.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-orange-300 bg-clip-text text-transparent">
                                        {book.price}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${book.status === 'available'
                                        ? 'bg-green-900/30 text-green-400'
                                        : 'bg-yellow-900/30 text-yellow-400'
                                        }`}>
                                        {book.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => onView?.(book)}
                                            className="p-2.5 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 hover:scale-110 transition-all duration-200 group/tooltip"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onEdit?.(book)}
                                            className="p-2.5 bg-primary-900/30 text-primary-400 rounded-lg hover:bg-primary-900/50 hover:scale-110 transition-all duration-200"
                                            title="Edit Book"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(book)}
                                            className="p-2.5 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 hover:scale-110 transition-all duration-200"
                                            title="Delete Book"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6 text-gray-400 text-sm">
                <div className="flex items-center gap-4">
                    <span>Showing {books.length} of {books.length} books</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-800 disabled:opacity-50" disabled>
                        ← Previous
                    </button>
                    <span className="px-3 py-1 bg-primary-900/40 rounded-lg">1</span>
                    <button className="p-2 rounded-lg hover:bg-gray-800">Next →</button>
                </div>
            </div>
        </div>
    );
}