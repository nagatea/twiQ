const CONSUMER_KEY = 'BpmL1N0nvXL1Bclo2PmTsbxfR'
const CONSUMER_SECRET = 'JfkSqgSzjnXTAWocpnHwqrW3GUXynKb1BEKB6pXFaORBtwuzUx'
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

//Session setting
passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

passport.use(new TwitterStrategy({
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  //認証後の処理
  function(token, tokenSecret, profile, done) {
    passport.session.id = profile.id
    profile.twitter_token = token
    profile.twitter_token_secret = tokenSecret

    process.nextTick(function () {
      return done(null, profile)
    })
  }
))

module.exports = {passport: passport}