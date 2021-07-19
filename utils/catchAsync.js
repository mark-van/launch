module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch((e) => {
            if(e.kind === 'ObjectId'){
                req.flash('error', 'Cannot find that post');
                return res.redirect('/posts');
            }
            next();});
    }
}