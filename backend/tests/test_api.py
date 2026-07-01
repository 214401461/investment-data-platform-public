from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_market_overview() -> None:
    response = client.get("/api/biz/market/overview")
    assert response.status_code == 200
    payload = response.json()
    assert payload["market_state"]
    assert payload["indices"]


def test_demo_data_dir_must_stay_inside_sample_data(monkeypatch) -> None:
    monkeypatch.setenv("DEMO_DATA_DIR", "/tmp")
    response = client.get("/api/biz/market/overview")
    assert response.status_code == 403
    assert "backend/sample_data" in response.json()["detail"]


def test_demo_login_accepts_default_credentials() -> None:
    response = client.post("/auth/login", json={"username": "hello", "password": "hello"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["token"] == "public-demo-token"
    assert payload["user"]["role"] == "admin"


def test_demo_login_rejects_other_credentials() -> None:
    response = client.post("/auth/login", json={"username": "qiuqiu", "password": "qiuqiu"})
    assert response.status_code == 401


def test_ai_mock_answer() -> None:
    response = client.post("/api/biz/ai/ask", json={"question": "今天市场怎么样"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["mode"] == "mock"
    assert "不构成投资建议" in payload["answer"]
