import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import NewRoomForm from './components/NewRoomForm'

class App extends Component {
  render() {
    return (
      <div className="app">
          <RoomList />
          <MessageList />
          <SendMessageForm />
          <NewRoomForm />
        
      </div>
    );
  }
}

export default App;
