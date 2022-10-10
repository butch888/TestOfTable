const db = require('../db')

class TicketController {
    async createTickets(req, res) {
        
        const {date, name, qty, distance} = req.body
       
        const newTickets = await db.query(
            `INSERT INTO tickets (date, name, qty, distance) values ($1, $2, $3, $4) RETURNING *`,
        [date, name, qty, distance])
        
        res.json(newTickets.rows[0])
    }
    async getTickets(req, res) {
        const ticketsAll = await db.query(`SELECT * FROM tickets`)
        res.json(ticketsAll.rows)
    }

    async deleteTickets(req, res) {
        const id = req.params.id
        const tickets = await db.query(`DELETE FROM tickets where id = $1`, [id])
        res.json(tickets.rows[0])
    }
}

module.exports = new TicketController()
