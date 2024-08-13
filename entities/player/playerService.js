const { models } = require("../../database/database");
const { hashMethod, verifyPass } = require("../../utils/secureMethods.js");

const createUser = async (olayer) => {
  const hash = await hashMethod(player.password, 10);
  const newUser = await models.players.create({
    ...player,
    password: hash,
  });
  delete newPlayer.dataValues.password;
  return newPlayer;
};

const getPlayers = async () => {
  try {
    const players = await models.players.findAll();
    console.log(players);
    return players;
  } catch (error) {
    console.log(error, 'No data');
  }
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
    console.log(userToEvaluate);

    if (!userToEvaluate) {
      throw new Error("not found");
    }

    const comparePassword = await verifyPass(password, userToEvaluate.password);

    if (!comparePassword) throw new Error("wrong pass");
    delete userToEvaluate.dataValues.password;
    return userToEvaluate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getPlayers,
  getOneUser,
  deleteUser,
  updateUser,
  login,
};
