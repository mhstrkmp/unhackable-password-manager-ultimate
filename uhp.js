const inquirer = require("inquirer");
const { askForMasterPassword, searchPassword } = require("./lib/interaction");

// Start Temporary Stuff
const mpw = "0000";

// End Tempory Stuff

async function main() {
  const masterPassword = await askForMasterPassword();

  if (masterPassword !== mpw) {
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
      // Set Password Functionality comes here
      console.log("Set");
      break;
  }
}
main();
