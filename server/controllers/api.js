let mongoose = require('mongoose');
let express = require('express');
let app = express.Router();

var Client = require('node-rest-client').Client;
var client = new Client();
require('dotenv').config();

var obj = {
    "Hello":"Welcome to the ReST API Project. This api endpoint gives information about cities in Canada. Get started at \'/api\'"
}

var APIKEY = process.env.WEATHER_API_KEY;


app.get('/:cityName&:countryCode',(req,res,next)=>{

     var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q="+req.params.cityName+","+req.params.countryCode+"&APPID="+APIKEY;
    console.log("Weather request url:"+weatherURL);
    try {
        client.get(weatherURL, function (data, response) {  
            return res.json(data);
            }); 
        
    }
    catch(err){
        console.log(err);
    }
});

module.exports = app;