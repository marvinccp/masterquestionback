const { Op } = require("sequelize");
const { models } = require("../../database/database");
const { hashMethod, verifyPass } = require("../../utils/secureMethods.js");

const getPlayers = async () => {
  const players = await models.players.findAll();
  return players;
};

const createPlayer = async (body) => {
  const { email, nickname } = body;
  try {
    if (email) {
      const emailExists = await models.players.findOne({
        where: { email },
      });
      if (emailExists) {
        return { success: false, message: "email ya existe" };
      }
    }

    if (nickname) {
      const nicknameExists = await models.players.findOne({
        where: { nickname },
      });
      if (nicknameExists) {
        return { success: false, message: "nickname ya existe" };
      }
    }
    const hashPass = await hashMethod(body.password, 10);
    const newPlayer = await models.players.create({
      ...body,
      password: hashPass,
    });
    delete newPlayer.dataValues.password;
    
    return { success: true, player: newPlayer, message: 'Jugador creado con exito' };
  } catch (error) {
    return { success: false, message: "Falló la creación del jugador" };
  }
};

const loginPlayer = async (body) => {
  //recibir data
  console.log(body);
  const { email, nickname, password } = body;
  if (!email && !nickname) {
    throw new Error("Email or Nickname must be provided");
  }

  try {
    //encontrar nuestro player
    const playerToEvaluate = await models.players.findOne({
      where: {
        [Op.or]: [
          email ? { email } : null,
          nickname ? { nickname } : null,
        ].filter(Boolean),
      },
    });

    console.log(playerToEvaluate);
    // si no está
    if (!playerToEvaluate) {
      throw new Error("Not found baby");
    }

    //lo tenemos, comparamos pass
    const comparePass = await verifyPass(password, playerToEvaluate.password);

    if (!comparePass) throw new Error("wrong pass");
    delete playerToEvaluate.dataValues.password;
    return playerToEvaluate;
  } catch (error) {
    throw new Error("error data");
  }
};

module.exports = {
  getPlayers,
  createPlayer,
  loginPlayer,
};
