const inquirer = require("inquirer");
const {
  askForMasterPassword,
  searchPassword,
  newPassword,
} = require("./lib/interaction");
const { readMasterPassword } = require("./lib/passwords");

async function main() {
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
}
main();
