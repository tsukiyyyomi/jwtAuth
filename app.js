const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:"",
    database: process.env.DB_DB

});
db.connect((err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('Successfully connected to db');
    }
})
app.get('/', (req,res)=>{
    res.send("Home page");
});

app.listen(3000, ()=>{
    console.log('Server is running');
});