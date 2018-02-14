const express = require('express')
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.listen(8080, ()=>{
    console.log('listening on port 8080')
})

app.get('/games/:day/:month/:year', (req, res)=>{ 
    console.log(req.params)
    let day = req.params.day.length === 1 ? '0'+ req.params.day : req.params.day;
    let month = req.params.month.length === 1 ? '0'+ req.params.month : req.params.month;
    let year = req.params.year;
    let mlbURL = `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`
    axios.get(mlbURL)
    .then((response)=>{
      let gameInfo = response.data.data.games.game;
      if (gameInfo){
        res.send(response.data.data.games.game)
      } else {
        res.send({message: "No games on this date"})
      }
    }).catch((err)=>{
      console.log(err)
      res.status(500).send({message: "There's been an error", err: err.data})
    })
  })