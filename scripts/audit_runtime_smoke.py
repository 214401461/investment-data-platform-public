from __future__ import annotations

import json
import socket
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
FRONTEND_ROOT = REPO_ROOT / "frontend"


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


class SpaHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        clean_path = path.split("?", 1)[0].split("#", 1)[0]
        rel_path = clean_path.lstrip("/") or "index.html"
        candidate = (FRONTEND_ROOT / rel_path).resolve()
        if candidate.is_file() and FRONTEND_ROOT in candidate.parents:
            return str(candidate)
        return str(FRONTEND_ROOT / "index.html")

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format: str, *args: Any) -> None:
        return


def get_json(url: str) -> dict[str, Any]:
    with urllib.request.urlopen(url, timeout=5) as response:
        return json.loads(response.read().decode("utf-8"))


def post_json(url: str, payload: dict[str, Any]) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=5) as response:
        return json.loads(response.read().decode("utf-8"))


def get_text(url: str) -> str:
    with urllib.request.urlopen(url, timeout=5) as response:
        return response.read().decode("utf-8")


def wait_for_health(url: str, process: subprocess.Popen[str]) -> None:
    deadline = time.monotonic() + 10
    last_error = ""
    while time.monotonic() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"backend exited early with {process.returncode}")
        try:
            payload = get_json(url)
            if payload == {"status": "ok", "mode": "public-demo"}:
                return
            last_error = f"unexpected health payload: {payload}"
        except (OSError, urllib.error.URLError, json.JSONDecodeError) as exc:
            last_error = str(exc)
        time.sleep(0.2)
    raise RuntimeError(f"backend did not become healthy: {last_error}")


def assert_contains(text: str, marker: str, label: str) -> None:
    if marker not in text:
        raise AssertionError(f"{label} missing marker: {marker}")


def main() -> int:
    backend_port = free_port()
    frontend_port = free_port()
    backend_base = f"http://127.0.0.1:{backend_port}"
    frontend_base = f"http://127.0.0.1:{frontend_port}"

    backend = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "backend.app.main:app",
            "--host",
            "127.0.0.1",
            "--port",
            str(backend_port),
            "--log-level",
            "warning",
        ],
        cwd=REPO_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    server = ThreadingHTTPServer(("127.0.0.1", frontend_port), SpaHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    try:
        wait_for_health(f"{backend_base}/health", backend)

        login_html = get_text(f"{frontend_base}/login")
        assert_contains(login_html, '<script src="/app.js"></script>', "frontend /login")
        assert_contains(login_html, '<div id="app"></div>', "frontend /login")

        app_js = get_text(f"{frontend_base}/app.js")
        assert_contains(app_js, 'value="hello"', "frontend app.js")
        assert_contains(app_js, 'navigate("/biz/market")', "frontend app.js")
        assert_contains(app_js, "mock-only", "frontend app.js")

        login_payload = post_json(f"{backend_base}/auth/login", {"username": "hello", "password": "hello"})
        if login_payload.get("token") != "public-demo-token":
            raise AssertionError("auth/login did not return the public demo token")

        market = get_json(f"{backend_base}/api/biz/market/overview")
        macro = get_json(f"{backend_base}/api/biz/macro")
        ops = get_json(f"{backend_base}/api/ops/page-health")
        ai = post_json(f"{backend_base}/api/biz/ai/ask", {"question": "今天市场怎么样"})

        if not market.get("indices"):
            raise AssertionError("market overview mock data missing indices")
        if not macro.get("current_quadrant"):
            raise AssertionError("macro mock data missing current_quadrant")
        if not ops.get("pages"):
            raise AssertionError("ops health mock data missing pages")
        if ai.get("mode") != "mock" or "不构成投资建议" not in ai.get("answer", ""):
            raise AssertionError("AI endpoint did not return a mock advisory disclaimer")

        print(
            "Runtime smoke audit passed: temporary frontend/backend served login, hello auth, and mock APIs."
        )
        return 0
    finally:
        server.shutdown()
        backend.terminate()
        try:
            backend.wait(timeout=5)
        except subprocess.TimeoutExpired:
            backend.kill()
            backend.wait(timeout=5)


if __name__ == "__main__":
    sys.exit(main())
