const express = require('express')
const businessRouter = express.Router()

businessRouter.get('/', async(req, res) => {
    const { user } = req.session
    const db = req.app.get('db')
    if (user) {
        const users = await db.business.getCustomers(user.id)
        console.log(users)
        res.send(users).status(200)
    } else {
        res.sendStatus(401)
    }
})

module.exports = businessRouter