//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var session =require('express-session');
var DB_URI = "mongodb://localhost:27017/portfolioo";
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let User = require('./app/models/UserInfo');
var app = express();
var flash = require('connect-flash');
app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));
app.use(passport.initialize());
app.use(session({ secret: 'super secret' }));
app.use(passport.session());
app.use(flash());
app.use(router);
mongoose.connect(DB_URI);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      } 
    if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})
