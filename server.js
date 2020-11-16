require("dotenv").config();

const express = require("express");
const { getPassword, setPassword } = require("./lib/passwords");
const { dbConnect, deletePassword } = require("./lib/database");

const app = express();
app.use(express.json());
const port = 3600;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you have specified");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

app.post("/api/passwords/", async (request, response) => {
  const password = request.body;

  try {
    await setPassword(password.key, password.value);
    response.send(`Successfully set ${password.name} `);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.delete("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;

  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you have specified");
      return;
    }
    await deletePassword(name);
    response.send(`Successfully deleted ${name} `);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

async function run() {
  console.log("Connecting to database...");
  await dbConnect(process.env.DB_URI, process.env.DB_NAME);
  console.log("Connected to database 🎉");
  app.listen(port, () => {
    console.log(`UHP API listening at http://localhost:${port}`);
  });
}
run();
