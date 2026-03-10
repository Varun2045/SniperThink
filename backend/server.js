import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'SniperThink Backend API is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Interest submission endpoint (referenced in frontend)
app.post('/api/interest', (req, res) => {
  try {
    const { name, email, step, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !step) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and step are required'
      });
    }

    // Here you would typically save to a database
    // For now, just log and return success
    console.log('Interest submission:', { name, email, step, message });
    
    res.status(201).json({
      status: 'success',
      message: 'Interest submitted successfully',
      data: { name, email, step, message }
    });
  } catch (error) {
    console.error('Error submitting interest:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Serve static files from frontend build (for production)
app.use(express.static(join(__dirname, '../frontend/dist')));

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SniperThink Backend Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
