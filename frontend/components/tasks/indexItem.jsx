var React = require('react');
var TaskEditForm = require('./editForm');
var SessionStore = require('./../../stores/session.js');

const enhanceWithClickOutside = require('react-click-outside');

var ApiUtil = require('./../../util/apiUtil');

var TaskStore = require('./../../stores/task');


var TaskIndexItem = React.createClass({

	contextTypes: {
      router: React.PropTypes.object.isRequired
    },

	getInitialState: function () {
	    return {
			edit: false,
			subject: this.props.task.subject,
			pomodoros: this.props.task.pomodoros,
			task: this.props.task
		};
	},

    openEdit: function () {
		this.setState({ edit: true });
	},

	handleClickOutside: function (e) {
    	this.setState({ edit: false});
	},

	showDetail: function () {
      this.context.router.push('tasks/' + this.props.task.id);
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
    
    	this.setState({ pomodoros: event.target.value})
   
  	},

  	updateSubject: function (event) {
    	this.setState({ subject: event.target.value})
  	},

  	deleteTask: function () {
  		var user = SessionStore.currentUser();
  		ApiUtil.deleteTask(this.props.task, user);
	    this.context.router.push('');
  	},

  render: function () {



		if (!this.state.edit) {
			return (
				<div className="task-list-padding">
					<div className="task-list-item" >
						<button onClick={this.deleteTask}>x</button>
						<ul className="index-item-props group">
							<li className="index-item-subject">{this.state.subject}</li>
							<li className="index-item-pomodoros">pomodoros: {this.props.task.pomodoros}</li>
						</ul>
						<button className="task-button" onClick={this.openEdit}>Edit</button>
						<button className="task-button" onClick={this.showDetail}>Start</button>
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

module.exports = enhanceWithClickOutside(TaskIndexItem);
