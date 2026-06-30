# Requirements

This document defines the scope of the open-source demo.

## Product Requirements

- The app must run locally without external credentials.
- The app must show a market overview, macro cycle, Alpha Lab demo, Ops health, and mock AI answer flow.
- The API must return deterministic responses from checked-in sample JSON files.
- The frontend must work as static files served by `python -m http.server`.
- The project must clearly state that it is not financial advice.

## Runtime Requirements

- Python 3.12 or newer
- FastAPI backend on `127.0.0.1:8001`
- Static frontend on `127.0.0.1:3013`
- No database server required
- No Node.js build step required

## Data Requirements

- All demo data must live under `backend/sample_data/`.
- Sample data must be synthetic, public, or generic enough to publish.
- The repository must not include production databases, private raw data, user data, or vendor exports.
- API responses must include enough fields for the frontend to render without hidden dependencies.

## Security Requirements

- No API keys, access tokens, refresh tokens, cookies, private DSNs, passwords, or SSH keys.
- `.env` and `.env.*` must stay ignored, except `.env.example`.
- `python scripts/secret_scan.py .` must pass before publishing.
- CI must run tests and secret scan.

## API Requirements

- `GET /health` returns service status.
- `GET /api/biz/market/overview` returns sample market overview data.
- `GET /api/biz/macro` returns sample macro cycle data.
- `GET /api/biz/alpha-lab/overview` returns sample strategy and factor explanation data.
- `GET /api/ops/page-health` returns sample operational health data.
- `POST /api/biz/ai/ask` returns a mock answer grounded in sample data.

## Verification Requirements

```bash
python -m pytest backend/tests -q
python -m compileall backend/app scripts
python scripts/secret_scan.py .
```

## Out Of Scope

- Real investment advice
- Real trading, portfolio execution, or brokerage integration
- Production deployment scripts
- Vendor data ingestion
- User authentication
- Scheduler and worker infrastructure
- Private AI keys or live LLM calls
