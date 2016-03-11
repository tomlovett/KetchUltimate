// /** Passport Config **/
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy
// var Player = require('../models/player.js')

// passport.serializeUser(function(player, done) {
//     done(null, player._id)
// })
// passport.deserializeUser(function(id, done) {
//     Player.findById(id, function(err, player) {
//         done(err, player)
//     })
// })

// var bcrypt = require('bcryptjs')
// passport.use(new LocalStrategy(
//     function(email, password, done) {
//     	console.log('passport LocalStrategy:')
//     	console.log('email, password: ', email, password)
//         Player.findOne({ email: email }, function (err, player) {
//         	console.log('player.findOne player: ', player)
//             if (err)   { return done(err) }
//             if (!player) { return done(null, false) }
//             bcrypt.compare(password, player.password, function(error, response){
//                 if (response === true){
//                     return done(null, player)
//                 }
//                 else {
//                     return done(null, false)
//                 }
//             })
//         })
//     }
// ))

