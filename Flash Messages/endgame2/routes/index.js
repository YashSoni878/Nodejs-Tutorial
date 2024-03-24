var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});

// router.get('/create', async function (req, res) {
//   let userdata = await userModel.create({
//     username: "Raj",
//     nickname: "rider",
//     description: "I am a lover of super bikes.",
//     categories: ['English', 'Bike-Tech', 'Science'],
//   });
//   res.send(userdata);
// });

// router.get('/find', async function(req, res){
//   var regex = new RegExp("^Princey$", 'i');
//   let user = await userModel.findOne({username: regex});
//   res.send(user);
// });

// router.get('/find', async function(req, res){
  // let user = await userModel.find({categories: {$all: ['Science', 'Maths']}});
  
  // var date1 = new Date('2024-01-01');
  // var date2 = new Date('2024-01-04');
  // let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}});

  // let user = await userModel.find({categories: {$exists: true}});

//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: '$nickname'}, 0]},
//         {$lte: [{$strLenCP: '$nickname'}, 5]}
//       ]
//     }
//   });

//   res.send(user);
// });

// router.get('/failed', function(req, res) {
//   req.flash("age", 12);
//   res.send("Created");
// });

// router.get('/check', function(req, res){
//   console.log(req.flash("age"));
//   res.send("Check on terminal");
// });


router.post('/register', function(req, res){
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile');
    })
  })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function(req, res){})

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect('/');
  })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
