This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
and uses data from
(http://gd2.mlb.com/components/game/mlb/)
as well as
(https://www.baseball-reference.com/teams/)

Instructions:

https://github.com/demariadaniel/mlb.git
npm install
npm start

One issue I ran into is the API doesn’t seem to contain team player data anywhere. Nor could I find a useable alternative player API. I did manage to find a player-stats resource that I was able to scrape using Cheerio. This seems like overkill and is not an ideal solution. There is a lot of managing that has to be done with the two separate requests that need to be made (one to the Api and one to the scraper). But for now it gets the job done!

Improvements I would make in v2
	* Deploy to AWS
	* Rewrite Players page using table elements for better semantics
	* Add date picker to improve UI
	* Date picker would look better with vertical layout
	* Add ability to change favourite team
	* Utilize API data rather than a scraper
	* Refine scraper to only return first 8 players