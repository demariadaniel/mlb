import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

class GameDetail extends Component {
  constructor(){
    super()
    this.state={
      currentTeam: "home"
    }
  }
  componentDidMount(){
    const game = this.props.games[parseInt(this.props.match.params.id)];
    if(!game){
      this.props.apiCall(
        this.props.match.params.day,
        this.props.match.params.month,
        this.props.match.params.year
      )
    }
  }
  teamSwitch=(team)=>{
    this.setState({
      currentTeam: team
    })
  }
  render() {
    const game = this.props.games[parseInt(this.props.match.params.id)];
    console.log(game)
    return (
      <div className="games container">
        <div className="row ">
          {/* If game is undefined, show loading message */}
          {game ?
            <div className="gameDetail col-12">
              <div className="row">
                {/* Innings*/}
                <div className="col-3">
                  <p>Inning</p>
                  <p><strong>{game.home_team_name}</strong></p>
                  <p><strong>{game.away_team_name}</strong></p>
                </div>
                <div className="col-7">
                  <div className="row">
                    {game.linescore.inning.map((inning , i)=>(
                      <div className="innings col">
                        <p><strong>{i+1}</strong></p>
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
                <div className="col-3 offset-3 teamSwitch"
                  onClick={()=> this.teamSwitch('home')}>
                  {game.home_team_city}
                </div>
                <div className="col-3 teamSwitch"
                  onClick={()=> this.teamSwitch('away')}>
                  {game.away_team_city}
                </div>
              </div>
              {/* Batters */}
              <div className="row">
                <div className="col-4">
                    
                </div>
                <div className="col-8">

                </div>
              </div>
            </div>
            :
            <h2 className="col-12"> Loading... </h2>}
            {/* Loading Message */}
          </div>
          {/* Home Button */}
        <Link to="/" className="link">
          <button className="btn btn-primary" id="home">
            Home
          </button>
        </Link>
      </div>
    )
  }
}

export default GameDetail;