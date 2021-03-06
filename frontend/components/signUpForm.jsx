var React = require('react');
var ApiUtil = require('../util/apiUtil');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

	goToLogin: function () {
    this.context.router.push('login');
  },

  render: function() {
    return (

			<main className="sign-up-main">
				<div className="sign-up-header">
					<h1>Please Sign Up</h1>
				</div>
				<div className="sign-up-containter">


					<form className="sign-up-form" onSubmit={this.handleSubmit}>

						<label className="sign-up-label" htmlFor="name">Userame</label>
						<br />
						<input
              className="sign-up-input"
              onChange={this.updateName}
              type="text"
              value={this.state.name}
            />

						<br />
						<label className="sign-up-label" htmlFor="password">Password</label>
						<br />
						<input
              className="sign-up-input"
              onChange={this.updatePassword}
              type="password"
              value={this.state.password}
            />
						<br />
						<button className="submit">Submit</button>
					</form>
				</div>
			</main>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var user = {};

    Object.keys(this.state).forEach(function (key) {
      { user[key] = this.state[key]; }
    }.bind(this));

    var router = this.context.router;

    ApiUtil.signUp(user, function() {
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

module.exports = SignUpForm;
