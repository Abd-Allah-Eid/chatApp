import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import NewRoomForm from './components/NewRoomForm'
import {tokenUrl, instanceLocator} from './config'
import ChatKit from '@pusher/chatkit-client'

class App extends Component {

  componentDidMount() {
    const chatManager = new  ChatKit.ChatManager({
      instanceLocator,
      userId: 'abdallah',
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })

    })

    chatManager.connect()
    // .then(currentUser => {
    //   console.log("Connected as user ", currentUser);
    // })
    // .catch(error => {
    //   console.error("error:", error);
    // });

    .then(currentUser =>{
      currentUser.subscribeToRoom ({
        roomId: currentUser.rooms[0].id,
        messageLimit: 20,
        hooks: {
          onMessage: message => {
            console.log("Received message:", message.text)
          }
        }
      })
    })
  
    // .then(currentUser => {
    //     currentUser.subscribeToRoom({
    //       roomId: '19704947',
    //       hooks : {
    //         onNewMessage: message => {
    //           console.log('message:',message)
    //         }
    //       }
    //     })
       
    // })
  }

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
