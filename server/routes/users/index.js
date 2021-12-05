const fastifyPassport = require('fastify-passport');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const { frontURL } = require('../../config');
const { isAuth } = require('../../middlewares/auth.middleware');

module.exports = async app => {

  // login
  app.get('/login', fastifyPassport.authenticate('google', { scope: ['email', 'profile'] }))

  app.get('/login/return', {
    preValidation: fastifyPassport.authenticate('google', { scope: ['email', 'profile'] })
  }, async (req, res) => {
    res.redirect(frontURL);
  })

  app.get('/logout', {
    preValidation: [
      isAuth()
    ]
  }, async (req, res) => {
    req.logout()
    res.redirect(frontURL);
  })

  app.get('/search', {
    preValidation: [
      isAuth()
    ]
  }, async function (request, reply) {
    const { query: { search } } = request;

    let allSearchedUsers = await Users.find({ $text: { $search: search }, _id: { $ne: request.user._id } })

    return reply.send({
      success: true,
      users: allSearchedUsers
    });

  })

  // get current user info
  app.get('/current', {
    preValidation: [
      isAuth()
    ]
  }, async function (request, reply) {
    reply.send({
      success: true,
      user: request.user
    });
  })

}