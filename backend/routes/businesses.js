var express = require("express");
var router = express.Router();
var pool = require("../db/db");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
var hash = require("pbkdf2-password")();
const StatusEnum = require("../db/customer");
const { v4: uuidv4 } = require("uuid");
const { getCustomersByStatus, fetchUsersForBusiness } = require("../lib/utils");

router.param("businessId", async (req, res, next, businessId) => {
  console.log("Received businessId:", businessId);
  try {
    const business = await pool.query(
      "SELECT * FROM businesses WHERE id = $1",
      [businessId]
    );
    if (business.rows.length === 0) {
      return res.status(404).send("Business not found.");
    }
    req.business = business.rows[0];
    req.businessId = businessId;
    console.log("The business is " + req.business.toString());
    next();
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal server error");
  }
});

/* GET business. */
router.get("/:businessId", async function (req, res, next) {
  if (req.business) {
    try {
      // Fetch users associated with the business
      const users = await fetchUsersForBusiness(req.businessId);
      console.log(users);

      // Group users by their status
      const groupedCustomers = getCustomersByStatus(users);
      console.log(groupedCustomers);

      // Send the business details and the grouped users as a response
      res.status(200).json({
        business: req.business,
        customers: groupedCustomers,
      });
    } catch (error) {
      // Handle potential errors from the async operations
      console.error("Error processing business details:", error);
      res.status(500).send("Server error while processing request");
    }
  } else {
    // If no business found, send an appropriate response
    res.status(404).send("Business not found");
  }
});

/* POST business */
router.post("", async function (req, res, next) {
  try {
    const { name, username, password } = req.body;
    hash({ password: password }, async function (err, pass, salt, hash) {
      if (err) throw err;
      const sql =
        "INSERT INTO businesses (id, name, username, salt, hash) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const id = uuidv4();
      const values = [id, name, username, salt, hash];
      const newBusiness = await pool.query(sql, values);
      res.status(201).json(newBusiness.rows[0]);
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Error making new business");
  }
});

const customerRouter = require('../routes/customers');
router.use("/:businessId/customer", customerRouter);

module.exports = router;
