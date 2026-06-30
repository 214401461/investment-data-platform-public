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


def test_ai_mock_answer() -> None:
    response = client.post("/api/biz/ai/ask", json={"question": "今天市场怎么样"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["mode"] == "mock"
    assert "不构成投资建议" in payload["answer"]

