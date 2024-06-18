const express = require('express');
const servicesRouter = express.Router();
const { v4: uuidv4 } = require('uuid');
const { TypedJSON } = require('typedjson');
const { Service } = require('../../dist/models/service'); 
const serviceSerializer = new TypedJSON(Service);

servicesRouter.use(express.urlencoded({ extended: true }));
servicesRouter.use(express.json());

servicesRouter
    .route('/')
    .get(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }
            const db = req.app.get('db');
            const services = await db.business.service.getService(user.id);

            res.status(200).send(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    })
    .post(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const service = serviceSerializer.parse(req.body);

            const db = req.app.get('db');
            const insertedService = await db.business.service.newService(
                uuidv4(),
                user.id,
                service.name,
                service.description,
                service.duration,
            );

            res.status(201).send(insertedService);
        } catch (error) {
            console.error('Error adding new service:', error);
            res.status(500).send('Internal Server Error');
        }
    })
    .put(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const service = serviceSerializer.parse(req.body);

            const db = req.app.get('db');
            const updatedService = await db.business.service.updateService(
                service.name,
                service.description,
                service.duration,
                service.id,
                user.id,
            );

            if (updatedService.length === 0) {
                return res.status(404).send('Service not found');
            }

            res.status(200).send(updatedService[0]);
        } catch (error) {
            console.error('Error updating service:', error);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }
            const service = serviceSerializer.parse(req.body);
            const db = req.app.get('db');
            const deletedService = await db.business.service.deleteService(
                service.id,
                user.id,
            );

            if (deletedService.length === 0) {
                return res.status(404).send('Service not found');
            }

            res.status(200).send('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service:', error);
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = servicesRouter;
