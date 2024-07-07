require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

if (!CONNECTION_STRING) {
    throw new Error(
        'CONNECTION_STRING is not defined in the environment variables',
    );
}
if (!SESSION_SECRET) {
    throw new Error(
        'SESSION_SECRET is not defined in the environment variables',
    );
}

const app = express();

// // // // ROUTERS // // // //

const authRouter = require('./routers/authRouter.js');
const { businessRouter } = require('./routers/businessRouter.js');
const customerRouter = require('./routers/customerRouter.js');

// // // // MIDDLEWARES // // // //
app.use(express.static(`${__dirname}/../frontend/build`));

app.use(express.json());

app.use(morgan('dev'));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
);

const camelCaseToSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

const runSeedScript = async (db, directory) => {
    try {
        const checkTablesPath = path.join(directory, 'checkTables.sql');
        const checkTablesQuery = fs.readFileSync(checkTablesPath, 'utf-8');

        const result = await db.query(checkTablesQuery);
        const existingTables = result.map(row => row.table_name);

        const tableOrder = [
            'businesses',
            'customers',
            'form_fields',
            'form_submissions',
            'business_form_fields',
            'services',
            'resources',
            'appointments',
            'resource_availability',
            'resource_services',
            'resource_unavailability',
            'service_pricing'
        ];

        for (const tableName of tableOrder) {
            if (!existingTables.includes(tableName)) {
                const fileName = tableName.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
                const createQueryPath = path.join(directory, `create${fileName}.sql`);
                if (fs.existsSync(createQueryPath)) {
                    const createQuery = fs.readFileSync(createQueryPath, 'utf-8');
                    await db.query(createQuery);
                    console.log(`${tableName} table created successfully.`);
                } else {
                    console.log(`SQL file for creating ${tableName} table not found.`);
                }
            } else {
                console.log(`${tableName} table already exists.`);
            }
        }
    } catch (err) {
        console.error('Error running seed script:', err);
    }
};

// // // // DATABASE/SERVER SETUP // // // //

massive(CONNECTION_STRING)
    .then(async (db) => {
        app.set('db', db);
        console.log('Database Connected');

        const seedDirectory = path.join(__dirname, 'db', 'seed');
        await runSeedScript(db, seedDirectory);

        app.listen(SERVER_PORT, () => {
            console.log(`Server running on port ${SERVER_PORT}`);
        });

        const startCronJob = require('./dist/utils/moveToInactive.js');
        startCronJob(db);
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

// // // // ENDPOINTS // // // //

// // // // AUTH CONTROLLER // // // //
app.use(`/auth`, authRouter);
app.use(`/business`, businessRouter);
app.use(`/customer`, customerRouter);
// app.post(`/auth/register`, authController.register);
// app.post(`/auth/login`, authController.login);
// app.post(`/auth/logout`, authController.logout);
// app.get(`/auth/user`, authController.getUser);

// // // // BUSINESS INFO CONTROLLER // // //

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
