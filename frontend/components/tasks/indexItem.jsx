var React = require('react');
var TaskEditForm = require('./editForm');

var ApiUtil = require('./../../util/apiUtil');

var TaskStore = require('./../../stores/task');


var TaskIndexItem = React.createClass({


	getInitialState: function () {
	    return {
			pressed: false,
			subject: this.props.task.subject,
			pomodoros: this.props.task.pomodoros,
			task: this.props.task
		};
	},

    isPressed: function () {
		this.setState({pressed: !this.state.pressed});
	},

	handleClickOutside: function (e) {
    	this.setState({ pressed: false});
	},

	editTask: function (event) {

	    event.preventDefault();
	    var task = {};
	    Object.keys(this.state).forEach(function (key) {
	    	{ task[key] = this.state[key]; }
	    }.bind(this));
	    task.id = this.state.task.id;
	    ApiUtil.editTask(task, this.props.task);
	    this.setState({ pressed: false } );
  	},

  	 updatePomos: function (event) {
    debugger
    this.setState({ pomodoros: event.target.value})
    debugger
  },

  updateSubject: function (event) {
    this.setState({ subject: event.target.value})
  },

  render: function () {



		if (!this.state.pressed) {
			return (
				<div className="task-list-padding">
					<div className="task-list-item" onClick={this.isPressed}>
						<p>{this.state.subject}</p>
						<p>pomodoros: {this.props.task.pomodoros}</p>
					</div>
				</div>
			);
		}
    return (
      <div className="task-list-padding" >
        <div className="task-list-item" onClick={this.isPressed}>
          <p>{this.state.subject}</p>
        </div>
				<div className="overlay-back" onClick={this.isPressed} />
				<div className="edit-task">
	        <form className="task-edit-form" onSubmit={this.editTask}>
						<h3 className="edit-task-head">Edit Task</h3>
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
      </div>
    );
  }
});

module.exports = TaskIndexItem;
