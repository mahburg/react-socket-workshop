import React, { Component } from 'react';
// import { socketConnect } from 'socket.io-react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      name: '',
      message: '',
      users: [],
      messages: []
    }
  }

  componentDidMount(){
    //add socket.on functions
  }

  login(e){
    e.preventDefault()
    //add emit
  }

  sendMsg(e){
    e.preventDefault()
    //add emit
  }

  handleInput(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { users, messages} = this.state;
    
    const displayUsers = users.map((user, i)=><div className='user' key={i}>{user.name}</div>)

    let displayMsg = messages.map((msg, i)=><div className='message' key={i}><span>{msg.timestamp}→</span> <span>{msg.name}:</span><span>{msg.msg}</span></div>)
    displayMsg.reverse();

    return (
      <div className="App">
        <header>
          React Sockets Workshop
        </header>
        {
          this.state.loggedIn
          ?
          <div className="main-content">
            <section className="users-box">
              
              <div className="users-list">
                {displayUsers}
              </div>
            </section>
            <section className="chat-area">
              <div className="message-area">
                {displayMsg}
              </div>
              <form onSubmit={e=>this.sendMsg(e)} className="input-box">
                <input onChange={e=>this.handleInput(e)} value={this.state.message} name='message' type="text"/>
                <button type='submit'>Send</button>
              </form>
            </section>
          </div>
          :
          <div className="login-all">
            <form onSubmit={e=>this.login(e)} className="login">
              <div className="input-group">
                <label htmlFor="">Name</label>
                <input onChange={e=>this.handleInput(e)} value={this.state.name} type="text" name='name' className="username"/>
              </div>
              <button type='submit' className="login-button">Login</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

// socket connect App;
export default App;
