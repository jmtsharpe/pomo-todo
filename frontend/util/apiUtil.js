var TaskActions = require('../actions/taskActions.js');

module.exports = {

	fetchAllTasks: function () {
  

    $.ajax({
      url: "api/tasks",
      method: "GET",
      dataType: "json",
      success: function (tasks) {
      
        TaskActions.receiveAllTasks(tasks);
      },
      error: function (tasks) {
        return("fetchAllTasks#error");
      }
    });
  },

  createTask: function (task, board_id, card_id) {
  
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

  deleteTask: function (task) {
    $.ajax({
      url: "api/tasks/" + task.id,
      method: "DELETE",
      data: {task: task},
      dataType: "json",
      success: function (tasks) {
      
        TaskActions.receiveAllTasks(tasks);
      }
    });
  }  
  
};
