import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state =
      {
        board: [0, 1, 0,
          0, 0, 0,
          0, 0, 0]
      }
    this.toggle = this.toggle.bind(this);
  }

  toggle(evt) {

    let index = evt.target.getAttribute('value');
    console.log(evt.target.value);
    evt.persist();
    navigator.testValue = evt;

    let newBoard = this.state.board.slice();


    if (newBoard[index] === 0) {
      newBoard[index] = 1;
    } else {
      newBoard[index] = 0;
    }

    this.setState({ board: newBoard })


  }
  render() {
    console.log(this.state)
    return (
      <div className="board" >
        {this.state.board.map((tile, index) => {

          return (
            (tile === 0) ? <div key={index} value={index} className='red' name='tile' onClick={this.toggle}></div>
              :
              <div key={index} value={index} name='tile' className='blue' onClick={this.toggle}></div>

          )
        }
        )
        }

      </div>
    );
  }
}

export default App;
