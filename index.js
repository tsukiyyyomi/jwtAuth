const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nike:123e123@cluster0.toc2y.mongodb.net/<dbname>?retryWrites=true&w=majority',
()=> console.log('connected to db!'));

const authRoute = require('./routes/auth');



app.use('/api/user', authRoute);
app.listen(3000, ()=> console.log('Server Up and running'));
