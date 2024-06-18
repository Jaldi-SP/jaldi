const express = require('express');
const resourceRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

resourceRouter.use(express.urlencoded({ extended: true }));
resourceRouter.use(express.json());

resourceRouter
    .route('/')
    .get(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.redirect('../');
            }
            const db = req.app.get('db');
            const resources = await db.resources.find({ business_id: user.id });

            res.status(200).send(resources);
        } catch (error) {
            console.error('Error fetching resources:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    })
    .post(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const { name, description } = req.body;
            const newResource = {
                id: uuidv4(),
                business_id: user.id,
                name,
                description
            };

            const db = req.app.get('db');
            const insertedResource = await db.resources.insert(newResource);

            res.status(201).send(insertedResource);
        } catch (error) {
            console.error('Error adding new resource:', error);
            res.status(500).send('Internal Server Error');
        }
    });

resourceRouter
    .route('/:id')
    .put(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const { id } = req.params;
            const { name, description } = req.body;

            const db = req.app.get('db');
            const updatedResource = await db.resources.update(
                { id, business_id: user.id },
                { $set: { name, description } }
            );

            if (updatedResource.length === 0) {
                return res.status(404).send('Resource not found');
            }

            res.status(200).send(updatedResource[0]);
        } catch (error) {
            console.error('Error updating resource:', error);
            res.status(500).send('Internal Server Error');
        }
    })
    .delete(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const { id } = req.params;

            const db = req.app.get('db');
            const deletedResource = await db.resources.remove({ id, business_id: user.id });

            if (deletedResource.length === 0) {
                return res.status(404).send('Resource not found');
            }

            res.status(200).send('Resource deleted successfully');
        } catch (error) {
            console.error('Error deleting resource:', error);
            res.status(500).send('Internal Server Error');
        }
    });

module.exports = resourceRouter;
