import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import articleRoutes from './router/articleRoutes';
import paymentRoutes from './router/paymentRoutes';

config();
const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature'],
};

// Apply CORS to all routes EXCEPT the webhook
app.use((req, res, next) => {
  if (req.path === '/api/payments/webhook') {
    // Skip CORS for webhooks as Stripe needs raw body
    next();
  } else {
    cors(corsOptions)(req, res, next);
  }
});

// Parse JSON bodies for all routes EXCEPT webhook
app.use((req, res, next) => {
  if (req.path === '/api/payments/webhook') {
    // Use raw body for webhook
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes 
app.use('/api/articles', articleRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
