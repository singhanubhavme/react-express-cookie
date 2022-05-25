const express = require('express');
const app = express();
const session = require('express-session');

const mongoose = require('mongoose');
const User = require('./user');
mongoose.connect("mongodb://localhost:27017/sessiontest")
    .then(() => console.log('Mongoose Connection Open'))
    .catch(err => console.log('Error : ', err))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(session({
    secret: "abc",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    resave: true
}));

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 3001 is react (this requesting origin)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next();
})


app.post('/login', async (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    
    const foundUser = await User.findAndValidate(username, password)

    if (foundUser) {

        req.session.user_id = foundUser._id;
        res.status(200).send("logged in");
    
    } else {
        res.status(404).send("cant logged in")
    
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send("logged out");
})

app.post('/register', async (req, res, next) => {
    const {
        password,
        username,
    } = req.body;
    User.find({
        username: username
    }, async (err, docs) => {
        if (docs.length) {
            res.status(200).send("already registered and logged in");
        } else {
            const user = new User({
                username,
                password
            })
            await user.save();
            req.session.user_id = user._id;
            res.status(200).send("registered and logged in");
        }
    })
})

app.listen(3000, () => {
    console.log('Serving at 3000');
})