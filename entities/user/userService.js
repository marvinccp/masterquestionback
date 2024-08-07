const { models } = require("../../database/database");
const bcrypt = require("bcrypt");
const { hashMethod, verifyPass} = require("../../utils/secureMethods.js");

const createUser = async (user) => {
  const hash = await hashMethod(user.password, 10);
  const newUser = await models.users.create({
    ...user,
    password: hash,
  });
  delete newUser.dataValues.password;
  return newUser;
};

const getusers = async () => {
  const users = await models.users.findAll();
  return users;
};

const getOneUser = async (id) => {
  const user = await models.users.findByPk(id);
  if (!user) return console.log("no user");
  return user;
};

const deleteUser = async (id) => {
  const user = await models.users.findByPk(id);
  if (!user) throw new Error(`The user with id ${id} not found`);
  await user.destroy();
  return { message: `The user with id ${id} has deleted` };
};

const updateUser = async (id, changes) => {
  const user = await getOneUser(id);
  console.log(user);
  const userUpdate = await user.update(changes);
  delete userUpdate.dataValues.passsword;
  return userUpdate;
};


const login = async (email, password) => {
  try {
    const userToEvaluate = await models.users.findOne({
      where: {
        email: email,
      },
    });

    if (!userToEvaluate) {
      throw new Error("not found");
    }

    const comparePassword = await verifyPass(password, userToEvaluate.password);
   
    if (!comparePassword) throw new Error('wrong pass');
    delete userToEvaluate.dataValues.password;
    return userToEvaluate;
  } catch (error) {
    throw error
  }
};

module.exports = {
  createUser,
  getusers,
  getOneUser,
  deleteUser,
  updateUser,
  login,
};
