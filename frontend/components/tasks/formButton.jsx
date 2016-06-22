var React = require('react');
var TaskForm = require('./form');

const enhanceWithClickOutside = require('react-click-outside');

// var OnClickOutside = require('react-onclickoutside');

var TaskFormButton = React.createClass({
// mixins: [OnClickOutside],
  getInitialState: function () {
    return { pressed: false };
  },

  isPressed: function () {
		this.setState({pressed: true});
	},

  handleClickOutside: function (e) {
    this.setState({ pressed: false});
  },




  render: function () {
  		if (!this.state.pressed) {
  			return(
          <div className="task-creation-button" onClick={this.isPressed}>
    				<p>Add a task..</p>
          </div>
  			);
  		}
      return(
        <div className="task-creation-div" onClick={this.isPressed}>
          <TaskForm
            boardId={this.props.boardId}
            cardId={this.props.cardId}
          />
        </div>
      );

  }

});

module.exports = enhanceWithClickOutside(TaskFormButton);
