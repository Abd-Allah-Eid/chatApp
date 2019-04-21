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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
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
        this.currentUser = currentUser
        this.getRooms()
      })
      .catch(err => console.log('error on joinableRooms: ', err))
    
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
          .then(joinableRooms =>{
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
            })
          })
        .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
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
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ',err))
  }
  

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList roomId={this.state.roomId}subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm />

      </div>
    );
  }
}

export default App;
