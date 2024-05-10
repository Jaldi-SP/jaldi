var pool = require("../db/db");
const StatusEnum = require("../db/customer");

function getCustomersByStatus(customers) {
  // Initialize an object to hold arrays for each status
  const customerGroups = {
    waitlistCustomers: [],
    servingCustomers: [],
    completedCustomers: [],
    inactiveCustomers: []
  };

  // Iterate over each customer and categorize them based on their status
  customers.forEach(customer => {
    switch (customer.status) {
      case StatusEnum.WAITLIST:
        customerGroups.waitlistCustomers.push(customer);
        break;
      case StatusEnum.SERVING:
        customerGroups.servingCustomers.push(customer);
        break;
      case StatusEnum.COMPLETED:
        customerGroups.completedCustomers.push(customer);
        break;
      case StatusEnum.INACTIVE:
        customerGroups.inactiveCustomers.push(customer);
        break;
      default:
        console.log(`Unknown status: ${customer.status}`);
    }
  });

  // Return the object containing arrays for each status category
  return customerGroups;
}

async function fetchUsersForBusiness(businessId) {
  try {
    const users = await pool.query('SELECT * FROM users WHERE business_id = $1', [businessId]);
    console.log("The customers for the business are" + users.rows);
    return users.rows;
  } catch (err) {
    console.error("Database error while fetching users:", err);
    throw err; // Rethrow and let the caller handle the error
  }
}

module.exports = {getCustomersByStatus, fetchUsersForBusiness};