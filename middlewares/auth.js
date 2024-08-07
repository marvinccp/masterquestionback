const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No autenticated" });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o caducado" });
  }
};

const checkRole = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      return res.status(401).json({ role_message: "No authorized" });
    }
  };
};

module.exports = { authentication, checkRole };
