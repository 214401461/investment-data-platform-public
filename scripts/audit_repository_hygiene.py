from __future__ import annotations

import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]

REQUIRED_GITIGNORE_LINES = {
    ".env",
    ".env.*",
    "!.env.example",
    "__pycache__/",
    ".pytest_cache/",
    ".venv/",
    "node_modules/",
    ".DS_Store",
    "*.db",
    "*.db-shm",
    "*.db-wal",
    "*.duckdb",
    "*.sqlite",
    "*.sqlite3",
    "*.dump",
    "*.parquet",
    "*.pkl",
    "*.pem",
    "*.key",
    "*.log",
    ".node-localstorage*",
    ".next/",
    "runtime/",
    "data/private/",
    "artifacts/private/",
}

FORBIDDEN_TRACKED_SUFFIXES = {
    ".db",
    ".db-shm",
    ".db-wal",
    ".duckdb",
    ".sqlite",
    ".sqlite3",
    ".dump",
    ".parquet",
    ".pkl",
    ".pem",
    ".key",
    ".log",
}

FORBIDDEN_TRACKED_NAMES = {
    ".env",
    ".env.local",
    ".env.production",
    ".env.prod",
    ".env.staging",
    ".node-localstorage.json",
    ".node-localstorage.json-shm",
    ".node-localstorage.json-wal",
}

FORBIDDEN_TRACKED_PREFIXES = (
    "runtime/",
    "data/private/",
    "artifacts/private/",
    ".next/",
    "node_modules/",
    ".venv/",
    ".pytest_cache/",
    "__pycache__/",
)

ALLOWED_ENV_FILES = {".env.example"}


def git_lines(*args: str) -> list[str]:
    completed = subprocess.run(
        ["git", *args],
        cwd=REPO_ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if completed.returncode != 0:
        raise RuntimeError(completed.stderr.strip() or f"git {' '.join(args)} failed")
    return [line for line in completed.stdout.splitlines() if line]


def is_forbidden_tracked(path: str) -> str | None:
    name = Path(path).name
    if name.startswith(".env") and name not in ALLOWED_ENV_FILES:
        return "runtime env file"
    if name in FORBIDDEN_TRACKED_NAMES:
        return "local runtime/cache file"
    if any(path.startswith(prefix) for prefix in FORBIDDEN_TRACKED_PREFIXES):
        return "private/cache directory"
    for suffix in FORBIDDEN_TRACKED_SUFFIXES:
        if path.endswith(suffix):
            return f"forbidden suffix {suffix}"
    return None


def main() -> int:
    errors: list[str] = []
    gitignore_path = REPO_ROOT / ".gitignore"
    if not gitignore_path.exists():
        errors.append(".gitignore is missing")
        gitignore_lines: set[str] = set()
    else:
        gitignore_lines = {
            line.strip()
            for line in gitignore_path.read_text(encoding="utf-8").splitlines()
            if line.strip() and not line.strip().startswith("#")
        }

    missing_ignore_lines = sorted(REQUIRED_GITIGNORE_LINES - gitignore_lines)
    for line in missing_ignore_lines:
        errors.append(f".gitignore missing required public boundary rule: {line}")

    tracked_files = git_lines("ls-files")
    for tracked in tracked_files:
        reason = is_forbidden_tracked(tracked)
        if reason:
            errors.append(f"tracked forbidden file ({reason}): {tracked}")

    if ".env.example" not in tracked_files and not (REPO_ROOT / ".env.example").exists():
        errors.append(".env.example placeholder file is missing")

    if errors:
        print("Repository hygiene audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Repository hygiene audit passed: required ignore rules are present and tracked files contain no env/db/cache artifacts."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
