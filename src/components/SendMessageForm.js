import React from 'react'

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            textMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.textMessage)
    }
    render() {
        // console.log(this.state.textMessage)
        return (
            <form 
                className="send-message-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    placeholder="type your message here and press ENTER"
                    type="text"
                    name="textMessage"
                    value={this.state.textMessage}
                    onChange={this.handleChange}
                />
            </form>
        )
    }
}

export default SendMessageForm