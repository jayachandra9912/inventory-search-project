import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await fetch(`http://localhost:5000/search?${params}`);
    const data = await res.json();

    setProducts(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Inventory Search
      </h1>

      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 grid md:grid-cols-5 gap-4">
        <input
          className="border p-2 rounded-lg"
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="number"
          className="border p-2 rounded-lg"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 rounded-lg"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button
          onClick={search}
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-lg font-semibold">Loading...</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {p.productName}
            </h2>
            <p className="text-gray-600 mb-1">
              Category: {p.category}
            </p>
            <p className="text-green-600 font-bold text-lg">
              ₹{p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;