var React = require('react');
var ApiUtil = require('../../util/apiUtil');



var TaskIndexItem = require('./../tasks/indexItem');
var TaskFormButton = require('./../tasks/formButton');

var TaskStore = require('./../../stores/task');

// var LinkedStateMixin = require('react-addons-linked-state-mixin');
// var OnClickOutside = require('react-onclickoutside');

var TaskIndex = React.createClass({
	// mixins: [OnClickOutside, LinkedStateMixin],

	getInitialState: function () {
		return ({ pressed: false });
	},

	isPressed: function () {
		this.setState({pressed: true });
	},

	notPressed: function () {
		this.setState({pressed: false});
	},

	componentWillReceiveProps: function (newProps) {
    this.setState({ card: newProps.card, subject: newProps.card.subject })
  	},

	_onChange: function () {
		ApiUtil.fetchAllCards(this.props.card.board_id);
	},


	componentDidMount: function () {
		this.taskListener = TaskStore.addListener(this._onChange);
	},

	componentWillUnmount: function () {
		this.taskListener.remove();
	},

	handleClickOutside: function (e) {
	    this.setState({ pressed: false });
	},

	// editCard: function (event) {
 //    event.preventDefault();
 //    var card = {};
 //    Object.keys(this.state).forEach(function (key) {
 //      { card.subject = this.state.subject; }
 //    }.bind(this));
 //    card.id = this.props.card.id;
	// 	card.boardId = this.props.card.board_id;
 //    ApiUtil.editCard(card);
 //    this.setState({ pressed: false });
 //  },

  render: function () {

		return ( 
			<li className="task-index-container" >
				<div className="task-index" >
	    			<h2 onClick={this.isPressed} className="card-title">

					</h2>
					<ul>
					</ul>
					<TaskFormButton
						className="task-creation-div"
					/>
				</div>
			</li>
		)
	}	
  }
);

module.exports = TaskIndex;
