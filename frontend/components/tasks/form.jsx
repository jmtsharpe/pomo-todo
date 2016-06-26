var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var SessionStore = require('./../../stores/session.js');

var TaskForm = React.createClass({

  blankAttrs: {
    subject: ''
  },

  getInitialState: function () {
    return {subject: event.target.value, pomodoros: 0};
  },

  createTask: function (event) {
    event.preventDefault();
    var task = {};
    Object.keys(this.state).forEach(function (key) {
      { task[key] = this.state[key]; }
    }.bind(this));
    task.card_id = this.props.cardId;
    ApiUtil.createTask(task, this.props.boardId, this.props.cardId);
    this.setState(this.blankAttrs);
  },

  updatePomos: function (event) {
    this.setState({ pomodoros: event.target.value})
  },

  updateSubject: function (event) {
    this.setState({ subject: event.target.value})
  },

  render: function () {
    return(
      <div className="create-form">
        <form className='new-task' onSubmit={this.createTask}>
          <textarea
            className="task-form-field"
            type='text'
            id='task_subject'
            onChange={this.updateSubject}
            value={this.state.subject}
          />
          <br />
          <input type="number" step="1" id="pomodoro-amount" onChange={this.updatePomos} value={this.state.pomodoros} />
  				<button className="submit">Save</button>
        </form>
      </div>
    );
  }
});

module.exports = TaskForm;
