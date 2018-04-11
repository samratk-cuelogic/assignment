var express = require('express');
var router = express.Router();

var moment = require('moment');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/login').login;
var User1 = require('../models/login');
var UsersActivity = require('../models/activity');
var loginCntrl = require('../controllers/login-controller');


//router.get('/setup', loginCntrl.createUser);
router.get('/', loginCntrl.index);
router.get('/register', loginCntrl.register);
router.post('/register', loginCntrl.registerUser);
router.get('/login', loginCntrl.index);
router.get('/loginfail', loginCntrl.loginfail);
//router.post('/login', loginCntrl.loginUser);

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});


//*********** LocalStrategy ************

passport.use(new LocalStrategy(
    function(username, password, done) {

        User1.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
            	console.log('Unknown User');

                return done(null, false, { message: 'Unknown User' });
            }

            User1.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log(" isMatch : " + isMatch); 
                    return done(null, user);
                } else {
                	console.log('Invalid password');
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User1.getUserById(id, function(err, user) {
        done(err, user);
    });
});
//successRedirect:'/users/dashboard',

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/loginfail', failureFlash: true }),
    function(req, res) {
        //map.user = req.user;

        var ipAddress = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var source = req.headers['user-agent'];
        var ua = JSON.stringify(source);

        var newActivity = new UsersActivity.UsersActivity({
            userId: req.user._id,
            title: 'Login',
            ip: ipAddress,
            uaString: ua,
            datetime: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        UsersActivity.saveActivity(newActivity);
        res.redirect('/users/dashboard');
    });

 


//***********************



module.exports = router;