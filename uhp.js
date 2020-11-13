const inquirer = require("inquirer");
const {
  readMongoDbPassword,
  dbConnect,
  dbClose,
  dbCollection,
} = require("./lib/database");
const {
  askForMasterPassword,
  searchPassword,
  newPassword,
} = require("./lib/interaction");
const { readMasterPassword } = require("./lib/passwords");

async function main() {
  // Start Temporary Solution
  const password = await readMongoDbPassword();
  const url = `mongodb+srv://mhstrkmp:${password}@cluster0.4gbgq.mongodb.net/uhp?retryWrites=true`;
  // End Temporary Solution

  await dbConnect(url, "test");
  const masterPassword = await askForMasterPassword();

  if (masterPassword !== (await readMasterPassword())) {
    console.error("Do it right next time ...");
    main();
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What do you want to do?",
      choices: ["Search for a password.", "Save a new password"],
    },
  ]);

  switch (answers.mainMenu) {
    case "Search for a password.":
      searchPassword();
      break;

    case "Save a new password":
      newPassword();
      break;
  }
  dbClose();
}
main();
