from __future__ import annotations

import ast
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
FRONTEND_APP = REPO_ROOT / "frontend" / "app.js"
FRONTEND_INDEX = REPO_ROOT / "frontend" / "index.html"
BACKEND_MAIN = REPO_ROOT / "backend" / "app" / "main.py"

FORBIDDEN_FRONTEND_RUNTIME_PATTERNS = {
    "fetch": r"\bfetch\s*\(",
    "XMLHttpRequest": r"\bXMLHttpRequest\b",
    "WebSocket": r"\bWebSocket\b",
    "EventSource": r"\bEventSource\b",
    "external http url": r"https?://(?!127\.0\.0\.1|localhost)",
}

FORBIDDEN_BACKEND_IMPORTS = {
    "requests",
    "httpx",
    "aiohttp",
    "psycopg2",
    "asyncpg",
    "duckdb",
    "sqlalchemy",
    "mysql",
    "pymysql",
    "openai",
    "anthropic",
}

FORBIDDEN_BACKEND_RUNTIME_PATTERNS = {
    "database url env": r"os\.getenv\([\"'](?:DATABASE_URL|POSTGRES_URL|PG_DSN|MYSQL_URL|DB_PASSWORD)[\"']",
    "private dsn": r"(?:postgres(?:ql)?|mysql)://",
    "generic secret env": r"os\.getenv\([\"'][A-Z0-9_]*(?:API_KEY|SECRET|TOKEN|PASSWORD)[A-Z0-9_]*[\"']",
}

REQUIRED_BACKEND_MARKERS = (
    'description="Public demo API with sample data only."',
    'return {"status": "ok", "mode": "public-demo"}',
    'payload.username != "hello" or payload.password != "hello"',
    '"token": "public-demo-token"',
    '"username": "hello"',
    'DEFAULT_DATA_DIR = Path(__file__).resolve().parents[1] / "sample_data"',
    "SAMPLE_DATA_ROOT = DEFAULT_DATA_DIR.resolve()",
    "DEMO_DATA_DIR must stay inside backend/sample_data",
)

REQUIRED_FRONTEND_MARKERS = (
    'const AUTH_TOKEN_KEY = "qiuqiu.auth.token"',
    'const AUTH_USER_KEY = "qiuqiu.auth.user"',
    'value="hello"',
    'public-demo-token',
    'navigate("/biz/market")',
)


def imported_modules(source: str) -> set[str]:
    modules: set[str] = set()
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                modules.add(alias.name.split(".", 1)[0])
        elif isinstance(node, ast.ImportFrom) and node.module:
            modules.add(node.module.split(".", 1)[0])
    return modules


def main() -> int:
    errors: list[str] = []
    frontend_app = FRONTEND_APP.read_text(encoding="utf-8")
    frontend_index = FRONTEND_INDEX.read_text(encoding="utf-8")
    backend_main = BACKEND_MAIN.read_text(encoding="utf-8")

    for label, pattern in FORBIDDEN_FRONTEND_RUNTIME_PATTERNS.items():
        if re.search(pattern, frontend_app):
            errors.append(f"frontend/app.js contains forbidden runtime connector: {label}")

    for marker in REQUIRED_FRONTEND_MARKERS:
        if marker not in frontend_app:
            errors.append(f"frontend/app.js missing required public runtime marker: {marker}")

    if '<script src="/app.js"></script>' not in frontend_index:
        errors.append("frontend/index.html must load only the local /app.js bundle")
    if re.search(r"<script[^>]+src=[\"']https?://", frontend_index):
        errors.append("frontend/index.html must not load external scripts")
    if re.search(r"<link[^>]+href=[\"']https?://", frontend_index):
        errors.append("frontend/index.html must not load external stylesheets")

    imports = imported_modules(backend_main)
    forbidden_imports = sorted(imports & FORBIDDEN_BACKEND_IMPORTS)
    if forbidden_imports:
        errors.append("backend imports forbidden runtime connectors: " + ", ".join(forbidden_imports))

    for label, pattern in FORBIDDEN_BACKEND_RUNTIME_PATTERNS.items():
        if re.search(pattern, backend_main, re.IGNORECASE):
            errors.append(f"backend/app/main.py contains forbidden runtime pattern: {label}")

    for marker in REQUIRED_BACKEND_MARKERS:
        if marker not in backend_main:
            errors.append(f"backend/app/main.py missing required public runtime marker: {marker}")

    if errors:
        print("Public runtime boundary audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Public runtime boundary audit passed: frontend is static-local, backend is sample-data-only public-demo mode.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
