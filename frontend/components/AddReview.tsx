import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      console.error("Product ID não encontrado para adicionar a avaliação.");
      return;
    }
    console.log(`Nova avaliação para o produto ID: ${productId}`, formData);
    // Aqui, no futuro, faríamos a chamada para a API

    // Após o cadastro (simulado), voltamos para os detalhes do produto
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <h2>Adicionar Avaliação</h2>
      {productId && <p>Para o produto com ID: {productId}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Seu Nome:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
          <label htmlFor="comment">Comentário:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Enviar Avaliação</button>
      </form>
      <Link to={productId ? `/products/${productId}` : "/"}>
        <button>Voltar para Detalhes</button>
      </Link>
    </div>
  );
};

export default AddReview;
