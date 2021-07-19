const express = require('express');
const router = express.Router({mergeParams: true});//mergeParams gives you access to the params in the path prefix
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Post = require('../models/post');
const consults = require('../controllers/consults');
const Consult = require('../models/consult');

const { validateConsult, isLoggedIn, isConsultAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateConsult, catchAsync(consults.createConsult));
router.delete('/:consultId', isLoggedIn, isConsultAuthor, catchAsync(consults.deleteConsult));

module.exports = router;