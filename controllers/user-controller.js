var express = require('express');
var mongoose = require('mongoose');

var BodyParser = require('body-parser');

var UserHome = require('../models/user');

var User1 = require('../models/login');
var UsersActivity = require('../models/activity');
var UsersActivity1 = require('../models/activity').UsersActivity;


var userLogin = require('../models/login').userLogin;
var moment = require('moment');
// exports.json = function(req, res, next) { 
//     var sss= employee.find({}, function(err, newempd) {
//         if (err) throw err;

//          res.json({
//          	status: 200,
// 		    message: 'Records found!', 
// 		    result: newempd
// 		  });

//     });  

// };
exports.index = function(req, res, next) {
    console.log(req.session);
    console.log('your IP is: ' + req.connection.remoteAddress);

    res.render('layout/home', { title: 'Assignment App', page: 'dashboard', errors: {} });

};

exports.listjson = function(req, res, next) {
    User1.getAllUser(function(err, userList) {
        if (err) {
            console.log('Something went wrong!');
            res.send({ status: 400, msg: 'Something went wrong!' });
        } else {
            res.send({ status: 200, message: 'Records Found!', userList: userList });
        }
    })
};
exports.list = function(req, res, next) {
    User1.getAllUser(function(err, userList) {
        if (err) {
            console.log('Something went wrong!');
        } else {
            console.log("userList : " + userList);
            res.render('layout/home', { title: 'Assignment App', page: 'user-list', errors: {}, userList: userList });
        }
    })
};
exports.getuser = function(req, res, next) {
    var userID = req.body.userID;
    console.log(userID);
    if (userID) {
        User1.getUserById(userID, function(err, userList) {
            if (err) {
                console.log('Something went wrong!');
            } else {
                console.log("userList : " + userList);
                userList.password = userList;
                res.render('layout/home', { title: 'Assignment App', page: 'getuser', errors: {}, userList: userList });
            }
        })
    } else {
        res.render('layout/home', { title: 'Assignment App', page: 'getuser', errors: {}, userList: {} });
    }
};

exports.getusernotloggedin = function(req, res, next) {
    //var userID = req.body.userID;
    //console.log(userID);
    var noofdays = process.env.LASTLOGINDAYS; // 5
    var now = new Date();
    //var later = moment(now).add(5, 'd').toDate();
    var earlier = moment(now).subtract(noofdays, 'd').toDate();

    console.log("noofdays : " + noofdays);
    earlier= moment(earlier).format('YYYY-MM-DD HH:mm:ss');
    
    console.log("moment(earlier):" +  moment(earlier).format('YYYY-MM-DD HH:mm:ss')); 
	
	// where('datetime').lte(earlier).
    //where('datetime').lte(earlier).

    var userIds = [];
   // db.getCollection('usersactivities').find({datetime:{$not: { $gte: "2018-04-06 10:46:36" }}})
    UsersActivity1.
    find({datetime:{$not: { $gte: earlier }}}).  
    exec(function(err, resss) {
        if (err) return handleError(err);
        resss.forEach(function(element) {
            userIds.push(element.userId);
        });
        console.log(userIds);
        userLogin.find({
            '_id': { $in: userIds }
        }, function(err, userList) {
            console.log(userList);
            if (err) {
                console.log('Something went wrong!');
            } else {
                console.log("userList : " + userList);
                userList.password = userList;
                res.render('layout/home', { title: 'Assignment App', page: 'getusernotloggedin', errors: {}, userList: userList });
            }
        }); 

    });


};
exports.edit = function(req, res, next) {

    var userID = req.params.id;
    if (userID) {
        User1.getUserById(userID, function(err, userList) {
            if (err) {
                console.log('Something went wrong!');
            } else {
                console.log("userList : " + userList);
                userList.password = userList;
                res.render('layout/home', { title: 'Assignment App', page: 'edit', errors: {}, userList: userList });
            }
        })
    } else {
        res.render('layout/home', { title: 'Assignment App', page: 'edit', errors: {}, userList: {} });
    }



};

exports.update = function(req, res, next) {
    var data = req.body;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var user_email = req.body.user_email;
    var username = req.body.username;
    userID = data._id
    User1.updateUserById(userID, {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.user_email,
        username: data.username

    }, function(err, update) {
        if (err) {
            console.log('update' + update);
        } else {
            console.log('update' + update);

            // userList.password=userList;
            res.redirect('/users/list');
        }
    });
};