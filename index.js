const express = require('express');
const {dbConnection} = require('./database/config');
require('dotenv').config();
const cors = require('cors')

//create express server:
const app =express();
//cors:
app.use(cors());

//read and parse body:
app.use(express.json());

//initialize db:
dbConnection();


//Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/hospitals',require('./routes/hospitals'));
app.use('/api/doctors',require('./routes/doctors'));
app.use('/api/search',require('./routes/searches'));

//listen port:
app.listen(process.env.PORT,()=>{
    console.log('listening port '+ process.env.PORT)
})
