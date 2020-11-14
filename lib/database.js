const { MongoClient } = require("mongodb");

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

async function createPassword(key, login, pwd) {
  const password = await dbCollection("passwords").insertOne({
    key,
    login,
    pwd,
  });
  return password;
}

async function readPassword(key) {
  const password = await dbCollection("passwords").findOne({ key });
  return password;
}

async function updatePassword(key, login, pwd) {
  const password = await dbCollection("passwords").updateOne(
    { key: key },
    {
      $set: {
        login,
        pwd,
      },
    }
  );
  return password;
}

async function deletePassword(key) {
  const password = await dbCollection("passwords").deleteOne({ key });
  return password;
}

exports.readMongoDbPassword = readMongoDbPassword;
exports.dbConnect = dbConnect;
exports.dbClose = dbClose;
exports.dbCollection = dbCollection;
exports.createPassword = createPassword;
exports.readPassword = readPassword;
exports.updatePassword = updatePassword;
exports.deletePassword = deletePassword;
