import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

class GameDetail extends Component {
  render(){
    const game = this.props.games[parseInt(this.props.match.params.id)];
    console.log(game)
    return(
      <div>

      </div>
    )
  }
}

export default GameDetail;