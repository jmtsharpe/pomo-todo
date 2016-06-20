var React = require('react');
var TaskEditForm = require('./editForm');
// var OnClickOutside = require('react-onclickoutside');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('./../../util/apiUtil');
// var Modal = require('react-modal');
// var App = require('./../app/app');
var TaskStore = require('./../../stores/task');
// CardStore = require('./../../stores/card');


var TaskIndexItem = React.createClass({
	// mixins: [OnClickOutside, LinkedStateMixin],

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState: function () {
    return {
			pressed: false,
			subject: this.props.task.subject,
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

  render: function () {



		if (!this.state.pressed) {
			return (
				<div className="task-list-padding">
					<div className="task-list-item" onClick={this.isPressed}>
						<p>{this.state.subject}</p>
					</div>
				</div>
			);
		}
    return (
      <div className="task-list-padding" >
        <div className="task-list-item" onClick={this.isPressed}>
          <p>{this.props.task.subject}</p>
        </div>
				<div className="overlay-back" onClick={this.isPressed} />
				<div className="edit-task">
	        <form className="task-edit-form" onSubmit={this.editTask}>
						<h3 className="edit-task-head">Edit Task</h3>
	          <textarea
	            className="task-form-field"
	            type='text'
	            id='task_subject'
	            valueLink={this.linkState("subject")}
	          />
	          <br />
	  				<button className="submit">Save</button>
	        </form>
	      </div>
      </div>
    );
  }
});

module.exports = TaskIndexItem;
