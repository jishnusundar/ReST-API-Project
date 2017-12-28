let mongoose = require('mongoose');
let express = require('express');
let app = express.Router();

var Client = require('node-rest-client').Client;
var client = new Client();
require('dotenv').config();

let cities = require('../models/cities');

var obj = {
    "Hello":"Welcome to the ReST API Project. This api endpoint gives information about cities in Canada. Get started at \'/api\'"
}

var APIKEY = process.env.WEATHER_API_KEY;


app.get('/:cityName&:countryCode',(req,res,next)=>{

    cities.find({"name":req.params.cityName},(err,city)=>{
        if(err)
        {
            console.log("Error finding city");
        }
        else
        {
            console.log(city);
            var thisCity = [];
            thisCity.push(city[0]);

            var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q="+req.params.cityName+","+req.params.countryCode+"&APPID="+APIKEY;
            console.log("Weather request url:"+weatherURL);
            try {
                client.get(weatherURL, function (data, response) {  
                   /* var weather_main = data.weather[0].main;
                    var weather_description = data.weather[0].description;
                    var temperature = data.main.temp;
                    var pressure = data.main.pressure;
                    */
                    thisCity.push({'weather_main':  data.weather[0].main});
                    thisCity.push({'weather_description' : data.weather[0].description});
                    thisCity.push({'temperature' : data.main.temp});
                    thisCity.push({'pressure': data.main.pressure});
                    
                  
                    return res.json(thisCity);
                    }); 
                
            }
            catch(error2){
                console.log(error2);
            }
        }
    });
     
});

module.exports = app;