const express = require('express')
const businessRouter = express.Router()
const { v4: uuidv4 } = require('uuid')
businessRouter.use(express.urlencoded({ extended: true }));
const { TypedJSON } = require('typedjson')
const { Business } = require('../dist/models/business')
const { Customer} = require('../dist/models/customer')
const customerSerializer = new TypedJSON(Customer)

businessRouter
    .route('/')
    .get(async (req, res) => {
        const { user } = req.session
        const db = req.app.get('db')
        if (user) {
            const users = await db.business.getCustomers(user.id)
            console.log(users)
            const statusLists = {};
            Object.values(StatusEnum).forEach(status => {
                statusLists[status] = [];
            });
            for (const user of users) {
                const { status, customers } = user;
                if (statusLists[status]) {
                    statusLists[status] = customers;
                }
            }
            res.send(statusLists).status(200)
        } else {
            res.sendStatus(401)
        }
    })
    .post(async (req, res) => {
        const { user } = req.session
        const customer = customerSerializer.parse(req.body)
        if (!Object.values(StatusEnum).includes(customer.status)) {
            return res.status(400).send('Invalid status provided.')
        }
        const db = req.app.get('db')
        if (user) {
            let phoneExists = await db.business.getCustomerFromPhone(customer.phone_number, user.id)
            if (phoneExists.length !== 0) {
                return res
                    .status(409)
                    .send({ error: 'Phone number already exists' })
            }
            customer.id = uuidv4()
            try {
                let newUser = await db.business.newCustomer(
                    customer.id,
                    customer.first_name,
                    customer.last_name,
                    customer.phone_number,
                    customer.status,
                    user.id,
                )
                newUser = newUser[0]
                res.status(201).send(newUser)
            } catch (err) {
                res.sendStatus(500)
            }
        } else {
            res.status(401).send('Unauthorized')
        }
    })
    .put(async (req, res) => {
        const { user } = req.session
        const customer = customerSerializer.parse(req.body)
        if (!Object.values(StatusEnum).includes(customer.status)) {
            return res.status(400).send('Invalid status provided.')
        }
        const db = req.app.get('db')
        if (user) {
            try {
                let updatedCustomer = await db.business.updateCustomer(
                    customer.id,
                    customer.first_name,
                    customer.last_name,
                    customer.phone_number,
                    customer.status,
                    user.id,
                )
                if (updatedCustomer.length === 0) {
                    return res.status(404).send('Customer not found')
                }
                updatedCustomer = updatedCustomer[0]
                return res.status(200).send(updatedCustomer)
            } catch (err) {
                console.error('Error updating customer:', err)
                return res.sendStatus(500)
            }
        } else {
            return res.status(401).send('Unauthorized')
        }
    })
    .delete(async (req, res) => {
        const { user } = req.session
        const { customer_id } = req.body
        const db = req.app.get('db')
        if (user) {
            try {
                const deletedCustomer = await db.business.deleteCustomer(
                    customer_id,
                    user.id,
                )
                if (deletedCustomer.length === 0) {
                    return res.status(404).send('Customer not found')
                }
                return res.status(200).send('Customer deleted successfully')
            } catch (err) {
                console.error('Error deleting customer:', err)
                return res.sendStatus(500)
            }
        } else {
            return res.status(401).send('Unauthorized')
        }
    })

businessRouter.post('/notify', (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)
    const whatsappTo = addWhatsappPrefix(req.body.whatsappTo)
    const messageSid = process.env.TWILIO_MESSAGE_SID
    const contentSid = process.env.TWILIO_CONTENT_SID
    const { user } = req.session
    if (user) {
        try {
            client.messages
                .create({
                    from: messageSid,
                    contentSid: contentSid,
                    contentVariables: JSON.stringify({
                        1: user.name,
                        2: addTelPrefix(user.phone_number) || 'tel:+919903099090',
                    }),
                    to: whatsappTo,
                })
                .then((message) => console.log(message))
            res.sendStatus(200)
        } catch (err) {
            throw err
        }
    } else {
        return res.status(401).send('Unauthorized')
    }
})

businessRouter.post('/whatsappResponse', async (req, res) => {
    const { From, Body } = req.body;
    console.log(From, Body, " response")
    const customer_phone_number = removeWhatsappPrefix(From)
    console.log(customer_phone_number);
    const db = req.app.get('db')
    let result = await db.business.getPhone(customer_phone_number)
    if (result.length === 0) {
        return res.status(409).send({ error: 'Phone number does not exist' })
    }
    const customer = result[0]
    console.log(customer)
    const messageContent = Body
    if (messageContent === ResponseEnum.CANCEL) {
        let updatedCustomer = await db.business.updateCustomer(
            customer.id,
            customer.first_name,
            customer.last_name,
            customer.phone_number,
            StatusEnum.INACTIVE,
            customer.business_id,
        )
        if (updatedCustomer.length === 0) {
            return res.status(404).send('Customer not found')
        }
        updatedCustomer = updatedCustomer[0]
        return res.status(200).send(updatedCustomer)
    }
    res.sendStatus(200)
})

const ResponseEnum = {
    CONFIRM: 'Confirm',
    CANCEL: 'Cancel',
}
const StatusEnum = {
    WAITLIST: 'Waitlist',
    SERVING: 'Serving',
    COMPLETED: 'Completed',
    INACTIVE: 'Inactive',
}


const addWhatsappPrefix = (number) => `whatsapp:${number}`;
const addTelPrefix = (number) => `tel:${number}`;
const removeWhatsappPrefix = (number) => number.replace('whatsapp:', '');

module.exports = businessRouter
