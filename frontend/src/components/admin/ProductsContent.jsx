import { useEffect, useState } from "react";
import api from "../../services/api";
import "./dashboard.css";

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const formatPrice = (price) => `₦${price.toLocaleString("en-NG")}`;

  return (
    <main className="dashboard-content">
      <h1>Products</h1>
      <p>All products currently in the store.</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  {product.stock > 0 ? (
                    product.stock
                  ) : (
                    <span style={{ color: "red" }}>Out of stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default ProductsContent;