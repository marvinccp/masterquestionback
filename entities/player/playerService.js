const { Op } = require("sequelize");
const { models } = require("../../database/database");
const { hashMethod, verifyPass } = require("../../utils/secureMethods.js");

const getPlayers = async () => {
  const players = await models.players.findAll();
  return players;
};

const createPlayer = async (body) => {
  const { email, nickname, password } = body;

  if (!email) {
    return { success: false, message: "Email  requerido" };
  } else if (!nickname) {
    return { success: false, message: "Nickname requerido" };
  } else if (!password) {
    return { success: false, message: "Password requerido" };
  } else if (!email.includes("@")) {
    return { success: false, message: "Formato invalido" };
  }

  try {
    const emailExists = await models.players.findOne({
      where: { email },
    });
    const nicknameExists = await models.players.findOne({
      where: { nickname },
    });

    if (emailExists && nicknameExists)
      return { success: false, message: "Jugador ya existe" };
    else if (emailExists) return { success: false, message: "email ya existe" };
    else if (nicknameExists)
      return { success: false, message: "nickname ya existe" };

    const hashPass = await hashMethod(body.password, 10);
    const newPlayer = await models.players.create({
      ...body,
      password: hashPass,
    });
    delete newPlayer.dataValues.password;

    return {
      success: true,
      player: newPlayer,
      message: "Jugador creado con éxito",
    };
  } catch (error) {
    return { success: false, message: "Falló la creación del jugador" };
  }
};

const loginPlayer = async (body) => {
  const { email, nickname, password } = body;
  if (!email && !nickname) {
    return { success: false, message: "Email o Nickname requerido" };
  } else if (!password) {
    return { success: false, message: "password requerido" };
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

    // si no está
    if (!playerToEvaluate) {
      return { success: false, message: "jugador no encontrado o no existe" };
    }

    //lo tenemos, comparamos pass
    const comparePass = await verifyPass(password, playerToEvaluate.password);
    if (!comparePass)
      return { success: false, message: "Contraseña incorrecta" };

    delete playerToEvaluate.dataValues.password;
    return { success: true, player: playerToEvaluate };
  } catch (error) {
    return { success: false, message: "Error del servidor: " + error.message };
  }
};

module.exports = {
  getPlayers,
  createPlayer,
  loginPlayer,
};
