import React from 'react'
import OnlineUsers from './OnlineUsers'

class RoomList extends React.Component {

    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id)
        const loading = "Loading..."
        while (this.props.loading) {
            return loading
        }
        return (

            <div className="rooms-list">
                <ul>

                    <h3>Your Rooms</h3>
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? " active" : "";
                        return (
                            <li key={room.id} className={"room" + active}>
                                <a onClick={() => this.props.subscribeToRoom(room.id)} href="#"># {room.name} </a>
                            </li>

                        )
                    })}

                </ul>


                <div className="online">
                    <h3>Chat Members</h3>
                    <OnlineUsers users={this.props.users} currentUser={this.props.currentUser} />
                </div>


            </div>





        )
    }
}
export default RoomList