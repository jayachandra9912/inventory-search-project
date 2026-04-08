const express = require("express");
const cors = require("cors");
const data = require("./data/inventory.json");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
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