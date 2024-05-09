var hash = require("pbkdf2-password")();
var { Customer, StatusEnum } = require("./customer");

var businesses = {
  tj: {
    name: "tj",
    password: "foobar",
    id: "1",
    customers: [
      new Customer("Alice", "123-456-7890", StatusEnum.WAITLIST),
      new Customer("Charlie", "321-654-9870", StatusEnum.SERVING),
      new Customer("Bob", "987-654-3210", StatusEnum.COMPLETED),
      new Customer("Dave", "555-432-1100", StatusEnum.INACTIVE),
    ],
  },
  sreyas: {
    name: "sreyas",
    password: "letmein",
    id: "2",
    customers: [
      new Customer("Bob", "987-654-3210", StatusEnum.COMPLETED),
      new Customer("Dave", "555-432-1100", StatusEnum.INACTIVE),
    ],
  },
};

Object.keys(businesses).forEach(function (business) {
  hash(
    { password: businesses[business].password },
    function (err, pass, salt, hash) {
      if (err) throw err;
      // Store the salt and hash in the "db"
      businesses[business].salt = salt;
      businesses[business].hash = hash;
      delete businesses[business].password; // It's good practice to remove the plaintext password after hashing
    }
  );
});

module.exports = businesses;
