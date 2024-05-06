var hash = require('pbkdf2-password')()

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});

function authenticate(name, pass, fn) {
    let user = users[name];
    if (!user) return fn(null, null);
    hash({ password: pass, salt: user.salt }, function(err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user);
        fn(null, null);
    });
}

module.exports = authenticate;
