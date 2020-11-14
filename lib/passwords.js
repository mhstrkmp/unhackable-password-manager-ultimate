require("dotenv").config();
const fs = require("fs").promises;
const { createPassword } = require("./database");
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
    await readMasterPassword()
  );
  const pwdBytes = CryptoJS.AES.decrypt(
    passwordList[passwordName].pwd,
    await readMasterPassword()
  );
  passwordList[passwordName].name = nameBytes.toString(CryptoJS.enc.Utf8);
  passwordList[passwordName].pwd = pwdBytes.toString(CryptoJS.enc.Utf8);
  return passwordList[passwordName];
}

async function setPassword(key, login, pwd) {
  const cryptoPwd = CryptoJS.AES.encrypt(
    pwd,
    process.env.PWD_MASTER
  ).toString();
  const cryptoName = CryptoJS.AES.encrypt(
    login,
    process.env.PWD_MASTER
  ).toString();

  await createPassword(key, cryptoName, cryptoPwd);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
