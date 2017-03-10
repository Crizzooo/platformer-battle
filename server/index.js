const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
})

const io = require('socket.io')(server);

//middleware
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  // serve static assets normally
  app.use(express.static(path.resolve(__dirname, '..', 'client')));

io.on('connection', (socket) => {
  console.log('a user connected with socket:');

// attach all functions to individual socket
  socket.on('disconnect', () => {

    console.log('a user has disconnected!');
  })
})

//storage
let players = [{name: 'Omer', score: 77}, {name: 'Amy', score: 88}];

//gamestate routes
app.get('/players', (req, res, next) => {
  console.log('hit api players route with players obj', players);
  res.status(201).send(players);
});

app.post('/player', (req, res, next) => {
  players.push(req.body)
  io.emit('players Update', players)
  res.status(200).send();
});


//create functions for sockets






// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})
