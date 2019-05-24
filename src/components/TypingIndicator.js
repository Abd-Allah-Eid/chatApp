import React from 'react'

class TypingIndicator extends React.Component {
    render() {
        console.log(this.props)
        if(this.props.TypingUsers.length === 0) {
            return <div />
        }
        else if (this.props.TypingUsers.length === 1) {
            return <p>{this.props.TypingUsers[0]} is typing...</p>
        }
        else if (this.props.TypingUsers.length > 1) {
            if(this.props.TypingUsers[0] === this.props.TypingUsers[1])
            {
                return <p>{this.props.TypingUsers[0]} is typing...</p>
            }
            else {
                return <p>{this.props.TypingUsers.join(' and ')} are typing...</p>
            }
            
        }
    }
}
export default TypingIndicator