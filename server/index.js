const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
})

const io = require('socket.io')(server);


app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', (socket) => {
  console.log('a user connected with socket:', socket);

  socket.on('disconnect', () => {
    console.log('a user has disconnected!');
  })
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/public/index.html');
// })

app.use(express.static("client"));
