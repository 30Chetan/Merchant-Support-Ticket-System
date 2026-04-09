require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// API Routes
app.use('/api/tickets', ticketRoutes);

// Default Route
app.get('/', (req, res) => {
    res.json({ message: 'Support Ticket System API is running...' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
