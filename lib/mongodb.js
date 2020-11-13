const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const fs = require("fs").promises;

async function readMongoDbPassword() {
  return await fs.readFile("./.mongoDbPassword", "utf8");
}

async function connectMongoDb() {
  // Connection URL
  const password = readMongoDbPassword();
  const url = `mongodb+srv://mhstrkmp:${password}@cluster0.4gbgq.mongodb.net/uhp?retryWrites=true`;

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db("test");

    db.collection("inventory")
      .insertMany([
        {
          item: "journal",
          qty: 25,
          size: { h: 14, w: 21, uom: "cm" },
          status: "A",
        },
        {
          item: "notebook",
          qty: 50,
          size: { h: 8.5, w: 11, uom: "in" },
          status: "A",
        },
        {
          item: "paper",
          qty: 100,
          size: { h: 8.5, w: 11, uom: "in" },
          status: "D",
        },
        {
          item: "planner",
          qty: 75,
          size: { h: 22.85, w: 30, uom: "cm" },
          status: "D",
        },
        {
          item: "postcard",
          qty: 45,
          size: { h: 10, w: 15.25, uom: "cm" },
          status: "A",
        },
      ])
      .then(function (result) {
        // process result
      });

    const cursor = db.collection("inventory").find({
      "size.uom": "in",
    });
    function iterateFunc(doc) {
      console.log(JSON.stringify(doc, null, 4));
    }

    function errorFunc(error) {
      console.log(error);
    }

    cursor.forEach(iterateFunc, errorFunc);

    client.close();
  });
}

exports.connectMongoDb = connectMongoDb;
