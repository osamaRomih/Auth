module.exports = (req, res, next) => {
  //   const roles = req.user.isAdmin;
  const roles = req.user.role;
  console.log("roles", roles);
  if (!roles) {
    return res.status(403).send(" No premission page");
  }
  next();
};
