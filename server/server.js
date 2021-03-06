// Requires \\
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    mongoose   = require('mongoose')
    // _          = require('underscore'),
    // cookieParser = require('cookie-parser')

var passport   = require('passport')
    // passportConfig = require('./config/passportConfig.js'),
    // passportCtrl   = require('./config/passportCtrl.js')

var game = require('./controllers/scorekeeper.js')
var mgmt = require('./controllers/manager.js')

var Models = require('./models/models.js')
var Player = Models['Player']

// Create Express App Object \\
var app = express();
mongoose.connect('mongodb://localhost/ketchDB')

var session = require('express-session')
// var RedisStore = require('connect-redis')(session)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../phone/www'))

// app.use(cookieParser())

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

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function(email, password, done) {
    Player.findOne({ email: email }, function(err, user) {
        if (err)   { return done(err)                                      }
        if (!user) { return done(null, false, { message: 'no such user' }) }
        bcrypt.compare(password, user.password, function(error, response){
            if (response === true) { return done(null, user)  }
            else                   { return done(null, false) }
        })
    })
}))


var signUp = function(req, res){
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash) {
            Player.find({email: req.body.email}, function(err, playerDoc) {
                console.log('Player.find playerDoc: ', playerDoc)
                if (err)                    { res.send(err)               }
                else if (!playerDoc.length) { var player = new Player({}) }
                else                        { var player = playerDoc      }
                player.email    = req.body.email
                player.password = hash
                player.save(function(saveErr, savedPlayer){
                    if ( saveErr ) { res.send({ err: saveErr }) }
                    else {
                        req.logIn(savedPlayer, function(loginErr) {
                            if ( loginErr ) { res.send({ err: loginErr }) }
                            else { 
                                //  req.session.user = savedPlayer
                                // setSession(req, res)
                                res.send({user: savedPlayer._id})
                            }
                        })
                    }
                })
            })
        })
    })
}

var signIn = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err)   { return next(err); }
        if (!user) { return res.send({error : 'no user found'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({user: user._id})
        });
    })(req, res, next)
}

// Authentication \\
app.isAuth = function(req, res, next){
    if(req.isAuthenticated()) { return next() }
    res.send({error:'not logged in'})
}

app.post('/api/signUp', signUp)
app.post('/api/signIn', signIn)
// API routes \\
app.post('/api/newGame',   game.newGame)
app.post('/api/markScore', game.markScore)
app.post('/api/markStat',  game.markStat)
app.post('/api/setLine',   game.setLine)
app.post('/api/closeGame', game.closeGame)

app.post('/api/callHistory',  game.callHistory)
app.post('/api/pointDetails', game.pointDetails)


app.post('/api/newTeam',      mgmt.newTeam)
app.post('/api/newPlayer',    mgmt.newPlayer)
app.post('/api/intoRoster',   mgmt.intoRoster)
app.post('/api/pushTeamColl', mgmt.pushTeamColl)
app.post('/api/popTeamColl',  mgmt.popTeamColl)

app.post('/api/playersTeams',  mgmt.playersTeams)
app.post('/api/rawRoster',     mgmt.rawRoster)
app.post('/api/deepRoster',    mgmt.deepRoster)
app.post('/api/playerDetails', mgmt.playerDetails)
app.post('/api/fullPlayer',    mgmt.fullPlayer)
app.post('/api/updatePlayer',  mgmt.updatePlayer)


// app.post('/api/rating', ratingCtrl.recordRating)

// Creating Server and Listening for Connections \\
var port = 80
app.listen(port, function(){
  console.log('Server running on port ' + port);

})