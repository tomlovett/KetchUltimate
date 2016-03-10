// Requires \\
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose'),
    passport   = require('passport')
var passportConfig = require('./config/passportConfig.js')

// var mainCtrl   = require('./controllers/mainCtrl.js'),
var playerCtrl = require('./controllers/playerCtrl.js'),
    teamCtrl   = require('./controllers/teamCtrl.js'),
    ratingCtrl = require('./controllers/ratingCtrl.js')

// Create Express App Object \\
var app = express();
mongoose.connect('mongodb://localhost/ketchDB')

var session = require('express-session')
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)

// Passport hooks into our app
app.use(passport.initialize())
app.use(passport.session())

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// API \\
// app.post('/api/updateGame', mainCtrl.updateGame)
// app.post('/api/closeGame',  mainCtrl.closeGame)

app.post('/api/createTeam',       teamCtrl.createTeam)
app.post('/api/loadTeam',         teamCtrl.loadTeam)
app.post('/api/addToRoster',      teamCtrl.addToRoster)
app.post('/api/removeFromRoster', teamCtrl.removeFromRoster)
app.post('/api/makeCaptain',      teamCtrl.makeCaptain)

app.post('/api/newPlayer',  playerCtrl.newPlayer)
app.post('/api/editPlayer', playerCtrl.editPlayer)
app.post('/api/loadPlayer', playerCtrl.loadPlayer)

// app.post('/api/recordRating', ratingCtrl.recordRating)
// app.post('/api/recordAnswer', ratingCtrl.recordAnswer)

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})