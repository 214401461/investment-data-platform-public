# Architecture

This repository is a minimal open-source architecture for an investment data application. It uses local sample data instead of external data vendors or private databases.

```text
sample_data
  -> FastAPI demo services
  -> static frontend dashboard
  -> mock AI answer
  -> Ops health explanation
```

## Layers

- Source: `backend/sample_data/*.json`
- Service: `backend/app/main.py`
- UI: `frontend/index.html`
- Ops: `/api/ops/page-health`
- AI Demo: `/api/biz/ai/ask`

## Extension Points

The demo can be extended with:

- ODS / cleaned / mart build jobs
- scheduler / worker / queue
- metadata database
- page health rules
- vendor data extraction
- deployment gates

These pieces are intentionally not included in the minimal public version.
