const http = require('http')
const express = require('express')

//passport-twitter
const session = require('express-session')
const auth = require('./passport')
const passport = auth.passport

//routing
const routes = require('./routes')
const app = express()
const server = http.createServer(app)

//cors
const cors = require('cors')
app.use(cors())

//passport-twitter
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret: 'twiQ',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))

//routing
routes.configRoutes(app, server, passport)

server.listen(3000)
console.log('Listening on port %d in %s mode', server.address().port, app.settings.env)
