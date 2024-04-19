const cron = require("node-cron");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

cron.schedule("0 0 * * *", async () => {
  console.log("CORN Running!");

  try {
    // Connect to the MongoDB client
    await client.connect();

    // Get the source and destination collections
    const sourceCollection = client.db("quiz").collection("quizzes");
    const destinationCollection = client.db("quiz").collection("quizzesBackup");

    // Fetch all documents from the source collection
    const quizzesBack = await sourceCollection.find().toArray();

    // If there are quizzes, insert them into the destination collection
    if (quizzesBack.length > 0) {
      await destinationCollection.insertMany(quizzesBack);
      console.log("Database dump successful!");
    } else {
      console.log("No quizzes to backup");
    }
  } catch (error) {
    console.error(`Error executing database dump: ${error}`);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
});
