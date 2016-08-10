var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var Pet = require('./Pet.js')

var userSchema = new Schema({
  full_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  pets: [Pet]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;