import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from './actions/actions';

// Redux
const mapStateToProps = (state) => ({
  gameRooms: state.rooms.gameRooms,
  roomCount: state.rooms.gameRooms.length+1,
});

const mapDispatchToProps = (dispatch) => ({
  updateRoomsToDisplay(rooms) {
    dispatch(actions.updateRoomsToDisplay(rooms))
  },
});

// Component
class Splash extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('localhost:3000');
    this.incrementRoomCount = ()=>{
      return this.props.roomCount
    };
  }

  
  componentDidMount() {
    this.socket.on('loadRooms', (rooms)=>{
      console.log("ROOMS in SPLASH", rooms)
      this.props.updateRoomsToDisplay(rooms)
    })
  }

  componentWillUnmount() {
    this.socket.close();
  }

  createGameRooms() {
    const { gameRooms } = this.props;
    return gameRooms.map((roomNumber) => (
      <Link
        className="gameRoom"
        to={'/game/' + roomNumber}
        key={'gameRoom' + roomNumber}
      >
        <div>
          <button
            className="room"
            onClick={() => this.socket.emit('joinRoom', roomNumber)}
            type="button"
          >
            Room Number
            {roomNumber}
          </button>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <main className="splash">
        <header className="splash__header">
          <h1 className="splash__title">HANGMAN</h1>
          <span className="splash__version">x2</span>
        </header>

        <section className="room-container">
          <h5 className="room__header">Game Rooms</h5>
          <article className="room__list">
            {this.createGameRooms()}
          </article>
        </section>

        <button
          className="splash__add-room"
          onClick={() => this.socket.emit('addRoom', this.incrementRoomCount())}
          type="button"
        >
          Create New Room
        </button>

      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
