# Log Ingestion and Querying System

A comprehensive full-stack application for ingesting, storing, and querying application logs with real-time updates and analytics capabilities.

## 🚀 Features

### Core Functionality
- **Log Ingestion**: RESTful API endpoint for ingesting structured log entries
- **Advanced Filtering**: Multi-criteria filtering including level, message search, resource ID, timestamp range, trace ID, span ID, and commit hash
- **Real-time Updates**: WebSocket integration for live log streaming
- **Analytics Dashboard**: Visual insights with charts and metrics
- **Responsive UI**: Clean, professional interface optimized for developer workflows

### Technical Highlights
- **Backend**: Node.js with Express.js, TypeScript, Socket.IO
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Data Persistence**: JSON file-based storage (as per requirements)
- **Real-time Communication**: WebSocket integration
- **Testing**: Comprehensive unit tests with Jest
- **Containerization**: Docker and Docker Compose support
- **Code Quality**: ESLint, TypeScript strict mode, comprehensive error handling

## 🏗️ Architecture

\`\`\`
log-ingestion-system/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # Business logic layer
│   │   ├── routes/         # API route handlers
│   │   ├── validation/     # Request validation schemas
│   │   └── __tests__/      # Unit tests
│   └── data/               # JSON file storage
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript definitions
├── scripts/               # Utility scripts
└── docker/               # Docker configuration
\`\`\`

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd log-ingestion-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm run install:all
   \`\`\`

3. **Start the development servers**
   \`\`\`bash
   npm run dev
   \`\`\`

   This will start:
   - Backend server on `http://localhost:8000`
   - Frontend application on `http://localhost:3000`

4. **Seed sample data (optional)**
   \`\`\`bash
   cd scripts && node seed-logs.js
   \`\`\`

### Manual Setup

If you prefer to run services individually:

**Backend:**
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Docker Deployment

For production deployment using Docker:

\`\`\`bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
\`\`\`

## 📡 API Documentation

### Base URL
\`\`\`
http://localhost:8000
\`\`\`

### Endpoints

#### POST /logs
Ingest a single log entry.

**Request Body:**
\`\`\`json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-01",
  "timestamp": "2023-12-01T10:00:00Z",
  "traceId": "trace-123",
  "spanId": "span-456",
  "commit": "abc123",
  "metadata": {
    "userId": "12345"
  }
}
\`\`\`

**Response:** `201 Created`
\`\`\`json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-01",
  "timestamp": "2023-12-01T10:00:00Z",
  "traceId": "trace-123",
  "spanId": "span-456",
  "commit": "abc123",
  "metadata": {
    "userId": "12345"
  }
}
\`\`\`

#### GET /logs
Retrieve filtered logs.

**Query Parameters:**
- `level` (string): Filter by log level (error, warn, info, debug)
- `message` (string): Full-text search in message field
- `resourceId` (string): Filter by resource identifier
- `timestamp_start` (ISO 8601): Start of timestamp range
- `timestamp_end` (ISO 8601): End of timestamp range
- `traceId` (string): Filter by trace identifier
- `spanId` (string): Filter by span identifier
- `commit` (string): Filter by commit hash

**Example:**
\`\`\`
GET /logs?level=error&message=database&timestamp_start=2023-12-01T00:00:00Z
\`\`\`

**Response:** `200 OK`
\`\`\`json
[
  {
    "level": "error",
    "message": "Database connection failed",
    "resourceId": "server-01",
    "timestamp": "2023-12-01T10:00:00Z",
    "traceId": "trace-123",
    "spanId": "span-456",
    "commit": "abc123",
    "metadata": {
      "userId": "12345"
    }
  }
]
\`\`\`

#### GET /logs/analytics
Get analytics data for the filtered logs.

**Query Parameters:** Same as GET /logs

**Response:** `200 OK`
\`\`\`json
{
  "totalLogs": 150,
  "logsByLevel": {
    "error": 25,
    "warn": 40,
    "info": 70,
    "debug": 15
  },
  "logsByHour": [
    {
      "hour": "2023-12-01T10:00:00.000Z",
      "count": 12
    }
  ],
  "topResources": [
    {
      "resourceId": "server-01",
      "count": 45
    }
  ]
}
\`\`\`

## 🧪 Testing

### Backend Tests
\`\`\`bash
cd backend
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
\`\`\`

### Frontend Tests
\`\`\`bash
cd frontend
npm test

# Watch mode
npm run test:watch
\`\`\`

### Run All Tests
\`\`\`bash
npm test
\`\`\`

## 🎯 Key Design Decisions

### Data Persistence Strategy
- **JSON File Storage**: As per requirements, uses a single JSON file instead of a database
- **In-Memory Processing**: All filtering and sorting operations performed in Node.js
- **Atomic Writes**: Ensures data consistency during concurrent write operations
- **Error Handling**: Graceful handling of file system errors with automatic recovery

### Real-Time Architecture
- **WebSocket Integration**: Socket.IO for bidirectional real-time communication
- **Event-Driven Updates**: New logs automatically pushed to all connected clients
- **Connection Management**: Automatic reconnection and error handling

### Frontend State Management
- **React Hooks**: useState and useEffect for local component state
- **Custom Hooks**: Reusable logic for API calls and WebSocket management
- **Debounced Filtering**: Optimized API calls with input debouncing
- **Error Boundaries**: Comprehensive error handling and user feedback

### Performance Optimizations
- **Efficient Filtering**: Optimized array operations for large datasets
- **Lazy Loading**: Components and data loaded on demand
- **Memoization**: React.memo and useMemo for expensive computations
- **Responsive Design**: Mobile-first approach with progressive enhancement

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
\`\`\`env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
\`\`\`

**Frontend (.env.local):**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

## 📊 Analytics Features

The analytics dashboard provides:

1. **Summary Metrics**: Total logs, error count, active resources, peak hours
2. **Level Distribution**: Pie chart showing log distribution by severity
3. **Temporal Analysis**: Hourly log volume over the last 24 hours
4. **Resource Insights**: Top resources by log volume
5. **Real-time Updates**: Analytics update automatically with new data

## 🚀 Production Deployment

### Docker Production Build
\`\`\`bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

### Manual Production Deployment

**Backend:**
\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by professional logging tools like Grafana Loki and Datadog
- UI components powered by Shadcn/ui and Tailwind CSS
- Charts and visualizations using Recharts library

---

**Note**: This application is designed as a technical assessment and demonstration of full-stack development capabilities. For production use, consider implementing additional features such as authentication, rate limiting, data retention policies, and horizontal scaling capabilities.
