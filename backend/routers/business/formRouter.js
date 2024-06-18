const express = require('express');
const formRouter = express.Router();
const { v4: uuidv4 } = require('uuid')

formRouter.use(express.urlencoded({ extended: true }));
formRouter.use(express.json());

formRouter
    .route('/')
    .get(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }
            const db = req.app.get('db');
            const formFields = await db.business.form.getFormFields(user.id);

            res.status(200).send(formFields);
        } catch (error) {
            console.error('Error fetching form fields:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    })
    .put(async (req, res) => {
        try {
            const { user } = req.session;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const { form_field_id, is_enabled } = req.body;
            const db = req.app.get('db');

            if (is_enabled) {
                await db.business.form.enableFormField(uuidv4(), user.id, form_field_id);
                res.status(200).send({ message: 'Form field enabled for the business' });
            } else {
                await db.business.form.disableFormField(user.id, form_field_id);
                res.status(200).send({ message: 'Form field disabled for the business' });
            }
        } catch (error) {
            console.error('Error updating form field status:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

module.exports = formRouter;
