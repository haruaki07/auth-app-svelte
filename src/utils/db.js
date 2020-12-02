const mongoose = require("mongoose");

const initMongo = async () => {
  try {
    console.log("trying to connect mongodb...");
    mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => console.log("mongodb connected...")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = initMongo;
