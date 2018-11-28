const userSchema = require('../models/users');
const userController = {};
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: "dipz4up0t",
    api_key: "975787246228963",
    api_secret: "37tJO_QAvGd9oBKUfIc9tX_WMOs"
});

userController.create = function(user){

    let data = {
        email: user.profile.email,
        name: user.profile.firstName,
        lastname: user.profile.lastName,
        age: 18,
        career: 'Pregrado',
        description: 'Student',
        hobbies: 'Study',
        profileImage: 'images/w7.jpg',
        image1:'images/w7.jpg',
        image2:'images/w7.jpg',
        image3:'images/w7.jpg',
        image4:'images/w7.jpg',
        image5:'images/w7.jpg',
        image6:'images/w7.jpg',
    }

    if(data.email!='' && data.name!='' && data.age!='' && data.career!=''){
        let newUser = new userSchema(data);

        newUser.save(function(err){
            if(err){console.log('ERROR: Usuario ya existente')}
            else console.log(err);
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

userController.getOne = async(email)=>{
    const result = await userSchema.findOne({email:email});
    return result;
}

userController.updateImages = function(req,res){
    console.log(req.files);
    let update = {
        profileImage: req.files[0].path  
    };
    console.log(update.profileImage);
    cloudinary.uploader.upload(req.files[0].path, 
        function (result) {
            update.profileImage = result.url;
            console.log(req.user.profile.email);
            userSchema.findOneAndUpdate({email: req.user.profile.email}, update, function(err,old){
                if(err){
                    console.log('Error al actualizar');
                    res.status(500);
                    res.json({
                        ok: false,
                        err
                    })
                } else{
                    console.log(old);
                    res.json({
                        ok: true,
                        old, 
                        update
                    });
                }
            });
        },
        {
            transformation: [{ width: 400, height: 400 }
    ]});
    fs.unlink(update.profileImage);

}

userController.updateInfo = function(req,res){
    console.log(`email: ${req.body.email}`);
    let update = {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        career: req.body.career,
        description: req.body.description,
        hobbies: req.body.hobbies
    }
    let email = req.body.email;

    userSchema.findOneAndUpdate({email: email}, update, function(err,old){
        if(err){
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