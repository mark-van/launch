if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const 
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    session = require('express-session'),
    ExpressError = require('./utils/ExpressError'),
    methodOverride = require('method-override'),
    ejsMate = require('ejs-mate'),
    flash = require('connect-flash'),
    postsRoutes = require('./routes/posts'),
    consultsRoutes = require('./routes/consults'),
    usersRoutes = require('./routes/users'),
    passport = require('passport'), //allows you to plug in multiple strategies for authentication
    LocalStrategy = require('passport-local'),
    DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/launch',//process.env.DB_URL,
    User = require('./models/user');
    
const MongoDBStore = require("connect-mongo")(session);  
//'mongodb://localhost:27017/launch'
mongoose.connect(DB_URL, {
    useNewUrlParser: true, 
    userCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate); //use ejsmate instead of default
app.set('view engine', 'ejs');//express will require the package behind the scenes
app.set('views', path.join(__dirname, '/views'));//comonly used

app.use(express.urlencoded({extended: true})); //middelware
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //tell express to serve our public directory

const secret = process.env.SECRET || 'goodsecret';

const store = new MongoDBStore({
    url: DB_URL,
    secret: secret,
    touchAfter: 24 * 60 * 60 //update sesssion after this many seconds
})

store.on("error", function (e) {
    console.log("SESSION ERROR", e);
})


const sesssionConfig = {
    store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //prevents cookie form being access from client side scripts
        expires: Date.now() + 100000000,//so that users cant just stay logged in forever
        maxAge: 100000000                   //^^
    }
}
app.use(session(sesssionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //needed to have a persisitent login

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize of model for passport session support
passport.serializeUser(User.serializeUser());//how get a user into a session
passport.deserializeUser(User.deserializeUser()); //how get a user into a session


//put this before route handlers 
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success'); //will have access to locals in template automatically
    res.locals.error = req.flash('error'); 
    next();
})

app.get("/fakeUser", async (req, res) => {
    const user = new User({email: 'mark@gmail.com', username: 'Mark'});
    const newUser = await User.register(user, 'chicken'); //hashes password and stores it. Also checks if user is unique
    res.send(newUser);
})


// where is posts defined?
app.use('/posts', postsRoutes); //specifies the prefics for all of the routes in this router//all of the routs are going to start with this path
app.use('/posts/:id/consults', consultsRoutes);
app.use('/', usersRoutes);



app.get('/', (req, res) => {
    res.render('home');
})

//for every request and every path(that made it here)
app.all('*', (req, res, next) => {
    console.log("ll");
    next(new ExpressError('Page Not Found', 404));
})


app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = 'Something Went Wrong';
    res.status(statusCode).render('error', { error: err });
})

//configure so we can use the dafault heroku port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port} YEAY`);
    console.log(__dirname);
})
