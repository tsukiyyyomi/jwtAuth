const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:"",
    database: process.env.DB

});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
db.connect((err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('Successfully connected to db');
    }
})
app.get('/', (req,res)=>{
    res.render("index")
});

app.listen(3000, ()=>{
    console.log('Server is running');
});