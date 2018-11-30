const express = require("express");
const router = express.Router();
const {getOne} = require('../controllers/userController');
const userSchema = require('../models/users');

// Display the dashboard page
router.get("/", async (req, res) => {
  const user = await getOne(req.user.profile.email);
  
  userSchema.find({ email: {$ne: req.user.profile.email}}, function(err, usuarios){
    // console.log('usuarios:');
    
    // console.log(user);
    res.render("dashboard", {users: usuarios,current:user});
  });
});


module.exports = router;
