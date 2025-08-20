#!/bin/bash

echo "🚀 RLTR Full Stack Startup"
echo "=========================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Please run this script from the root of the RLTR project."
    exit 1
fi

echo "📦 Building all services..."
make build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check the errors above."
    exit 1
fi

echo "🚀 Starting the full RLTR stack..."
make up

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "🧪 Testing services..."

# Test backend
echo "  Testing backend API..."
if curl -f http://localhost:8000/api/health/live > /dev/null 2>&1; then
    echo "    ✅ Backend API is healthy"
else
    echo "    ⚠️  Backend API not ready yet (may need more time)"
fi

# Test database
echo "  Testing database connection..."
if docker compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
    echo "    ✅ Database is ready"
else
    echo "    ⚠️  Database not ready yet (may need more time)"
fi

echo ""
echo "🎉 RLTR stack is starting up!"
echo ""
echo "📊 Monitor services:"
echo "  make logs          # All services"
echo "  make logs-backend  # Backend only"
echo "  make logs-frontend # Frontend only"
echo ""
echo "🌐 Access points:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/api/openapi.json"
echo "  Database: localhost:5432"
echo ""
echo "🛠️  Useful commands:"
echo "  make status        # Check service status"
echo "  make down          # Stop all services"
echo "  make reset         # Clean rebuild and restart"
echo "  make migrate       # Run database migrations"
echo ""
echo "💡 The frontend may take a few minutes to build on first run."
echo "💡 Check 'make logs-frontend' for build progress."
