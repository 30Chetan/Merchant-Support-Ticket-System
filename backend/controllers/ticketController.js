const ticketService = require('../services/ticketService');

/**
 * @desc    Create new ticket
 * @route   POST /api/tickets
 */
const createTicket = async (req, res, next) => {
    try {
        const { subject, message, priority } = req.body;
        if (!subject || !message) {
            res.status(400);
            throw new Error('Please provide subject and message');
        }
        const ticket = await ticketService.createTicket({
            subject,
            message,
            priority: priority || 'Low'
        });
        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tickets (supports ?status= and ?priority= filters)
 * @route   GET /api/tickets
 */
const getTickets = async (req, res, next) => {
    try {
        const { status, priority } = req.query;
        const tickets = await ticketService.getAllTickets({ status, priority });
        res.status(200).json({ success: true, count: tickets.length, data: tickets });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update ticket status
 * @route   PATCH /api/tickets/:id
 */
const updateTicket = async (req, res, next) => {
    try {
        const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTicket, getTickets, updateTicket };
