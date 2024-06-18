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

const runSeedScript = async (db, tables) => {
    try {
        const checkTablesPath = path.join(__dirname, 'db', 'seed', 'checkTables.sql');
        const checkTablesQuery = fs.readFileSync(checkTablesPath, 'utf-8');

        const result = await db.query(checkTablesQuery);
        console.log(result[0]);
        if (!result || !result[0]) {
            throw new Error('Unexpected result structure from database query');
        }
        const tableStatus = result[0];

        for (const table of tables) {
            const { name, createQueryPath } = table;

            if (!tableStatus[`${name}_exists`]) {
                const createQuery = fs.readFileSync(createQueryPath, 'utf-8');
                await db.query(createQuery);
                console.log(`${name} table created successfully.`);
            } else {
                console.log(`${name} table already exists.`);
            }
        }
    } catch (err) {
        console.error('Error running seed script:', err);
    }
};

// Define tables with paths to create queries
const tables = [
    {
        name: 'businesses',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createBusinesses.sql')
    },
    {
        name: 'customers',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createCustomers.sql')
    },
    {
        name: 'form_fields',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createFormFields.sql')
    },
    {
        name: 'form_submissions',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createFormSubmissions.sql')
    },
    {
        name: 'business_form_fields',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createBusinessFormFields.sql')
    },
    {
        name: 'resources',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createResources.sql')
    },
    {
        name: 'services',
        createQueryPath: path.join(__dirname, 'db', 'seed', 'createServices.sql')
    },
];

// // // // DATABASE/SERVER SETUP // // // //

massive(CONNECTION_STRING)
    .then(async (db) => {
        app.set('db', db)
        console.log('Database Connected')

        await runSeedScript(db, tables)

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})
