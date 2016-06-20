var TaskActions = require('../actions/taskActions.js');

module.exports = {

	fetchAllTasks: function (board_id, card_id) {

    $.ajax({
      url: "api/boards/" + board_id + "/cards/" + card_id + "/tasks",
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
      url: "api/boards/" + board_id + "/cards/" + card_id + "/tasks",
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
      url: "api/boards/1/cards/" + task.card_id + "/tasks/" + task.id,
      method: "PATCH",
      data: {task: newTask},
      dataType: "json",
      success: function (task) {
        TaskActions.receiveSingleTask(task);
      }
    });
  },
};
