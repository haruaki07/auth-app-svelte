const { bucket } = require("../lib/storage");
const User = require("../models/User");
const randImage = require ("../utils/randImage");
const {
  loginValidation,
  registerValidation,
  updateValidation,
  parseError,
} = require("../utils/validation");

/**
 * check is auth
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.me = (req, res) => {
  res.status(200).json({
    error: null,
    message: "authorized",
    data: { user: req.user.toJson(), token: req.token },
  });
};

/**
 * get all users
 * if given id query, will return single user
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.index = async (req, res) => {
  const { id } = req.query;
  if (id) {
    User.findById(id, (err, user) => {
      if (!user)
        return res
          .status(400)
          .json({ error: `couldn't found user with id ${id}` });

      return res
        .status(200)
        .json({ error: null, data: { user: user.publicJson() } });
    });
  } else {
    User.find({}, (err, users) => {
      if (err) return res.status(400).json({ err });
      const usersMap = [];

      users.forEach(function (user) {
        const userJson = user.publicJson();
        usersMap.push(userJson);
      });

      return res.status(200).json({
        error: null,
        data: { users: usersMap },
      });
    });
  }
};

/**
 * authenticate user
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.login = async (req, res) => {
  // data validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: parseError(error.details) });

  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    const isAuthenticated = await (user && user.verifyPassword(password));
    if (!isAuthenticated) {
      return res.status(400).json({
        error: "Login failed! Email or password is wrong",
      });
    }

    // create token
    const token = await user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });
    res
      .status(202)
      .json({ error: null, data: { user: user.toJson(), token } });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * register user
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.register = async (req, res) => {
  // data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: parseError(error.details) });

  try {
    const { email, name, password } = req.body;

    // check email if already registered
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // create new user
    const user = new User();
    user.photo = randImage(name);
    user.email = email;
    user.name = name;
    await user.setPassword(password);

    await user.save();
    res.status(201).json({ error: null, data: user.toJson() });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * update user profile
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.update = async (req, res) => {
  const { id } = req.user;
  // data validation
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).json({ error: parseError(error.details) });

  try {
    let user = await User.findById(id);

    if (user) {
      user.name = req.body.name;

      const exist = await User.findOne({ email: req.body.email });
      if (exist && req.body.email !== user.email)
        return res.status(400).json({ error: { email:"Email already exists" } });
      user.email = req.body.email;
      
      user.bio = req.body.bio;
      user.phone = req.body.phone;
      if (req.body.password) await user.setPassword(req.body.password);

      await user.save();
      return res.status(202).json({ data: user.toJson() });
    }

    return res.status(400).json({ error: `User not found.` });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * update user photo profile
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.updatePhoto = (req, res) => {
  const randomStr = Math.random().toString(20).substr(2, 8);
  const fileName = `${randomStr}-${req.file.originalname}`.toLowerCase();
  const file = bucket.file(`img/${fileName}`);
  file
    .createWriteStream({
      predefinedAcl: "publicRead",
      metadata: {
        contentType: req.file.mimetype,
      },
    })
    .on("error", function (error) {
      console.log(error);
      return res.status(500).json({
        error: "Something went wrong. Try again",
      });
    })
    .on("finish", async function () {
      try {
        const { id } = req.user;
        const url = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(file.name)}?alt=media`;

        const user = await User.findById(id);

        if (!user) {
          return res.status(400).json({ error: "Couldn't update the profile" });
        }

        user.photo = url;
        user.save();

        res.status(201).json({
          data: url,
          error: null,
        });
      } catch (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Something went wrong. Try again" });
      }
    })
    .end(req.file.buffer);
};

/**
 * update user photo profile
 * @type {import('./auth.controller.js').ExpressRouter}
 */
exports.logout = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id, token: req.token });
    user.token = null;
    await user.save();

    res.cookie("token", "", { httpOnly: true });
    res.status(200).json({
      error: null,
      message: "logged out"
    });
  } catch(error) {
    res.status(400).json({ error });
  }
}