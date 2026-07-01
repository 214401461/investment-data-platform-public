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

GitHub Actions runs the full audit suite on pull requests and pushes to `main`. Run the same command locally before publishing a release:

```bash
python scripts/audit_all.py
git status --short
git ls-files
```

When validating from a local machine that also has the real Qiuqiu frontend source tree next to this repository, use the stricter acceptance command:

```bash
python scripts/audit_all.py --require-real-parity
```

Stop the release if repository hygiene, runtime boundary, parity, tests, or the secret scan reports a failure.
