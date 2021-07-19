const Post = require('../models/post');
const Consult = require('../models/consult');

module.exports.createConsult = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const consult = new Consult(req.body.consult);
    consult.author = req.user._id;
    post.consults.push(consult);
    await consult.save();
    await post.save();
    req.flash('success', 'Created new consult');
    res.redirect(`/posts/${post._id}`);
}

module.exports.deleteConsult = async (req, res) => {
    console.log('here');
    const { id, consultId } = req.params;
    await Post.findByIdAndUpdate(id, {$pull : {consults: consultId}});//removes from consults array the consult with id  eqaul to reviewId
    await Consult.findByIdAndDelete(consultId)
    req.flash('success', 'Successfully deleted consult');
    res.redirect(`/posts/${id}`);
}