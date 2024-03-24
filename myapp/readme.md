
<!-- Database Architecture -->
Database -> Collections -> Documents
Example: Amazon Database -> Users Data, Sales Data, Products Data, Employees Data -> Each User Data(Name, Age, Gender, etc.)  

<!-- DIAGRAM REPRESENTATION -->
Code Side   -- MongoDB Side
1. DB Setup -- DB Formation
2. Model    -- Collection
3. Schema   -- Documents


<!-- MONGODB AND MONGOOSE SETUP -->
1. Download Mongodb => https://www.mongodb.com/try/download/community
2. Install mongoose => npm i mongoose
3. Require => const mongoose = require('mongoose');
4. Setup connection => mongoose.connect('mongodb://127.0.0.1:27017/nameOfDatabase');
5. Make schema => const userschema = mongoose.Schema({
    username: String,
    name: String,
    age: Number
});
6. Create model => mongoose.model("name", schema);
name => name of one of the collection. Here in this case is "user"
schema will be userschema.
7. Export this model => module.exports = mongoose.model("user", userschema);
8. Import this model in 'index.js' file under 'routes' folder => const userModel = require('./users');
 -- Points 1 to 8 will be in user.js file

<!-- Client Server Architecture -->
Client -> Cookie (data)
Server -> Session (data)

<!-- About Session -->
1. To install package for session => npm i express-session
2. Inside "app.js" require the express-session
3. app.use(session({
    resave: false;  -> no need to save when the session doesn't change
    saveUninitialized: false;
    secret: "Hello"
}));
4. For everytime we reload the server the created session will get deleted and a new session will be created.

<!-- Flash Messages -->
These are any alerts, warnings kind of messages which shows up on front-end.
