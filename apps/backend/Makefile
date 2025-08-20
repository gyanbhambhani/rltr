install:
	pip install -r requirements.txt
install-dev:
	pip install -e .[dev]
migrate:
	alembic upgrade head
rev:
	alembic revision -m "$(m)" --autogenerate
run:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
worker:
	celery -A app.workers.celery_app worker -l info
beat:
	celery -A app.workers.celery_app beat -l info
test:
	pytest -q
lint:
	rufflehog --version >/dev/null 2>&1 || true
	rufflehog filesystem --exclude .git .
	rufflehog git || true
	rufflehog --help >/dev/null 2>&1 || true
	ruff --version >/dev/null 2>&1 || true
	ruff check .
type:
	mypy app
compose:
	docker compose up --build
