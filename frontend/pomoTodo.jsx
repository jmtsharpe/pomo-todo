const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;


var TaskIndex = require('./components/tasks/index.jsx');
var TaskIndexItem = require('./components/tasks/indexItem.jsx');
var TaskShow = require('./components/tasks/show.jsx');
var App = require('./components/app/app.jsx');

// var MyComponent = React.createClass({
//   render() {
//     return(
//       <div>I'm ALIVE!</div>
//     );
//   }
// });

var routes = (
  <Route path="/" component={App}>
    <Route path="tasks/:id" component={TaskShow} />
  </Route>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
  	<main>
	  	<Router history={hashHistory}>
	  		{routes}
	  	</Router>
  	</main>, 
  	document.getElementById('root')
  );
});
