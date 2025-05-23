import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

const ProductList: React.FC = () => {
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, Product[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");

        const products: Product[] = response.data;
        const grouped = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {} as Record<string, Product[]>);
        setProductsByCategory(grouped);
        setLoading(false);
      } catch (err: unknown) {
        let errorMessage = "Erro ao carregar os produtos.";
        if (err instanceof Error) {
          errorMessage += ` ${err.message}`;
        }
        setError(errorMessage);
        setLoading(false);
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Lista de Produtos</h2>
      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <ul>
            {productsByCategory[category].map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price}
                <Link to={`/products/${product._id}`}>
                  <button>Ver Detalhes</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link to="/add-product">
        <button>Adicionar Novo Produto</button>
      </Link>
    </div>
  );
};

export default ProductList;
