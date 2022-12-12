const express = require('express')
const cors = require('cors')
require('dotenv').config({path:'.env'})

const PORT = process.env.PORT || 5000

const app = express()

// ROUTES
app.use('/api', require('./routes/index'))

// Enable cors
app.use(cors())


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))