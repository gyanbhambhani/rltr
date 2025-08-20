# RLTR Backend API

Production-ready FastAPI service with Postgres, Redis, workers, logging, auth, and the Property domain.

## Features

- **FastAPI** with structured settings and OpenAPI docs
- **SQLAlchemy + Alembic** for database management and migrations
- **JWT Authentication** with org + user scopes
- **RBAC Middleware** for role-based access control
- **Property Domain** with CRUD, search, and pagination
- **Celery Workers** for async job processing
- **Redis** for queues and rate limiting
- **Health Checks** for liveness/readiness
- **Observability** with logging, request IDs, and metrics
- **Docker Compose** for local development stack
- **CI/CD** with GitHub Actions

## Quick Start

### Local Development

1. **Setup environment:**
   ```bash
   cd apps/backend
   cp env.example .env
   # Edit .env with your local settings
   ```

2. **Start the stack:**
   ```bash
   make compose
   ```

3. **In another terminal, run migrations:**
   ```bash
   make migrate
   ```

4. **Start the API:**
   ```bash
   make run
   ```

5. **Start workers (optional):**
   ```bash
   make worker
   ```

### API Endpoints

- **Health:** `GET /api/health/live`, `GET /api/health/ready`
- **Properties:** `GET/POST /api/properties`, `GET/PATCH /api/properties/{id}`
- **OpenAPI:** `GET /api/openapi.json`

### Testing

```bash
make test          # Run tests
make lint          # Run linting
make type          # Run type checking
```

## Architecture

```
app/
├── core/          # Configuration, security, database
├── models/        # SQLAlchemy models
├── schemas/       # Pydantic schemas
├── api/           # API endpoints and dependencies
├── workers/       # Celery tasks and workers
└── migrations/    # Alembic migrations
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ENV` | Environment (local, staging, prod) | `local` |
| `SECRET_KEY` | JWT signing key | Required |
| `POSTGRES_URL` | Database connection string | Required |
| `REDIS_URL` | Redis connection string | Required |
| `CORS_ORIGINS` | Allowed CORS origins | `*` |

## Database Schema

### Core Tables
- **org**: Organizations
- **app_user**: Users with org scoping
- **property**: Real estate properties with MLS integration

### Property Fields
- Basic info: street, city, state, postal_code
- Location: lat, lon coordinates
- Details: price, beds, baths, sqft, lot_sqft
- Metadata: year_built, property_type, status, dom
- MLS: mls_id for external system integration

## Authentication & Authorization

- **JWT tokens** with configurable expiration
- **Organization scoping** for multi-tenant isolation
- **Scope-based access** (read:property, write:property)
- **Bearer token** authentication

## Development

### Adding New Models

1. Create model in `app/models/`
2. Create schemas in `app/schemas/`
3. Add API endpoints in `app/api/v1/`
4. Generate migration: `make rev m="description"`
5. Apply: `make migrate`

### Adding New Workers

1. Create task in `app/workers/tasks_*.py`
2. Import and register in `celery_app.py`
3. Test with `make worker`

## Production Deployment

- **Gunicorn** for production WSGI server
- **Environment-specific** configuration
- **Health checks** for container orchestration
- **Database migrations** as deployment step

## Contributing

1. Install pre-commit hooks: `pre-commit install`
2. Follow code style: `make lint && make type`
3. Add tests for new functionality
4. Update documentation as needed

## License

Internal use only - RLTR
