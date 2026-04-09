import axios from 'axios';

const API_URL = 'http://localhost:5001/api/tickets';

/**
 * API service for tickets
 */
const ticketApi = {
    /**
     * Fetch all tickets
     */
    getTickets: async () => {
        const response = await axios.get(API_URL);
        return response.data.data;
    },

    /**
     * Create a new ticket
     */
    createTicket: async (ticketData) => {
        const response = await axios.post(API_URL, ticketData);
        return response.data.data;
    },

    /**
     * Update an existing ticket
     */
    updateTicket: async (id, updateData) => {
        const response = await axios.patch(`${API_URL}/${id}`, updateData);
        return response.data.data;
    }
};

export default ticketApi;
