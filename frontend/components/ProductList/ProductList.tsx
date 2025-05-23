import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const products: Product[] = [
    { id: "1", name: "Laptop", price: 1200 },
    { id: "2", name: "Mouse", price: 25 },
  ];

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <Link to={`/products/${product.id}`}>
              <button>Ver Detalhes</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add-product">
        <button>Adicionar Novo Produto</button>
      </Link>
    </div>
  );
};

export default ProductList;
