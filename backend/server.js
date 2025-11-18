import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Invalid message. Please provide a non-empty message.' 
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' 
      });
    }

    console.log(`Received message: ${message}`);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log(`Generated response: ${text.substring(0, 100)}...`);

    res.json({ 
      message: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating response:', error);
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your Gemini API key configuration.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate response. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});
