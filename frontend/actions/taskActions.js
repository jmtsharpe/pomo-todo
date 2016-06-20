var Dispatcher = require('../dispatcher/dispatcher.js');
var TaskConstants = require('../constants/taskConstants.js');

module.exports = {
  receiveAllTasks: function (tasks) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASKS_RECEIVED,
      tasks: tasks
    });
  },

  receiveSingleTask: function (task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_RECEIVED,
      task: task
    });
  }
};
