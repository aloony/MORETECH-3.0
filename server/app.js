const _ = require("lodash");
const Fastify = require('fastify');
const AutoLoad = require('fastify-autoload');
const fastifyPassport = require('fastify-passport');
const fastifySecureSession = require('fastify-secure-session');
const fastifyMultipart = require('fastify-multipart');
const fastifyStatic = require('fastify-static');
const fastifyCors = require('fastify-cors');
const mongoose = require('mongoose');
const fs = require('fs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { join } = require('path');

const { port, secret } = require('./config.js');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vmt', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoDB models
require('./models/Users')
require('./models/Roles')

const app = Fastify({
  bodyLimit: 12485760 * 15,
  keepAliveTimeout: 0,
  trustProxy: true
})

app.register(fastifyCors, {
  origin: true,
  credentials: true,
})
app.register(fastifyMultipart)
app.register(fastifyStatic, { root: join(__dirname, 'static'), prefix: '/static/', })
app.register(fastifySecureSession, { key: fs.readFileSync(join(__dirname, './secret-key')), cookie: { path: '/' } })
app.register(fastifyPassport.initialize())
app.register(fastifyPassport.secureSession())

const Users = mongoose.model('Users');

fastifyPassport.use(new GoogleStrategy({
  clientID: '986199865531-afc79ene4ljhmvoe6ctd0mb5ptt9co6r.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8000/users/login/return'
}, function (accessToken, refreshToken, profile, done) {
  return Users.findOne({ googleId: profile.id }).then(async currentUser => {

    console.log(profile)

    if (!currentUser) {
      currentUser = await new Users({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      }).save()
    } else {
      await Users.updateOne({ googleId: profile.id }, {
        $set: {
          displayName: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        }
      })
    }

    return done(null, { ...currentUser._doc, displayName: profile.displayName, email: profile.emails[0].value, avatar: profile.photos[0].value });
  })
}
));

app.register(AutoLoad, {
  dir: join(__dirname, 'routes')
})

fastifyPassport.registerUserSerializer(async (user, request) => user);
fastifyPassport.registerUserDeserializer(async (user, request) => user);

app.ready(async err => {
  if (err)
    throw err
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port 8000`);
})