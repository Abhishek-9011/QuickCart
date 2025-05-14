import express from 'express';
import dotenv from 'dotenv';
import databaseConnect from './config/database.js';

// Routes
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
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
  console.log(`🚀 Server running on port ${PORT}`);
});
