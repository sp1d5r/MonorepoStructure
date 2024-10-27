import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import articleRoutes from './router/articleRoutes';

config();
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());


// Routes 
app.use('/api/articles', articleRoutes);


// Test Routes.
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ data: 'This is test data from the backend' });
});


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
