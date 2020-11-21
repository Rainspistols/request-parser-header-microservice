var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.get('/api/whoami', (req, res) => {
  console.log(req.ip);
  res.json({
    ipaddress:
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null),
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

// listen for requests :)
var listener = app.listen(
  // process.env.PORT
  8080,
  function () {
    console.log('Your app is listening on port ' + listener.address().port);
  }
);
