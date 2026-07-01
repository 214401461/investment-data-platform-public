from __future__ import annotations

import argparse
import ast
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REAL_FRONTEND = REPO_ROOT.parent / "investment-data-platform" / "frontend"
APP_JS_PATH = REPO_ROOT / "frontend" / "app.js"


def extract_block(source: str, name: str) -> str:
    start = source.find(name)
    if start < 0:
        raise ValueError(f"cannot find {name}")
    equals = source.find("=", start)
    if equals < 0:
        raise ValueError(f"cannot find assignment for {name}")
    bracket_start = source.find("[", equals)
    if bracket_start < 0:
        raise ValueError(f"cannot find array for {name}")

    depth = 0
    for index in range(bracket_start, len(source)):
        char = source[index]
        if char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return source[bracket_start : index + 1]
    raise ValueError(f"unterminated array for {name}")


def parse_public_array(source: str, name: str) -> list[tuple[str, ...]]:
    block = extract_block(source, f"const {name}")
    parsed = ast.literal_eval(block)
    return [tuple(row) for row in parsed]


def parse_real_biz_tabs(path: Path) -> list[tuple[str, str]]:
    source = path.read_text(encoding="utf-8")
    block = extract_block(source, "const tabs")
    pattern = re.compile(r"\{\s*label:\s*\"([^\"]+)\"\s*,\s*href:\s*\"([^\"]+)\"")
    return [(label, href) for label, href in pattern.findall(block)]


def parse_real_ops_nav(path: Path) -> list[tuple[str, str, str]]:
    source = path.read_text(encoding="utf-8")
    block = extract_block(source, "opsNavItems")
    pattern = re.compile(
        r"\{\s*href:\s*\"([^\"]+)\"\s*,\s*label:\s*\"([^\"]+)\"\s*,\s*icon:\s*\"([^\"]+)\""
    )
    return [(label, href, icon) for href, label, icon in pattern.findall(block)]


def compare_rows(label: str, actual: list[tuple[str, ...]], expected: list[tuple[str, ...]]) -> list[str]:
    errors: list[str] = []
    if len(actual) != len(expected):
        errors.append(f"{label} length mismatch: public={len(actual)} real={len(expected)}")
    for index, (public_row, real_row) in enumerate(zip(actual, expected), start=1):
        if public_row != real_row:
            errors.append(f"{label} row {index} mismatch: public={public_row!r} real={real_row!r}")
    if len(actual) > len(expected):
        for index, public_row in enumerate(actual[len(expected) :], start=len(expected) + 1):
            errors.append(f"{label} extra public row {index}: {public_row!r}")
    if len(expected) > len(actual):
        for index, real_row in enumerate(expected[len(actual) :], start=len(actual) + 1):
            errors.append(f"{label} missing public row {index}: {real_row!r}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit public demo Biz/Ops navigation parity against the real Qiuqiu navigation definitions."
    )
    parser.add_argument(
        "--real-frontend",
        type=Path,
        default=DEFAULT_REAL_FRONTEND,
        help="Path to the real investment-data-platform/frontend directory.",
    )
    args = parser.parse_args()

    real_frontend = args.real_frontend
    if not real_frontend.exists():
        print(f"Navigation parity audit skipped: real frontend not found: {real_frontend}")
        return 0

    app_js = APP_JS_PATH.read_text(encoding="utf-8")
    public_biz = parse_public_array(app_js, "bizTabs")
    public_ops = parse_public_array(app_js, "opsNav")
    real_biz = parse_real_biz_tabs(real_frontend / "components" / "biz" / "layout" / "SubNav.tsx")
    real_ops = parse_real_ops_nav(real_frontend / "components" / "ops" / "OpsShell.tsx")

    errors = []
    errors.extend(compare_rows("bizTabs", public_biz, real_biz))
    errors.extend(compare_rows("opsNav", public_ops, real_ops))

    if errors:
        print("Navigation parity audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Navigation parity audit passed: {len(public_biz)} biz tabs, {len(public_ops)} ops nav items.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
