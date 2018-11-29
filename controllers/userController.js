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
        career: 'Computer Science',
        description: 'Student',
        hobbies: 'Study',
        marital: 'Single',
        profileImage: 'images/w7.jpg',
        image1:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414112/bb6sgtkeedvgkrmfta3x.jpg',
        image2:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414103/j718wga5dtkrcaolndqa.jpg',
        image3:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414100/hhxtwpqssz30sw1lb1ur.jpg',
        image4:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414092/ijh0etajxjdpfxkh8zj9.jpg',
        image5:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414082/lpxwmpbz6qmpog8gsngc.jpg',
        image6:'https://res.cloudinary.com/dipz4up0t/image/upload/v1543414057/ho7sov8lc4vmdid3gwjf.jpg'
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
        age: req.body.age,
        career: req.body.career,
        marital: req.body.marital,
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