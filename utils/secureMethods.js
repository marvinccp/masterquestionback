const bcrypt = require("bcrypt");

const hashMethod = (userPassword, cicles) => {
  const hashedPass = bcrypt.hash(userPassword, cicles);
  return hashedPass;
};

const verifyPass = (pass, dbPass) =>{
const verify = bcrypt.compare(pass, dbPass)
return verify
}

module.exports = {hashMethod, verifyPass};
