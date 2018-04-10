var clstodo = (function() {

    var services = {};
 

    var registerUser = function() {

    	 
        var existingEntries = clsLocalStore.getData();
        var newDate, itemId, entry;
        profPic = document.getElementById('prof_pic');
        var imgData = '';
        

        //debugger;
        newDate = new Date();
        itemId = newDate.getTime();
        entry = {
            itemId: itemId,
            email: $("input[name='user_email']").val(),
            user_password: $("input[name='user_password']").val(),
            first_name: $("input[name='first_name']").val(),
            last_name: $("input[name='last_name']").val(),
            gender: $("input[name='gender']").val(),
            address: $("textarea[name='address']").val(),
            prof_pic: imgData,
        };
        console.log(entry);
        // turn data into JSON string  
        clsLocalStore.setUser(entry);
         
        alert("You are registred successfully.");
        window.location = "login.html";

    };

    var validlogin = function() {
        var username = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        // var entriesJSON = localStorage.getItem('allEntries');
        // console.log(entriesJSON);
        // // debugger;
        // if (!entriesJSON) {
        //     alert("Nothing stored!");
        //     event.preventDefault();
        //     return;
        // }
        var allEntries = clsLocalStore.getData(); //JSON.parse(entriesJSON);
        for (var i = 0; i < allEntries.length; i++) {
            var entry = allEntries[i];
            var storedUserName = entry.email;
            var storedPassWord = entry.user_password;
            //  var storedEmailAddress = entry.email;
            if (username == storedUserName && password == storedPassWord) {
                // alert("Successfully logged in!"); 
                localStorage.setItem('loginUser', JSON.stringify(entry));
                localStorage.setItem('islogin', 1);
                window.location = "todo.html";
                return;
            }
        }
        alert('Invalid Username or Password! Please try again.');
        window.location = "login.html";
    }
    var isexist = function() {
        var user_email = document.getElementById('user_email').value;
        var entriesJSON = localStorage.getItem('allEntries');
        if (!entriesJSON) {
            return true;
        }
        var allEntries = JSON.parse(entriesJSON);
        for (var i = 0; i < allEntries.length; i++) {
            var entry = allEntries[i];
            var storedUserName = entry.email;

            if (user_email == storedUserName) {

                return false; // already exists
            }
            return true; // username is free to use
        }
        return false;
    }
    /***Return***/

    services.validlogin = validlogin;
    services.registerUser = registerUser;
   // services.loadFile = loadFile;
    services.isexist = isexist;
    return services;
}());



$('#btn-sign-in').click(function() {
    $('#fblogin').show();
    $('#fbregister').hide();
});
$('#btn-sign-up').click(function() {
    $('#fbregister').show();
    $('#fblogin').hide();
});



$(function() {

    $.validator.addMethod("checkExists", function(value, element) {
        return clstodo.isexist();
    }, "Username already exists.");

    $("#registration-form").validate({
        rules: {
            user_email: {
                required: true,
                email: true,
                checkExists: true
                //minlength: 8
            },
            user_password: {
                required: true,
                minlength: 3
            },
            first_name: "required",
            last_name: "required",
            gender: "required",
            address: "required",
        },
        messages: {
            user_email: {
                required: "Please enter email.",
                email: "Please enter valid email.",
                checkExists: "Email is already in use."
            },
            user_password: {
                required: "Please enter password",
                minlength: "Your password must be at least 3 characters long"
            },
            first_name: "Please enter first name.",
            last_name: "Please enter last name.",
            gender: "Please select gender.",
            address: "Please enter address."
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            console.log(element);
            if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            // var element = $(elem);
            event.preventDefault();
            console.log("IN SUCCESS !");
          

            clstodo.registerUser();
        }
    });
});
 

$(function() {
    $("#login_form").validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 3
            }
        },
        messages: {
            email: {
                required: "Please enter email.",
                email: "Please enter valid email."
            },
            password: {
                required: "Please enter password",
                minlength: "Your password must be at least 3 characters long"
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            console.log("IN SUCCESS !");
            clstodo.validlogin();
        }
    });
});