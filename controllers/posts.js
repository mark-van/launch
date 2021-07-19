const Post = require('../models/post');
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', { posts });
};

module.exports.renderNewForm = ( req, res) =>{
    res.render('posts/new');
};

module.exports.createPost = async (req, res) => {
    req.flash('success', 'Successfully created a new post'); 
    //if(!req.body.post) throw new ExpressError('Invalid Post', 400);
     const post = new Post(req.body.post);
     post.images = req.files.map(f => ({url: f.path, filename: f.filename}));
     post.author = req.user._id;
     console.log(post.author);
     await post.save();
     console.log(post);
     res.redirect(`/posts/${post._id}`);
};

module.exports.showCampground = async (req, res) => {
    const post = await Post.findById(req.params.id).populate({
        path: 'consults',
        populate: { //populate the author of the consult
            path: 'author'
        }
       }).populate('author');
    console.log(post);
    res.render('posts/show', { post });
}

module.exports.renderEditForm = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/edit', { post });
}

module.exports.updatePost = async (req, res) => {
    const {id} = req.params; //destructure
    const post = await Post.findByIdAndUpdate(id, {...req.body.post}, {new: true});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    post.images.push(...imgs);
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);//deletes file from cloudinary
        }
        await post.updateOne({$pull: {images: { filename: { $in: req.body.deleteImages}}}}); //removes images in deleteImages array form database
        console.log(post);
    }
    await post.save();
    req.flash('success', 'Successfully updated post');
    res.redirect(`/posts/${post._id}`);
}

module.exports.deletePost = async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted post');
    res.redirect('/posts');
}