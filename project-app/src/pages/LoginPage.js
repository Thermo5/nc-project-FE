import React from 'react';
import OnLoad from '../components/OnLoad';
import { fetchUsers } from '../api';

class LoginPage extends React.Component {
  state = {
    users: [],
    userId: '',
    loading: true
  }

  componentDidMount() {
    fetchUsers()
      .then(users => this.setState({ users, loading: false }));
  }

  handleUserChange = (event) => {
    this.setState({ userId: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.user.value;
    const user = this.state.users.filter(user => user.id == id);
    this.props.setAppUser(user[0]);
  }


  render() {
    const { users, userId, loading } = this.state;
    return (
      <div id="login-box">
        <h1>Login</h1>
        {loading ? <OnLoad /> : (
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">User:</label>
              <div className="control">
                <div className="select">
                  <select name="user" onChange={this.handleUserChange} value={userId}>
                    <option value="" disabled>Select your option</option>
                    {users.map((user, i) => {
                      return <option key={i} value={user.id}>{user.first_name} {user.surname}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <button className="button is-success is-rounded">Login</button>
          </form>
        )}
      </div>
    )
  }
}

export default LoginPage;