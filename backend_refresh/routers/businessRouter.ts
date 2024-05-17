const express = require('express')
const businessRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

businessRouter
    .route('/')
    .get(async (req, res) => {
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
    .post(async (req, res) => {
        const { user } = req.session
        const { first_name, last_name, phone_number, status } = req.body
        if (!Object.values(StatusEnum).includes(status)) {
            return res.status(400).send('Invalid status provided.')
        }
        const db = req.app.get('db')
        if (user) {
            let phoneExists = await db.business.getPhone(phone_number)
            if (phoneExists.length !== 0) {
                return res
                    .status(409)
                    .send({ error: 'Phone number already exists' })
            }
            const customer_id = uuidv4()
            try {
                let newUser = await db.business.newCustomer(
                    customer_id,
                    first_name,
                    last_name,
                    phone_number,
                    status,
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
        const { customer_id, first_name, last_name, phone_number, status } =
            req.body
        if (!Object.values(StatusEnum).includes(status)) {
            return res.status(400).send('Invalid status provided.')
        }
        const db = req.app.get('db')
        if (user) {
            try {
                let updatedCustomer = await db.business.updateCustomer(
                    customer_id,
                    first_name,
                    last_name,
                    phone_number,
                    status,
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
    const whatsappFrom = addWhatsappPrefix(process.env.TWILIO_PHONE)
    const { user } = req.session
    if (user) {
        try {
            client.messages
                .create({
                    from: whatsappFrom,
                    body: `${user.name} is ready for you. Please confirm, cancel, or call us. `,
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

const StatusEnum = {
    WAITLIST: 'Waitlist',
    SERVING: 'Serving',
    COMPLETED: 'Completed',
    INACTIVE: 'Inactive',
}

function addWhatsappPrefix(number) {
    return 'whatsapp:' + number
}

module.exports = businessRouter
