const isAuth = () => (req, res, next) => {

  if (req.user)
    next();
  else
    return res.code(401).send();

};



module.exports = {
  isAuth
}