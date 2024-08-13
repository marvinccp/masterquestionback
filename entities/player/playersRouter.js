const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  createUser,
  getPlayers,
  getOneUser,
  deleteUser,
  updateUser,
  login,
} = require("./playerService");
const loginPlayerSchema = require("./playerSchema");
const validate = require("../../middlewares/validate");
const { authentication, checkRole } = require("../../middlewares/auth");
const { transformSync } = require("@babel/core");
console.log(process.env.JWT_SECRET);

router.get(
  "/",
  // authentication,
  // checkRole("admin", 'user'),
  async (req, res) => {
    // console.log(req.cookies);
    try {
      const players = await getPlayers();
      res.json(players);
    } catch (error) {
      console.log(error, 'No data');
    }
  
    // if (!req.cookies.token) {
    //   res.status(500).send("Unauthenticated");
    // } else {
    //   const users = await getusers();
    //   res.json(users);
    // }
  }
);

router.get(
  "/:id",
  authentication,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getOneUser(id);
      res.json(user);
    } catch (error) {
      res.status(400).send("No user");
    }
  }
);

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newUser = await createUser(body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.patch(
  "/:id",
  authentication,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedUser = await updateUser(id, body);
      res.json(updatedUser);
    } catch (error) {
      throw new Error("User no updated");
    }
  }
);

router.delete(
  "/:id",
  authentication,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUser(id);
      res.json({ info: "deleted", deletedUser });
    } catch (error) {
      throw new Error("user deleted");
    }
  }
);

router.post("/login", async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const user = await login(body.email, body.password);
    console.log(user);
    const payload = {
      sub: user.id,
      nick: user.nickName,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret);

    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // res.cookie("token", token, {
    //   maxAge: 100000,
    //   httpOnly: true,
    // });
    res.json({...user.dataValues, token});
  } catch (error) {
    res.status(400).send("Wrong pass");
  }
});

module.exports = router;
