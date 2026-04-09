const Ticket = require('../models/Ticket');

const ticketService = {
    /**
     * Get all tickets with optional status/priority filters
     */
    getAllTickets: async (filters = {}) => {
        const query = {};
        if (filters.status)   query.status   = filters.status;
        if (filters.priority) query.priority  = filters.priority;
        return await Ticket.find(query).sort({ createdAt: -1 });
    },

    /**
     * Create a new ticket
     */
    createTicket: async (ticketData) => {
        return await Ticket.create(ticketData);
    },

    /**
     * Update ticket by id
     */
    updateTicket: async (id, updateData) => {
        const ticket = await Ticket.findById(id);
        if (!ticket) throw new Error('Ticket not found');
        return await Ticket.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }
};

module.exports = ticketService;
