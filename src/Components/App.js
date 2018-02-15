import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import DateSelector from './DateSelector';
import GameDetail from './GameDetail';
import GamesContainer from './GamesContainer';
import '../Style/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      message: "Pick a date!",
      selectVal: "Team Name"
    }
  }
  apiCall = (day, month, year) => {
    // Request game data for selected date from server
    axios.get(`/games/${day}/${month}/${year}`)
      .then((res) => {
        if (res.data.message) {
          // Handling if there are no games
          this.setState({
            games: [],
            message: res.data.message
          })
        } else {
          // Verify the response is an Array to use .map in render()
          let games = Array.isArray(res.data) ?
            res.data : [res.data];
          // Move Blue Jays (or selected team) to position 0
          // Add a key for CSS usage
          for (let i = 0; i < games.length; i++) {
            if (games[i].home_team_name === "Blue Jays"
              || games[i].away_team_name === "Blue Jays") {
              let blueJayGame = games.splice(i, 1)[0];
              blueJayGame.isSelected = true;
              games.splice(0, 0, blueJayGame);
              break
            }
          }
          this.setState({
            games: games
          })
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          games: [],
          message: "Sorry, there was an error, please try again."
        })
      }
      )
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={(props)=>
            <GamesContainer {...this.state} />}
            />
          <Route path="/game/:year/:month/:day/:id" render={(props)=>
            <GameDetail {...props} 
              games={this.state.games} 
              apiCall={this.apiCall}/>}  
            />
        </Switch>
        <DateSelector apiCall={this.apiCall} />
      </div>
    );
  }
}

export default App;
