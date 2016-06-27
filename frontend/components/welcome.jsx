var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('./../util/apiUtil');
var SignUpForm = require('./signUpForm');
var LoginForm = require('./loginForm');


var Welcome = React.createClass({

	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	goToLogin: function () {
    this.context.router.push('login');
  },

	goToSignUp: function () {
    this.context.router.push('signup');
  },

	render: function () {
		return (
			<div>
			<div className="first-main">
				<div className="main-page-logo">POMO TODO</div>
				<h1 className="main-blurb">
					POMO TODO is the pomodorro app for goer on the go
				</h1>

				<div className="second-main">
					<p>Log in or Sign up and get stuff done!</p>
					<div className="welcome-page-1">
						<SignUpForm />
					</div>
					<div className="welcome-page-2">
						<LoginForm />
					</div>
					</div>
				</div>
			</div>
			
		);

	}

});

module.exports = Welcome;
