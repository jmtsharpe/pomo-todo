var TaskActions = require('../actions/taskActions.js');

module.exports = {

	fetchAllTasks: function () {
    debugger

    $.ajax({
      url: "api/tasks",
      method: "GET",
      dataType: "json",
      success: function (tasks) {
        debugger
        TaskActions.receiveAllTasks(tasks);
      },
      error: function (tasks) {
        return("fetchAllTasks#error");
      }
    });
  },

  createTask: function (task, board_id, card_id) {
    debugger
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
};
