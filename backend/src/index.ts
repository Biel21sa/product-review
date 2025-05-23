const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product-review', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/products', productRoutes);
app.use('/products/:productId/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Olá do seu backend!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});