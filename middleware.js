const auth = require("./auth");
const userController = require('./controllers/userController');
//const userVeri = mongoose.model('users',userSchema);

// Tack a user object onto each request if possible
function addUser(req, res, next) {
  if (!req.userinfo) {
    return next();
  }

  auth.oktaClient.getUser(req.userinfo.sub)
    .then(async (user) => {
      req.user = user;
      res.locals.user = user;
      const userResult = await userController.getOne(user.profile.email);
      if(!userResult)
        userController.create(user);
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
