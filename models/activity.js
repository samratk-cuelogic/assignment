
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
  
 
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

	  console.log('newActivity : '+ newActivity);
	 // console.log('saveActivity');
	  newActivity.save(callback);
	

} 

