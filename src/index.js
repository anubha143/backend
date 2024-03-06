const express = require("express");
const controller = require("./controllers");
const mongo = require("./dao/mongo");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", controller);

app.listen(port, async () => {
  await mongo();
  console.log(`Example app listening on port ${port}`);
  // const db2 = await mongo();
});
