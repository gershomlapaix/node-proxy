const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

// ENV vars
const {
    API_BASE_URL,
    API_KEY_NAME,
    API_KEY_VALUE
} = process.env

router.get('/', async (req, res) => {
    try {
        const urlQuery = {
            ...url.parse(req.url, true).query
        }
        const apiRes = await needle('get', `${API_BASE_URL}?q=${req.query?.q}&APPID=4afd3a389c79f0ce4d08cd986aab75cf`)
        const data = apiRes.body

        if (process.env.NODE_ENV != 'production') {
            console.log(`REQUEST: ${API_BASE_URL}`);
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

module.exports = router