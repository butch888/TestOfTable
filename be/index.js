const express = require('express')
const ticketRouter = require('./routes/tickets.routes')
const PORT = process.env.PORT || 3000
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api', ticketRouter)

app.listen(PORT, () => console.log(`PORT: ${PORT}`))