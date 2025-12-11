const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/db.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/book', require('./routes'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at  http://localhost:${PORT}`);
});
