from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


def preferred_python() -> str:
    venv_python = REPO_ROOT / ".venv" / "bin" / "python"
    if venv_python.exists():
        return str(venv_python)
    return sys.executable


def run_step(label: str, command: list[str]) -> bool:
    printable = " ".join(command)
    print(f"\n==> {label}", flush=True)
    print(f"$ {printable}", flush=True)
    completed = subprocess.run(command, cwd=REPO_ROOT)
    if completed.returncode == 0:
        print(f"PASS: {label}")
        return True
    print(f"FAIL: {label} exited with {completed.returncode}")
    return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run the full public demo audit suite: syntax, tests, parity, runtime boundary, and secret scan."
    )
    parser.add_argument(
        "--skip-pytest",
        action="store_true",
        help="Skip backend pytest when dependencies are not installed in the active Python environment.",
    )
    parser.add_argument(
        "--require-real-parity",
        action="store_true",
        help="Also require local real Qiuqiu frontend source checks. Intended for local final acceptance, not public CI.",
    )
    args = parser.parse_args()

    python = preferred_python()
    steps: list[tuple[str, list[str]]] = [
        ("Compile backend and audit scripts", [python, "-m", "compileall", "backend/app", "scripts"]),
    ]

    if shutil.which("node"):
        steps.append(("Check frontend JavaScript syntax", ["node", "--check", "frontend/app.js"]))
        steps.append(("Render every public biz/ops route", ["node", "scripts/audit_route_render_smoke.js"]))
    else:
        print("WARN: node not found; skipping frontend JavaScript syntax and route render checks.")

    if not args.skip_pytest:
        steps.append(("Run backend API tests", [python, "-m", "pytest", "backend/tests", "-q"]))

    steps.extend(
        [
            ("Run temporary frontend/backend runtime smoke", [python, "scripts/audit_runtime_smoke.py"]),
            ("Audit biz/ops route parity", [python, "scripts/audit_route_parity.py"]),
            ("Audit page component parity", [python, "scripts/audit_component_parity.py"]),
            ("Audit page data contract parity", [python, "scripts/audit_data_contract_parity.py"]),
            ("Audit biz/ops navigation parity", [python, "scripts/audit_navigation_parity.py"]),
            ("Audit login parity and default hello credentials", [python, "scripts/audit_login_parity.py"]),
            ("Audit public runtime boundary", [python, "scripts/audit_public_runtime_boundary.py"]),
            ("Audit repository hygiene", [python, "scripts/audit_repository_hygiene.py"]),
            ("Audit objective coverage wiring", [python, "scripts/audit_goal_coverage.py"]),
            ("Scan repository for secrets", [python, "scripts/secret_scan.py", "."]),
        ]
    )

    if args.require_real_parity:
        steps.append(("Require local real Qiuqiu parity", [python, "scripts/audit_real_parity_required.py"]))

    failed = [label for label, command in steps if not run_step(label, command)]
    if failed:
        print("\nPublic demo audit suite failed:")
        for label in failed:
            print(f"- {label}")
        return 1

    print("\nPublic demo audit suite passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
