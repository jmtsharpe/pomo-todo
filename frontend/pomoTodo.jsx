const React = require('react');
const ReactDOM = require('react-dom');

var Index = require('./components/tasks/index.jsx');

// var MyComponent = React.createClass({
//   render() {
//     return(
//       <div>I'm ALIVE!</div>
//     );
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
