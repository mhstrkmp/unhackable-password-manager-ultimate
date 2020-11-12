const inquirer = require("inquirer");
const { getPassword, setPassword } = require("./passwords");

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

async function searchPassword() {
  const { searchPassword } = await inquirer.prompt([
    {
      type: "input",
      name: "searchPassword",
      message: "Which password do you search?",
    },
  ]);
  const password = await getPassword(searchPassword);
  if (!password) {
    console.log("What are you talking about ...");
    return;
  } else {
    console.log("--- Information for " + searchPassword + " ---");
    console.log("Credentials: ", password.name);
    console.log("Password: ", password.pwd);
  }
}

async function newPassword() {
  const { newPasswordName } = await inquirer.prompt([
    {
      type: "input",
      name: "newPasswordName",
      message: "Password name:",
    },
  ]);

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Username:",
    },
  ]);

  const { pwd } = await inquirer.prompt([
    {
      type: "password",
      name: "pwd",
      message: "Password:",
    },
  ]);

  const password = await setPassword(newPasswordName, name, pwd);
}

exports.askForMasterPassword = askForMasterPassword;
exports.searchPassword = searchPassword;
exports.newPassword = newPassword;
