const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');
const { isLoggedIn, validatePost, isAuthor } = require('../middleware');
const multer  = require('multer')
const { storage } = require('../cloudinary'); //dont need to specify index.js since node automatically looks for that file
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(posts.index))
    .post(isLoggedIn, upload.array('image'), validatePost, catchAsync(posts.createPost))
    //upload.array needs to happen before validaiton so that url and filename are set

    // .post(upload.array('image'), (req,res) => { //tell multer theres a file at image
    //     console.log(req.body,req.files);
    // })
 
 //new needs to be berfore id
 router.get('/new', isLoggedIn, posts.renderNewForm)
 
 router.route('/:id')
    .get(catchAsync(posts.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validatePost, catchAsync(posts.updatePost))
    .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost));

 router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm))
 
 module.exports = router;