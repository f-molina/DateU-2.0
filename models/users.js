var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    age: String,
    career: String,
    description: String,
    profileImage: String,
    images:[String] 
}); 

module.exports = mongoose.model('users', userSchema);