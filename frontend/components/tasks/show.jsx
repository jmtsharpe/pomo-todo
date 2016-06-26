const React = require('react');
const ApiUtil = require('./../../util/apiUtil');
var TaskStore = require('./../../stores/task.js');
var Timer = require('./../pomodoro/timer.jsx');
var SessionStore = require('./../../stores/session.js');

var ShowTask = React.createClass({
	getInitialState: function () {
    	return {task: TaskStore.find(this.props.params.id) };
  	},

  	_onChange: function () {
  		debugger
    	this.setState({
      		task: TaskStore.find(this.props.params.id)
    	});
  	},

	componentWillReceiveProps: function (newProps) {
		this.setState({ task: TaskStore.find(this.props.params.id) })
	},

  	componentDidMount: function () {
  		debugger
		this.taskListener = TaskStore.addListener(this._onChange);
  	},

  	componentWillUnmount: function () {
    	this.taskListener.remove();
  	},

	render: function () {
		debugger
		if (this.state.task) {
			return (
				<div className="task-container group">
					
						<Timer task={this.state.task} />
				</div>

			);
		};
		return (
			<div>Task Show Page</div>

		);
	}
});

module.exports = ShowTask;
