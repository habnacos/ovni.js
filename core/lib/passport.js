const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./helpers')
const pool = require('../sql/database')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    let pass = await helpers.encryPassword(password)
    const user = pool.signin(username, pass)
    if (user) {
        
    }
    newUser.id = result.insertId
    done(null, newUser)
}));

passport.serializeUser( async (user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const user = await pool.getById('sompa_users', id)
    done(null, user)
})