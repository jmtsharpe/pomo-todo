var React = require('react');
var ApiUtil = require('../../util/apiUtil');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
// var App = require('./../app/app');

var EditTaskForm = React.createClass({
  // contextTypes: {
  //     router: React.PropTypes.object.isRequired
  //   },
  // mixins: [LinkedStateMixin],

  blankAttrs: {
    subject: '',
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  editTask: function (event) {
    event.preventDefault();
    var task = {};
    Object.keys(this.state).forEach(function (key) {
      { task[key] = this.state[key]; }
    }.bind(this));
    task.id = this.props.task.id;
    ApiUtil.editTask(task, this.props.task);
    this.setState(this.blankAttrs);
  },

	componentDidMount: function () {
		this.setState({subject: this.props.defaultValue});
	},


  render: function () {
    return(

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
    );
  }
});

module.exports = EditTaskForm;
