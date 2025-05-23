import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do novo produto:", formData);
    // Aqui, no futuro, faríamos a chamada para a API

    // Após o cadastro (simulado), voltamos para a lista de produtos
    navigate("/");
  };

  return (
    <div>
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
          <label htmlFor="category">Categoria:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/">
        <button>Voltar para a Lista</button>
      </Link>
    </div>
  );
};

export default AddProduct;
