# RLTR Full Stack Management

.PHONY: help up down build logs clean reset migrate test-backend test-frontend

help: ## Show this help message
	@echo "RLTR Full Stack Management"
	@echo "=========================="
	@echo ""
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start the entire RLTR stack (frontend + backend + db + redis)
	docker compose up -d
	@echo "🚀 RLTR stack starting..."
	@echo "📊 Monitor with: make logs"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:8000"
	@echo "📚 API Docs: http://localhost:8000/api/openapi.json"

down: ## Stop the entire RLTR stack
	docker compose down
	@echo "🛑 RLTR stack stopped"

build: ## Build all services
	docker compose build
	@echo "🔨 All services built"

logs: ## Show logs from all services
	docker compose logs -f

logs-backend: ## Show backend logs only
	docker compose logs -f backend

logs-frontend: ## Show frontend logs only
	docker compose logs -f frontend

logs-db: ## Show database logs only
	docker compose logs -f db

clean: ## Remove all containers, networks, and volumes
	docker compose down -v --remove-orphans
	@echo "🧹 All containers, networks, and volumes removed"

reset: clean build up ## Clean, rebuild, and start everything
	@echo "🔄 Stack reset complete"

migrate: ## Run database migrations manually
	docker compose exec backend alembic upgrade head
	@echo "🗄️  Migrations applied"

migrate-status: ## Check migration status
	docker compose exec backend alembic current
	@echo "📋 Migration status checked"

test-backend: ## Run backend tests
	docker compose exec backend pytest -v
	@echo "🧪 Backend tests completed"

test-frontend: ## Run frontend tests
	docker compose exec frontend npm test
	@echo "🧪 Frontend tests completed"

shell-backend: ## Open shell in backend container
	docker compose exec backend sh

shell-frontend: ## Open shell in frontend container
	docker compose exec frontend sh

shell-db: ## Open shell in database container
	docker compose exec db psql -U postgres -d rltr

status: ## Show status of all services
	docker compose ps
	@echo ""
	@echo "Health checks:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8000/api/health/live"
	@echo "  Database: localhost:5432"

# Development helpers
dev: up ## Start development environment
	@echo "🛠️  Development environment ready!"
	@echo "💡 Use 'make logs' to monitor services"
	@echo "💡 Use 'make down' to stop everything"

# Quick API test
test-api: ## Test the backend API
	@echo "🧪 Testing backend API..."
	@curl -f http://localhost:8000/api/health/live > /dev/null 2>&1 && echo "✅ Backend API is healthy" || echo "❌ Backend API is not responding"
