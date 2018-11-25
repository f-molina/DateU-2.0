const mongoose = require('mongoose');
const userSchema = require('../models/users');
const userController = {};
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "dipz4up0t",
    api_key: "975787246228963",
    api_secret: "37tJO_QAvGd9oBKUfIc9tX_WMOs"
});

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

userController.get = function(req,res){
    userSchema.find({}, function(err, users){
        if(err){
            res.status(500);
            res.json({code:500, err});
        } else{
            res.json(users);
        }
    });
}

userController.updateImages = function(req,res){
    let update = {
        profileImage: req.body.profileImage   
    };
    //req.files.image.path
    cloudinary.uploader.upload('./public/images/coast.jpg', 
        function (result) {
            console.log(`Resultado: ${result.url}`);
            update.profileImage = result.url;
        },
        {
            transformation: [{ width: 400, height: 400 }
    ]});

    console.log('antes de actualizar');
    console.log(req.body);
    userSchema.findOneAndUpdate({name: req.body.name}, update, function(err,old){
        if(err){
            console.log('Error al actualizar');
            res.status(500);
            res.json({
                ok: false,
                err
            })
        } else{
            res.json({
                ok: true,
                old, 
                update
            });
        }
    });
}

module.exports = userController;