
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
 
  
 
var user_Schema = new Schema({ 
    firstName: { type: String, required: true},
    lastName : { type: String, required: true},
    email  : { type: String, required: true},
    username  : { type: String, required: true},
    password    : { type: String, required: true} 
});
 

var login = mongoose.model('user', user_Schema);

var User = module.exports.login = login;
 


// var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	console.log("query : " +query);
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.updateUserById = function(id,data, callback){
	//User.findById(id, callback);
	User.findByIdAndUpdate(id, data, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
 
module.exports.getAllUser = function(callback){
	var query = {}; 
	User.find(query, callback);
}
module.exports.getAllNotLoggedInUser = function(callback){
	var query = {}; 
	User.find(query, callback);
}