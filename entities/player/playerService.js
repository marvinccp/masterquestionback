const { models } = require("../../database/database");
const { hashMethod, verifyPass } = require("../../utils/secureMethods.js");



const getPlayers = async () => {
    const players = await models.players.findAll();
    console.log(players);
    return players;
 
};






module.exports = {
  getPlayers,

};
