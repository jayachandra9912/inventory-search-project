const express = require("express");
const cors = require("cors");
const data = require("./data/inventory.json");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let filtered = [...data];

  if (q) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(item =>
      item.category === category
    );
  }

  if (minPrice) {
    filtered = filtered.filter(item =>
      item.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filtered = filtered.filter(item =>
      item.price <= Number(maxPrice)
    );
  }

  res.json(filtered);
});