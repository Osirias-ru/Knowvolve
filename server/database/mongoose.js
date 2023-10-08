const mongoose = require("mongoose");

module.exports = {
  async initializeMongoose() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Mongo DB ready")
      return mongoose.connection;
    } catch (err) {
      console.log("Mongo DB failed")
      process.exit(1);
    }
  },

  schemas: {
    User: require("./schemas/user"),
  },
};