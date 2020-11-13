// const inquirer = require("inquirer");
require("dotenv").config();

const { dbConnect, dbClose, dbCollection } = require("./lib/database");

async function main() {
  await dbConnect(process.env.DB_URI, process.env.DB_NAME);

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

  dbClose();
}

main();
