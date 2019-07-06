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
        totalTilePairsMatched: 0,
        loadTile: false
      }
    this.toggle = this.toggle.bind(this);
    this.checkForMatch = this.checkForMatch.bind(this);

  }




  async toggle(evt) {


    let index = evt.target.getAttribute('value');
    let newBoard = this.state.board.slice();
    let numTilesSelectedTemp = this.state.numTilesSelected;
    let totalTilePairsMatchedTemp = this.state.totalTilePairsMatched;




    if (newBoard[index].side === 0 && numTilesSelectedTemp < 2 && !newBoard[index].isMatched) {
      newBoard[index].side = 1;
      let tilesSelectedTemp = [...this.state.tilesSelected, newBoard[index]];
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
          function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
          }
          await sleep(2000).then(() => {
            ;

          })


          tilesSelectedTemp.forEach(tile => {
            tile.side = 0;
          })


          this.setState({
            tilesSelected: [],
            numTilesSelected: 0,
            board: newBoard,
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

    if (this.state.totalTilePairsMatched === 4) {
      return (
        <h3>YOU WON</h3>
      )
    } else {
      return (
        <div>
          {(this.state.board.length > 0) ?
            <div className="board" >
              {this.state.board.map((tile, index) => {
                return (
                  <div className='tile-container'>

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
}

export default App;
