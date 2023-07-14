const User = require("../modules/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    res.send({ msg: "email already exists" });
    return;
  }
  const checkUsername = await User.findOne({ username: req.body.username });
  if (checkUsername) {
    res.send({ msg: "This username is already been used" });
    return;
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      const createdUser = await User.create(user);
      const token = jwt.sign({ id: createdUser._id }, "difficultPrivateKey");
      res.send({ token });
    });
  });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: user._id }, "difficultPrivateKey");
        res.send({ token });
      } else {
        res.send({ msg: "wrong password" });
      }
    });
  } else {
    res.send({ msg: "wrong email" });
  }
};

const verify = async (req, res) => {
  if (!req.body.token) {
    res.send({ msg: false });
    return;
  }
  // decrypt and get back the user id
  try {
    const payload = jwt.verify(req.body.token, "difficultPrivateKey");
    if (payload) {
      const user = await User.findOne({ _id: payload.id });
      if (user) {
        const token = jwt.sign({ _id: user._id }, "difficultPrivateKey");
        res.send({
          userData: user,
          token: token,
        });
      } else {
        res.send("Invalid Token");
      }
    } else {
      res.send("Invalid Token");
    }
  } catch (err) {
    res.send("Invalid Token");
  }
};

module.exports = {
  signup,
  login,
  verify,
};
