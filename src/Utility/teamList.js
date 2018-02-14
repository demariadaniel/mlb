import axios from 'axios';

export default function teamList (prop){
  axios.get('https://erikberg.com/mlb/teams.json')
    .then(res=>{
      let teams = res.data.map(team=>{
        return team[prop]
      })
      return teams
    })
}

// Source: https://erikberg.com/api/endpoints/teams
// Reduce JSON to array of display text for user
// prop: last_name (Team Name) or first_name (City)