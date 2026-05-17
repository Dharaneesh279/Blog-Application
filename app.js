//express server

require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./server/config/db')

const app = express();

app.use(express.static('public'));

app.use(expressLayouts);
app.set('view engine','ejs');
app.set('layout','./layouts/main');

const PORT = 5000 || process.env.PORT;
connectDB();

app.use('/',require('./server/routes/main'));

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})