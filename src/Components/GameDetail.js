import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

class GameDetail extends Component {
  constructor() {
    super()
    this.state = {
      currentTeam: "home",
      batters: {home: [], away: []}
    }
  }
  componentDidMount() {
    console.log('mount')
    // Load game using route if no game data is supplied via props
    const game = this.props.games[parseInt(this.props.match.params.id)];
    if (!game) {
      this.props.apiCall(
        this.props.match.params.day,
        this.props.match.params.month,
        this.props.match.params.year
      )
    } else if (game && this.state.batters.home.length === 0
      || game && this.state.batters.away.length === 0) {
        console.log('get batters')
        this.getBatters(game)
    }
  }
  componentWillReceiveProps(nextProps) {
    // Automatically request batters once game data is received
    const game = nextProps.games[parseInt(nextProps.match.params.id)];
    if (game && this.state.batters.home.length === 0
      || game && this.state.batters.away.length === 0) {
        console.log('will receive')
      this.getBatters(game)
    }
  }
  getBatters = (game) => {
    // Scrape relevant player info
    axios.get(`http://localhost:8080/batters/${game.home_name_abbrev}/${game.away_name_abbrev}/${this.props.match.params.year}`)
      .then(res => {
        this.setState({
          batters: res.data
        })
      })
  }
  teamSwitch = (team) => {
    // Switch which team's roster you are viewing
    this.setState({
      currentTeam: team
    })
  }
  render() {
    const game = this.props.games[parseInt(this.props.match.params.id)];
    return (
      <div className="games container">
        {/* Home Button */}
        <div className="row ">
          {/* If game is undefined, show loading message */}
          {game ?
            <div className="gameDetail col-12">
              <div>
                <Link to="/" className="link">
                  <button className="btn btn-primary">
                    Home
                  </button>
                </Link>
                <button className="btn btn-primary"
                  onClick={()=>this.getBatters(game)}>
                  <span class="fas fa-sync"></span>
                </button>
              </div>
              <div className="row">
                {/* Innings*/}
                <div className="col-3">
                  <p>Inning</p>
                  <p><strong>{game.home_team_name}</strong></p>
                  <p><strong>{game.away_team_name}</strong></p>
                </div>
                <div className="col-7">
                  <div className="row">
                    {game.linescore.inning.map((inning, i) => (
                      <div className="innings col">
                        <p><strong>{i + 1}</strong></p>
                        <p>{inning.home}</p>
                        <p>{inning.away}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2">
                  <div className="row">
                    <div className="col-4">
                      <p><strong>R</strong></p>
                      <p>{game.linescore.r.home}</p>
                      <p>{game.linescore.r.away}</p>
                    </div>
                    <div className="col-4">
                      <p><strong>H</strong></p>
                      <p>{game.linescore.h.home}</p>
                      <p>{game.linescore.h.away}</p>
                    </div>
                    <div className="col-4">
                      <p><strong>E</strong></p>
                      <p>{game.linescore.e.home}</p>
                      <p>{game.linescore.e.away}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Switch Teams */}
              <div className="row">
                <h5 className="col-12 playerStats">
                  Player Stats
                </h5>
                <div className="col-3 offset-3 teamSwitch"
                  onClick={() => this.teamSwitch('home')}>
                  {game.home_team_city}
                </div>
                <div className="col-3 teamSwitch"
                  onClick={() => this.teamSwitch('away')}>
                  {game.away_team_city}
                </div>
              </div>
              {/* Batters */}
              {/* Mock Data */}
              <div className="row">
                <div className="col-4">
                  <p><strong>Name</strong></p>
                </div>
                <div className="col-8">
                  <div className="row">
                    {/* Optimize using Object.Keys */}
                    <div className="col">
                      <p><strong>AB</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>R</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>H</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>RBI</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>BB</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>SO</strong></p>
                    </div>
                    <div className="col">
                      <p><strong>AVG</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.batters.home.length > 0 && 
                this.state.batters.away.length > 0 ?
                this.state.batters[this.state.currentTeam].map((player, i) => (
                <div className="row" key={i}>
                  <div className="col-4">
                    <p>{player.name}</p>
                  </div>
                  <div className="col-8">
                    <div className="row">
                      {/* Optimize using Object.Keys */}
                      <div className="col">
                        <p>{player.ab}</p>
                      </div>
                      <div className="col">
                        <p>{player.r}</p>
                      </div>
                      <div className="col">
                        <p>{player.h}</p>
                      </div>
                      <div className="col">
                        <p>{player.rbi}</p>
                      </div>
                      <div className="col">
                        <p>{player.bb}</p>
                      </div>
                      <div className="col">
                        <p>{player.so}</p>
                      </div>
                      <div className="col">
                        <p>{player.avg}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <p>Loading...</p>
              }
            </div>
            :
            <h2 className="col-12"> Loading... </h2>}
          {/* Loading Message */}
        </div>
      </div>
    )
  }
}

export default GameDetail;