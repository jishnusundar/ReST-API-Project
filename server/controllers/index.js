let mongoose = require('mongoose');
let express = require('express');
let app = express.Router();

var obj = {
    "Test key":"Test value",
    "Status":"Success"
}

app.get('/',(req,res,next)=>{
res.json(obj);
});

module.exports = app;