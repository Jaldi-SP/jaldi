// // // // CONSTANTS // // // //

require('dotenv').config()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const express = require('express')
const session = require('express-session')
const massive = require('massive')

const app = express()

// // // // CONTROLLERS // // // //

const ac = require('./controllers/authcontroller')

// // // // MIDDLEWARES // // // //

app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
)

// // // // DATABASE/SERVER SETUP // // // //

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log('Database Connected')
    app.listen(SERVER_PORT, () => {
        console.log(`Magic at ${SERVER_PORT}`);
    })
})

// // // // ENDPOINTS // // // //

// // // // AUTH CONTROLLER // // // //

app.post(`/auth/register`, ac.register);
app.post(`/auth/login`, ac.login);
app.post(`/auth/logout`, ac.logout);
app.get(`/auth/user`, ac.getUser);

// // // // INFO CONTROLLER // // // // 