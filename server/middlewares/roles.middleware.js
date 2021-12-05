const restrictToRoles = roles => (req, res, next) => {

  if (!roles.includes(req.user.role))
    return res.send({ success: false, error: 'User doesn\'t have permissions.' });

  next();
};



module.exports = {
}