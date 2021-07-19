const  User = require('../models/user'),
    passport = require('passport');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res) => {
    try {
  //res.send(req.body);
    const { email, username, password } = req.body;
    //console.log(email);
    //console.log(email1);
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    //logs in user(authentication method runs this automatically)
    req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash('success', 'Welcome to Launch!!!');
        res.redirect('/posts');
    })
    }catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/posts';
    console.log('redirectUrl', redirectUrl);
    delete req.session.returnTo;  //delete can be used to delete a property from an obeject. 
                                  //Its not that the property is given a value of null or something similar, rather the property is completely removed
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/posts');
}