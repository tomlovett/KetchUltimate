var passport = require('passport')
var bcrypt   = require('bcryptjs')

var createLogin = function(req, res){
  // email - password; passes full Player obj
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            req.body.player = {
                email   : req.body.player.email,
                password: hash
            }
            req.body.player.save(function(saveErr, player){
                if ( saveErr ) { res.send({ err: saveErr }) }
                else { 
                    req.logIn(player, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send(player) }
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