
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //Since we are using cloud DB we get cluster address at mongoose.connection.host
    console.log("Mongo Connected "+mongoose.connection.host.bgGreen);
  } catch (error) {
    //console.log("MongoDB URL:", process.env.MONGO_URL);
    console.log("MongoDB Connection Error:", process.env.MONGO_URL.bgRed);
}
};

module.exports = connectDB;
