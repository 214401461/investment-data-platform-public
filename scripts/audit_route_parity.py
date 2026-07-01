from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ACTUAL_APP_ROOT = REPO_ROOT.parent / "investment-data-platform" / "frontend" / "app"
MANIFEST_PATH = REPO_ROOT / "frontend" / "route-parity.json"
APP_JS_PATH = REPO_ROOT / "frontend" / "app.js"


def scan_routes(app_root: Path, section: str) -> set[str]:
    base = app_root / section
    if not base.exists():
        return set()

    routes: set[str] = set()
    for page in base.rglob("page.tsx"):
        route = "/" + str(page.relative_to(app_root)).removesuffix("/page.tsx")
        routes.add(route)
    return routes


def scan_redirects(app_root: Path, section: str) -> dict[str, str]:
    base = app_root / section
    if not base.exists():
        return {}

    redirects: dict[str, str] = {}
    redirect_pattern = re.compile(r"redirect\([\"']([^\"']+)[\"']\)")
    for page in base.rglob("page.tsx"):
        source = page.read_text(encoding="utf-8")
        match = redirect_pattern.search(source)
        if match:
            route = "/" + str(page.relative_to(app_root)).removesuffix("/page.tsx")
            redirects[route] = match.group(1)
    return redirects


def load_manifest() -> list[dict[str, str]]:
    payload = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    routes = payload.get("routes", [])
    if not isinstance(routes, list):
        raise ValueError("frontend/route-parity.json must contain a routes list")
    return routes


def validate_manifest(routes: list[dict[str, str]]) -> list[str]:
    errors: list[str] = []
    seen_actual: set[str] = set()
    seen_sample: set[str] = set()
    required = {"actualRoute", "samplePath", "title", "family", "dataPolicy"}
    app_js = APP_JS_PATH.read_text(encoding="utf-8")

    for index, route in enumerate(routes, start=1):
        missing = required - set(route)
        if missing:
            errors.append(f"manifest row {index} missing fields: {sorted(missing)}")
            continue

        actual = route["actualRoute"]
        sample = route["samplePath"]
        title = route["title"]
        policy = route["dataPolicy"]

        if actual in seen_actual:
            errors.append(f"duplicate actualRoute: {actual}")
        seen_actual.add(actual)

        if sample in seen_sample:
            errors.append(f"duplicate samplePath: {sample}")
        seen_sample.add(sample)

        if not (actual.startswith("/biz/") or actual.startswith("/ops/")):
            errors.append(f"route outside biz/ops scope: {actual}")
        if not sample.startswith("/"):
            errors.append(f"samplePath must be absolute: {sample}")
        if policy != "mock-only":
            errors.append(f"{actual} dataPolicy must be mock-only")
        if title not in app_js:
            errors.append(f"{actual} title not found in frontend/app.js: {title}")
        redirect_to = route.get("redirectTo")
        if redirect_to:
            redirect_rule = f'"{actual}": "{redirect_to}"'
            if redirect_rule not in app_js:
                errors.append(f"{actual} redirectTo not implemented in frontend/app.js: {redirect_to}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit public demo route parity against the real Qiuqiu app route tree.")
    parser.add_argument(
        "--actual-app-root",
        type=Path,
        default=DEFAULT_ACTUAL_APP_ROOT,
        help="Path to the real investment-data-platform/frontend/app directory. If absent, only manifest self-checks run.",
    )
    args = parser.parse_args()

    routes = load_manifest()
    errors = validate_manifest(routes)
    manifest_actual = {item["actualRoute"] for item in routes}

    actual_root = args.actual_app_root
    if actual_root.exists():
        real_routes = scan_routes(actual_root, "biz") | scan_routes(actual_root, "ops")
        real_redirects = scan_redirects(actual_root, "biz") | scan_redirects(actual_root, "ops")
        missing = sorted(real_routes - manifest_actual)
        extra = sorted(manifest_actual - real_routes)
        if missing:
            errors.append("missing real routes in manifest: " + ", ".join(missing))
        if extra:
            errors.append("manifest routes not found in real app: " + ", ".join(extra))
        manifest_redirects = {item["actualRoute"]: item.get("redirectTo") for item in routes if item.get("redirectTo")}
        for route, target in sorted(real_redirects.items()):
            if manifest_redirects.get(route) != target:
                errors.append(f"{route} redirectTo must match real app: {target}")
        for route, target in sorted(manifest_redirects.items()):
            if route in real_routes and real_redirects.get(route) != target:
                errors.append(f"{route} redirectTo not found in real app: {target}")
        real_note = f"real routes checked: {len(real_routes)}"
    else:
        real_note = f"real app root not found, skipped live route tree: {actual_root}"

    if errors:
        print("Route parity audit failed:")
        for error in errors:
            print(f"- {error}")
        print(real_note)
        return 1

    biz_count = sum(1 for item in routes if item["actualRoute"].startswith("/biz/"))
    ops_count = sum(1 for item in routes if item["actualRoute"].startswith("/ops/"))
    print(f"Route parity audit passed: {biz_count} biz routes, {ops_count} ops routes, {len(routes)} total.")
    print(real_note)
    return 0


if __name__ == "__main__":
    sys.exit(main())
