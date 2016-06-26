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

  logout: function () {
    ApiUtil.logout(function () {
      this.context.router.push("/welcome");
    }.bind(this));
  },



 

  render: function () {

    return (
      <div>
        <header className="over-head group">
          <nav className="nav-bar">
            
            
            <div className="over-head-logo" onClick={this.goHome}>
              Pomo Todo
            </div>
            <div className="logout" onClick={this.logout}>
              Log Out
            </div>
          </nav>
        </header>
        <main className="main">
        {this.props.children}
        <TaskIndex />
        </main>
      </div>
    );
  }
});

module.exports = App;
