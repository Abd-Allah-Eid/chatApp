import React from 'react'
import Message from './Message';

const DUMMY_DATA = [
    {
        senderId: 'perborgen',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'janedoe',
        text: 'Great! How about you?'
    },
    {
        senderId: 'perborgen',
        text: 'Good to hear! I am great as well'
    }
]

var Messages = DUMMY_DATA.map(item => {
    return <p>{item.senderId}: {item.text}</p>
})

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {Messages}
            </div>
        )
    }
}

export default MessageList