const app = require('express')();
const http = require('http').Server(app);
const light = require('./light');

const io = require('socket.io')(http);

const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('http://192.168.1.47:3001/data', (req, res) => {
  res.send(light.lightPositions);
  console.log('Had sent positions');
});


setInterval(function () {
  light.updateMarket();
  io.sockets.emit('market', light.lightPositions[0]);
  console.log('Emitted');
}, 5000);

io.on('connection', function (socket) {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
