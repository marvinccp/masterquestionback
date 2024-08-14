const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getPlayers, createPlayer, loginPlayer } = require("./playerService");

router.get("/", async (req, res) => {
  try {
    const players = await getPlayers();
    res.json(players);
  } catch (error) {
    console.log(error, "No data");
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newPlayer = await createPlayer(body);
  // const {password, ...playerData} = newPlayer.dataValues
  // res.json(playerData)
  res.json(newPlayer);
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const player = await loginPlayer(body);
  const { id, nickname, role, email, score } = body;
  const payload = {
    sub: id,
    nickname,
    role,
    email,
    score,
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
  res.send({ player, token });
});

module.exports = router;
