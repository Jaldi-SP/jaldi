const express = require('express')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { TypedJSON } = require('typedjson')
const { Business } = require('../dist/models/business')

const authRouter = express.Router()

const serializer = new TypedJSON(Business)

authRouter.post('/register', async (req, res) => {
    const business = serializer.parse(req.body)
    const { session } = req
    const db = req.app.get('db')

    const usernameCheck = await db.auth.getUsernames(business.username)

    if (usernameCheck.length !== 0) {
        return res.status(409).send('Username Already Taken')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(business.password, salt)

    business.id = uuidv4()
    console.log(business);
    let newBusiness = await db.auth.register([
        business.id,
        business.name, 
        business.username, 
        hash,
        business.phone_number || null
    ])
    newBusiness = newBusiness[0]

    delete newBusiness.password
    delete business.password
    session.user = { ...newBusiness }

    res.status(201).send(session.user)
})

authRouter.post('/login', async (req, res) => {
    const business = serializer.parse(req.body)
    const db = req.app.get('db')
    const { session } = req

    let user = await db.auth.getUsernames(business.username)
    user = user[0]

    if (!user) {
        return res.status(404).send('Username does not exist')
    }

    const foundUser = bcrypt.compareSync(business.password, user.password)

    if (foundUser) {
        delete user.password
        delete business.password
        session.user = {...user}
        return res.status(200).send(session.user)
    } else {
        return res.status(401).send('*Incorrect Password! Try Again')
    }
})

authRouter.post('/logout', (req, res) => {
    try {
        req.session.destroy()
        res.sendStatus(200)
    } catch (err) {
        console.log({err})
    }
})

authRouter.get('/getUser', (req, res) => {
    const { user } = req.session
    if (user) {
        res.status(200).send(user)
    } else {
        res.sendStatus(401)
    }
})

module.exports = authRouter