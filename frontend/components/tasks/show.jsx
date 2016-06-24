const React = require('react');
const ApiUtil = require('./../../util/apiUtil');
var TaskStore = require('./../../stores/task.js');
var Timer = require('./../pomodoro/timer.jsx');

var ShowTask = React.createClass({
	getInitialState: function () {
    	return {task: TaskStore.find(this.props.params.id) };
  	},

  	_onChange: function () {
    	this.setState({
      		task: TaskStore.find(this.props.params.id)
    	});
  	},

	componentWillReceiveProps: function (newProps) {
		this.setState({ task: TaskStore.find(this.props.params.id) })
	},

  	componentDidMount: function () {
		this.taskListener = TaskStore.addListener(this._onChange);
    	ApiUtil.fetchAllTasks(this.props.params.id);
  	},

  	componentWillUnmount: function () {
    	this.taskListener.remove();
  	},

	render: function () {
		if (this.state.task) {
			return (
				<div className="task-container group">
					<div className="task-sidebar">
						<div>{this.state.task.subject}</div>
						<div>{this.state.task.pomodoros}</div>
					</div>
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
