const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { route } = require('./routes/pages');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:"",
    database: process.env.DB

});

const publicDirectory = path.join(__dirname, './public');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
db.connect((err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('Successfully connected to db');
    }
})

//Define routes
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'));
app.listen(3000, ()=>{
    console.log('Server is running');
});