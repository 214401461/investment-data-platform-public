from __future__ import annotations

import re
import sys
from pathlib import Path


SKIP_DIRS = {".git", ".venv", "node_modules", "__pycache__", ".pytest_cache"}
HIGH_RISK_PATTERNS = [
    re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
    re.compile(r"(?i)(api[_-]?key|access[_-]?token|refresh[_-]?token|secret|password)\s*[:=]\s*['\"]?[^'\"\s]{8,}"),
    re.compile(r"postgres(?:ql)?://[^\\s]+", re.IGNORECASE),
    re.compile(r"mysql://[^\\s]+", re.IGNORECASE),
    re.compile(r"-----BEGIN (?:RSA |OPENSSH |EC |)PRIVATE KEY-----"),
]


def iter_files(root: Path):
    for path in root.rglob("*"):
        if path.is_dir():
            continue
        if path.name == "secret_scan.py" and path.parent.name == "scripts":
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.stat().st_size > 1_000_000:
            continue
        yield path


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    findings: list[str] = []
    for path in iter_files(root):
        text = path.read_text(encoding="utf-8", errors="ignore")
        for lineno, line in enumerate(text.splitlines(), 1):
            for pattern in HIGH_RISK_PATTERNS:
                if pattern.search(line):
                    findings.append(f"{path.relative_to(root)}:{lineno}: {pattern.pattern}")

    if findings:
        print("Potential secrets found:")
        for finding in findings:
            print(finding)
        return 1

    print("No high-risk secret patterns found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
