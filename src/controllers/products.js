const { Router } = require("express");

const router = Router();
let products = [];

router.get("/", (req, res) => {
  console.log(req.ip);
  res.send(products);
});

router.post("/", (req, res) => {
  products.push(req.body);
  res.status(201).send(req.body);
});

router.get("/:id", (req, res) => {
  const prod = products.find(
    (i) => i.id.toString() === req.params.id.toString()
  );
  res.send(prod);
});

router.delete("/:id", (req, res) => {
  const prod = products.filter(
    (i) => i.id.toString() !== req.params.id.toString()
  );
  products = prod;
  res.sendStatus(200);
});

router.put("/:id", (req, res) => {
  products = products.map((i) =>
    i.id.toString() === req.params.id.toString() ? req.body : i
  );
  res.send(req.body);
});

module.exports = router;
