const express = require("express");
const db = require("./src/config/db");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/v1/auth", require("./src/routes/auth"));
app.use("/api/v1/property", require("./src/routes/property"));

app.listen(port, () => {
  console.log("connected to port 5000");
});
