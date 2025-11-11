# Address Search API

A high-performance autocomplete API for Norwegian street addresses built with Node.js, TypeScript, and Express. Uses trie-search for lightning-fast prefix matching across 36,000+ Norwegian addresses.

**Part of a complete full-stack application** - this backend API powers a [React frontend](https://frontend-addresses.vercel.app/) for seamless address searching.

## 🌍 Live Demo

**🚀 API is live and hosted on Render:**

- **Base URL**: `https://backend-tr57.onrender.com`
- **Try it now**: [https://backend-tr57.onrender.com/search/oslo](https://backend-tr57.onrender.com/search/oslo)
- **Health Check**: [https://backend-tr57.onrender.com/health](https://backend-tr57.onrender.com/health)

## �️ Frontend Application

**This API powers a complete frontend application!**

- **🌐 Live Demo**: [https://frontend-addresses.vercel.app/](https://frontend-addresses.vercel.app/)
- **📁 Repository**: [https://github.com/tornado1979/frontend](https://github.com/tornado1979/frontend)
- **📚 Documentation**: [Frontend README](https://github.com/tornado1979/frontend?tab=readme-ov-file#norwegian-address-search-frontend)

The frontend is a modern React application that provides:
- **Real-time Search**: Autocomplete functionality powered by this API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast Performance**: Optimized search experience with instant results
- **User-Friendly Interface**: Clean, intuitive design for address searching

**🔗 Full Stack Architecture:**
- **Backend** (this repo): Node.js + TypeScript + Express API
- **Frontend**: React + TypeScript application consuming this API
- **Deployment**: Backend on Render, Frontend on Vercel

## �🚀 Features

- **Fast Autocomplete**: Trie-based search for instant results
- **Norwegian Addresses**: Complete dataset of streets, cities, and postal codes
- **TypeScript**: Full type safety and excellent developer experience
- **Standardized API Responses**: Consistent response format with success/error indicators
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

**Success Response Format:**

```json
{
  "success": true,
  "data": [
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
  "message": "Search completed successfully",
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

**Error Response Format:**

```json
{
  "success": false,
  "error": "Search query must be at least 3 characters long",
  "message": "Invalid input provided",
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

### Health Check

```http
GET /health
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "uptime": 3600
  },
  "message": "Service is healthy",
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

**Error Response (503 Service Unavailable):**

```json
{
  "success": false,
  "error": "Service temporarily unavailable",
  "message": "Health check failed",
  "timestamp": "2025-11-09T12:00:00.000Z"
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

2. **Configure environment variables:**

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file to customize your settings (optional)
# The default values work for local development
```

3. **Start development server:**

```bash
npm run dev
```

The API will be available at `http://localhost:8080`

### Environment Configuration

The project includes a `.env.example` file with all available configuration options. Simply copy it to create your local environment file:

**Quick Setup:**
```bash
cp .env.example .env  # Creates your local .env file with defaults
```

**Available Environment Variables:**
```env
# Server Configuration
PORT=8080                    # Server port (default: 8080)
NODE_ENV=development         # Environment mode (development/production)

# Add your custom variables here as needed
```

**💡 Tips:**
- The `.env.example` file contains sensible defaults for local development
- You only need to modify `.env` if you want to change the default port or add custom configuration
- The server defaults to port 8080 if no `PORT` is specified (as per project requirements)

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
├── types/
│   └── index.ts          # TypeScript interfaces (ApiResponse, Address)
└── utils/
    ├── logger.ts         # Winston logging configuration
    └── responseHelper.ts # Standardized API response utilities

tests/
├── api.test.ts           # API integration tests
├── searchService.test.ts # Service unit tests
├── health-error.test.ts  # Health endpoint error handling
└── search-error.test.ts  # Search endpoint error handling

data/
└── addresses.json        # Norwegian address dataset
```

## 🚨 Error Handling

The API provides consistent, structured error responses using the `ApiResponse` interface:

```json
// 400 Bad Request - Query too short
{
  "success": false,
  "error": "Search query must be at least 3 characters long",
  "message": "Invalid input provided",
  "timestamp": "2025-11-09T12:00:00.000Z"
}

// 404 Not Found - Endpoint doesn't exist
{
  "success": false,
  "error": "Endpoint not found",
  "message": "The requested endpoint '/invalid' does not exist",
  "timestamp": "2025-11-09T12:00:00.000Z"
}

// 500 Internal Server Error
{
  "success": false,
  "error": "Something went wrong",
  "message": "Internal server error occurred",
  "timestamp": "2025-11-09T12:00:00.000Z"
}

// 503 Service Unavailable
{
  "success": false,
  "error": "Service temporarily unavailable",
  "message": "Health check failed",
  "timestamp": "2025-11-09T12:00:00.000Z"
}
```

### Error Response Structure

All error responses follow the standardized `ApiResponse` format:

- **`success`**: Always `false` for errors
- **`error`**: Specific error description
- **`message`**: Human-readable error context
- **`timestamp`**: ISO 8601 timestamp when error occurred

## 📝 Logging

Structured logging with Winston:

- **Development**: Console + file outputs
- **Production**: File outputs only
- **Log Levels**: debug, info, warn, error
- **Log Files**: Separate files per level in `logs/` directory

## � API Response Utilities

### ResponseHelper Class

The application uses a centralized `ResponseHelper` utility class for consistent API responses:

```typescript
// Success responses
ResponseHelper.success(res, data, 'Operation completed successfully');

// Error responses
ResponseHelper.error(res, 'Invalid input', 'Bad request', 400);

// Server error responses
ResponseHelper.serverError(
  res,
  'Database connection failed',
  'Internal server error',
  500
);
```

**Benefits:**
- **Consistency**: All endpoints return the same response structure
- **Type Safety**: TypeScript ensures proper response formatting
- **Maintainability**: Centralized response logic for easy updates
- **Frontend Integration**: Standardized responses make it easy for the [React frontend](https://frontend-addresses.vercel.app/) to handle all API responses consistently

## �🔒 Security Features

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
