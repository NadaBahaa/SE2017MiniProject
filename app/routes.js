// import dependincies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var passport = require('passport') ;


// add routes
//req.user.username
router.get('/', projectController.homePage);
router.get('/student', projectController.loggingUser);
router.get('/client', projectController.clientUser);
router.get('/visitor', projectController.visitorPage);
router.get('/profile',projectController.getProfilePage);
//router.get('/profile',projectController.getProfilePage);
router.post('/signup', projectController.saveUser);
router.post('/signupclient',projectController.saveClient);

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile');
    });
  })(req, res, next);
});

//login client
router.post('/loginclient', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/loginclient'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/showAllProjects');
    });
  })(req, res, next);
});

router.post('/project', projectController.createProject);
router.get('/showAllProjects', projectController.showAllProjects);
router.post('/searchIn',projectController.searchInAll);
router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
  req.session.destroy();
});


// export router
module.exports = router;
