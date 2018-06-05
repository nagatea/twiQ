let configRoutes

configRoutes = function(app, server, passport) {
  app.get('/secret', function(req, res) {
    if (passport.session && passport.session.id) {
      res.send('Sucsess!')
    } else {
      res.send('Faild...')
    }
  })

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.get('/auth/twitter', passport.authenticate('twitter'))
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/secret', failureRedirest: '/'}))
  
}

module.exports = {configRoutes: configRoutes}
