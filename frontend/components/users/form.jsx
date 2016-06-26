var React = require('react');

UserForm = React.creatClass({

  render: function () {
    return(
      <div>
        <h2>Sign Up</h2>

        <form action="<%= users_url %>" method="post">
          <%= auth_token_input %>
          <label>
            Username
            <input type="text" name="user[username]" value="">
          </label>

          <label>
            Password
            <input type="password" name="user[password]" value="">
          </label>

          <input type="submit" value="Sign Up">
        </form>
      </div>
    }
  )


});
