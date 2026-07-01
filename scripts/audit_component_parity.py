from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ACTUAL_APP_ROOT = REPO_ROOT.parent / "investment-data-platform" / "frontend" / "app"
APP_JS_PATH = REPO_ROOT / "frontend" / "app.js"

REDIRECT_RE = re.compile(r"redirect\([\"']([^\"']+)[\"']\)")
NAMED_COMPONENT_IMPORT_RE = re.compile(
    r"import\s*\{\s*([^}]+?)\s*\}\s*from\s*[\"'](@/components/[^\"']+)[\"']",
    re.DOTALL,
)
DEFAULT_COMPONENT_IMPORT_RE = re.compile(
    r"import\s+([A-Z][A-Za-z0-9_]*)\s+from\s*[\"'](@/components/[^\"']+)[\"']"
)


def route_for_page(page: Path, app_root: Path) -> str:
    return "/" + str(page.relative_to(app_root)).removesuffix("/page.tsx")


def imported_component_names(source: str) -> list[str]:
    names: list[str] = []
    for match in NAMED_COMPONENT_IMPORT_RE.finditer(source):
        for raw_name in match.group(1).replace("\n", " ").split(","):
            name = raw_name.strip()
            if not name:
                continue
            if " as " in name:
                name = name.split(" as ", 1)[1].strip()
            names.append(name)
    for match in DEFAULT_COMPONENT_IMPORT_RE.finditer(source):
        names.append(match.group(1))
    return list(dict.fromkeys(names))


def scan_pages(app_root: Path) -> list[Path]:
    pages: list[Path] = []
    for section in ("biz", "ops"):
        base = app_root / section
        if base.exists():
            pages.extend(base.rglob("page.tsx"))
    return sorted(pages)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit public demo component-entry parity against the real Qiuqiu page tree."
    )
    parser.add_argument(
        "--actual-app-root",
        type=Path,
        default=DEFAULT_ACTUAL_APP_ROOT,
        help="Path to the real investment-data-platform/frontend/app directory.",
    )
    args = parser.parse_args()

    actual_root = args.actual_app_root
    if not actual_root.exists():
        print(f"Component parity audit skipped: real app root not found: {actual_root}")
        return 0

    app_js = APP_JS_PATH.read_text(encoding="utf-8")
    errors: list[str] = []
    checked_components = 0
    redirect_routes = 0

    for page in scan_pages(actual_root):
        route = route_for_page(page, actual_root)
        source = page.read_text(encoding="utf-8")
        redirect_match = REDIRECT_RE.search(source)
        if redirect_match:
            redirect_routes += 1
            target = redirect_match.group(1)
            if f'"{route}": "{target}"' not in app_js:
                errors.append(f"{route} redirects to {target}, but frontend/app.js does not declare that rule")
            continue

        components = imported_component_names(source)
        checked_components += len(components)
        missing = [name for name in components if name not in app_js]
        if missing:
            errors.append(f"{route} missing component markers: {', '.join(missing)}")

    if errors:
        print("Component parity audit failed:")
        for error in errors:
            print(f"- {error}")
        print(f"components checked: {checked_components}; redirect routes checked: {redirect_routes}")
        return 1

    print(
        "Component parity audit passed: "
        f"{checked_components} imported component markers, {redirect_routes} redirect routes."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
