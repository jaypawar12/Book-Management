# 📚 Book Management System - Backend

The robust backend RESTful API for the Book Management System, built with Node.js, Express, and MongoDB. It handles data persistence, file uploads, and business logic for the application.

## 🚀 Features

- **RESTful API:** Standardized endpoints for Create, Read, Update, and Delete (CRUD) operations.
- **Database Integration:** Connects to MongoDB using Mongoose for schema-based modeling.
- **Media Handling:** Supports image uploads for book covers using `multer` and `cloudinary`.
- **Search & Filter:** Efficient query handling for searching and filtering books.
- **Error Handling:** Centralized error handling and standardized JSON responses.
- **CORS Enabled:** Configured to work seamlessly with the React frontend.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Image Storage:** [Cloudinary](https://cloudinary.com/) (optional/configurable)
- **File Uploads:** [Multer](https://github.com/expressjs/multer)
- **Environment config:** [Dotenv](https://github.com/motdotla/dotenv)

## 📋 API Endpoints

### Books

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Get all books (supports query params) |
| `GET` | `/api/books/:id` | Get a specific book by ID |
| `POST` | `/api/books` | Create a new book (requires form-data for image) |
| `PUT` | `/api/books/:id` | Update an existing book |
| `DELETE` | `/api/books/:id` | Delete a book |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas connection string)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the server:
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:8000`.

## 📂 Project Structure

```
src/
├── config/         # Database and third-party configs
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares (upload, error handlers)
├── models/         # Mongoose schemas
├── routes/         # API Route definitions
└── utils/          # Helper functions (API response formatter)
```

## 📄 License

Distributed under the MIT License.
