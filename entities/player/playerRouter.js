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
  try {
    const body = req.body;
    const newPlayer = await createPlayer(body);

    if (!newPlayer.success) {
      return res.status(400).json({ error: newPlayer.message });
    } else {
      return res.status(201).json({
        success: true,
        player: newPlayer.player,
        message: newPlayer.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create player" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const body = req.body;
    const player = await loginPlayer(body);

    if (!player.success) {
      return res.status(400).json({ error: loginResult.message });
    }

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
    res.status(200).json({ player: loginResult.player, token, message: "Login Exitoso" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
