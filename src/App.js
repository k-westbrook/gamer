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
        tilesSelected: [],
        numTilesSelected: 0,
        totalTilePairsMatched: 0
      }
    this.toggle = this.toggle.bind(this);
    this.checkForMatch = this.checkForMatch.bind(this);
  }

  toggle(evt) {


    let index = evt.target.getAttribute('value');
    let newBoard = this.state.board.slice();
    let numTilesSelectedTemp = this.state.numTilesSelected;
    let tilesSelectedTemp = [...this.state.tilesSelected, newBoard[index]];
    let totalTilePairsMatchedTemp = this.state.totalTilePairsMatched;



    if (newBoard[index].side === 0 && numTilesSelectedTemp < 2 && !newBoard[index].tile) {
      newBoard[index].side = 1;

      numTilesSelectedTemp++;

      this.setState({
        board: newBoard,
        tilesSelected: tilesSelectedTemp,
        numTilesSelected: numTilesSelectedTemp
      })

      if (numTilesSelectedTemp === 2) {

        if (this.checkForMatch(tilesSelectedTemp)) {
          tilesSelectedTemp.forEach(tile => {
            tile.isMatched = true;
          })


          this.setState({
            numTilesSelected: 0,
            tilesSelected: [],
            totalTilePairsMatched: totalTilePairsMatchedTemp + 1
          })
        }
        else {


          tilesSelectedTemp.forEach(tile => {
            tile.side = 0;
          })

          this.setState({
            tilesSelected: [],
            numTilesSelected: 0,
            board: newBoard
          })
        }
      }

    }

  }
  checkForMatch(tilesSelected) {
    if (tilesSelected[0].photoId === tilesSelected[1].photoId) {
      return true;
    }
    return false;
  }



  componentDidMount() {

    let newBoard = makeNewBoard();


    this.setState({
      board: newBoard
    })

  }
  render() {

    return (
      <div>
        {(this.state.board.length > 0) ?
          <div className="board" >
            {this.state.board.map((tile, index) => {
              return (
                <div>

                  {(tile.side === 0) ? <div key={index} value={index} className='red' name='tile' onClick={this.toggle}>x</div>
                    :

                    <img key={index} value={index} className='image-class' src={tile.photoURL} alt='tile-pic' onClick={this.toggle} />
                  }


                </div>
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
