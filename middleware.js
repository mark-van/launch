const { postSchema, consultSchema } = require('./joiSchemas.js');
const ExpressError = require('./utils/ExpressError');
const Post = require('./models/post');
const Consult = require('./models/consult');

module.exports.isLoggedIn = (req, res, next) => {
    //console.log("REQ.UESER...", req.user);
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        //console.log(req);
        req.flash('error', 'You must be logged in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

module.exports.isAuthor = async (req,res, next) => {
    const {id} = req.params; 
    const post = await Post.findById(id);
    if(!req.user || !post.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to perform that request');
        return res.redirect(`/posts/${id}`);
    }
    next();
}

module.exports.validateConsult = (req, res, next) => {
    const { error } = consultSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

module.exports.isConsultAuthor = async (req,res, next) => {
    const {consultId, id} = req.params; 
    const consult = await Consult.findById(consultId);
    console.log('made it');
    if(!req.user || !consult.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to perform that request');
        console.log('made it2');
        return res.redirect(`/posts/${id}`);
        console.log('made it3');
    }
    next();
}