var express = require('express');
var router = express.Router();
const userModel = require('./users');

// Cookie Create
router.get('/', function(req, res){
  res.cookie("age", 25);
  res.render("index");
});

// Cookie Read
router.get("/read", function(req, res){
  console.log(req.cookies);
  res.send("check");
});

// Cookie Delete
router.get('/delete', function(req, res){
  res.clearCookie("age");
  res.send("Cookie Deleted!");
});

// // Session Create
// router.get('/', function(req, res){
//   req.session.ban = true;
//   res.render("index");
// });

// // Session Read
// router.get('/checkban', function(req, res){
//   if(req.session.ban === true){
//     res.send("You are banned!");
//   }
//   else{
//     res.send("Not banned");
//   }
// });

// // Session Delete
// router.get('/removeban', function(req, res){
//   req.session.destroy(function(err){
//     if(err){
//       throw err;
//     }
//     res.send("Ban removed");
//   })
// });

// Create
// router.get('/create', async function(req, res){
//   const createdUser = await userModel.create({
//     username: "yashsoni",
//     name: "Yash Soni",
//     age: 21
//   });
//   res.send(createdUser);
// });

// Get
// router.get('/allusers', async function(req, res){
//   let allusers = await userModel.find();
//   res.send(allusers);
// });

// Delete
// router.get('/delete', async function(req, res){
//   let deletedUser = await userModel.findOneAndDelete({
//     username: 'yashsoni'
//   });
//   res.send(deletedUser);
// });

module.exports = router;
