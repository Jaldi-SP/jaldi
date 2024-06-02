const express = require('express')
const customerRouter = express.Router()
const { v4: uuidv4 } = require('uuid')
customerRouter.use(express.urlencoded({ extended: true }));
const { TypedJSON } = require('typedjson')
const { Customer} = require('../dist/models/customer')
const { Business} = require('../dist/models/business')
const customerSerializer = new TypedJSON(Customer)
const businessSerializer = new TypedJSON(Business)
const { parsePhoneNumberFromString } = require('libphonenumber-js');

customerRouter.param("businessId", async (req, res, next, id) => {
  const { businessId } = req.params;
  const db = req.app.get('db');

  let business = await db.customer.getBusiness(businessId);
  business = business[0];

  if (!business) {
    return res.status(404).send('Business not found');
  }

  req.business = business;
  next();
})

customerRouter.route("/:businessId")
.get((req, res) => {
  res.status(200).send(req.business);
})
.post(async (req, res) => {
  
})

module.exports = customerRouter;