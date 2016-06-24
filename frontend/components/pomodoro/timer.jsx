const React = require('react');
const ApiUtil = require('./../../util/apiUtil');

var Timer = React.createClass({

	contextTypes: {
      router: React.PropTypes.object.isRequired
    },

	getInitialState: function () {
		return ({ minutes: 0, seconds: 30, paused: true, started: false, modal: false, progress: 1500, dial: -45 })
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
				var progress = (this.state.minutes * 60) + seconds;
				var dial = (360/1500) * (1500 - progress) - 45;
				this.setState({seconds: seconds, progress: progress, dial: dial});
			} else if (this.state.minutes > 0) {
				var seconds = 59;
				var minutes = this.state.minutes - 1;
				var progress = (minutes * 60) + seconds;
				var dial = (360/1500) * (1500 - progress) - 45;
				this.setState({
					minutes: minutes, 
					seconds: seconds, 
					progress: progress,
					dial: dial
				});
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

	    if (task["pomodoros"] > 1) {
		    task["pomodoros"] = task["pomodoros"] - 1;
	    	ApiUtil.editTask(task, this.props.task);
	    	this.setState({ minutes: 25, seconds: 0, paused: true, started: false, dial: -45 });
		} else {
	    	this.finishTask();
		};
  	},

  	addPomodoro: function () {
	    this.setState({ minutes: 25, seconds: 0, paused: true, started: false, modal: false, dial: -45 });
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
			var button = <button className="clock-multi-button" onClick={this.startTime}>Start</button>
		} else if ( this.state.paused ) {
			var button = <button className="clock-multi-button" onClick={this.continueTime}>Continue</button>
		} else {
			var button = <button className="clock-multi-button" onClick={this.pauseTime}>Pause</button>
		};


		var modal = ""

		if (this.state.modal) {
			modal = <div className="finish-task-modal">
						<div className="clock-end-buttons-container">
						<button className="clock-end-buttons" onClick={this.addPomodoro}>Continue</button>
						<button className="clock-end-buttons" onClick={this.deleteTask}>Finish</button>
						</div>
					</div>
		};


		if (this.state.minutes < 10) {
			var minutes = "0" + this.state.minutes;
		} else {
			var minutes = this.state.minutes
		};

		if (this.state.seconds < 10) {
			var seconds = "0" + this.state.seconds;
		} else {
			var seconds = this.state.seconds
		};

		var progress = this.state.progress

		if ( this.state.progress < 375 ) {
			var progressBarCover = {
				borderTop: '10px solid transparent',
				borderRight: '10px solid white',
				borderLeft: '10px solid white',
				borderBottom: '10px solid white'
			};
		} else if ( this.state.progress < 750 ) {
			var progressBarCover = {
				borderTop: '10px solid transparent',
				borderRight: '10px solid white',
				borderBottom: '10px solid white'
			};
		} else if (this.state.progress < 1125 ) {
			var progressBarCover = {
				borderTop: '10px solid transparent',
				borderRight: '10px solid white'
			};
		};


		var rotater = {
			transform: 'rotate(' + this.state.dial + 'deg)'
		};

		console.log(this.state)
		
		return (
			<div className="pomodoro-container">
				<div className="pomodoro">
				{this.props.task.pomodoros}
				<div className="leaves">
					<div className="leaf-1"></div>
					<div className="leaf-2"></div>
					<div className="leaf-3"></div>
					<div className="leaf-4"></div>
					<div className="leaf-5"></div>
				</div>
				</div>

				<div className="clock"> 
					{minutes}:{seconds} 
					<div className="progress-bar">
					<div className="progress-bar-cover" style={progressBarCover}></div>
					<div className="progress-bar-1" style={rotater}></div>
					<div className="progress-blank"></div>
				</div>
				</div>				
				{button}
				{modal}
			</div>
		);
		
	}

});

module.exports = Timer;