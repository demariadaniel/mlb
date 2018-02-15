import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';

class GameDetail extends Component {
  render(){
    const game = this.props.games[parseInt(this.props.match.params.id)];
    console.log(game)
    return(
      <div className="games container">
        <div className="row">
          {/* If game is undefined, show loading message */}
          {game ? 
          <div className="gameDetail col-12">
            <div className="row">
              {game.home_name_abbrev}
            </div>
            <div className="row">
              {game.away_name_abbrev}
            </div>
            <Link to="/" className="link">
              <button className="btn btn-primary">
                Home
              </button>
            </Link>
          </div>
          :
          <h2> Loading... </h2>}
        </div>
      </div>
    )
  }
}

export default GameDetail;