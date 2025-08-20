from fastapi.testclient import TestClient
from app.main import app

def test_live():
    c = TestClient(app)
    r = c.get("/api/health/live")
    assert r.status_code == 200 and r.json()["ok"] is True

def test_ready():
    c = TestClient(app)
    r = c.get("/api/health/ready")
    assert r.status_code == 200
