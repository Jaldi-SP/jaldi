var express = require("express");
var router = express.Router();
var pool = require("../db/db");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const StatusEnum = require("../db/customer");
const { v4: uuidv4 } = require("uuid");
const { getCustomersByStatus, fetchUsersForBusiness } = require("../lib/utils");

router.post("", async function (req, res, next) {
  try {
    const { first_name, last_name, phone_number, status } = req.body;
    console.log(first_name, last_name, phone_number, status);
    if (!Object.values(StatusEnum).includes(status)) {
      return res.status(400).send("Invalid status provided.");
    }
    const sql =
      "INSERT INTO users (id, first_name, last_name, phone_number, status, business_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const id = uuidv4();
    const values = [
      id,
      first_name,
      last_name,
      phone_number,
      status,
      req.businessId,
    ];
    const newUser = await pool.query(sql, values);
    res.status(201).send(newUser.rows[0]); 
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error making new customer");
  }
});

router
  .route("/:customerId")
  .put(async function (req, res, next) {
    try {
    } catch (err) {}
  }) // edit customer
  .delete(); // delete customer

module.exports = router;
