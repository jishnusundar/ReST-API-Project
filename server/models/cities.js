let mongoose = require('mongoose');

// model for Restaurant
let citySchema = mongoose.Schema({
    name: String,
    Description: String,
    Area:String,
    Population:String,
    Attractions:[]
},
{
  collection: "cities"
});

module.exports = mongoose.model('cities', citySchema);
