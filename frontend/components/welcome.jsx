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
					<div className="main-page-logo">Mello</div>
					<h1 className="main-blurb">
						Mello is the like totally free, flexible, and visual way to like organize stuff.
					</h1>

					<button className="submit main-submit" onClick={this.goToSignUp}>
						Sign Up it's like, FREE!
					</button>
					<br />
					<button className="login" onClick={this.goToLogin}>
						Login...
					</button>
				</div>
				<div className="second-main"></div>

				<footer>
					if you are reading this, that means I'm already dead...
				</footer>
			</div>
		);

	}

});

module.exports = Welcome;
