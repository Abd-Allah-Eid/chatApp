import React, { Component } from 'react';
import './../App.css';
import RoomList from './RoomList'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import NewRoomForm from './NewRoomForm'
import { tokenUrl, instanceLocator } from '../config'
import ChatKit from '@pusher/chatkit-client'

class ChatScreen extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      currentRoom: {},
      loading: null,
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      usersWhoStartedTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  componentDidMount() {
    this.setState({loading: true})
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: this.props.currentUsername,
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })

    })

    chatManager.connect()
      .then(currentUser => {
        this.setState({currentUser})
        this.currentUser = currentUser
        this.getRooms()
        this.setState({
          loading: false
        })
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
    // console.log(this.currentUser)
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 20,
      hooks: {
        onMessage: message => {
          // console.log("Received message:", message.text)
          this.setState({
            messages: [...this.state.messages, message]
          })
        },
        onUserStartedTyping: user => {
          // console.log(user.name,'started typing...')
          this.setState({
            usersWhoStartedTyping: [...this.state.usersWhoStartedTyping, user.name]
          })
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersWhoStartedTyping: this.state.usersWhoStartedTyping.filter(
              
              username => username !== user.name
            )
          })
        },
        onUserLeftRoom: () => this.forceUpdate(),
        onUserJoinedRoom: () => this.forceUpdate(),
        onPresenceChanged: () => this.forceUpdate(),
      }
    })
    .then(room => {
      this.setState({
        currentRoom: room,
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

  sendTypingEvent() {
    // console.log(this.currentUser)
    this.currentUser 
    .isTypingIn({roomId: this.state.roomId})
    .catch(error => console.error('error',error))
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("error on createRoom",err))
  }

  render() {
    return (
      <div className="app">
        <RoomList 
          loading={this.state.loading}
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom} 
          rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}
          users={this.state.currentRoom.users}
          currentUser={this.state.currentUser}
        />
        <MessageList 
          messages={this.state.messages}
          roomId={this.state.roomId}
          username={this.props.currentUsername}
          TypingUsers={this.state.usersWhoStartedTyping}
          users={this.state.currentRoom.users}
        />
        <SendMessageForm 
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId}
          onChange={this.sendTypingEvent}
        />
        <NewRoomForm createRoom={this.createRoom}/>

      </div>
    );
  }
}

export default ChatScreen;
