const express = require('express')
const app = express()
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const mainRouter = require('./routes/Router.js');

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "this is key",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.set('view engine','ejs');

// a lot of route
app.use('/', mainRouter);
app.use(express.static('public')) // folder สาธราณะ ไม่ต้องเข้าผ่าน route

app.get('*',(req,res)=>{
    res.send("404");
});

const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}) 