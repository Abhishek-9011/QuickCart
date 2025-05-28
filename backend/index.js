import express from 'express';
import dotenv from 'dotenv';
import databaseConnect from './config/databaseConnect.js';
import cors from 'cors';
// Routes
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
import cartRouter from './routes/cart.route.js';
import categoryRouter from './routes/category.route.js';
import reviewRouter from './routes/review.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
databaseConnect();

// Routes
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/cart', cartRouter);
app.use('/categories', categoryRouter);
app.use('/reviews', reviewRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
