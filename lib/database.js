const { MongoClient } = require("mongodb");

// Start Temporary Solution
const fs = require("fs").promises;
async function readMongoDbPassword() {
  return await fs.readFile("./.mongoDbPassword", "utf8");
}
// End Temporary Solution

let client;
let db;
async function dbConnect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

function dbClose() {
  return client.close();
}

function dbCollection(name) {
  return db.collection(name);
}

exports.readMongoDbPassword = readMongoDbPassword;
exports.dbConnect = dbConnect;
exports.dbClose = dbClose;
exports.dbCollection = dbCollection;
