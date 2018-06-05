let configRoutes
const twit = require('twitter')
const CONSUMER_KEY = 'BpmL1N0nvXL1Bclo2PmTsbxfR'
const CONSUMER_SECRET = 'JfkSqgSzjnXTAWocpnHwqrW3GUXynKb1BEKB6pXFaORBtwuzUx'

configRoutes = function(app, server, passport) {
  app.get('/secret', function(req, res) {
    if (passport.session && passport.session.id) {
      //console.log(req.session.passport.user)
      res.send('Success! Welcome ' + req.session.passport.user.displayName + '!')
    } else {
      res.send('Faild...')
    }
  })

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.get('/auth/twitter', passport.authenticate('twitter'))
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
    failureRedirest: '/'}),
  function(req, res) {
    //console.log(req.user)
    res.redirect('/secret')
  })

  
  app.all('/api/*', function(req, res, next) {
    res.contentType('json')
    res.header('Access-Control-Allow-Origin', '*')
    if (passport.session && passport.session.id) {
      next()
    } else {
      res.send('Faild...')
    }
  })
  

  app.get('/api/home_timeline', function(req, res) {
    const client = new twit({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      access_token_key: req.session.passport.user.twitter_token,
      access_token_secret: req.session.passport.user.twitter_token_secret
    })

    client.get('/statuses/home_timeline.json', {include_entities:true}, function(err, tweets, response) {
      if (!err) {
        //console.log(tweets)
        res.send(tweets)
      } else {
        console.log(err)
      }
    })
  })
}

module.exports = {configRoutes: configRoutes}
