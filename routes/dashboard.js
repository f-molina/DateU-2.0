const express = require("express");
const router = express.Router();
const {getOne} = require('../controllers/userController');
// Display the dashboard page
router.get("/", async (req, res) => {
  const user = await getOne(req.user.profile.email);
  console.log(user);
  res.render("dashboard",{
    pics: "asdasd"
  });
});


module.exports = router;
