from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ACTUAL_APP_ROOT = REPO_ROOT.parent / "investment-data-platform" / "frontend" / "app"
APP_JS_PATH = REPO_ROOT / "frontend" / "app.js"

IMPORT_RE = re.compile(
    r"import\s*\{\s*([^}]+?)\s*\}\s*from\s*[\"'](@/lib/[^\"']+|@/components/[^\"']+)[\"']",
    re.DOTALL,
)
REDIRECT_RE = re.compile(r"redirect\([\"']([^\"']+)[\"']\)")


def route_for_page(page: Path, app_root: Path) -> str:
    return "/" + str(page.relative_to(app_root)).removesuffix("/page.tsx")


def scan_pages(app_root: Path) -> list[Path]:
    pages: list[Path] = []
    for section in ("biz", "ops"):
        base = app_root / section
        if base.exists():
            pages.extend(base.rglob("page.tsx"))
    return sorted(pages)


def imported_contract_names(source: str) -> list[str]:
    names: list[str] = []
    for match in IMPORT_RE.finditer(source):
        for raw_name in match.group(1).replace("\n", " ").split(","):
            name = raw_name.strip()
            if " as " in name:
                name = name.split(" as ", 1)[1].strip()
            if name.startswith(("fetch", "use")):
                names.append(name)
    return list(dict.fromkeys(names))


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit public demo data-contract parity against real Qiuqiu page entry fetch/use contracts."
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
        print(f"Data contract parity audit skipped: real app root not found: {actual_root}")
        return 0

    app_js = APP_JS_PATH.read_text(encoding="utf-8")
    errors: list[str] = []
    checked_contracts = 0
    skipped_redirects = 0

    for page in scan_pages(actual_root):
        route = route_for_page(page, actual_root)
        source = page.read_text(encoding="utf-8")
        if REDIRECT_RE.search(source):
            skipped_redirects += 1
            continue

        contracts = imported_contract_names(source)
        checked_contracts += len(contracts)
        missing = [name for name in contracts if name not in app_js]
        if missing:
            errors.append(f"{route} missing data contract markers: {', '.join(missing)}")

    if errors:
        print("Data contract parity audit failed:")
        for error in errors:
            print(f"- {error}")
        print(f"contracts checked: {checked_contracts}; redirect routes skipped: {skipped_redirects}")
        return 1

    print(
        "Data contract parity audit passed: "
        f"{checked_contracts} fetch/use contract markers, {skipped_redirects} redirect routes skipped."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
