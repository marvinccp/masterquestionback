const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getPlayers,
  createPlayer,
  loginPlayer,
  getOne,
  updatePlayerScore,
  getTopScore,
} = require("./playerService");
const { sendWelcomeEmail } = require("../../mailing/mailer.js");

router.get("/", async (req, res) => {
  try {
    const players = await getPlayers();
    if (!players) {
      return res.status(500).json({ error: players.message });
    }
    return res.status(200).json({ succes: true, players: players });
  } catch (error) {
    return res.status(500).json({ error: players.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const player = await getOne(id);
    if (!player.success) {
      return res.status(400).json({ error: player.message });
    }
    return res.status(200).json(player);
  } catch (error) {
    return res.status(500).json({ error: player.message });
  }
});

router.get("/top/score", getTopScore);
router.patch("/points", updatePlayerScore);

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: newPlayer.message });
    }
    const newPlayer = await createPlayer(body);

    if (!newPlayer.success) {
      return res.status(400).json({ error: newPlayer.message });
    } else {
      const payload = body;
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, {
        expiresIn: "24h",
      });
      await sendWelcomeEmail(body.email);
      return res.status(201).json({
        success: true,
        player: newPlayer.player,
        message: newPlayer.message,
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Falló la creación del jugador" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const body = req.body;
    const login = await loginPlayer(body);

    if (!login.success) {
      return res.status(400).json({ error: login.message });
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
    res
      .status(200)
      .json({ player: login.player, token, message: "Login Exitoso" });
  } catch (error) {
    if (error.isOperational) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

module.exports = router;
