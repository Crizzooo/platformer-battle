const app = require('express').Router();

module.exports = app;


//In Server Memory
let players = [{name: 'Omer', score: 77}, {name: 'Amy', score: 88}];

app.get('/players', (req, res, next) => {
  console.log('hit api players route with players obj', players);
  res.status(201).send(players);
});

app.post('/player', (req, res, next) => {

});
