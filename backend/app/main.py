from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


DEFAULT_DATA_DIR = Path(__file__).resolve().parents[1] / "sample_data"


def data_dir() -> Path:
    return Path(os.getenv("DEMO_DATA_DIR", DEFAULT_DATA_DIR)).resolve()


def load_json(name: str) -> dict[str, Any]:
    path = data_dir() / f"{name}.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"sample dataset not found: {name}")
    return json.loads(path.read_text(encoding="utf-8"))


class AiQuestion(BaseModel):
    question: str


app = FastAPI(
    title="Investment Data Platform Lite",
    version="0.1.0",
    description="Public demo API with sample data only.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3001",
        "http://localhost:3001",
        "http://127.0.0.1:3013",
        "http://localhost:3013",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "mode": "public-demo"}


@app.get("/api/biz/market/overview")
def market_overview() -> dict[str, Any]:
    return load_json("market_overview")


@app.get("/api/biz/macro")
def macro_cycle() -> dict[str, Any]:
    return load_json("macro_cycle")


@app.get("/api/biz/alpha-lab/overview")
def alpha_lab_overview() -> dict[str, Any]:
    return load_json("alpha_lab")


@app.get("/api/ops/page-health")
def ops_page_health() -> dict[str, Any]:
    return load_json("ops_health")


@app.post("/api/biz/ai/ask")
def ai_ask(payload: AiQuestion) -> dict[str, Any]:
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="question is required")

    market = load_json("market_overview")
    macro = load_json("macro_cycle")
    alpha = load_json("alpha_lab")

    return {
        "mode": "mock",
        "question": question,
        "answer": (
            "这是公开版 mock AI 回答：当前示例市场处于"
            f"{market['market_state']}，宏观象限为 {macro['current_quadrant']}，"
            f"Alpha Lab 示例策略近 20 日收益为 {alpha['strategy']['return_20d']}。"
            "公开版只演示数据组织和回答结构，不构成投资建议。"
        ),
        "sources": [
            "sample_data/market_overview.json",
            "sample_data/macro_cycle.json",
            "sample_data/alpha_lab.json",
        ],
    }
