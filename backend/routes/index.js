const express = require('express');
var router = express.Router();
var authenticate = require('../lib/auth');
var restrict = require('../lib/restrict');

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, business){
    if (err) return next(err)
    if (business) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.business = business;
        req.session.success = 'Authenticated as ' + business.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        console.log(business.id);
        res.redirect(`/business/${business.id}`);
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});

module.exports = router;
