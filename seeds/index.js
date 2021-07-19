const 
    express = require('express'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    Post = require('../models/post');
    const data = require('./seedHelper'); 

mongoose.connect('mongodb://localhost:27017/launch', {
    useNewUrlParser: true, 
    userCreateIndex: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await  Post.deleteMany({});
    let p;
    for (let k = 0; k < data.length; k++){
        p = new Post({title: `${data[k]}`, 
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, labore animi hic repellat dignissimos, cupiditate, ipsum facilis itaque beatae doloremque asperiores molestiae quasi iusto! Nam ipsa adipisci aspernatur dicta repellat?',
            images:  [
                {
                url: 'https://res.cloudinary.com/ddju1h584/image/upload/v1626500117/Launch/ehjopckxcyjr6k0vynmg.png',
                filename: 'Launch/ehjopckxcyjr6k0vynmg'
                },
                {
                url: 'https://res.cloudinary.com/ddju1h584/image/upload/v1626500118/Launch/pfhacrbxzs4mxbyqoxwj.jpg',
                filename: 'Launch/pfhacrbxzs4mxbyqoxwj'
                }
            ],
            author: '60f1e588c59aa2065057c297'
        });
        await p.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close(); //lets the progam stop running
});