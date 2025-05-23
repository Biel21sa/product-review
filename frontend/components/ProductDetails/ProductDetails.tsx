import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

interface Review {
  _id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(
          `http://localhost:3000/products/${productId}/reviews`
        );
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err: unknown) {
        setError("Erro ao carregar os detalhes do produto e avaliações.");
        setLoading(false);
        console.error("Erro ao buscar detalhes do produto:", err);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return <div>Carregando detalhes do produto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-details-container">
      <h2 className="product-details-title">Detalhes do Produto</h2>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Preço: ${product.price}</p>
        <p>Categoria: {product.category}</p>
      </div>

      <div className="reviews-section">
        <h4 className="reviews-title">Avaliações</h4>
        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review._id} className="review-item">
                <strong>{review.author}</strong> - Rating: {review.rating}/5
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-reviews">
            Ainda não há avaliações para este produto.
          </p>
        )}
      </div>

      <div className="actions">
        <Link
          to={`/products/${product._id}/add-review`}
          state={{ productName: product.name }}
        >
          <button>Adicionar Avaliação</button>
        </Link>
        <Link to="/">
          <button>Voltar para a Lista</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
