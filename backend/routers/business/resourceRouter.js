const express = require('express')
const resourceRouter = express.Router()
const { v4: uuidv4 } = require('uuid')
const { TypedJSON } = require('typedjson')
const { Resource } = require('../../dist/models/resource') // Ensure the path is correct
const resourceSerializer = new TypedJSON(Resource)

resourceRouter.use(express.urlencoded({ extended: true }))
resourceRouter.use(express.json())

resourceRouter
    .route('/')
    .get(async (req, res) => {
        try {
            const { user } = req.session
            if (!user) {
                return res.status(401).send('Unauthorized')
            }
            const db = req.app.get('db')
            const resources = await db.business.resource.getResource(user.id)

            res.status(200).send(resources)
        } catch (error) {
            console.error('Error fetching resources:', error)
            res.status(500).send({ error: 'Internal Server Error' })
        }
    })
    .post(async (req, res) => {
        try {
            const { user } = req.session
            if (!user) {
                return res.status(401).send('Unauthorized')
            }

            const resource = resourceSerializer.parse(req.body)

            const db = req.app.get('db')
            const insertedResource = await db.business.resource.newResource(
                uuidv4(),
                user.id,
                resource.name,
                resource.description,
            )

            res.status(201).send(insertedResource)
        } catch (error) {
            console.error('Error adding new resource:', error)
            res.status(500).send('Internal Server Error')
        }
    })
    .put(async (req, res) => {
        try {
            const { user } = req.session
            if (!user) {
                return res.status(401).send('Unauthorized')
            }

            const resource = resourceSerializer.parse(req.body)

            const db = req.app.get('db')
            const updatedResource = await db.business.resource.updateResource(
                resource.name,
                resource.description,
                resource.id,
                user.id,
            )

            if (updatedResource.length === 0) {
                return res.status(404).send('Resource not found')
            }

            res.status(200).send(updatedResource[0])
        } catch (error) {
            console.error('Error updating resource:', error)
            res.status(500).send('Internal Server Error')
        }
    })
    .delete(async (req, res) => {
        try {
            const { user } = req.session
            if (!user) {
                return res.status(401).send('Unauthorized')
            }
            const resource = resourceSerializer.parse(req.body)

            const db = req.app.get('db')
            const deletedResource = await db.business.resource.deleteResource(
                resource.id,
                user.id,
            )

            if (deletedResource.length === 0) {
                return res.status(404).send('Resource not found')
            }

            res.status(200).send('Resource deleted successfully')
        } catch (error) {
            console.error('Error deleting resource:', error)
            res.status(500).send('Internal Server Error')
        }
    })

module.exports = resourceRouter
