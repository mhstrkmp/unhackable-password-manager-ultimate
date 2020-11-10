const inquirer = require("inquirer");
const fs = require("fs").promises;

// Start Temporary Stuff
const mpw = "0000";

// End Tempory Stuff

// Start Inquirer Questions
const masterQuestion = [
  {
    type: "password",
    name: "masterPassword",
    message: "Just to be sure - Please enter your Master Password",
  },
];
// End Inquirer Questions

// Start Main App
async function main() {
  const { masterPassword } = await inquirer.prompt(masterQuestion);
  console.log(masterPassword);
}

// End Main App
main();
