const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

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
  const nameBytes = CryptoJS.AES.decrypt(
    passwordList[passwordName].name,
    "0000"
  );
  const pwdBytes = CryptoJS.AES.decrypt(passwordList[passwordName].pwd, "0000");
  passwordList[passwordName].name = nameBytes.toString(CryptoJS.enc.Utf8);
  passwordList[passwordName].pwd = pwdBytes.toString(CryptoJS.enc.Utf8);
  return passwordList[passwordName];
}

async function setPassword(passwordName, name, pwd) {
  const cryptoPwd = CryptoJS.AES.encrypt(pwd, "0000").toString();
  const cryptoName = CryptoJS.AES.encrypt(name, "0000").toString();
  const newCredentials = {
    [passwordName]: {
      name: cryptoName,
      pwd: cryptoPwd,
    },
  };

  const passwordList = await readPasswordList();
  const newPasswordList = Object.assign(passwordList, newCredentials);
  await writePasswordList(newPasswordList);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
