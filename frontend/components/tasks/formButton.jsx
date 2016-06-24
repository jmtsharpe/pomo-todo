var React = require('react');
var TaskForm = require('./form');
var ApiUtil = require('../../util/apiUtil');


const enhanceWithClickOutside = require('react-click-outside');

// var OnClickOutside = require('react-onclickoutside');

var TaskFormButton = React.createClass({
// mixins: [OnClickOutside],
  getInitialState: function () {
    return { pressed: false, subject: event.target.value, pomodoros: null };
  },

  isPressed: function () {
		this.setState({pressed: true});
	},

  handleClickOutside: function (e) {
    this.setState({ pressed: false});
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
    this.setState({ pressed: false, subject: "" });
  },

  updatePomos: function (event) {
    this.setState({ pomodoros: event.target.value})
  },

  updateSubject: function (event) {
    this.setState({ subject: event.target.value})
  },




  render: function () {
  		if (!this.state.pressed) {
  			return(
          <div className="task-creation-button" onClick={this.isPressed}>
    				<p>Add a task..</p>
          </div>
  			);
  		}
      return(
        
          <div className="create-form" onClick={this.isPressed}>
            <form className='new-task' onSubmit={this.createTask}>
              <h1>What is your task?</h1>
            
              <textarea
                className="task-form-field"
                type='text'
                id='task_subject'
                onChange={this.updateSubject}
                value={this.state.subject}
              />
              <br />
              <h1>How many pomodoros will it take?</h1>
              
              <input
              className="pomo-number" 
              type="number" 
              step="1" 
              id="pomodoro-amount" 
              onChange={this.updatePomos} 
              value={this.state.pomodoros} />
              <br />
              <button className="submit">Save</button>
            </form>
          </div>
        
      );

  }

});

module.exports = enhanceWithClickOutside(TaskFormButton);
