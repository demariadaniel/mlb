import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Style/App.css';

class GamesContainer extends Component {
  render() {
    return (
      <div className="games container">
        <div className="row">
          {/* Map games (if any) onto UI */}
          {this.props.games.length > 0 ?
            this.props.games.map((game, i) => {
              // Define dynamic className to highlight winning team
              let winTeam = "";
              if (game.linescore) {
                winTeam = game.linescore.r.home > game.linescore.r.away ?
                  "home" : "away"
              }
              return (
                <div key={i} 
                  className={game.isSelected ? "col-6 game selected" : "col-6 game" }>
                {/* Disable link for Cancelled/Postponed games*/}
                  <Link 
                    to={!(game.status.status === "Cancelled" ||
                        game.status.status === "Postponed") ?
                        `/game/${game.original_date}/${i}`
                        : "/" } 
                    className="link">
                    <div className="row">
                      {/* Team names and game status */}
                      <div className="col-6 textLeft">
                        <p className={
                          winTeam === "home" ? "winTeam" : ""}>
                          <strong>Home: </strong>
                          {game.home_team_name}
                        </p>
                        <p className={
                          winTeam === "away" ? "winTeam" : ""}>
                          <strong>Away: </strong>
                          {game.away_team_name}
                        </p>
                        <p><strong>Status: </strong>
                          <span className={game.status.status.toLowerCase()}>
                            {game.status.status}
                          </span>
                        </p>
                      </div>
                      {/* Only display scores column if game was played */}
                      {game.linescore ?
                        <div className="col-6 textRight">
                          <p>{game.linescore.r.home}</p>
                          <p>{game.linescore.r.away}</p>
                        </div> : null}
                    </div>
                  </Link>                  
                </div>
              )
            })
            :
            <p className="col-12">{this.props.message}</p>
          } {/* If error / no games, display a message instead */}
        </div>
        <p className="col-12 results textRight">
          {this.props.games.length} results
      </p>
      </div>
    )
  }
}

export default GamesContainer;