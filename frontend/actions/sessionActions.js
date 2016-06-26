var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/sessionConstants');

var SessionActions = {

  currentUserReceived: function(currentUser) {
		AppDispatcher.dispatch({
      actionType: SessionConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;