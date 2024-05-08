var express = require('express');
var router = express.Router();
var businesses = require('../db/db')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { Customer, StatusEnum } = require('../db/customer'); 


/* GET businesses listing. */
router.get('/:businessId', function(req, res, next) {
  console.log('Received businessId:', req.params.businessId.toString());

  var foundBusiness = Object.values(businesses).find(business => business.id === req.params.businessId);

  if (foundBusiness) {
    res.send(foundBusiness);
  } else {
    res.status(404).send('Business not found');
  }
});

router.route('/:businessId/customer')
.post(function(req, res, next) {
  const { name, phone, status } = req.body;
  console.log(name, phone, status);
  if (!Object.values(StatusEnum).includes(status)) {
    return res.status(400).send('Invalid status provided.');
  }
  var business = Object.values(businesses).find(business => business.id === req.params.businessId);

  if (!business) {
    return res.status(404).send('Business not found.');
  }
  const newCustomer = new Customer(name, phone, status);
  business.customers.push(newCustomer);
  res.status(201).send(newCustomer);
  console.log(businesses);
})
.put() // edit customer
.delete() ; // delete customer


module.exports = router;
