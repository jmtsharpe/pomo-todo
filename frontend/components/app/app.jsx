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

  logout: function () {
    ApiUtil.logout(function () {
      this.context.router.push("/welcome");
    }.bind(this));
  },

  openTimer: function () {
    this.context.router.push('timer');
  },

  render: function () {

    return (
      <div>
        <header className="over-head group">
          <nav className="nav-bar group">
          
            <div className="over-head-logo">
            
              Pomo Todo
            </div>
            <div className="logout" onClick={this.logout}>
              Log Out
            </div>
          </nav>
        </header>
        <main className="main">
          <ul className="main-list group">
            <li className="main-child">
              <div>
                <h1>Welcome to Pomo Todo</h1>
                <p>Make tasks and assign 25 minute timers called "Pomodoros"</p>
                <p>Assign as many Pomodoros as you think you need to complete the task</p>
                <p> Or just start a timer and get to it.</p>
                <h2>LET'S POMO DO IT!</h2>
              </div>
              <button className="open-timer-button" onClick={this.openTimer}>Start a timer</button>
            </li>
            <li className="main-task-index"><div ><TaskIndex /></div></li>
          </ul>
          {this.props.children}
        </main>
      </div>
    );
  }
});

module.exports = App;
