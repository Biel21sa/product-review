import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddReview.css";

interface ReviewFormData {
  author: string;
  rating: number | "";
  comment: string;
}

interface AddReviewProps {
  productId?: string;
}

const AddReview: React.FC<AddReviewProps> = ({ productId: propProductId }) => {
  const { productId: routeProductId } = useParams<{ productId: string }>();
  const productId = propProductId || routeProductId;
  const [formData, setFormData] = useState<ReviewFormData>({
    author: "",
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { state } = useLocation();
  const productName = (state?.productName as string) || "Produto Desconhecido";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!productId) {
      console.error("Product ID não encontrado para adicionar a avaliação.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/products/${productId}/reviews`,
        formData
      );
      console.log("Avaliação adicionada com sucesso:", response.data);
      navigate(`/products/${productId}`);
    } catch (error: unknown) {
      let errorMessage = "Erro ao adicionar avaliação.";
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      }
      setError(errorMessage);
      console.error("Erro ao adicionar avaliação:", error);
    }
  };

  return (
    <div className="add-review-container">
      <h2 className="add-review-title">Adicionar Avaliação</h2>
      <p className="add-review-product-info">Para o produto: {productName}</p>
      <form onSubmit={handleSubmit} className="add-review-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="author">Seu Nome:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Avaliação (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comentário:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit">Enviar Avaliação</button>
          <Link to={productId ? `/products/${productId}` : "/"}>
            <button>Voltar para Detalhes</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
