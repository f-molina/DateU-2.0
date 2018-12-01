const userSchema = require('../models/users');
const userController = {};
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: "dpy1otezb",
    api_key: "592256824217983",
    api_secret: "NvaGrTdN80byO9o4LSKqNO2r-yE"
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
        profileImage: 'https://res.cloudinary.com/dpy1otezb/image/upload/v1543597471/jqwyaz7mtyjhebxgrhqr.png',
        photos:[
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598340/hamb0wmcf5jofplvv9uu.jpg',
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598410/vvgyzog1bmcqbxiahagu.jpg',
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598412/j2gyy0cflc34qb3muk6k.jpg',
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598416/y1ivawj3ecnafxksfite.jpg',
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598430/em1ztndm0zmdggubpcid.jpg',
            'https://res.cloudinary.com/dpy1otezb/image/upload/v1543598434/pq8fxsmrlrmaoowonoma.jpg'
        ]
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
userController.updateProfileImage = async function(req,res){

    cloudinary.uploader.upload(req.files[0].path, 
        async function (result) {
            
            const rs = await userSchema.findOneAndUpdate(
                {email:req.user.profile.email},
                {profileImage:result.url},
                {new:true}
            );
            console.log(rs);

        },
        {
            transformation: [
                { width: 400, height: 400 },
                {quality:"auto:low"}
            ]
        }
    );
   
}

userController.updateImages = function(req,res){
    // console.log(req.files);
    let update = {
        profileImage: req.files[0].path  
    };
    // console.log(update.profileImage);
    cloudinary.uploader.upload(req.files[0].path, 
        async function (result) {
            
            
            const rs = await userSchema.findOneAndUpdate(
                {email:req.user.profile.email,photos:req.body.oldUrl},
                {$set:{"photos.$":result.url}},
                {new:true}
            );
            // console.log(rs);

        },
        {
            transformation: [
                { width: 400, height: 400 },
                {quality:"auto:low"}
            ]
        });
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