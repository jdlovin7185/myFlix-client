import React from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
        password: <event className="target value"></event>
      });
    }

  handleSubmit(){
    const { username, password } = this.state;
    console.log(username, password);
    /*Sends a request to the server for authentication */
    /* then call this.props.onLoggedIn(username)*/
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username} 
          onChange={this.onUsernameChange}/>
        </label>
        <label>
          Password:
          <input type="text" value={this.state.password} 
          onChange={this.onPasswordChange}/>
        </label>
        <button type="button" 
        onChange={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}