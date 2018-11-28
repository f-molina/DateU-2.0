const express = require("express");


const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("index");
});

router.get('/match',(req,res)=>{
  res.render('match');
})


module.exports = router;
