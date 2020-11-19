require("dotenv").config();
const fs = require("fs").promises;
const { createPassword, readPassword } = require("./database");
const CryptoJS = require("crypto-js");

async function getPassword(key) {
  const pwdObject = await readPassword(key);
  // const loginBytes = CryptoJS.AES.decrypt(
  //   pwdObject.login,
  //   process.env.PWD_MASTER
  // );
  // const pwdBytes = CryptoJS.AES.decrypt(pwdObject.pwd, process.env.PWD_MASTER);

  // pwdObject.login = loginBytes.toString(CryptoJS.enc.Utf8);
  // pwdObject.pwd = pwdBytes.toString(CryptoJS.enc.Utf8);

  return pwdObject;
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
