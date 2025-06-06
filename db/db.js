const mongoose = require("mongoose");

const connectMongo = async (mongourl) => {
  try {
    await mongoose.connect(mongourl).then(() => {
      console.log("Successfully Connected to MongoDB...");
    });
  } catch (error) {
    console.log(`Error connecting to DB.... ${error}`);
  }
};
module.exports = connectMongo;