import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
import ChatKit from '@pusher/chatkit-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: 'abdallah',
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })

    })

    chatManager.connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          messageLimit: 20,
          hooks: {
            onMessage: message => {
              // console.log("Received message:", message.text)
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
        <NewRoomForm />

      </div>
    );
  }
}

export default App;
