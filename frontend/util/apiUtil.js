var TaskActions = require('../actions/taskActions.js');
var SessionActions = require('../actions/sessionActions.js');


module.exports = {

	fetchAllTasks: function (userId) {
  
    debugger
    $.ajax({
      url: "api/tasks",
      method: "GET",
      dataType: "json",
      data: {userId: userId},
      success: function (tasks) {
        debugger
      
        TaskActions.receiveAllTasks(tasks);
      },
      error: function (tasks) {
        return("fetchAllTasks#error");
      }
    });
  },

  createTask: function (task) {
  
    $.ajax({
      url: "api/tasks",
      method: "POST",
      data: {task: task},
      dataType: "json",
      success: function (task) {
        TaskActions.receiveSingleTask(task);
      }
    });
  },

	editTask: function (newTask, task) {
    $.ajax({
      url: "api/tasks/" + task.id,
      method: "PATCH",
      data: {task: newTask},
      dataType: "json",
      success: function (task) {
        TaskActions.receiveSingleTask(task);
      }
    });
  },

  deleteTask: function (task, user) {
    debugger
    $.ajax({
      url: "api/tasks/" + task.id,
      method: "DELETE",
      data: {task: task, userId: user.id},
      dataType: "json",
      success: function (tasks) {
      
        TaskActions.receiveAllTasks(tasks);
      }
    });
  },

  signUp: function(credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: {user: credentials},
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      }
    });
  },

  login: function(credentials, callback) {
    debugger
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function(currentUser) {
        debugger
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      }
    });
  },

  logout: function(callback) {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function() {
        SessionActions.logout();
        callback && callback();
      }
    });
  },

  fetchCurrentUser: function(completion) {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      complete: function() {
        completion && completion();
      }
    });
  }  
  
};
