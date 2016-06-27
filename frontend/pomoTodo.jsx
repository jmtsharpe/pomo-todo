const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const ApiUtil = require('./util/apiUtil.js');
var hashHistory = require('react-router').hashHistory;


var TaskIndex = require('./components/tasks/index.jsx');
var TaskIndexItem = require('./components/tasks/indexItem.jsx');
var TaskShow = require('./components/tasks/show.jsx');
var App = require('./components/app/app.jsx');

var LoginForm = require('./components/loginForm');
var SignUpForm = require('./components/signUpForm');
var Welcome = require('./components/welcome');
var Timer = require('./components/pomodoro/timer.jsx');

var SessionStore = require("./stores/session");


var routes = (
  <Route path="/" component={App} onEnter={_requireLoggedIn}>
    <Route path="tasks/:id" component={TaskShow} onEnter={_requireLoggedIn}/>
    <Route path="timer" component={Timer} onEnter={_requireLoggedIn}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
  	<main>
	  	<Router history={hashHistory}>
	  		{routes}
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
	  	</Router>
  	</main>, 
  	document.getElementById('root')
  );
});

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/welcome");
    }

    asyncCompletionCallback();
  }
}
