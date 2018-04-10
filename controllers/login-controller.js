var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/login').login;
var User1 = require('../models/login');

flash = require("connect-flash"),

    
   
exports.index = function(req, res, next) {
        console.log('index'); 
        res.render('index', { title: 'Assignment App', page: 'login', errors: {} });
};
exports.register = function(req, res, next) {
    console.log('register');
    res.render('index', { title: 'Assignment App', page: 'register', errors: {} });
};
exports.registerUser = function(req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var user_email = req.body.user_email;
    var username = req.body.username;
    var user_password = req.body.user_password;
    var confirm_password = req.body.confirm_password;
    console.log(user_password + " == " + confirm_password);
    // Validation
    req.check('first_name', 'Name is required').notEmpty();
    req.check('last_name', 'Last name is required').notEmpty();
    req.check('user_email', 'Email is required').notEmpty();
    req.check('user_email', 'Email is not valid').isEmail();
    req.check('username', 'Username is required').notEmpty();
    req.check('user_password', 'Password is required').notEmpty();
    req.check('confirm_password', 'Confirm password is required').notEmpty();
    req.check('confirm_password', 'Passwords do not match').equals(req.body.user_password);

    var errors = req.validationErrors(true);
    console.log(errors);
    if (errors) {
        res.render('index', {
            title: 'Assignment App',
            page: 'register',
            errors: errors
        });
    } else {

        var newUser = new User({
            firstName: first_name,
            lastName: last_name,
            email: user_email,
            username: username,
            password: user_password,
            admin: false
        });

        User1.createUser(newUser, function(err, user) {
            if (err) {
                console.log('Something went wrong!');
                //res.json({ success: true });
                req.flash('error_msg', 'You are registered and can now login');
                res.redirect('/login');
            } else {
                console.log('User saved successfully');
                //res.json({ success: true });
                req.flash('success_msg', 'You are registered and can now login');
                res.redirect('/login');
            }  
        }); 
    }
};

exports.login = function(req, res, next) {
    console.log('login');
    res.render('index', { title: 'Assignment App', page: 'login', errors: {} });
};
 

/*
exports.loginUser = function(req, res, next) {
		    console.log('login');
		    var username = req.body.username;
		    var password = req.body.password;
		    req.checkBody('username', 'Username is required').notEmpty();
		    req.checkBody('password', 'Password is required').notEmpty();
		    var errors = req.validationErrors(true);

		    if (errors) {
		        res.render('index', {
		            title: 'Assignment App',
		            page: 'login',
		            errors: errors
		        });
		    } else {

		        User1.getUserByUsername(username, function(err, user) {
		            if (err) throw err;
		            if (!user) {
		                errors: { message: 'Unknown User' }
		                //return done(null, false, {message: 'Unknown User'});
		                res.render('index', { title: 'Assignment App', page: 'login', errors: errors });
		            }

		            User1.comparePassword(password, user.password, function(err, isMatch) {
		                if (err) throw err;
		                if (isMatch) {
		                    console.log("Valid User isMatch");
		                    //return user ;//done(null, user); 
		                    res.redirect('/users/dashboard');
		                    //res.render('layout/home', { title: 'Assignment App',page:'dashboard' ,errors:{}}); 
		                } else {
		                    console.log("Invalid password");
		                    errors: { message: 'Invalid password' }; //done(null, false, {message: 'Invalid password'});
		                    res.render('index', { title: 'Assignment App', page: 'login', errors: errors });
		                }
		            });
		        });

      		  //res.render('index', { title: 'Assignment App',page:'login' ,errors:{}});  
   		 }
};
*/
 