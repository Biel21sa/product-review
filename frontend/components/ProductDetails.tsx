import React from "react";
import { Link, useParams } from "react-router-dom";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // Simulação dos detalhes e avaliações (agora usando o productId do parâmetro)
  const product: Product = {
    id: productId || "default",
    name: "Produto Exemplo",
    description: "Descrição do produto",
    price: 100,
  };
  const reviews: Review[] = [
    { id: "r1", author: "Usuário 1", rating: 5, comment: "Ótimo produto!" },
    {
      id: "r2",
      author: "Usuário 2",
      rating: 4,
      comment: "Bom custo-benefício.",
    },
  ];

  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <h3>
        {product.name} (ID: {product.id})
      </h3>
      <p>{product.description}</p>
      <p>Preço: ${product.price}</p>

      <h4>Avaliações</h4>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.author}</strong> - Rating: {review.rating}/5
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não há avaliações para este produto.</p>
      )}

      <Link to={`/products/${product.id}/add-review`}>
        <button>Adicionar Avaliação</button>
      </Link>
      <Link to="/">
        <button>Voltar para a Lista</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
