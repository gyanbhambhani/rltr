# 🎉 Unified Docker Setup Complete!

Your RLTR project now has a **single command** to start the entire stack! 🚀

## 🎯 What's New

### **One Command Startup**
```bash
./start-rltr.sh
```

This single command will:
- ✅ Start PostgreSQL database with health checks
- ✅ Start Redis for caching and queues
- ✅ Start FastAPI backend with auto-reload
- ✅ Start Next.js frontend with hot reload
- ✅ Start Celery workers for background jobs
- ✅ Run database migrations automatically
- ✅ Health check all services
- ✅ Provide access URLs and helpful commands

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Workers       │
                       │   (Celery)      │
                       │   + Redis       │
                       │   Port: 6379    │
                       └─────────────────┘
```

## 🚀 Quick Start

### **Option 1: Automated (Recommended)**
```bash
./start-rltr.sh
```

### **Option 2: Manual Commands**
```bash
make up          # Start all services
make build       # Build all services
make logs        # Monitor progress
```

## 🛠️ Development Commands

### **Full Stack Management**
```bash
make up          # Start everything
make down        # Stop everything
make build       # Build all services
make logs        # View all logs
make status      # Check service status
make reset       # Clean rebuild everything
```

### **Individual Service Logs**
```bash
make logs-backend   # Backend logs only
make logs-frontend  # Frontend logs only
make logs-db        # Database logs only
```

### **Development Helpers**
```bash
make shell-backend  # Shell into backend
make shell-frontend # Shell into frontend
make shell-db       # Database shell
make migrate        # Run migrations
make test-backend   # Backend tests
make test-frontend  # Frontend tests
```

## 🌐 Access Points

Once running, access your services at:

- **🌐 Frontend**: http://localhost:3000
- **🔧 Backend API**: http://localhost:8000
- **📚 API Docs**: http://localhost:8000/api/openapi.json
- **🗄️ Database**: localhost:5432 (postgres/postgres)
- **🔴 Redis**: localhost:6379

## 📁 File Structure

```
rltr/
├── docker-compose.yml     # 🆕 Root orchestration
├── Makefile              # 🆕 Full stack commands
├── start-rltr.sh         # 🆕 One-command startup
├── env.example           # 🆕 Environment variables
├── apps/
│   ├── web/              # Next.js frontend
│   └── backend/          # FastAPI backend
└── README.md             # 🆕 Updated documentation
```

## 🔧 Configuration

### **Environment Setup**
```bash
cp env.example .env
# Edit .env with your settings
```

### **Key Variables**
- `SECRET_KEY`: JWT signing key
- `POSTGRES_PASSWORD`: Database password
- `NEXT_PUBLIC_API_URL`: Frontend API endpoint

## 🧪 Testing the Setup

### **Health Checks**
```bash
# Backend health
curl http://localhost:8000/api/health/live

# Database health
docker compose exec db pg_isready -U postgres
```

### **API Testing**
```bash
# Create property (with JWT)
TOKEN=$(docker compose exec -T backend python3 -c 'from app.core.security import create_access_token; print(create_access_token("dev","org-dev",["read:property","write:property"]))')
curl -H "Authorization: Bearer $TOKEN" \
  -X POST http://localhost:8000/api/properties \
  -H "Content-Type: application/json" \
  -d '{"street":"1 Main St","city":"Berkeley","state":"CA","postal_code":"94704"}'
```

## 🚨 Troubleshooting

### **Common Issues**
1. **Port conflicts**: Ensure ports 3000, 8000, 5432, 6379 are free
2. **Build failures**: Docker needs 4GB+ memory
3. **Frontend slow**: First build takes time, subsequent builds are fast
4. **Database connection**: Wait for health checks to complete

### **Reset Everything**
```bash
make reset  # Clean, rebuild, restart
```

### **View Logs**
```bash
make logs  # All services
make logs-backend  # Backend only
make logs-frontend # Frontend only
```

## 🎯 Benefits of This Setup

### **✅ Developer Experience**
- **One command** starts everything
- **Hot reload** for both frontend and backend
- **Automatic migrations** on startup
- **Health checks** ensure services are ready
- **Unified logging** across all services

### **✅ Production Ready**
- **Proper service dependencies** with health checks
- **Persistent database** storage
- **Environment variable** configuration
- **Docker best practices** implemented

### **✅ Easy Management**
- **Make commands** for common operations
- **Individual service** control
- **Log monitoring** per service
- **Shell access** to containers

## 🚀 Next Steps

1. **Test the setup**: Run `./start-rltr.sh`
2. **Verify services**: Check `make status`
3. **Monitor logs**: Use `make logs`
4. **Start developing**: Edit files in `apps/web/` or `apps/backend/`
5. **Stop when done**: Use `make down`

## 🎉 You're All Set!

Your RLTR project now has a **professional-grade development environment** that:

- 🚀 **Starts with one command**
- 🔄 **Auto-reloads on changes**
- 🗄️ **Manages database automatically**
- 🧪 **Includes comprehensive testing**
- 📚 **Provides clear documentation**
- 🛠️ **Offers easy management commands**

**Happy coding! 🚀**
