var hash = require('pbkdf2-password')()
var businesses = require('../db/db');

function authenticate(name, pass, fn) {
    let business = businesses[name];
    if (!business) return fn(null, null);
    hash({ password: pass, salt: business.salt }, function(err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === business.hash) return fn(null, business);
        fn(null, null);
    });
}

module.exports = authenticate;
