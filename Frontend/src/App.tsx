import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ViewBooks } from './pages/ViewBooks';
import { AddBook } from './pages/AddBook';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50/50 font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/view-books" element={<ViewBooks />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
