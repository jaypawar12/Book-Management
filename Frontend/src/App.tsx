import { useState } from "react";
import BookForm from "./Components/BookForm";
import BookTable from "./Components/BookTable";
import BookModal from "./Components/BookModel";
import { BookOpen, Settings, Bell, User, Search, DollarSign } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: string;
  year: number;
  isbn: string;
  status?: string;
  coverUrl?: string;
  description?: string;
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleView = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setFormOpen(true);
  };

  const handleDelete = (book: Book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      console.log("Delete book:", book);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-400">
                  BookHub Pro
                </h1>
                <p className="text-xs text-gray-400">Professional Library Management</p>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-orange-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Books</p>
                <p className="text-3xl font-bold text-white">1,247</p>
              </div>
              <div className="p-3 bg-primary-900/40 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <span className="text-sm text-green-400">↑ 12% from last month</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Borrowers</p>
                <p className="text-3xl font-bold text-white">342</p>
              </div>
              <div className="p-3 bg-blue-900/40 rounded-lg">
                <User className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-orange-300 bg-clip-text text-transparent">₹89,500</p>
              </div>
              <div className="p-3 bg-green-900/40 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            {formOpen ? (
              <BookForm
                book={selectedBook}
                onClose={() => {
                  setFormOpen(false);
                  setSelectedBook(null);
                }}
              />
            ) : (
              <div className="bg-gradient-to-br from-black to-gray-900 shadow-2xl rounded-2xl p-8 border border-primary-700/30 h-full">
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Add New Book</h3>
                  <p className="text-gray-400 mb-6">Start building your digital library</p>
                  <button
                    onClick={() => setFormOpen(true)}
                    className="btn-gradient w-full"
                  >
                    Create New Book
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Table */}
          <div className="lg:col-span-2">
            <BookTable
              openModal={() => setModalOpen(true)}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <BookModal
          book={selectedBook}
          onClose={() => {
            setModalOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
}