
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var moment = require('moment');  
 
var user_ActivitySchema = new Schema({ 
    userId: { type: String, required: true},
    title : { type: String, required: true},
    ip : { type: String, required: true},
    uaString  : { type: String, required: true},
    datetime  : { type: String, required: true} 
});
 

var UsersActivity = mongoose.model('UsersActivity', user_ActivitySchema);

  module.exports.UsersActivity = UsersActivity;
 

 

module.exports.saveActivity = function(newActivity, callback){

	  //console.log('newActivity : '+ newActivity);
	 // console.log('saveActivity');
	  newActivity.save(callback);
	

} 
 

module.exports.getAllNotLoggedInUser = function(noofdays,callback){
	var query = {}; 
	// User.find(query, callback)
	// .where('age').gt(17).lt(66);
	//$gte': earlier,  '$lte': later
	var now = new Date();
	//var later = moment(now).add(5, 'd').toDate();
	var earlier = moment(now).subtract(5, 'd').toDate();

	console.log("noofdays : "+noofdays);
	console.log("earlier:" +earlier); 
	UsersActivity.
	  find({}). 
	  where('datetime').gte('2018-04-5 10:46:36').  
	  populate('users').
	  exec(callback);


	
	  // where('datetime').gte('2018-04-11').lte('2018-04-11'). 
}