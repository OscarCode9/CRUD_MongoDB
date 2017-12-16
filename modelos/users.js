var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userObj = {
    email: { type: String, unique: true, lowercase: true},
    displayName: String,
    password:String,
    signupDate: { type: Date, default: Date.now()},
    lastLogin: Date
};

var user = new Schema(userObj);

module.exports = mongoose.model('Users', user)