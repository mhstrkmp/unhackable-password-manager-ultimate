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

async function setPassword(passwordName, name, pwd) {
  const newCredentials = {
    [passwordName]: {
      name,
      pwd,
    },
  };

  const passwordList = await readPasswordList();
  const newPasswordList = Object.assign(passwordList, newCredentials);
  await writePasswordList(newPasswordList);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
