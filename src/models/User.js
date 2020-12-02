const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  photo: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.setPassword = async function (password) {
  try {
    this.password = await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.verifyPassword = async function (password) {
  try {
    const valid = await argon2.verify(this.password, password);
    return valid;
  } catch (e) {
    console.log(e);
  }
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "12h" }
  );
  user.token = token;
  await user.save();
  return token;
};

userSchema.methods.publicJson = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    bio: this.bio,
    phone: this.phone,
    photo: this.photo,
  };
};

userSchema.methods.toJson = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    bio: this.bio,
    phone: this.phone,
    photo: this.photo,
    token: this.token,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
