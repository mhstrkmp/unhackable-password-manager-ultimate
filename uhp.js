require("dotenv").config();

const inquirer = require("inquirer");
const { dbConnect, dbClose, dbCollection } = require("./lib/database");
const {
  askForMasterPassword,
  searchPassword,
  newPassword,
} = require("./lib/interaction");
const { readMasterPassword } = require("./lib/passwords");

async function main() {
  await dbConnect(process.env.DB_URI, process.env.DB_NAME);

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
