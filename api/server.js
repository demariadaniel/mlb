const express = require('express')
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
// Scraping Player Data from https://www.baseball-reference.com/teams/

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

app.get('/batters/:home/:away/:year', (req, res)=>{
  console.log(req.params)
  let batters = {home: [], away: []};
  let team = 'home';
  playerScrape('home');
  playerScrape('away');

  function playerScrape(team){
  console.log('scrape')
  axios.get(`https://www.baseball-reference.com/teams/${req.params[team]}/${req.params.year}.shtml#all_team_batting`)
    .then(scrape=>{
      $ = cheerio.load(scrape.data);
      $('tr').each((i, element)=>{
        if (parseInt($(element).children("th[data-stat='ranker']").text()) < 9){
          batters[team].push({
            name: $(element).children("td[data-stat='player']").text(),
            ab: $(element).children("td[data-stat='AB']").text(), 
            r: $(element).children("td[data-stat='R']").text(), 
            h: $(element).children("td[data-stat='H']").text(), 
            rbi: $(element).children("td[data-stat='RBI']").text(), 
            bb: $(element).children("td[data-stat='BB']").text(), 
            so: $(element).children("td[data-stat='SO']").text(), 
            avg: $(element).children("td[data-stat='batting_avg']").text()
          })
          console.log('home', batters.home.length)
          console.log('away', batters.away.length)
        }
      })
      if (batters.home.length >= 8 && batters.away.length >= 8){ 
        console.log((batters.home.length, batters.home.length))
        res.send(batters); 
      }
    })
  }
})