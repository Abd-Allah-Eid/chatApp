import React, { Component } from 'react'

class UserNameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div className="Home">
        <div>
          <h2 className="heading">enter your name</h2>
          <form onSubmit={this.onSubmit} className="username">
            <input
              type="text"
              placeholder="Your name"
              onChange={this.onChange}
              
            />
            <input type="submit" className="myButton" />

           
            
          
          </form>
        </div>
      </div>
    )
  }
}

export default UserNameForm