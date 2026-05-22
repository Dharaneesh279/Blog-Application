//express server

require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo').default;
const session = require('express-session');

const dns = require('dns');

dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
])

const connectDB = require('./server/config/db')

const app = express();

app.use(express.static('public'));

app.use(expressLayouts);
app.set('view engine','ejs');
app.set('layout','./layouts/main');

const PORT = 5000 || process.env.PORT;
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    })
}));


app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));


app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})