# ChargeNet - AI Chat Application

A full-stack chat application powered by Google Gemini API, built with React and Node.js.

## Features

- 🤖 **AI-Powered Chat**: Integration with Google Gemini API for intelligent conversations
- 💬 **Real-time Messaging**: Instant message display with typing indicators
- 🎨 **Modern UI**: Clean, responsive chat interface with gradient design
- 🐳 **Docker Support**: Easy deployment with Docker and Docker Compose
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Efficient**: Built with React and Express for optimal performance

## Tech Stack

### Frontend
- React 19
- Vite
- Axios
- CSS3 with modern animations

### Backend
- Node.js
- Express
- Google Gemini AI SDK (@google/genai)
- CORS enabled

### DevOps
- Docker
- Docker Compose
- Nginx (for frontend serving)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [Docker Compose](https://docs.docker.com/compose/) (optional, for orchestration)

You will also need:
- A Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Quick Start

### Option 1: Run with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/TranNgon/chargenet.git
   cd chargenet
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

5. **Stop the application**
   ```bash
   docker-compose down
   ```

### Option 2: Run Locally (Development)

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on http://localhost:5000

#### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if needed (default is http://localhost:5000):
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (Vite dev server)

5. **Open your browser**
   Navigate to http://localhost:5173 to use the application
   
   Note: When using Docker, the frontend runs on port 3000.

## Project Structure

```
chargenet/
├── backend/                  # Backend Node.js/Express server
│   ├── server.js            # Main server file with API endpoints
│   ├── package.json         # Backend dependencies
│   ├── Dockerfile           # Backend container configuration
│   ├── .env.example         # Environment variables template
│   └── .gitignore          # Git ignore file
│
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── App.jsx         # Main chat component
│   │   ├── App.css         # Chat UI styles
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # React entry point
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── Dockerfile          # Frontend container configuration
│   ├── nginx.conf          # Nginx configuration
│   ├── .env.example        # Environment variables template
│   └── vite.config.js      # Vite configuration
│
├── docker-compose.yml       # Docker orchestration
├── .env.example            # Root environment variables
└── README.md               # This file
```

## API Endpoints

### Backend API

- **GET** `/health` - Health check endpoint
  ```json
  Response: { "status": "ok", "message": "Server is running" }
  ```

- **POST** `/api/chat` - Send a message to the AI
  ```json
  Request: { "message": "Your message here" }
  Response: { 
    "message": "AI response", 
    "timestamp": "2024-01-01T00:00:00.000Z" 
  }
  ```

## Configuration

### Environment Variables

#### Backend (.env)
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

#### Frontend (.env)
- `VITE_BACKEND_URL` - Backend API URL (default: http://localhost:5000)

#### Docker (.env at root)
- `GEMINI_API_KEY` - Your Google Gemini API key (required)

## Features in Detail

### Chat Interface
- **Message History**: View all previous messages in the conversation
- **Real-time Updates**: Messages appear instantly with smooth animations
- **Typing Indicator**: See when the AI is generating a response
- **Error Handling**: Clear error messages for network or API issues
- **Clear Chat**: Button to reset the conversation

### Responsive Design
- Mobile-friendly interface
- Adapts to different screen sizes
- Touch-optimized controls

### Error Handling
- Network error detection
- API key validation
- User-friendly error messages
- Graceful degradation

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with --watch flag for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
```
The built files will be in the `dist/` directory.

#### Backend
The backend runs directly with Node.js, no build step required.

## Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild a specific service
docker-compose up -d --build backend
docker-compose up -d --build frontend

# Remove all containers and networks
docker-compose down -v
```

## Troubleshooting

### Backend won't start
- Ensure your `GEMINI_API_KEY` is set correctly in `.env`
- Check if port 5000 is already in use
- Verify Node.js version (v20 or higher)

### Frontend can't connect to backend
- Check that backend is running on the correct port
- Verify `VITE_BACKEND_URL` in frontend `.env`
- Check CORS settings if accessing from different domain

### Docker issues
- Ensure Docker and Docker Compose are installed
- Check that ports 3000 and 5000 are not in use
- Try rebuilding: `docker-compose up --build`

### API errors
- Verify your Gemini API key is valid
- Check API quota limits
- Review backend logs for detailed error messages

## Security Notes

- Never commit `.env` files to version control
- Keep your `GEMINI_API_KEY` secret
- Use environment variables for all sensitive data
- Review CORS settings before deploying to production

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using React, Node.js, and Google Gemini AI