from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

def auth():
    token = create_access_token("test-user", "org-1", ["read:property","write:property"])
    return {"Authorization": f"Bearer {token}"}

def test_property_crud(monkeypatch):
    c = TestClient(app)
    # Create
    payload = {"street":"1 Main St","city":"Berkeley","state":"CA","postal_code":"94704"}
    r = c.post("/api/properties", json=payload, headers=auth())
    assert r.status_code == 200
    pid = r.json()["id"]
    # Read
    r = c.get(f"/api/properties/{pid}", headers=auth())
    assert r.status_code == 200
