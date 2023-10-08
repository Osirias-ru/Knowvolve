const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    password: String,
    email: String,
    isVerefy: Boolean,
    recoverToken: String,
  }
);

const Model = mongoose.model("user", Schema);

module.exports = {
  registerUser: async (user) => {
    if (!user) throw new Error("User is required.");

    let userDB = await Model.findById(user._id);
    if (!userDB) {
      userDB = new Model({
        _id: user.verificationToken,
        name: user.name,
        email: user.email,
        password: user.password,
        isVerefy: user.isVerefy,
        recoverToken: user.recoverToken
      });
      return userDB;
    }
    else {
      return false;
    }
  },
  confirmUser: async (verificationToken) => {
    if (!verificationToken) throw new Error("Verification Token is required.");

    let userDB = await Model.findById(verificationToken);
    if (userDB && !userDB.isVerefy) {
      userDB.isVerefy = true;
      await userDB.save();
      return userDB;
    }
    else {
      return false;
    }
  },
  findUserByEmail: async (email) => {
    if (!email) throw new Error("Email is required.");

    let userDB = await Model.findOne({email: email});
    if (userDB && userDB.isVerefy) {
      return userDB;
    }
    else {
      return false;
    }
  },
  findUserById: async (_id) => {
    if (!_id) throw new Error("ID is required.");

    let userDB = await Model.findById(_id);
    if (userDB && userDB.isVerefy) {
      return userDB;
    }
    else {
      return false;
    }
  },
  resetPasswordUser: async (resetToken) => {
    if (!resetToken) throw new Error("Reset Token is required.");

    let userDB = await Model.findOne({recoverToken: resetToken});
    if (userDB && userDB.isVerefy) {
      return userDB;
    }
    else {
      return false;
    }
  }
};