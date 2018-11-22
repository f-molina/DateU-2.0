const mongoose = require('mongoose');
const userSchema = require('../models/users');

const userController = {};

userController.create = function(user){
    let data = {
        email: user.profile.email,
        name: user.profile.firstName,
        age: 18,
        career: 'Pregrado',
        description: 'Student',
        profileImage: 'images/w7.jpg',
        images: ['images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg']
    }

    if(data.email!='' && data.name!='' && data.age!='' && data.career!=''){
        let newUser = new userSchema(data);

        newUser.save(function(err){
            if(err){console.log('ERROR: Usuario ya existente')}
            else{console.log('Usuario creado con exito');
            }
        });
    }
}

module.exports = userController;