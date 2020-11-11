const fs = require("fs").promises;

async function readPasswordList() {
  const passwordListJSON = await fs.readFile("./db.json", "utf8");
  const passwordList = JSON.parse(passwordListJSON);
  return passwordList;
}

async function writePasswordList(passwordList) {
  await fs.writeFile("./db.json", JSON.stringify(passwordList, null, 2));
}

async function getPassword(passwordName) {
  const passwordList = await readPasswordList();
  return passwordList[passwordName];
}

async function setPassword(passwordName, newPasswordValue) {
  // Dummy Write Functionality
  const newCredentials = {
    banking: {
      name: "Buchladen",
      pwd: "12859035",
    },
  };

  const passwordList = await readPasswordList();
  const newPasswordList = Object.assign(passwordList, newCredentials);
  await writePasswordList(newPasswordList);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;

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
