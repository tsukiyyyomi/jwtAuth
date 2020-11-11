const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:"",
    database: process.env.DB

});

exports.register = (req, res)=>{
    console.log(req.body);
    
    const {name, email, password, passwordConf} = req.body;

    db.query('SELECT uEmail FROM users WHERE uEmail = ?', [email], async (err, results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            return res.render('register',{
                message:"That email is already in use"
            });
        } else if(password !=passwordConf){
            return res.render('register',{
                message:"Passwords dont match"
            });
        }
        
        let hashedPass = await bcrypt.hash(password, 8);
        console.log(hashedPass);
        db.query('INSERT INTO users SET ?', {uName: name, uEmail:email, uPassword: hashedPass}, (err, resQuery)=>{
            if(err){
                console.log(err);            
            } else{
                console.log(resQuery);
                return res.render('register', {
                    message: 'User registered'
                })
            }
        });
    });

}