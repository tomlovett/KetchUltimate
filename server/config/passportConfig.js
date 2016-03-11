/** Passport Config **/
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var Player = require('../models/player.js')

passport.serializeUser(function(player, done) {
    done(null, player._id)
})
passport.deserializeUser(function(id, done) {
    Player.findById(id, function(err, player) {
        done(err, player)
    })
})

var bcrypt = require('bcryptjs')
passport.use(new LocalStrategy(
    function(email, password, done) {
        Player.findOne({ email: email }, function (err, player) {
            if (err)   { return done(err) }
            if (!player) { return done(null, false) }
            bcrypt.compare(password, player.password, function(error, response){
                if (response === true){
                    return done(null, player)
                }
                else {
                    return done(null, false)
                }
            })
        })
    }
))

var createLogin = function(req, res){
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash) {
            var player = new Player({
                email   : req.body.email,
                password: hash
            })
            player.save(function(saveErr, savedPlayer){
                if ( saveErr ) { res.send({ err: saveErr }) }
                else { 
                    req.logIn(savedPlayer, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send(savedPlayer) }
                    })
                }
            })
        })
    })
}
var login = function(req, res, next){
    passport.authenticate('local', function(err, player, info) {
        if (err)     { return next(err); }
        if (!player) { return res.send({error : 'something went wrong :('}); }
        req.logIn(player, function(err) {
            if (err) { return next(err); }
            return res.send({ success: 'success'} );
        });
    })(req, res, next);
}

module.exports = {
	createLogin : createLogin,
	login       : login
}