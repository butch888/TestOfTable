const Router = require('express')
const router = new Router()
const ticketController = require('../controller/tickets.controller')

router.post('/ticketsPost', ticketController.createTickets)
router.get('/ticketsGet', ticketController.getTickets)
router.delete('/tickets/:id', ticketController.deleteTickets)


module.exports = router