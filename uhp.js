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

const whichPassword = [
  {
    type: "input",
    name: "searchQuery",
    message: "Which password are you looking for?",
  },
];
// End Inquirer Questions

// Start Main App
async function main() {
  const { masterPassword } = await inquirer.prompt(masterQuestion);
  const passwordName = await inquirer.prompt(whichPassword);

  const data = await fs.readFile("./db.json", "utf-8");
  const passwordList = JSON.parse(data);
  const searchPassword = passwordName["searchQuery"];
  const password = passwordList[searchPassword];

  if (masterPassword !== mpw) {
    console.error("Do it right next time ...");
    main();
    return;
  }
  if (!password) {
    console.log("What are you talking about ...");
    main();
  } else {
    console.log("Credentials: ", password.name);
    console.log("Password: ", password.pwd);
  }

  // Testing Write Functionality
  const newCreds = {
    banking: {
      name: "Sparkasse",
      pwd: "12345",
    },
  };

  const newData = Object.assign(passwordList, newCreds);
  await fs.writeFile("./db.json", JSON.stringify(newData));
}

// End Main App
main();
