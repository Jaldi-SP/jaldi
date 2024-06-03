require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

if (!CONNECTION_STRING) {
    throw new Error(
        'CONNECTION_STRING is not defined in the environment variables',
    )
}
if (!SESSION_SECRET) {
    throw new Error(
        'SESSION_SECRET is not defined in the environment variables',
    )
}

const app = express()

// // // // ROUTERS // // // //

const authRouter = require('./routers/authRouter.js')
const { businessRouter } = require('./routers/businessRouter.js')
const customerRouter = require('./routers/customerRouter.js')

// // // // MIDDLEWARES // // // //
app.use(express.static(`${__dirname}/../frontend/build`))

app.use(express.json())

app.use(morgan('dev'))

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
)

app.get('/', (req, res) => {
    res.sendStatus(200)
}) // health check

const runSeedScript = async (db) => {
    try {
        const checkTablesPath = path.join(
            __dirname,
            'db',
            'seed',
            'checkTables.sql',
        )
        const checkTablesQuery = fs.readFileSync(checkTablesPath, 'utf-8')

        const createBusinessesPath = path.join(
            __dirname,
            'db',
            'seed',
            'createBusinesses.sql',
        )
        const createCustomersPath = path.join(
            __dirname,
            'db',
            'seed',
            'createCustomers.sql',
        )

        const result = await db.query(checkTablesQuery)
        const { businesses_exists, customers_exists } = result[0]

        if (!businesses_exists) {
            const createBusinessesQuery = fs.readFileSync(
                createBusinessesPath,
                'utf-8',
            )
            await db.query(createBusinessesQuery)
            console.log('Businesses table created successfully.')
        } else {
            console.log('Businesses table already exists.')
        }

        if (!customers_exists) {
            const createCustomersQuery = fs.readFileSync(
                createCustomersPath,
                'utf-8',
            )
            await db.query(createCustomersQuery)
            console.log('Customers table created successfully.')
        } else {
            console.log('Customers table already exists.')
        }
    } catch (err) {
        console.error('Error running seed script:', err)
    }
}

// // // // DATABASE/SERVER SETUP // // // //

massive(CONNECTION_STRING)
    .then(async (db) => {
        app.set('db', db)
        console.log('Database Connected')

        await runSeedScript(db)

        app.listen(SERVER_PORT, () => {
            console.log(`Server running on port ${SERVER_PORT}`)
        })

        const startCronJob = require('./dist/utils/moveToInactive.js')
        startCronJob(db)
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err)
    })

// // // // ENDPOINTS // // // //

// // // // AUTH CONTROLLER // // // //
app.use(`/auth`, authRouter)
app.use(`/business`, businessRouter)
app.use(`/customer`, customerRouter)
// app.post(`/auth/register`, authController.register);
// app.post(`/auth/login`, authController.login);
// app.post(`/auth/logout`, authController.logout);
// app.get(`/auth/user`, authController.getUser);

// // // // BUSINESS INFO CONTROLLER // // //
