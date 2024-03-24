var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
const upload = require('./multer');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  // console.log(req.flash('error'));
  res.render('login', {error: req.flash('error')});
});

router.get('/feed', function (req, res, next) {
  res.render('feed');
});

router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next) {
  if(!req.file){
    return res.status(404).send("No files provided");
  }
  // res.send("File uploaded successfully!");
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts")
  res.render("profile", {user});
});


router.post('/register', function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile');
    })
  })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
});

router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}



// router.get('/alluserposts', async function (req, res, next) {
//   let user = await userModel
//   .findOne({_id: "6596fdab005a16dfb1562bd9"})
//   .populate('posts')
//   res.send(user);
// });

// router.get('/createuser', async function (req, res, next) {
//   let createduser = await userModel.create({
//     username: "yash",
//     password: "8787",
//     posts: [],
//     email: "yash@gmail.com",
//     fullName: "Yash Soni"
//   });
//   res.send(createduser);
// });

// router.get('/createpost', async function (req, res, next) {
//   let createdpost = await postModel.create({
//     postText: "Hello Everyone",
//     user: "6596fdab005a16dfb1562bd9"
//   });
//   let user = await userModel.findOne({_id: "6596fdab005a16dfb1562bd9"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("Done");
// });



module.exports = router;
