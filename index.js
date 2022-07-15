const express = require('express');
const {dbConnection} = require('./database/config');
require('dotenv').config();
const cors = require('cors')

//create express server:
const app =express();
//cors:
app.use(cors());
//initialize db:
dbConnection();


//Routes
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'hola'
    })
});

//listen port:
app.listen(process.env.PORT,()=>{
    console.log('listening port '+ process.env.PORT)
})
