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

// Start Main App
async function main() {
  const { masterPassword } = await inquirer.prompt(masterQuestion);

  const data = await fs.readFile("./db.json", "utf-8");
  const passwordList = JSON.parse(data);

  if (masterPassword !== mpw) {
    console.error("Do it right next time ...");
    main();
    return;
  }
  const { getPassword, setPassword } = await inquirer.prompt(testQuestions);
  const password = passwordList[getPassword];
  const newPassword = passwordList[setPassword];

  if (!password) {
    console.log("What are you talking about ...");
    main();
  } else {
    console.log("--- Information for " + getPassword + " ---");
    console.log("Credentials: ", password.name);
    console.log("Password: ", password.pwd);
  }

  // Testing Write Functionality
  const newCreds = {
    banking: {
      name: "Buchladen",
      pwd: "12859035",
    },
  };

  const newData = Object.assign(passwordList, newCreds);
  await fs.writeFile("./db.json", JSON.stringify(newData, null, 2));
}

// End Main App
main();
