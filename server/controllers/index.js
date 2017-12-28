let mongoose = require('mongoose');
let express = require('express');
let app = express.Router();

var obj = {
    "Hello":"Welcome to the ReST API Project. This api endpoint gives information about cities in Canada. Get started at \'/api\'"
}

app.get('/',(req,res,next)=>{
res.json(obj);
});

module.exports = app;