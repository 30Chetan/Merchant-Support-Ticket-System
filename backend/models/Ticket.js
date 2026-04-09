const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    priority: {
        type: String,
        required: [true, 'Please select priority'],
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status: {
        type: String,
        required: [true, 'Please select status'],
        enum: ['NEW', 'INVESTIGATING', 'RESOLVED'],
        default: 'NEW'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
