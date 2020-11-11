const inquirer = require("inquirer");

async function mainMenu() {
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
      console.log("Get");
      break;

    case "Save a new password":
      console.log("Set");
      break;
  }

  console.log(answers);
  console.log(answers.menu);
  return answers;
}

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "masterPassword",
      message: "Just to be sure - Please enter your Master Password",
    },
  ]);
  return masterPassword;
}

async function showOptions() {
  const { getPassword, setPassword } = await inquirer.prompt(testQuestions);
  return { getPassword, setPassword };
}

exports.askForMasterPassword = askForMasterPassword;
exports.mainMenu = mainMenu;
