from __future__ import annotations

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1] / "frontend"


class SpaHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        clean_path = path.split("?", 1)[0].split("#", 1)[0]
        rel_path = clean_path.lstrip("/") or "index.html"
        candidate = (ROOT / rel_path).resolve()
        if candidate.is_file() and ROOT in candidate.parents:
            return str(candidate)
        return str(ROOT / "index.html")

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 3013), SpaHandler)
    print("Serving frontend on http://127.0.0.1:3013", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
