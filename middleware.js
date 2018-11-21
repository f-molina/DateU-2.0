const auth = require("./auth");
const mongoose = require('mongoose');
const userSchema = require('./models/users');

//const userVeri = mongoose.model('users',userSchema);

// Tack a user object onto each request if possible
function addUser(req, res, next) {
  console.log('22222');
  console.log(req.userinfo);
  if (!req.userinfo) {
    return next();
  }

  auth.oktaClient.getUser(req.userinfo.sub)
    .then(user => {

      let exist = userSchema.findOne({email: user.profile.email}, function(err,adventure){
        console.log(`sexo ${err}`); 
        if(err===null){
          let newuser = new userSchema({
            email: user.profile.email,
            name: user.profile.firstName,
            age: 18,
            career: 'Pregrado',
            description: 'Student',
            profileImage: 'images/w7.jpg',
            images: ['images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg', 'images/w7.jpg']
          });
  
          newuser.save();
        }
        else{console.log('User already exist');}
      });
      console.log('------------Schema------------------');
      // console.log(exist);
      console.log('------------Schema------------------');
      

      req.user = user;
      res.locals.user = user;
      console.log('------USER-----');
      console.log(user.profile.email);
      next();
    }).catch(err => {
      next(err);
    });
};

// Only let the user access the route if they are authenticated.
function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }

  next();
}


module.exports = { addUser, loginRequired };
