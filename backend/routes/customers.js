var express = require("express");
var router = express.Router();
var pool = require("../db/db");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const StatusEnum = require("../db/customer");
const { v4: uuidv4 } = require("uuid");

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

router.param("customerId", async (req, res, next, customerId) => {
  console.log("Received customerId:", customerId);
  try {
    const customer = await pool.query("SELECT * FROM users WHERE id = $1", [
      customerId,
    ]);

    if (customer.rows.length === 0) {
      return res.status(404).send("Customer not found.");
    }

    req.customer = customer.rows[0];
    req.customerId = customerId;
    console.log("The customer is ", req.customer);
    next();
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Internal server error");
  }
});

router
  .route("/:customerId")
  .get(async function (req, res, next) {
    if (!req.customer) {
      return res.status(404).send("Customer not found.");
    }
    try {
      res.status(200).json({ customer: req.customer });
    } catch (err) {
      console.error("Error sending customer data:", err);
      res.status(500).send("Internal server error");
    }
  })
  .put(async function (req, res, next) {
    if (!req.customer) {
      return res.status(404).send("Customer not found.");
    }

    const { first_name, last_name, phone_number, status } = req.body;
    const fields = [];
    const values = [];
    if (first_name) {
      fields.push("first_name = $" + (fields.length + 1));
      values.push(first_name);
    }
    if (last_name) {
      fields.push("last_name = $" + (fields.length + 1));
      values.push(last_name);
    }
    if (phone_number) {
      fields.push("phone_number = $" + (fields.length + 1));
      values.push(phone_number);
    }
    if (status) {
      fields.push("status = $" + (fields.length + 1));
      values.push(status);
    }
    if (fields.length === 0) {
      return res.status(400).send("No valid fields provided for update.");
    }
    values.push(req.params.customerId);
    try {
      const sql = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${fields.length + 1}
        RETURNING *;
      `;

      const updatedUser = await pool.query(sql, values);
      if (updatedUser.rows.length === 0) {
        return res.status(404).send("No customer updated, check your input.");
      }
      res.status(200).json(updatedUser.rows[0]);
    } catch (err) {
      console.error("Error updating customer: ", err);
      res.status(500).send("Internal server error");
    }
  }) // edit customer
  .delete(async function (req, res, next) {
    if (!req.customer) {
      return res.status(404).send("Customer not found.");
    }

    try {
      const sql = "DELETE FROM users WHERE id = $1 RETURNING *;";
      const values = [req.customerId];

      const deletedUser = await pool.query(sql, values);

      if (deletedUser.rows.length === 0) {
        return res.status(404).send("No customer found or already deleted.");
      }
      res.status(200).json({
        message: "Customer successfully deleted",
        customer: deletedUser.rows[0],
      });
    } catch (err) {
      console.error("Error deleting customer: ", err);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
