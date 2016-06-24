var React = require('react');
var ApiUtil = require('../../util/apiUtil');



var TaskIndexItem = require('./../tasks/indexItem');
var TaskFormButton = require('./../tasks/formButton');

var TaskStore = require('./../../stores/task');

var TaskIndex = React.createClass({

	getInitialState: function () {
		return ({ pressed: false, tasks: [] });
	},

	isPressed: function () {
		this.setState({pressed: true });
	},

	notPressed: function () {
		this.setState({pressed: false});
	},

	componentDidMount: function () {
		this.taskListener = TaskStore.addListener(this._onChange);
		ApiUtil.fetchAllTasks();
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
