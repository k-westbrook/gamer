import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeNewBoard } from './logic'

class App extends Component {
  constructor(props) {
    super(props)
    this.state =
      {
        board: [],
        tilesSelected: 0
      }
    this.toggle = this.toggle.bind(this);
  }

  toggle(evt) {


    let index = evt.target.getAttribute('value');
    let newBoard = this.state.board.slice();


    if (newBoard[index].side === 0 && this.state.tilesSelected < 2) {
      newBoard[index].side = 1;
      this.setState({
        board: newBoard,
        tilesSelected: this.state.tilesSelected + 1
      })
    } else if (newBoard[index].side === 1) {
      newBoard[index].side = 0;
      this.setState({
        board: newBoard,
        tilesSelected: this.state.tilesSelected - 1
      })
    }





  }
  componentDidMount() {

    let newBoard = makeNewBoard();


    this.setState({
      board: newBoard
    })

  }
  render() {
    console.log(this.state.tilesSelected)
    return (
      <div>
        {(this.state.board.length > 0) ?
          <div className="board" >
            {this.state.board.map((tile, index) => {

              return (
                (tile.side === 0) ? <div key={index} value={index} className='red' name='tile' onClick={this.toggle}>x</div>
                  :

                  <img key={index} value={index} className='image-class' src={tile.photoURL} alt='tile-pic' onClick={this.toggle} />


              )
            }
            )
            }

          </div>
          :
          <div>
            <h3>loading</h3>
          </div>
        }
      </div>
    )
  }
}

export default App;
