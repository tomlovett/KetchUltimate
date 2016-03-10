// /** Passport Config **/
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy

// passport.serializeUser(function(user, done) {
//     done(null, user.id)
// })
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user)
//     })
// })

// // When someone tries to log in to our site, how do we determine that they are who they say they are?
// var bcrypt = require('bcryptjs')
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err) }
//             if (!user) {
//                 return done(null, false)
//             }
//             // If we got this far, then we know that the user exists. But did they put in the right password?
//             bcrypt.compare(password, user.password, function(error, response){
//                 if (response === true){
//                     return done(null,user)
//                 }
//                 else {
//                     return done(null, false)
//                 }
//             })
//         })
//     }
// ))