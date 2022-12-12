const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config({
    path: '.env'
})

const PORT = process.env.PORT || 5000

const app = express()

// Rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5
})

app.use(rateLimit)
app.set('trust-proxy', 1)

// ROUTES
app.use('/api', require('./routes/index'))

// Enable cors
app.use(cors())


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))