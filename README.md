# 🚀 LogStream - Log Ingestion and Querying System

<div align="center">

![LogStream Logo](https://img.shields.io/badge/LogStream-v1.0.0-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgM0gyMVYyMUgzVjNaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTcgN0gxN1Y5SDdWN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03IDExSDE3VjEzSDdWMTFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNyAxNUgxN1YxN0g3VjE1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**A comprehensive full-stack application for real-time log ingestion, monitoring, and analytics**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-api-documentation) • [🐳 Docker](#-docker-deployment) • [🧪 Testing](#-testing) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [⚡ Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📖 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [🐳 Docker Deployment](#-docker-deployment)
- [📊 Analytics](#-analytics)
- [🔍 Troubleshooting](#-troubleshooting)
- [🚀 Production Deployment](#-production-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 🎯 Core Functionality
- **📥 Log Ingestion**: RESTful API endpoint for structured log entries
- **🔍 Advanced Filtering**: Multi-criteria search with real-time updates
- **⚡ Real-time Updates**: WebSocket integration for live log streaming
- **📊 Analytics Dashboard**: Interactive charts and metrics visualization
- **🎨 Professional UI**: Clean, responsive interface inspired by industry tools

### 🛡️ Technical Excellence
- **🔒 Type Safety**: Full TypeScript implementation across the stack
- **🐳 Containerization**: Docker and Docker Compose ready
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance Optimized**: Debounced searches, lazy loading, memoization

### 🚀 Advanced Features
- **🔄 Real-time Communication**: Socket.IO for bidirectional updates
- **📈 Visual Analytics**: Interactive charts with Recharts
- **🎛️ Dynamic Filtering**: Combine multiple filters simultaneously
- **💾 JSON File Storage**: Lightweight persistence as per requirements
- **🔧 Developer Tools**: Comprehensive error handling and debugging

---

## 🏗️ Architecture

### 📁 Project Structure
\`\`\`
log-ingestion-system/
├── 📁 backend/                 # Express.js API Server
│   ├── 📁 src/
│   │   ├── 📁 types/          # TypeScript type definitions
│   │   ├── 📁 services/       # Business logic layer
│   │   ├── 📁 routes/         # API route handlers
│   │   ├── 📁 validation/     # Request validation schemas
│   │   └── 📄 server.ts       # Main server file
│   ├── 📁 data/               # JSON file storage
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📁 frontend/               # Next.js React Application
│   ├── 📁 src/
│   │   ├── 📁 app/           # Next.js App Router
│   │   ├── 📁 components/    # React components
│   │   ├── 📁 hooks/         # Custom React hooks
│   │   ├── 📁 lib/           # Utility functions
│   │   └── 📁 types/         # TypeScript definitions
│   ├── 📄 package.json
│   ├── 📄 next.config.js
│   └── 📄 tailwind.config.ts
├── 📁 scripts/               # Utility scripts
├── 📄 docker-compose.yml     # Docker configuration
├── 📄 Dockerfile            # Multi-stage build
├── 📄 ecosystem.config.js   # PM2 configuration
└── 📄 README.md
\`\`\`

### 🔧 Technology Stack

#### 🖥️ Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18+ | Web framework |
| **TypeScript** | 5+ | Type safety |
| **Socket.IO** | 4.7+ | Real-time communication |
| **Joi** | 17+ | Request validation |

#### 🎨 Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14+ | React framework |
| **React** | 18+ | UI library |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3+ | Styling |
| **Shadcn/ui** | Latest | Component library |
| **Recharts** | 2.8+ | Data visualization |

#### 🚀 DevOps
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **PM2** | Process management |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |

---

## ⚡ Quick Start

### 🚀 One-Command Setup

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd log-ingestion-system

# Install all dependencies and start development servers
npm run install:all && npm run dev
\`\`\`

**🎉 That's it! Your application will be running at:**
- 🖥️ **Frontend**: http://localhost:3000
- 🔧 **Backend**: http://localhost:8000
- 📊 **Health Check**: http://localhost:8000/health

### 📊 Add Sample Data (Optional)
\`\`\`bash
cd scripts && node seed-logs.js
\`\`\`

---

## 🛠️ Installation

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command | Install Link |
|-------------|---------|---------------|--------------|
| **Node.js** | 18+ | `node --version` | [Download](https://nodejs.org/) |
| **npm** | 8+ | `npm --version` | Included with Node.js |
| **Git** | 2+ | `git --version` | [Download](https://git-scm.com/) |
| **Docker** | 20+ (Optional) | `docker --version` | [Download](https://docker.com/) |

### 🔍 Verify Prerequisites
\`\`\`bash
# Check all prerequisites at once
node --version && npm --version && git --version
\`\`\`

Expected output:
\`\`\`
v18.17.0
9.6.7
git version 2.40.1
\`\`\`

### 📥 Installation Methods

#### Method 1: 🚀 Quick Setup (Recommended)
\`\`\`bash
# Clone and setup everything
git clone <repository-url>
cd log-ingestion-system
npm run install:all
npm run dev
\`\`\`

#### Method 2: 🔧 Manual Setup
\`\`\`bash
# Clone repository
git clone <repository-url>
cd log-ingestion-system

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start development servers
npm run dev
\`\`\`

#### Method 3: 🐳 Docker Setup
\`\`\`bash
# Clone repository
git clone <repository-url>
cd log-ingestion-system

# Build and start with Docker
docker-compose up --build
\`\`\`

### 🎯 Verify Installation

1. **Check Backend Health**:
   \`\`\`bash
   curl http://localhost:8000/health
   \`\`\`
   Expected response:
   \`\`\`json
   {
     "status": "OK",
     "timestamp": "2023-12-01T10:00:00.000Z"
   }
   \`\`\`

2. **Check Frontend**:
   Open http://localhost:3000 in your browser

3. **Test Log Ingestion**:
   \`\`\`bash
   curl -X POST http://localhost:8000/logs \
     -H "Content-Type: application/json" \
     -d '{
       "level": "info",
       "message": "Test log entry",
       "resourceId": "test-server",
       "timestamp": "2023-12-01T10:00:00Z",
       "traceId": "test-trace",
       "spanId": "test-span",
       "commit": "abc123",
       "metadata": {}
     }'
   \`\`\`

---

## 🔧 Configuration

### 🌍 Environment Variables

#### Backend Configuration
Create `backend/.env`:
\`\`\`env
# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info

# File Storage
DATA_PATH=./data/logs.json
\`\`\`

#### Frontend Configuration
Create `frontend/.env.local`:
\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# WebSocket Configuration
NEXT_PUBLIC_WS_URL=http://localhost:8000

# Debug Mode
NEXT_PUBLIC_DEBUG=false
\`\`\`

### ⚙️ Custom Configuration

#### Backend Port Configuration
\`\`\`bash
# Change backend port
cd backend
PORT=9000 npm run dev
\`\`\`

#### Frontend Port Configuration
\`\`\`bash
# Change frontend port
cd frontend
PORT=4000 npm run dev
\`\`\`

#### Production Configuration
\`\`\`env
# Backend Production (.env.production)
NODE_ENV=production
PORT=8000
FRONTEND_URL=https://your-domain.com

# Frontend Production (.env.production.local)
NEXT_PUBLIC_API_URL=https://api.your-domain.com
\`\`\`

---

## 📖 API Documentation

### 🌐 Base URL
\`\`\`
Development: http://localhost:8000
Production:  https://api.your-domain.com
\`\`\`

### 🔍 Health Check
```http
GET /health
