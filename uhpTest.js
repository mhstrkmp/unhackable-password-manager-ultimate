// const inquirer = require("inquirer");
const {
  readMongoDbPassword,
  dbConnect,
  dbClose,
  dbCollection,
} = require("./lib/database");

async function main() {
  // Start Temporary Solution
  const passwordDb = await readMongoDbPassword();
  const url = `mongodb+srv://mhstrkmp:${passwordDb}@cluster0.4gbgq.mongodb.net/uhp?retryWrites=true`;
  // End Temporary Solution

  await dbConnect(url, "uhp");

  async function getPassword(key) {
    const password = await dbCollection("passwords").findOne({ key });
    return password;
  }

  async function setPassword(key, login, pwd) {
    const password = await dbCollection("passwords").insertOne({
      key,
      login,
      pwd,
    });
    return password;
  }

  dbClose();
}

main();
