import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

interface ProductFormData {
  name: string;
  description: string;
  price: number | "";
  category: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        formData
      );
      console.log("Produto cadastrado com sucesso:", response.data);
      navigate("/");
    } catch (error: unknown) {
      let errorMessage = "Erro ao cadastrar produtos.";
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      }
      setError(errorMessage);
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoria:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Cadastrar</button>
          <Link to="/">
            <button>Voltar para a Lista</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
