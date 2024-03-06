const { MongoClient } = require("mongodb");
require("dotenv").config();
const url = process.env.MONGO_URL;

const client = new MongoClient(url, {
  appName: "products",
  maxPoolSize: 20,
  minPoolSize: 5,
});

let db = null;

async function mongo() {
  if (db) {
    console.log("db1111", db);
    console.log("using cached connected to mongo");
    return db;
  }
  await client.connect();
  console.log("connected successfully to database");
  db = client.db("products");
  console.log("db222", db);
  return db;
}

module.exports = mongo;
// main().then(console.log).catch(console.error);
