let configRoutes

configRoutes = function(app, server, passport) {
  app.get('/secret', function(req, res) {
    if (passport.session && passport.session.id) {
      console.log(req.session.passport.user)
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

  
}

module.exports = {configRoutes: configRoutes}
