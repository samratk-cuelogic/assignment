var clsTaskTodo = (function() {

    var services = {};
    var get_todos = function() {
        var todos = new Array;
        var todos_str = localStorage.getItem('todo');
        if (todos_str !== null) {
            todos = JSON.parse(todos_str);
            var loginUser1 = JSON.parse(localStorage.getItem('loginUser'));
            todos = todos.filter(function(el) {
                return el.itemId == loginUser1.itemId
            });
        }
        return todos;
    }

    var get_todos_by_id = function(id) {
        var todos = new Array;
        var todos_str = localStorage.getItem('todo');
        if (todos_str !== null) {
            todos = JSON.parse(todos_str);
        }
        return todos[id];
    }
    var editTask = function(id) {

        var todorow = get_todos_by_id(id);
        //console.log(todorow);
        $('#task').val(todorow.task);
        $('#due_date_task').val(todorow.due_date);

        $("#btncancel").show();
        $("#add").text("Update");
        $("#hidden_taskid").val(id);
        document.documentElement.scrollTop = 0;

    }
    var updateTask = function() {
        console.log('updateTask');

        var id = $('#hidden_taskid').val();
        var todos = get_todos();
        todos[id].task = $('#task').val();
        todos[id].due_date = $('#due_date_task').val();
        console.log(todos[id]);
        localStorage.setItem('todo', JSON.stringify(todos));
        show();
        return false;
        //todos.splice(id, 1);  
    }
    var add = function() {

        var task = document.getElementById('task').value;
        if (!task) {
            $('#span_task').html("Task is required.");
            $('#span_task').css("color", "red");
            setTimeout(function() { $('#span_task').html('');; }, 3000);
            return false;
        }

        var due_date_task = document.getElementById('due_date_task').value;
        if ($("#hidden_taskid").val() > 0) {
            var id = $("#hidden_taskid").val();
            updateTask();
            return;
        }
        var loginUser1 = JSON.parse(localStorage.getItem('loginUser'));
        tasktodo = {
            itemId: loginUser1.itemId,
            task: task,
            due_date: due_date_task,
            isDone: 0,
            isPending: 1
        };
        console.log(loginUser1);
        var todos = get_todos();
        todos.push(tasktodo);
        localStorage.setItem('todo', JSON.stringify(todos));
        show();
        $('#task').val('');
        $('#due_date_task').val('');
        return false;
    }
    var markAsComplete = function(id) {
        var todos = clsTaskTodo.get_todos();
        todos[id].isDone = (todos[id].isDone) ? 0 : 1;
        todos[id].isPending = (todos[id].isPending) ? 0 : 1;
        localStorage.setItem('todo', JSON.stringify(todos));
        clsTaskTodo.show();
        return false;
    }
    var listTodo = function(todos) {
        var html = ' <ul id="tasksUL" class="list-group">';
        for (var i = 0; i < todos.length; i++) {
            var status = (todos[i].isDone) ? 'completed' : 'inprogress';
            var due_date = (todos[i].due_date) ? 'Date :' + todos[i].due_date : '';
            // var statusColor=(todos[i].isDone)?'completed':'inprogress';
            html += '<li class="list-group-item"><a href="#">' + todos[i].task + '</a> &nbsp; <span class="" style="font-size:12px;"> ' + due_date + '</span>&nbsp; <i class="fa fa-close remove pull-right" title="Remove Item"  id="' + i + '"style="font-size:24px"></i> &nbsp;<i class="fa fa-edit pull-right" style="font-size:24px" onclick="clsTaskTodo.editTask(' + i + ')"></i> <span class="badge badge-primary badge-pill pull-right" onclick="clsTaskTodo.markAsComplete(' + i + ')">' + status + '</span>&nbsp;';
        };

        html += '</ul>';

        document.getElementById('todos').innerHTML = html;

        var buttons = document.getElementsByClassName('remove');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', clsTaskTodo.remove);
        };
    }
    var show = function() {
        var todos = clsTaskTodo.get_todos();
        listTodo(todos);
    }

    var remove = function() {
        var id = this.getAttribute('id');
        var todos = get_todos();
        todos.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(todos));

        show();
        return false;
    }

    var filterdata = function(con) {
        var filteredList;
        var todos = get_todos();
        if (con != 'all') {
            filteredList = todos.filter(function(el) {
                return el.isDone == con
            });

        } else {
            filteredList = todos;
        }
        listTodo(filteredList);
        console.log(filteredList);
    }

    //-----------------------
    var searchTasks = function() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("tasksUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    var sortTaskList = function() {
        var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
        list = document.getElementById("tasksUL");
        switching = true;
        dir = "asc";
        while (switching) {

            switching = false;
            b = list.getElementsByTagName("LI");

            for (i = 0; i < (b.length - 1); i++) {

                shouldSwitch = false;

                if (dir == "asc") {
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {

                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {

                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {

                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    /***Return***/
    services.get_todos = get_todos;
    services.editTask = editTask;
    services.show = show;
    services.filterdata = filterdata;
    services.remove = remove;
    services.add = add;
    services.sortTaskList = sortTaskList;
    services.searchTasks = searchTasks;
    services.markAsComplete = markAsComplete;

    return services;

})();


var clsProfile = (function() {

    var services = {};
    var loginUser = JSON.parse(localStorage.getItem('loginUser'));
    var show_profile = function() {
        $('#rg_email').html(loginUser.email);
        $('#rg_name').html(loginUser.first_name + ' ' + loginUser.last_name);
        $('#rg_gender').html(loginUser.gender);
        $('#rg_address').html(loginUser.address);
        //    $('#rg_prof_pic').html(loginUser.prof_pic); 
    }

    var checkLogin = function() {
        if ((!localStorage.getItem('islogin')) || localStorage.getItem('islogin') == 0) {
            window.location = "login.html";
        }
    }
    var profileUpdate = function() {
        var allEntrieschk = clsLocalStore.getData(); //JSON.parse(localStorage.getItem('allEntries')) ;
        var row_index = '';
        console.log('loginUser.itemId : ' + loginUser.itemId);

        row_index = allEntrieschk.findIndex((obj => obj.itemId == loginUser.itemId));

        allEntrieschk[row_index].email = $('#email').val();
        allEntrieschk[row_index].first_name = $('#first_name').val();
        allEntrieschk[row_index].last_name = $('#last_name').val();
        allEntrieschk[row_index].address = $('#address').val();
        allEntrieschk[row_index].gender = $("input[name='gender']").val();

        prof_pic = document.getElementById('prof_pic');
        var imgData = '';
        console.log(prof_pic.src);
        imgData = '';
        // if(prof_pic.src)
        // {
        // 	imgData = getBase64Image(prof_pic);
        // }
        allEntrieschk[row_index].prof_pic = imgData;

        localStorage.setItem('loginUser', JSON.stringify(allEntrieschk[row_index]));
        loginUser = allEntrieschk[row_index];
        //localStorage.setItem("allEntries", JSON.stringify(allEntrieschk)); 
        clsLocalStore.setAllEntries(allEntrieschk);
        //console.log(localStorage.getItem('allEntries'));

        $('#shmsg').html("Profile Updated successfully!");
        $('#shmsg').css('color', 'green');
        show_profile();
        setTimeout(function() { $('#shmsg').html(''); }, 3000);
        $('#profile_cancel').click();
    }
    var editProfile = function() {
        $('.rg_edit_view').show();
        $('.rg_view').hide();
        console.log(loginUser);
        $('#email').val(loginUser.email);
        //$('#gender').html(loginUser.gender);
        $('#first_name').val(loginUser.first_name);
        $('#last_name').val(loginUser.last_name);

        $('#address').val(loginUser.address);
        $("input[name=gender][value=" + loginUser.gender + "]").prop('checked', true);
    }

    /***return***/
    services.show_profile = show_profile;
    services.checkLogin = checkLogin;
    services.profileUpdate = profileUpdate;
    services.editProfile = editProfile;
    return services;

})();


$('#btnlogout').click(function() {
    console.log('btnlogout');
    localStorage.setItem('loginUser', 0);
    localStorage.setItem('islogin', 0);
    window.location = "login.html";
});


$('#btncancel').click(function() {
    $('#task').val('');
    $('#due_date_task').val('');
    $("#hidden_taskid").val(0);
    $("#add").text("Add");
    $("#btncancel").hide();
});
 

document.getElementById('add').addEventListener('click', clsTaskTodo.add);
clsTaskTodo.show();


$(function() {
    // check login 
    clsProfile.checkLogin();
    clsProfile.show_profile();
});

/*
 * Show Profile
 */



/*
 * Edit Profile
 */
var loginUser = JSON.parse(localStorage.getItem('loginUser'));
$('#edit_profile').click(function() {

    clsProfile.editProfile();

});

$('#profile_cancel').click(function() {
    $('.rg_edit_view').hide();
    $('.rg_view').show();
});

/*
 *   Profile Update
 */
$('#profile_update').click(function() {

    clsProfile.profileUpdate();

});