var React = require('react');
var ApiUtil = require('../../util/apiUtil');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');

var TaskForm = React.createClass({
  // contextTypes: {
  //     router: React.PropTypes.object.isRequired
  //   },
  // mixins: [LinkedStateMixin],

  blankAttrs: {
    subject: '',
    card_id: ''
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  createTask: function (event) {
    event.preventDefault();
    var task = {};
    Object.keys(this.state).forEach(function (key) {
      { task[key] = this.state[key]; }
    }.bind(this));
    task.card_id = this.props.cardId;
    ApiUtil.createTask(task, this.props.boardId, this.props.cardId);
    this.setState(this.blankAttrs);
  },


  render: function () {
    return(
      <div className="create-form">
        <form className='new-task' onSubmit={this.createTask}>
          <textarea
            className="task-form-field"
            type='text'
            id='task_subject'
            valueLink={this.linkState("subject")}
          />
          <br />
  				<button className="submit">Save</button>
        </form>
      </div>
    );
  }
});

module.exports = TaskForm;
