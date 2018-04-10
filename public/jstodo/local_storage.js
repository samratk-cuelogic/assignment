 var clsLocalStore = (function() {
     var services = {};
     var setUser = function(entry) {
         var existingEntries = getData();
         existingEntries.push(entry);
         localStorage.setItem("entry", JSON.stringify(entry));
         localStorage.setItem("allEntries", JSON.stringify(existingEntries));
     }
     var getData = function() {
         var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
         if (existingEntries == null) existingEntries = [];
         return existingEntries;
     }

     var setAllEntries = function(allEntries) {
         localStorage.setItem("allEntries", JSON.stringify(allEntries));
     }
     var loadFile = function(event) {
	    var prof_pic_img = document.getElementById('prof_pic_img');
	    console.log(prof_pic_img);
	    prof_pic_img.src = URL.createObjectURL(event.target.files[0]);
	    prof_pic_img.height = 50;
	    prof_pic_img.width = 50;
	    prof_pic_img.style = 'display:block;';
	};
     services.setUser = setUser;
     services.getData = getData;
     services.setAllEntries = setAllEntries;
     services.loadFile = loadFile;
     return services;
 })();


 // var clsLocalStore = (function() {
 // 		var services = {};
 // 		var setUser=function(entry){
 // 			var existingEntries = getData();
 // 			existingEntries.push(entry);
 // 	        localStorage.setItem("entry", JSON.stringify(entry));
 // 	        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
 // 		}
 // 		var getData=function(){
 // 				var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
 //    							if (existingEntries == null) existingEntries = [];
 //    							return existingEntries;
 // 		}
 // 		services.setUser = setUser;
 // 	    services.getData = getData;
 // 	    return services;
 // })();