const { Router } = require("express");
const mongo = require("../dao/mongo");

const router = Router();

router.get("/", async (req, res) => {
  console.log(req.ip);
  const db = await mongo();
  const coll = db.collection("products");
  const products = await coll.find({}).toArray();
  res.send(products);
});

router.post("/", async (req, res) => {
  const db = await mongo();
  const coll = db.collection("products");
  const products = await coll.insertOne(req.body);
  res.status(201).send(products);
});

router.get("/:id", async (req, res) => {
  const db = await mongo();
  const coll = db.collection("products");
  const product = await coll.findOne({ id: parseInt(req.params.id) });
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  try {
    const db = await mongo();
    const coll = db.collection("products");

    const result = await coll.deleteOne({ id: parseInt(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Product not found");
    }
    res.send("Product deleted");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = await mongo();
    const coll = db.collection("products");

    const filter = { id: parseInt(req.params.id) };
    const updateDoc = { $set: req.body };

    const result = await coll.updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      return res.status(404).send("Product not found");
    }

    res.send(req.body);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
