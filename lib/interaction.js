const inquirer = require("inquirer");

// Start Inquirer Questions

const testQuestions = [
  {
    type: "input",
    name: "getPassword",
    message: "Show password for: ",
  },
  {
    type: "input",
    name: "setPassword",
    message: "Save new Password for: ",
  },
];

// End Inquirer Questions

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

exports.askForMasterPassword = askForMasterPassword;
