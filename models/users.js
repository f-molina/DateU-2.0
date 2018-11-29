var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, index: true},
    name: String,
    lastname: String,
    age: String,
    career: String,
    description: String,
    hobbies: String,
    marital: String,
    profileImage: String,
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    image5:String,
    image6:String 
}); 

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);