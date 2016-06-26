var React = require('react');
var ApiUtil = require('../util/apiUtil');
var SignUpForm = require('./signUpForm');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

	goToSignUp: function () {
    this.context.router.push('signup');
  },

  render: function() {
    return (
			<main className="login-main">
				<div className="login-header">
					<h1>Login</h1>
				</div>
				<div className="login-containter">


					<form className="login-form" onSubmit={this.handleSubmit}>

						<label className="login-label" htmlFor="name">Username</label>
						<br />
						<input
              className="login-input"
              onChange={this.updateName}
              type="text"
              value={this.state.name}
            />

						<br />
						<label className="login-label" htmlFor="password" >Password</label>
						<br />
						<input
              className="login-input"
              onChange={this.updatePassword}
              type="password"
              value={this.state.password}
            />
						<br />
						<button className="submit">Submit</button>
					</form>
				</div>
				<div>
					<p>Don't have an account?</p>
					<button className="submit" onClick={this.goToSignUp}>Sign Up!</button>
				</div>
			</main>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;

    ApiUtil.login(this.state, function() {
      router.push("/");
    });
  },

  updateName: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  }

});

module.exports = LoginForm;
