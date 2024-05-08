var express = require('express');
var router = express.Router();
var businesses = require('../db/db')

/* GET businesses listing. */
router.get('/:businessId', function(req, res, next) {
  console.log('Received businessId:', req.params.businessId.toString());

  var foundBusiness = Object.values(businesses).find(business => business.id === req.params.businessId);

  if (foundBusiness) {
    res.send(foundBusiness.name);
  } else {
    res.status(404).send('Business not found');
  }
});

module.exports = router;
