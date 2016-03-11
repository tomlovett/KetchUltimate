// Requires \\
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose')

var passport   = require('passport'),
    passportConfig = require('./config/passportConfig.js'),
    passportCtrl   = require('./config/passportCtrl.js')

// var mainCtrl   = require('./controllers/mainCtrl.js'),
var playerCtrl = require('./controllers/playerCtrl.js'),
    teamCtrl   = require('./controllers/teamCtrl.js'),
    ratingCtrl = require('./controllers/ratingCtrl.js')

var Player = require('./models/player.js')

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

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Passport hooks into our app
var bcrypt = require('bcryptjs')
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user.id)
})
passport.deserializeUser(function(id, done) {
    Player.findById(id, function(err, player) {
        done(err, player)
    })
})

passport.use(new LocalStrategy(function(playerEmail, password, done) {
    Player.findOne({ email: playerEmail }, function(err, user) {
        if (err)   { return done(err)                                      }
        if (!user) { return done(null, false, { message: 'no such user' }) }
        bcrypt.compare(password, user.password, function(error, response){
            if (response === true) { return done(null, user)  }
            else                   { return done(null, false) }
        })
    })
}))
var initPlayerUser = function(req, res){
    console.log('initPlayerUser')
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash) {
            var player = new Player({
                email   : req.body.email,
                password: hash
            })
            player.save(function(saveErr, savedPlayer){
                if ( saveErr ) { res.send({ err: saveErr }) }
                else {
                    req.logIn(savedPlayer, function(loginErr) {
                        if ( loginErr ) { res.send({ err: loginErr }) }
                        else            { res.send(savedPlayer)       }
                    })
                }
            })
        })
    })
}

app.post('/api/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        console.log('user, info: ', user, info)
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });
    })(req, res, next)
})

// Authentication \\
app.isAuth = function(req, res, next){
    if(req.isAuthenticated()) { return next() }
    res.send({error:'not logged in'});
}

app.post('/api/initPlayerUser', initPlayerUser)

// API routes \\
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