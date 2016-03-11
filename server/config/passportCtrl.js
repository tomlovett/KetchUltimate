var passport = require('passport')
var bcrypt   = require('bcryptjs')
var Player = require('../models/player.js')

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
	console.log('login req.body: ', req.body)
    passport.authenticate('local', function(err, player, info) {
    	console.log('login.player: ', player)
        if (err)     { return next(err); }
        if (!player) { return res.send({error : 'something went wrong :('}); }
        req.logIn(player, function(err) {
            if (err) { return next(err); }
            return res.send({ success: 'success'} );
        });
    })(req, res, next);
}

module.exports = {
	initPlayerUser : initPlayerUser,
	login       : login
}