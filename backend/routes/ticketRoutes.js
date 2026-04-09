const express = require('express');
const router = express.Router();
const { 
    createTicket, 
    getTickets, 
    updateTicket 
} = require('../controllers/ticketController');

// Route: /api/tickets
router.route('/')
    .post(createTicket)
    .get(getTickets);

// Route: /api/tickets/:id
router.route('/:id')
    .patch(updateTicket);

module.exports = router;
