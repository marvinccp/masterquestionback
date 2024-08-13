const express = require("express");
const router = express.Router();

const {
  getPlayers,
} = require("./playerService");



router.get(
  "/",

  async (req, res) => {
    try {
      const players = await getPlayers();
      res.json(players);
    } catch (error) {
      console.log(error, 'No data');
    }
  
    
  }
);



module.exports = router;
