const express = require('express')
const cors = require('cors')
require('dotenv')

const PORT = process.env.PORT || 5000

const app = express()

app.get('/api', (req,res)=>{
    res.json
})

// Enable cors
app.use(cors())


app.listen(PORT, ()=> console.log(`The server is running on port ${PORT}`))