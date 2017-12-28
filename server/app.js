
// include all of our middleware
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//modules for authentication
let session = require("express-session");

// import "mongoose"
let mongoose = require('mongoose');

// URI
let config = require('./config/db');

mongoose.connect(process.env.URI || config.URI);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Conneced to MongoDB...");
});

// define controllers
let indexController = require('./controllers/index'); // top level routes


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(favicon(path.join(__dirname, '../client','icon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

//setup session
app.use(session({
secret: "SomeSecret",
saveUninitialized: true,
resave: true
}));



// redirect incoming requests routes to appropriate controllers
app.use('/', indexController);



// Handle 404 Errors
  app.use(function(req, res) {
      res.status(400);
     res.send("NOT FOUND");
  });

  // Handle 500 Errors
  app.use(function(error, req, res, next) {
      res.status(500);
      res.send("INTERNAL SERVER ERROR");
  });



module.exports = app;
