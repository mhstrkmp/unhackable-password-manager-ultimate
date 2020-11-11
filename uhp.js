const fs = require("fs").promises;
const inquirer = require("inquirer");

const { askForMasterPassword, mainMenu } = require("./lib/interaction");

// Start Temporary Stuff
const mpw = "0000";

// End Tempory Stuff

// Start Main App
async function main() {
  const masterPassword = await askForMasterPassword();

  const data = await fs.readFile("./db.json", "utf-8");
  const passwordList = JSON.parse(data);

  if (masterPassword !== mpw) {
    console.error("Do it right next time ...");
    main();
    return;
  }

  mainMenu();
  /* const password = passwordList[getPassword];
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
*/
}

// End Main App
main();
