const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
{ useUnifiedTopology: true },
()=> console.log('Connected to db!'));

const authRoute = require('./routes/auth');



app.use('/api/user', authRoute);
app.listen(3000, ()=> console.log('Server Up and running'));
