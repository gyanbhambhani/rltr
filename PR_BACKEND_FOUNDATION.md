# PR: Backend Foundation + Property Domain v1

**Branch**: `chore/backend-foundation-and-property-v1`

## 🎯 Why

Create a production-ready FastAPI service with Postgres, Redis, workers, logging, auth, and the first domain slice: `Property`. This unblocks MLS ingestion, comps, deals, and client comms.

## 📋 Scope

### ✅ Included
- FastAPI app with structured settings
- SQLAlchemy + Alembic migrations
- Pydantic schemas and OpenAPI
- JWT auth with org + user scopes
- RBAC middleware
- Property domain: CRUD, search, pagination
- Health checks and liveness/readiness
- Celery workers for async jobs
- Redis for queues and rate limiting
- Observability: logging, request IDs, metrics
- Docker Compose for local stack
- CI: lint, type check, tests

### ❌ Out of Scope
- MLS adapters
- CMA math
- E-sign functionality

## 🏗️ Repository Layout

```
apps/
  backend/
    app/
      core/           # Config, security, DB, RBAC, logging
      models/         # SQLAlchemy models (org, user, property)
      schemas/        # Pydantic schemas
      api/            # FastAPI endpoints and dependencies
      workers/        # Celery tasks
      migrations/     # Alembic migrations
    tests/            # Pytest test suite
    pyproject.toml    # Dependencies and tool config
    docker-compose.yml # Local development stack
    Dockerfile        # Container image
    Makefile          # Development commands
    README.md         # Comprehensive documentation
```

## 🚀 Quick Start

### Local Development
```bash
cd apps/backend
cp env.example .env
make install          # Install dependencies
make compose          # Start Postgres + Redis
make migrate          # Run database migrations
make run              # Start FastAPI server
```

### API Testing
```bash
# Health check
curl http://localhost:8000/api/health/live

# Create property (with JWT token)
TOKEN=$(python -c 'from app.core.security import create_access_token; print(create_access_token("dev","org-dev",["read:property","write:property"]))')
curl -H "Authorization: Bearer $TOKEN" \
  -X POST http://localhost:8000/api/properties \
  -H "Content-Type: application/json" \
  -d '{"street":"1 Main St","city":"Berkeley","state":"CA","postal_code":"94704"}'
```

## 🧪 Testing

```bash
make test    # Run pytest suite
make lint    # Run ruff + black
make type    # Run mypy type checking
```

## 📊 Acceptance Criteria

- [ ] `GET /api/health/live` returns 200
- [ ] Alembic applies clean on fresh DB
- [ ] Property CRUD works behind JWT with org scoping
- [ ] Pagination and basic filters return results in under 200ms on local
- [ ] Worker starts and accepts a sample task
- [ ] OpenAPI serves at `/api/openapi.json`
- [ ] All tests pass in CI
- [ ] Docker Compose stack starts successfully

## 🔄 Follow-ups (Next PRs)

- [ ] Search index integration (Meilisearch or Postgres trigram)
- [ ] MLS adapter that writes to `property` table
- [ ] Soft deletes and audit trails
- [ ] Org scoping via row-level security or application guard rails
- [ ] Rate limiting per token for write endpoints
- [ ] Property image uploads and management
- [ ] Advanced search and filtering
- [ ] Property history and change tracking

## 📝 Notes

- **Environment**: Uses `env.example` → `.env` pattern for local config
- **Database**: Postgres 16 with proper indexing on search fields
- **Auth**: JWT tokens with org scoping and RBAC scopes
- **API**: RESTful endpoints with proper HTTP status codes
- **Testing**: Pytest with SQLite for fast test execution
- **CI**: GitHub Actions with Postgres + Redis services

## 🎉 Ready to Merge

This foundation provides a solid, production-ready backend that the team can immediately build upon for MLS integration, deal management, and client communications.
