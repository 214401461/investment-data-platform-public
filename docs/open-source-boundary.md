# Open Source Boundary

This repository is designed to be safe for public use.

## Included

- Public sample data
- Mock AI response flow
- Page health and job status examples
- Local development instructions
- Security and secret scanning scripts

## Not Allowed

- `.env`、`.env.*`、runtime env 备份
- vendor key、access token、refresh token、cookie、session
- 数据库 DSN、数据库密码、SSH 私钥
- 真实用户账号、行为日志、访问日志
- 生产数据库、DuckDB、PostgreSQL dump、raw/parquet 数据
- 私有策略参数、未公开 alpha 研究产物
- Any deployment detail that exposes private infrastructure

## Release Check

Run these commands before publishing a release:

```bash
python scripts/secret_scan.py .
git status --short
git ls-files
```

Stop the release if the secret scan reports any high-risk finding.
