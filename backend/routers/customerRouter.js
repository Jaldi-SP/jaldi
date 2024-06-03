const express = require('express')
const customerRouter = express.Router()
const { v4: uuidv4 } = require('uuid')
customerRouter.use(express.urlencoded({ extended: true }))
const { TypedJSON } = require('typedjson')
const { Customer } = require('../dist/models/customer')
const { Business } = require('../dist/models/business')
const customerSerializer = new TypedJSON(Customer)
const businessSerializer = new TypedJSON(Business)
const { parsePhoneNumberFromString } = require('libphonenumber-js')
const {
    StatusEnum,
    initializeStatusLists,
} = require('../dist/utils/initializeStatusLists')

customerRouter.param('businessId', async (req, res, next, businessId) => {
    const db = req.app.get('db')
    try {
        let business = await db.customer.getBusiness(businessId)
        business = business[0]
        if (!business) {
            return res.status(404).send('Business not found')
        }
        req.business = business
        next()
    } catch (err) {
        console.error('Error getting business:', err)
        return res.status(500).send('Internal Server Error')
    }
})

customerRouter
    .route('/:businessId')
    .get(async (req, res) => {
        try {
            const { name, phone_number, email } = req.business
            const db = req.app.get('db')
            const users = await db.business.getCustomers(req.business.id)
            const statusLists = initializeStatusLists(users)
            const waitlistCustomers = statusLists[StatusEnum.WAITLIST]
            res.status(200).json({
                name,
                phone_number,
                email,
                People_waiting: waitlistCustomers.length,
            })
        } catch (error) {
            console.error('Error fetching business:', error)
            res.status(500).send({ error: 'Internal Server Error' })
        }
    })
    .post(async (req, res) => {
        try {
            const customer = customerSerializer.parse(req.body)

            customer.status = StatusEnum.WAITLIST

            const phoneNumber = parsePhoneNumberFromString(
                customer.phone_number,
                'IN',
            )
            if (
                !phoneNumber ||
                !phoneNumber.isValid() ||
                phoneNumber.country !== 'IN'
            ) {
                return res
                    .status(400)
                    .send(
                        'Invalid phone number. Ensure it is a valid Indian number.',
                    )
            }
            customer.phone_number = phoneNumber.format('E.164')

            const db = req.app.get('db')
            const customerExists = await db.business.getCustomerFromPhone(
                customer.phone_number,
                req.business.id,
            )
            if (customerExists.length !== 0) {
                const curCustomer = customerExists[0]
                if (
                    [StatusEnum.COMPLETED, StatusEnum.INACTIVE].includes(
                        curCustomer.status,
                    )
                ) {
                    let updatedCustomer = await db.business.updateCustomer(
                        curCustomer.id,
                        customer.first_name,
                        customer.last_name,
                        customer.phone_number,
                        StatusEnum.WAITLIST,
                        req.business.id,
                    )
                    updatedCustomer = updatedCustomer[0]
                    return res.status(200).send(updatedCustomer)
                }
                return res.status(409).send({
                    error: 'Customer already in waitlist or being served',
                })
            }

            customer.id = uuidv4()
            let newUser = await db.business.newCustomer(
                customer.id,
                customer.first_name,
                customer.last_name,
                customer.phone_number,
                customer.status,
                req.business.id,
            )
            newUser = newUser[0]

            res.status(201).send(newUser)
        } catch (err) {
            console.error('Error adding new customer:', err)
            res.status(500).send('Internal Server Error')
        }
    })

customerRouter.get('/:businessId/visits/:customerId', async (req, res) => {
    const { customerId } = req.params

    try {
        const db = req.app.get('db')
        const users = await db.business.getCustomers(req.business.id)

        const statusLists = initializeStatusLists(users)

        const waitlistCustomers = statusLists[StatusEnum.WAITLIST]

        const position = waitlistCustomers.findIndex(
            (customer) => customer.id === customerId,
        )

        if (position === -1) {
            return res
                .status(404)
                .send({ error: 'Customer not found in the waitlist' })
        }

        const { first_name, last_name, phone_number } =
            waitlistCustomers[position]

        res.status(200).send({
            customer: {
                first_name,
                last_name,
                phone_number,
                position: position + 1,
            },
        })
    } catch (error) {
        console.error('Error fetching customer position:', error)
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

module.exports = customerRouter
