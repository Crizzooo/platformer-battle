const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const apiRoutes = require('./apiRoutes');

const app = express();

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
})

const io = require('socket.io')(server);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('a user connected with socket:');

  socket.on('disconnect', () => {
    console.log('a user has disconnected!');
  })
})

// serve static assets normally
app.use(express.static(path.resolve(__dirname, '..', 'client')));


app.use('/api', apiRoutes);










// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
})
