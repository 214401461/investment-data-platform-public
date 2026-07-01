from __future__ import annotations

import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]

ROUTE_MANIFEST = REPO_ROOT / "frontend" / "route-parity.json"
APP_JS = REPO_ROOT / "frontend" / "app.js"
BACKEND_MAIN = REPO_ROOT / "backend" / "app" / "main.py"
AUDIT_ALL = REPO_ROOT / "scripts" / "audit_all.py"
WORKFLOW = REPO_ROOT / ".github" / "workflows" / "verify.yml"

REQUIRED_AUDIT_STEPS = (
    "audit_route_parity.py",
    "audit_component_parity.py",
    "audit_data_contract_parity.py",
    "audit_navigation_parity.py",
    "audit_login_parity.py",
    "audit_public_runtime_boundary.py",
    "audit_repository_hygiene.py",
    "audit_runtime_smoke.py",
    "audit_route_render_smoke.js",
    "secret_scan.py",
)

REQUIRED_GOAL_MARKERS = (
    ("frontend default username", APP_JS, 'id="username" name="username" value="hello"'),
    ("frontend default password", APP_JS, 'id="password" name="password" value="hello"'),
    ("frontend hello validation", APP_JS, 'username !== "hello" || passcode !== "hello"'),
    ("frontend public token", APP_JS, "public-demo-token"),
    ("frontend login target", APP_JS, 'navigate("/biz/market")'),
    ("frontend hidden login parity markers", APP_JS, 'class="login-parity-markers" hidden'),
    ("frontend compliance record", APP_JS, "京ICP备2024044293号-3"),
    ("frontend public security record", APP_JS, "京公网安备11010602202577号"),
    ("frontend ops compliance footer", APP_JS, "ops-compliance-footer"),
    ("backend public-demo health", BACKEND_MAIN, 'return {"status": "ok", "mode": "public-demo"}'),
    ("backend hello auth", BACKEND_MAIN, 'payload.username != "hello" or payload.password != "hello"'),
    ("backend public token", BACKEND_MAIN, '"token": "public-demo-token"'),
    ("backend sample data root", BACKEND_MAIN, 'DEFAULT_DATA_DIR = Path(__file__).resolve().parents[1] / "sample_data"'),
    ("backend sample data guard", BACKEND_MAIN, "DEMO_DATA_DIR must stay inside backend/sample_data"),
    ("ci full audit", WORKFLOW, "python scripts/audit_all.py"),
    ("ci node setup", WORKFLOW, "actions/setup-node@v4"),
)

FORBIDDEN_APP_RUNTIME_PATTERNS = (
    ("frontend fetch", r"\bfetch\s*\("),
    ("frontend XMLHttpRequest", r"\bXMLHttpRequest\b"),
    ("frontend WebSocket", r"\bWebSocket\b"),
    ("frontend EventSource", r"\bEventSource\b"),
    ("misleading encrypted connection copy", r"连接状态：加密安全"),
    ("misleading duckdb command", r"--engine=duckdb"),
    ("misleading production runtime copy", r"Mac production runtime"),
    ("misleading pg dump copy", r"最新 PG dump|PG dump"),
    ("misleading nas mock path", r"mock/nas/(?:postgres|duckdb)"),
    ("misleading private backup script", r"mac_prod_backup\.sh"),
    ("misleading nas roots copy", r"runtime / nas roots"),
)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def main() -> int:
    errors: list[str] = []

    manifest = json.loads(read(ROUTE_MANIFEST))
    routes = manifest.get("routes", [])
    if not isinstance(routes, list):
        errors.append("frontend/route-parity.json must contain a routes list")
        routes = []

    biz_routes = [route for route in routes if route.get("actualRoute", "").startswith("/biz/")]
    ops_routes = [route for route in routes if route.get("actualRoute", "").startswith("/ops/")]
    if len(biz_routes) != 31:
        errors.append(f"expected 31 biz routes, found {len(biz_routes)}")
    if len(ops_routes) != 16:
        errors.append(f"expected 16 ops routes, found {len(ops_routes)}")
    if len(routes) != 47:
        errors.append(f"expected 47 total biz/ops routes, found {len(routes)}")

    for route in routes:
        actual = route.get("actualRoute", "")
        sample = route.get("samplePath", "")
        if route.get("dataPolicy") != "mock-only":
            errors.append(f"{actual or sample} dataPolicy must be mock-only")
        if not (actual.startswith("/biz/") or actual.startswith("/ops/")):
            errors.append(f"route outside biz/ops scope: {actual}")
        if not sample.startswith("/"):
            errors.append(f"samplePath must be absolute: {sample}")

    for label, path, marker in REQUIRED_GOAL_MARKERS:
        if marker not in read(path):
            errors.append(f"missing goal marker for {label}: {marker}")

    app_js = read(APP_JS)
    for label, pattern in FORBIDDEN_APP_RUNTIME_PATTERNS:
        if re.search(pattern, app_js):
            errors.append(f"forbidden public frontend runtime connector present: {label}")

    audit_all = read(AUDIT_ALL)
    for script in REQUIRED_AUDIT_STEPS:
        if script not in audit_all:
            errors.append(f"scripts/audit_all.py must run {script}")

    if errors:
        print("Goal coverage audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Goal coverage audit passed: 31 biz routes, 16 ops routes, mock-only manifest, "
        "hello login, public-demo runtime, CI audit, and boundary checks are wired."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
