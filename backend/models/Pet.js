var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
  	name: String,
  	kind: String,
  	age: Number
});

var Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;