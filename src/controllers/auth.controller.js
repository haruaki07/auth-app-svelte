const User = require("../models/User");
const { githubLoginUrl, getGitHubUserData } = require("../lib/github");
const { getGoogleUserData, urlGoogle } = require("../lib/google");
const { getFacebookUserData, facebookLoginUrl } = require("../lib/fb");
const randImage = require ("../utils/randImage");

/**
 * @callback ExpressRouter
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

/**
 * Github
 * @type {ExpressRouter}
 */
exports.github = (req, res) => {
  res.redirect(githubLoginUrl());
};

/**
 * Github Redirect
 * @type {ExpressRouter}
 */
exports.githubRedirect = async (req, res) => {
  try {
    const { code } = req.query;
    const data = await getGitHubUserData(code);
    const user = await signUp(data);
    res.cookie("token", user.token, { httpOnly: true });
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Google
 * @type {ExpressRouter}
 */
exports.google = (req, res) => {
  res.redirect(urlGoogle());
};

/**
 * Google Redirect
 * @type {ExpressRouter}
 */
exports.googleRedirect = async (req, res) => {
  try {
    const { code } = req.query;
    const data = await getGoogleUserData(code);
    const user = await signUp(data);
    res.cookie("token", user.token, { httpOnly: true });
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Facebook
 * @type {ExpressRouter}
 */
exports.fb = (req, res) => {
  res.redirect(facebookLoginUrl());
};

/**
 * Facebook Redirect
 * @type {ExpressRouter}
 */
exports.fbRedirect = async (req, res) => {
  try {
    const { code } = req.query;
    const data = await getFacebookUserData(code);
    const user = await signUp(data);
    res.cookie("token", user.token, { httpOnly: true });
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * @param {{email: String, name: String, photo: String}} data
 */
async function signUp(data) {
  const { email, name, photo } = data;

  try {
    // check email if already registered
    const exist = await User.findOne({ email });
    if (exist) {
      await exist.generateAuthToken();
      return exist.toJson();
    }

    const password = Math.random().toString(36).slice(2);

    // create new user
    const user = new User();
    user.email = email;
    user.name = name;
    user.photo = !photo ? randImage(name) : photo;
    await user.setPassword(password);
    await user.save();

    // generate token
    await user.generateAuthToken();

    return user.toJson();
  } catch (e) {
    return e;
  }
}
