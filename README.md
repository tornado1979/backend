# Address Search API

A autocomplete API for Norwegian street addresses built with Node.js, TypeScript, and Express. Uses trie-search for lightning-fast prefix matching across 36,000+ Norwegian addresses.

## 🌍 Live Demo

**🚀 API is live and hosted on Render:**
- **Base URL**: `https://backend-tr57.onrender.com`
- **Try it now**: [https://backend-tr57.onrender.com/search/oslo](https://backend-tr57.onrender.com/search/oslo)
- **Health Check**: [https://backend-tr57.onrender.com/health](https://backend-tr57.onrender.com/health)

## 🚀 Features

- **Fast Autocomplete**: Trie-based search for instant results
- **Norwegian Addresses**: Complete dataset of streets, cities, and postal codes
- **TypeScript**: Full type safety and excellent developer experience
- **Production Ready**: Comprehensive logging, error handling, and Docker support
- **Well Tested**: 80%+ test coverage with unit and integration tests

## 📋 API Endpoints

### Search Addresses
```http
GET /search/<query>
```

**Parameters:**
- `query` (required): Search query in URL path - minimum 3 characters

**Example Requests:**
```bash
# Local development
curl "http://localhost:8080/search/oslo"
curl "http://localhost:8080/search/rodeløkka"

# Live API (hosted on Render)
curl "https://backend-tr57.onrender.com/search/oslo"
curl "https://backend-tr57.onrender.com/search/rodeløkka"
curl "https://backend-tr57.onrender.com/search/%C3%B8sten"
```

**Response Format:**
```json
{
  "query": "oslo",
  "results": [
    {
      "city": "OSLO",
      "county": "Oslo",
      "district": "Grünerløkka",
      "municipality": "Oslo",
      "municipalityNumber": 301,
      "postNumber": 501,
      "street": "Rodeløkka Postboks 6500-6599",
      "type": "Postboksadresse",
      "typeCode": 4
    }
  ],
  "total": 1,
  "message": "Search completed successfully"
}
```

### Health Check
```http
GET /health
```

Returns server status and system information:
```json
{
  "status": "ok",
  "timestamp": "2025-11-08T12:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "used": 50.5,
    "total": 512
  }
}
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd backend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The API will be available at `http://localhost:8080`

### Environment Variables

Create a `.env` file in the root directory to configure the server:
```env
PORT=8080
NODE_ENV=development
```

**Note**: The default port is 8080 (as per requirements), but we can override it by setting the `PORT` environment variable in the `.env` file or system environment.

## 📦 Available Scripts

### Development
```bash
npm run dev          # Start development server with ts-node
npm run dev:watch    # Start with auto-reload on file changes
```

### Building & Production
```bash
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Check code with ESLint
npm run lint:fix     # Fix linting issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check if code is properly formatted
npm run type-check   # Check TypeScript types without building
```

### Testing
```bash
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
```

### Docker
```bash
npm run docker:build  # Build Docker image
npm run docker:run    # Run container on port 8080
npm run docker:stop   # Stop running container
npm run docker:logs   # View container logs
```

## 🌐 Deployment

### ✅ Successfully Deployed on Render

This API is currently **live and running** on Render:
- **Live URL**: [https://backend-tr57.onrender.com](https://backend-tr57.onrender.com)
- **Hosting Platform**: [Render.com](https://render.com)
- **Auto-deploy**: Enabled from GitHub repository

### Deploy Your Own Instance

1. **Push your code to GitHub** (already done!)
2. **Go to [render.com](https://render.com)** and sign up
3. **Connect your GitHub account**
4. **Create New Web Service** and select your repository
5. **Configure settings:**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment Variables: `PORT=8080`, `NODE_ENV=production`
6. **Deploy!** Your API will be live at `https://your-app-name.onrender.com`

## 🐳 Docker Deployment

### Quick Start
```bash
# Build and run with Docker Compose
npm run docker:prod

# Or manually
docker build -t norwegian-address-api .
docker run -p 8080:8080 -e PORT=8080 norwegian-address-api
```

The Docker image includes:
- Multi-stage build for minimal size
- Non-root user for security
- Health checks
- Log persistence

### Production Environment Variables
```env
NODE_ENV=production
PORT=8080
```

## 🧪 Testing

The project includes comprehensive tests:

- **Unit Tests**: Service layer testing
- **Integration Tests**: API endpoint testing  
- **Error Handling**: Edge cases and error scenarios

```bash
# Run all tests
npm test

# Generate coverage report
npm run test:coverage
```

Coverage targets:
- **Statements**: 80%+
- **Branches**: 70%+
- **Functions**: 100%
- **Lines**: 80%+

## 📊 Project Structure

```
src/
├── app.ts                 # Express application setup
├── index.ts              # Server entry point
├── routes/
│   └── search.routes.ts  # Search API routes
├── services/
│   └── searchService.ts  # Trie-search implementation
└── utils/
    └── logger.ts         # Winston logging configuration

tests/
├── api.test.ts           # API integration tests
├── searchService.test.ts # Service unit tests
├── health-error.test.ts  # Health endpoint error handling
└── search-error.test.ts  # Search endpoint error handling

data/
└── addresses.json        # Norwegian address dataset
```

## 🚨 Error Handling

The API provides clear error responses:

```json
// 400 Bad Request - Query too short
{
  "status": "error",
  "timestamp": "2025-11-08T12:00:00.000Z",
  "error": "Query parameter 'q' must be at least 3 characters long"
}

// 500 Internal Server Error
{
  "status": "error", 
  "timestamp": "2025-11-08T12:00:00.000Z",
  "error": "Internal server error"
}
```

## 📝 Logging

Structured logging with Winston:
- **Development**: Console + file outputs
- **Production**: File outputs only
- **Log Levels**: debug, info, warn, error
- **Log Files**: Separate files per level in `logs/` directory

## 🔒 Security Features

- CORS enabled for cross-origin requests
- Input validation and sanitization
- Error message sanitization (no stack traces in production)
- Non-root Docker container
- Environment-based configuration

## 🏗️ Architecture Decisions

### Why Trie-Search?
- **Performance**: O(k) search complexity vs O(n) for linear search
- **Memory Efficient**: Shared prefixes reduce memory usage
- **Prefix Matching**: Perfect for autocomplete functionality

### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support and refactoring
- **Maintainability**: Self-documenting code with interfaces

### Why Express?
- **Mature**: Battle-tested framework with extensive ecosystem
- **Lightweight**: Minimal overhead for API-only applications
- **Flexible**: Easy to add middleware and customize

## 🎯 Performance

- **Dataset Size**: 36,160 Norwegian addresses
- **Search Time**: ~1-5ms average response time
- **Memory Usage**: ~50MB typical usage
- **Concurrent Requests**: Handles 1000+ req/s

### Getting Help

1. Check the logs in `logs/` directory
2. Run tests to verify functionality: `npm test`
3. Check GitHub issues for known problems
4. Enable debug logging: `NODE_ENV=development npm run dev`

---

**Made with ❤️ using Node.js, TypeScript, and Express**