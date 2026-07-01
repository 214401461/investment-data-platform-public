from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REAL_FRONTEND = REPO_ROOT.parent / "investment-data-platform" / "frontend"
APP_JS_PATH = REPO_ROOT / "frontend" / "app.js"

REAL_LOGIN_COMPONENTS = ("CursorHalo", "GlitchCanvas", "LoginForm", "ComplianceFooter")
REAL_LOGIN_TEXT = (
    "ARCHĒ ONLINE · QIUQIU RESEARCH",
    "球球投研",
    "AI · driven · research · workbench",
    "SYSTEM ONLINE",
    "v1.0",
    "2026",
    "让每一次判断都有来源、有逻辑，也有被修正的可能。",
    "—— ARCHĒ · 球球投研的 AI 小伙伴",
    "// SECURE LOGIN",
    "AUTH · 01",
    "欢迎回来",
    "登录后进入你的 AI 投研工作台。",
    "用户名 / 邮箱",
    "密码",
    "记住登录状态",
    "进入未来",
    "安全策略",
    "使用协议",
    "技术支持",
    "京ICP备2024044293号-3",
    "京公网安备11010602202577号",
)


def read_real_login_source(real_frontend: Path) -> str:
    login_page = real_frontend / "app" / "login" / "page.tsx"
    login_form = real_frontend / "components" / "auth" / "LoginForm.tsx"
    compliance_footer = real_frontend / "components" / "common" / "ComplianceFooter.tsx"
    return "\n".join(
        path.read_text(encoding="utf-8")
        for path in (login_page, login_form, compliance_footer)
    )


def check_public_login(app_js: str) -> list[str]:
    errors: list[str] = []
    for text in REAL_LOGIN_TEXT:
        if text not in app_js:
            errors.append(f"public login missing text: {text}")

    default_checks = {
        "username default hello": r'id="username"[^>]+value="hello"',
        "password default hello": r'id="password"[^>]+value="hello"',
        "username validation hello": r'username\s*!==\s*"hello"',
        "password validation hello": r'passcode\s*!==\s*"hello"',
        "default login target": r'navigate\("/biz/market"\)',
        "public token marker": r'public-demo-token',
    }
    for label, pattern in default_checks.items():
        if not re.search(pattern, app_js):
            errors.append(f"public login missing {label}")

    if 'class="login-parity-markers" hidden' not in app_js:
        errors.append("public login component parity markers must remain hidden from visible UI")

    sensitive_terms = ("API key", "TTS key", "DB password", "数据库密码", "password_changed")
    for term in sensitive_terms:
        if term in app_js:
            errors.append(f"public login/app exposes forbidden sensitive phrase: {term}")

    for component in REAL_LOGIN_COMPONENTS:
        if component not in app_js:
            errors.append(f"public login missing component marker: {component}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit public demo login parity against the real Qiuqiu login page and public demo defaults."
    )
    parser.add_argument(
        "--real-frontend",
        type=Path,
        default=DEFAULT_REAL_FRONTEND,
        help="Path to the real investment-data-platform/frontend directory.",
    )
    args = parser.parse_args()

    app_js = APP_JS_PATH.read_text(encoding="utf-8")
    errors = check_public_login(app_js)

    real_frontend = args.real_frontend
    real_checked = real_frontend.exists()
    if real_checked:
        real_source = read_real_login_source(real_frontend)
        for component in REAL_LOGIN_COMPONENTS:
            if component not in real_source:
                errors.append(f"real login no longer references expected component: {component}")
        for text in REAL_LOGIN_TEXT:
            if text not in real_source:
                errors.append(f"real login no longer contains expected text: {text}")

    if errors:
        print("Login parity audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Login parity audit passed: "
        f"{len(REAL_LOGIN_COMPONENTS)} component markers, {len(REAL_LOGIN_TEXT)} text markers, hello/hello defaults. "
        f"real frontend checked: {real_checked}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
