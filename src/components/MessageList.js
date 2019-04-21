import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'


class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        /* 
        scrollTop: how far we've scrolled 
        clientHeight: height of window
        scrollHeight: height of entire element(message list)
        */
        // console.log(node.scrollTop,node.clientHeight,node.scrollHeight)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    componentDidUpdate() {
        if(this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
       
    }
    render() {

        if(!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} username={message.senderId} text= {message.text}/>
                    )
                })}
            </div>
        )
    }
}

export default MessageList