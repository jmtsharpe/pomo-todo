var React = require('react');
var ApiUtil = require('../../util/apiUtil');



var TaskIndexItem = require('./../tasks/indexItem');
var TaskFormButton = require('./../tasks/formButton');

var TaskStore = require('./../../stores/task');
var SessionStore = require('./../../stores/session.js');
var Timer = require('./../pomodoro/timer.jsx');


var TaskIndex = React.createClass({

	contextTypes: {
      router: React.PropTypes.object.isRequired
    },

	getInitialState: function () {
		return ({ pressed: false, tasks: []});
	},

	isPressed: function () {
		this.setState({pressed: true });
	},

	notPressed: function () {
		this.setState({pressed: false});
	},

	componentDidMount: function () {
		this.taskListener = TaskStore.addListener(this._onChange);
		var user = SessionStore.currentUser();
		ApiUtil.fetchAllTasks(user.id);
	},

	_onChange: function () {
		var tasks = TaskStore.all();
    	this.setState({ tasks: tasks });
  	},

	componentWillUnmount: function () {
		this.taskListener.remove();
	},

  	render: function () {
  		if (this.state.tasks.length > 0 ) {
  			var tasks = []
  			this.state.tasks.map(function (task) {
				tasks.push(<li className="task-list-item-container"><TaskIndexItem  task={task} /></li>)
				
			});
  		};

		return ( 
				<li className="task-index-container group" >
					<div className="task-index" >
						<ul>
							{tasks}
						</ul>
						<TaskFormButton
							className="task-creation-div"
						/>
					</div>
				</li>
			);


	}	
  }
);

module.exports = TaskIndex;
