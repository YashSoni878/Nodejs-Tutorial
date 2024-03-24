<!-- Flash Messages Implementation -->
1. Install connect-flash package => npm i connect-flash
2. Setup express-session => npm i express-session
3. Go to app.js write => const expressSession = require('express-session');
const flash = require('connect-flash');
4. After 2 lines of view engine setup write => app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Hello"
}));
5. Below this code write => app.use(flash());
6. To create flash in route go to 'routes/index.js' update is like this:

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

7. Copy the 2nd code from 'https://getbootstrap.com/docs/5.3/getting-started/introduction/' 
8. Then go to 'views/index.ejs' paste and save the code
9. Run the nodemon command in terminal
10. Go to 'https://getbootstrap.com/docs/5.3/components/alerts/' and copy the "x's" code
11. Paste the code inplace of "Hello World" in 'views/index.ejs' file


-- There is no direct or default way that can use the data from one route in other route. But flash message can make it possible.


<!-- Working with MongoDB -->
1. Run the code in terminal => npm i mongoose
2. Starting template, goto 'routes/user.js' and write => const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/endgame2");

mongoose.Schema({
  username: String,
  password: String,
})


<!-- Search in Database (Mongoose) -->
Regular Expressions, often abbreviated as 'RegExp' or 'regex', are powerful tools for pattern matching and string manipulation. A regular expression is a sequence of characters that forms a search pattern, which can be used for matching, searching, and replacing text within strings.
^ => defines the starting.
$ => defines the ending.


%  Authentication & Authorization
1. Install Packages
 1.1 npm i passport
 1.2 npm i passport-local
 1.3 npm i passport-local-mongoose
 1.4 npm i express-session

% Data Association
It is a process to connect/associate the data of one model to other model using IDs.

Example: Take example of Facebook =>  User1(userID)  --   Post1(postID)
                                      postID              userID
