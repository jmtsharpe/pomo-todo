const React = require('react');
const ApiUtil = require('./../../util/apiUtil');

var Timer = React.createClass({

	contextTypes: {
      router: React.PropTypes.object.isRequired
    },

	getInitialState: function () {
		return ({ minutes: 0, seconds: 5, paused: true, started: false, modal: false })
	},

	startTime: function () {
		this.setState({ started: true });
		this.setState({ paused: false });
		this.runTime();
	},

	decrementTime: function () {

		if (this.state.paused == false) {
				if (this.state.seconds > 0) {
				var seconds = this.state.seconds - 1;
				this.setState({seconds: seconds});
			} else if (this.state.minutes > 0) {
				var seconds = 59;
				var minutes = this.state.minutes - 1;
				this.setState({minutes: minutes});
				this.setState({seconds: seconds});	
			} else {
				this.endTime();
				this.removePomodoro();
			};
		};
	},

	runTime: function() {
		this.interval = setInterval (this.decrementTime, 1000);
	},

	endTime: function () {
		clearInterval(this.interval);
	},

	continueTime: function () {
		this.setState({ paused: false});
	},

	pauseTime: function () {
		this.setState({ paused: true });
	},

	removePomodoro: function () {
	    var task = this.props.task;
	    task["pomodoros"] = task["pomodoros"] - 1
	    task.id = this.props.task.id;
	    if (task["pomodoros"] > 0) {
	    	ApiUtil.editTask(task, this.props.task);
	    	this.setState({ minutes: 25, seconds: 0, paused: true, started: false });
		} else {
	    	this.finishTask();
		};
  	},

  	addPomodoro: function () {
  		var task = this.props.task;
  		task["pomodoros"] = 1;
  		console.log(task);
	   	ApiUtil.editTask(task, this.props.task);
	    this.setState({ minutes: 25, seconds: 0, paused: true, started: false, modal: false });

  	},

  	deleteTask: function () {
  		ApiUtil.deleteTask(this.props.task);
	    this.context.router.push('');
  	},

  	finishTask: function () {
  		this.setState({modal: true})
  	},


	render: function () {

		if ( !this.state.started ) {
			var button = <button onClick={this.startTime}>Start</button>
		} else if ( this.state.paused ) {
			var button = <button onClick={this.continueTime}>Continue</button>
		} else {
			var button = <button onClick={this.pauseTime}>Pause</button>
		};

		var minutes = this.state.minutes;

		var modal = ""

		if (this.state.modal) {
			modal = <div className="finish-task-modal">
						<button onClick={this.addPomodoro}>Continue</button>
						<button onClick={this.deleteTask}>Finish</button>
					</div>
		};



		if (this.state.seconds < 10) {
			var seconds = "0" + this.state.seconds;
		} else {
			var seconds = this.state.seconds
		};

		
		return (
			<div>
				<div> {minutes}:{seconds} </div>
				{button}
				{modal}
			</div>
		);
		
	}

});

module.exports = Timer;