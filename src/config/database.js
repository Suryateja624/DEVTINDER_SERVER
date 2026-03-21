const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://Suryateja:Suryateja%40123@cluster0.yusxage.mongodb.net/DEV_TINDER";

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log("Mongodb connection successfull")
  } catch (error) {
    console.log(error);
  }
}

module.exports= connectToDatabase;