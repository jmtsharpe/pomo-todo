var React = require('react');
var History = require('react-router').History;
var TaskStore = require('./../../stores/task');

var ApiUtil = require('./../../util/apiUtil');
var TaskIndex = require('./../tasks/index.jsx');



var App = React.createClass({
  	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

	getInitialState: function () {
		return { children: this.props.children };
	},

  	goHome: function () {
      	this.context.router.push('');
    },



 

  render: function () {

  	debugger
    return (
      <div>
        <header className="over-head group">
          <nav className="nav-bar">
            
            
            <div className="over-head-logo" onClick={this.goHome}>
              Pomo Todo
            </div>
          </nav>
        </header>
        <TaskIndex />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
