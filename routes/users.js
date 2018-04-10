var express = require('express');
var router = express.Router();
 
var UserHome = require('../models/user');
var userCntrl = require('../controllers/user-controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}
router.get('/dashboard',ensureAuthenticated, userCntrl.index);
router.get('/list',ensureAuthenticated, userCntrl.list);
router.get('/getuser',ensureAuthenticated, userCntrl.getuser);
router.get('/getusernotloggedin',ensureAuthenticated, userCntrl.getusernotloggedin);
router.get('/edit/:id',ensureAuthenticated, userCntrl.edit);
router.post('/update/:id',ensureAuthenticated, userCntrl.update);
router.post('/getuser',ensureAuthenticated, userCntrl.getuser);

	module.exports = router;
// 	module.exports.test = function(){
// 	console.log("test  function");
// }


