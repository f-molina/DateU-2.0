const express = require("express");
const router = express.Router();
const {getOne} = require('../controllers/userController');
const userSchema = require('../models/users');

// Display the dashboard page
router.get("/", async (req, res) => {
  const user = await getOne(req.user.profile.email);
  
  userSchema.find({}, function(err, usuarios){
    if(err){console.log(err);}
    res.render("dashboard", {users: usuarios});
  });

});


module.exports = router;
