const bcryptjs = require('bcryptjs')

const hashMethod = (userPassword, cicles) => {
  const hashedPass = bcryptjs.hash(userPassword, cicles);
  console.log(hashedPass);
  return hashedPass;
};

const verifyPass = (pass, dbPass) =>{
const verify = bcryptjs.compare(pass, dbPass)
return verify
}

module.exports = {hashMethod, verifyPass};
