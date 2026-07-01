from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REAL_FRONTEND = REPO_ROOT.parent / "investment-data-platform" / "frontend"


def run(label: str, command: list[str]) -> bool:
    print(f"\n==> {label}", flush=True)
    print("$ " + " ".join(command), flush=True)
    completed = subprocess.run(command, cwd=REPO_ROOT)
    if completed.returncode == 0:
        print(f"PASS: {label}")
        return True
    print(f"FAIL: {label} exited with {completed.returncode}")
    return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Run local-only required parity checks against the real Qiuqiu frontend. "
            "Unlike public CI mode, this fails when the real source tree is unavailable."
        )
    )
    parser.add_argument(
        "--real-frontend",
        type=Path,
        default=DEFAULT_REAL_FRONTEND,
        help="Path to the real investment-data-platform/frontend directory.",
    )
    args = parser.parse_args()

    real_frontend = args.real_frontend.resolve()
    real_app_root = real_frontend / "app"
    required_paths = [
        real_frontend,
        real_app_root,
        real_frontend / "app" / "login" / "page.tsx",
        real_frontend / "components" / "auth" / "LoginForm.tsx",
        real_frontend / "components" / "common" / "ComplianceFooter.tsx",
        real_frontend / "components" / "biz" / "layout" / "SubNav.tsx",
        real_frontend / "components" / "ops" / "OpsShell.tsx",
    ]

    missing = [path for path in required_paths if not path.exists()]
    if missing:
        print("Required real Qiuqiu frontend paths are missing:")
        for path in missing:
            print(f"- {path}")
        return 1

    python = sys.executable
    steps = [
        (
            "Require route parity against real app tree",
            [python, "scripts/audit_route_parity.py", "--actual-app-root", str(real_app_root)],
        ),
        (
            "Require component parity against real app tree",
            [python, "scripts/audit_component_parity.py", "--actual-app-root", str(real_app_root)],
        ),
        (
            "Require data contract parity against real app tree",
            [python, "scripts/audit_data_contract_parity.py", "--actual-app-root", str(real_app_root)],
        ),
        (
            "Require navigation parity against real frontend",
            [python, "scripts/audit_navigation_parity.py", "--real-frontend", str(real_frontend)],
        ),
        (
            "Require login parity against real frontend",
            [python, "scripts/audit_login_parity.py", "--real-frontend", str(real_frontend)],
        ),
    ]

    failed = [label for label, command in steps if not run(label, command)]
    if failed:
        print("\nRequired real parity audit failed:")
        for label in failed:
            print(f"- {label}")
        return 1

    print("\nRequired real parity audit passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
