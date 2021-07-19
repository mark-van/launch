const express = require('express'),
    User = require('../models/user'),
    router = express.Router(),
    passport = require('passport'),
    users = require('../controllers/users');
    catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(users.registerForm)
    .post(users.register);

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

//failureFlash flashes a mesage for us automatically 
//failureRedirect sets a place to redirect to if things go wrong
router.get('/logout', users.logout);


module.exports = router;