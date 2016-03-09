// Requires \\
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    passport   = require('passport')

var mainCtrl   = require('./controllers/mainCtrl.js'),
    playerCtrl = require('./controllers/playerCtrl.js'),
    teamCtrl   = require('./controllers/teamCtrl.js'),
    ratingCtrl = require('./controllers/ratingCtrl.js')

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// including passport; do in separate passport config module

mongoose.connect('mongodb://localhost/players')
mongoose.connect('mongodb://localhost/teams')

// API \\
app.post('/api/updateGame', mainCtrl.updateGame)
app.post('/api/closeGame',  mainCtrl.closeGame)

app.post('/api/createTeam', teamCtrl.createTeam)
app.post('/api/loadTeam',  teamCtrl.loadTeam)
app.post('/api/addToRoster', teamCtrl.addToRoster)
app.post('/api/removeFromRoster', teamCtrl.removeFromRoster)
app.post('/api/makeCaptain', teamCtrl.makeCaptain)

app.post('/api/newPlayer',  playerCtrl.newPlayer)
app.post('/api/editPlayer', playerCtrl.editPlayer)
app.post('/api/loadPlayer', playerCtrl.loadPlayer)

// app.post('/api/passRatings', ratingCtrl.passRatings)

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})