import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import ProductDetails from "../components/ProductDetails";
import AddProduct from "../components/AddProduct";
import AddReview from "../components/AddReview";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Produtos</Link>
            </li>
            <li>
              <Link to="/add-product">Adicionar Produto</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/products/:productId"
            element={<ProductDetails />}
          />{" "}
          {/* productId será dinâmico */}
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/products/:productId/add-review"
            element={<AddReview />}
          />{" "}
          {/* productId será dinâmico */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
