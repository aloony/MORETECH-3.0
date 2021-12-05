const mongoose = require('mongoose');
const Roles = mongoose.model('Roles');

const { isAuth } = require('../../middlewares/auth.middleware');

module.exports = async app => {

  // create role
  app.post('/', { preValidation: [isAuth()] },
    async function (request, reply) {
      const { body: { name, members } } = request;

      let newRole = await new Roles({
        owner: request.user._id,
        name,
        members
      }).save().catch(() => {
        return reply.send({ success: false });
      })

      return reply.send({
        success: true,
        role: newRole
      });

    }
  )

  // edit role
  app.post('/edit', { preValidation: [isAuth()] },
    async function (request, reply) {
      const { body: { _id, name, members } } = request;

      let currentRole = await Roles.findOne({ _id, owner: request.user._id })

      await Roles.updateOne({
        owner: request.user._id,
        _id: _id,
        name,
        members
      }).catch(() => {
        return reply.send({ success: false });
      })

      return reply.send({
        success: true,
        role: { ...currentRole._doc, name, members }
      });

    }
  )

  // delete role
  app.post('/delete', { preValidation: [isAuth()] },
    async function (request, reply) {
      const { body: { _id } } = request;

      await Roles.deleteOne({ _id, owner: request.user._id }).catch(() => {
        return reply.send({ success: false });
      })

      return reply.send({
        success: true,
        role: _id
      });

    }
  )

  // get user roles
  app.get('/', { preValidation: [isAuth()] },
    async function (request, reply) {

      let allUserRoles = await Roles.find({ owner: request.user._id }).populate('members', 'email')

      return reply.send({
        success: true,
        roles: allUserRoles
      });
    }
  )

}