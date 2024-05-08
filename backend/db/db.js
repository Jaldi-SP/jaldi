var hash = require('pbkdf2-password')()

var businesses = {
  tj: { name: 'tj', password: 'foobar', id: '1' },
  sreyas: { name: 'sreyas', password: 'letmein', id: '2' }
};

Object.keys(businesses).forEach(function(business) {
  hash({ password: businesses[business].password }, function(err, pass, salt, hash) {
      if (err) throw err;
      // Store the salt and hash in the "db"
      businesses[business].salt = salt;
      businesses[business].hash = hash;
      delete businesses[business].password; // It's good practice to remove the plaintext password after hashing
  });
});

module.exports = businesses;