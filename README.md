# Investment Data Platform Lite

一个轻量级、可本地运行的开源投研数据平台示例。

它演示了如何把市场概览、宏观周期、因子/策略解释、页面健康检查和 AI 问答组织成一个完整的数据应用。项目只使用仓库内置示例数据，不依赖真实行情接口、私有数据库、云服务或任何 API key。

> 本项目用于数据应用工程学习和二次开发参考，不构成投资建议。

## 为什么做这个项目

很多投研类应用一开始只是几个图表，后面很快会遇到更麻烦的问题：

- 页面展示的数据从哪里来？
- 一个指标今天没更新，是接口坏了，还是上游任务还没到发布时间？
- AI 回答到底是基于结构化数据，还是在凭空生成？
- 因子、策略、宏观状态这些抽象概念，怎么放进一个普通用户也能看懂的界面？
- 项目开源后，如何保证没有把生产 key、数据库和私有数据一起带出去？

Investment Data Platform Lite 用一个很小的代码库回答这些问题。它不是完整生产系统，而是一个可以打开、运行、改造的最小骨架。

## 适合谁

- 想学习 FastAPI + 前端静态页面如何组成数据产品的开发者
- 想做金融、投研、宏观、量化类 dashboard 的个人开发者
- 想理解“业务页面 + 数据健康 + AI 问答”如何协作的产品/数据同学
- 想基于示例项目继续接入真实数据源、数据库或调度系统的团队

## 当前能力

| 模块 | 说明 | 示例接口 |
|---|---|---|
| Market Overview | 市场状态、指数涨跌、行业热度、资金流示例 | `/api/biz/market/overview` |
| Macro Cycle | 增长/通胀象限、宏观信号和轨迹示例 | `/api/biz/macro` |
| Alpha Lab | 因子、策略、回测解释结构示例 | `/api/biz/alpha-lab/overview` |
| Ops Health | 页面健康、任务状态、业务日期示例 | `/api/ops/page-health` |
| AI Demo | 基于本地示例数据生成 mock 投研回答 | `/api/biz/ai/ask` |

## 项目特点

- **零外部依赖数据源**：所有业务数据都在 `backend/sample_data/`。
- **零密钥启动**：不需要 OpenAI、行情供应商、数据库或云服务凭据。
- **后端足够真实**：使用 FastAPI 暴露业务 API，而不是纯静态假页面。
- **前端足够简单**：原生 HTML/CSS/JS，无 Node.js 构建步骤。
- **内置安全边界**：`.env` 默认忽略，并提供 `scripts/secret_scan.py`。
- **适合作为模板**：可以逐步替换 sample JSON、接数据库、接调度、接真实 LLM。

## 架构概览

```text
backend/sample_data/*.json
        |
        v
FastAPI service
        |
        +--> /api/biz/market/overview
        +--> /api/biz/macro
        +--> /api/biz/alpha-lab/overview
        +--> /api/ops/page-health
        +--> /api/biz/ai/ask
        |
        v
Static frontend dashboard
```

目录结构：

```text
backend/
  app/main.py              FastAPI 服务入口
  sample_data/*.json       公开示例数据
  tests/                   API 测试
frontend/
  index.html               静态页面
  app.js                   浏览器侧 API 调用
  styles.css               页面样式
docs/
  architecture.md          架构说明
  open-source-boundary.md  开源边界和安全策略
scripts/
  secret_scan.py           本地密钥扫描脚本
```

更完整的范围清单见 [REQUIREMENTS.md](REQUIREMENTS.md)。

## 快速开始

### 1. 启动后端

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
python -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8001
```

后端健康检查：

```bash
curl http://127.0.0.1:8001/health
```

预期返回：

```json
{"status":"ok","mode":"public-demo"}
```

### 2. 启动前端

另开一个终端：

```bash
cd frontend
python3 -m http.server --bind 127.0.0.1 3013
```

浏览器打开：

```text
http://127.0.0.1:3013
```

## API 示例

市场概览：

```bash
curl http://127.0.0.1:8001/api/biz/market/overview
```

宏观周期：

```bash
curl http://127.0.0.1:8001/api/biz/macro
```

Alpha Lab 示例：

```bash
curl http://127.0.0.1:8001/api/biz/alpha-lab/overview
```

页面健康：

```bash
curl http://127.0.0.1:8001/api/ops/page-health
```

AI mock 问答：

```bash
curl -X POST http://127.0.0.1:8001/api/biz/ai/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"今天市场怎么样"}'
```

## 如何改造成自己的平台

你可以按这个顺序渐进扩展：

1. 替换 `backend/sample_data/*.json`，先用自己的静态样本数据跑通页面。
2. 在 `backend/app/main.py` 中把 JSON 读取替换为数据库查询或文件查询。
3. 给每个业务页增加 `business_date`、`source`、`updated_at` 等字段。
4. 把 `/api/ops/page-health` 从静态样例升级为真实健康检查。
5. 把 `/api/biz/ai/ask` 从 mock 回答升级为真实 LLM 或本地模型调用。
6. 如果需要生产化，再引入任务调度、数据库迁移、鉴权和部署流水线。

## 安全边界

本仓库明确不包含：

- 真实 API key、access token、refresh token、cookie、session
- 私有数据库 DSN、密码、SSH key
- 生产数据库、DuckDB、PostgreSQL dump、raw/parquet 数据
- 真实用户账号、行为日志、访问日志
- 私有策略参数、未公开研究产物
- 生产部署环境或内网路径

发布前请运行：

```bash
python scripts/secret_scan.py .
```

详见 [docs/open-source-boundary.md](docs/open-source-boundary.md)。

## 验证

```bash
python -m pytest backend/tests -q
python -m compileall backend/app scripts
python scripts/secret_scan.py .
```

## 非目标

这个仓库暂时不做：

- 真实投资建议
- 真实交易或券商集成
- 用户系统和权限管理
- 生产部署脚本
- 外部行情/vendor 数据接入
- scheduler / worker 基础设施
- 真实 LLM key 或在线模型调用

## 路线图

- [ ] 增加更多示例数据集
- [ ] 增加 DuckDB / SQLite 可选读取层
- [ ] 增加页面级数据健康规则示例
- [ ] 增加 Docker Compose 本地启动方式
- [ ] 增加一个真实但不需要 key 的公开数据源示例
- [ ] 增加前端截图和交互说明

## 贡献

欢迎提交 issue 和 pull request。比较适合的贡献方向：

- 改进示例数据结构
- 增加测试
- 改进文档
- 增加不需要密钥的公开数据源示例
- 改进前端可读性和响应式布局

提交前请确保：

```bash
python -m pytest backend/tests -q
python scripts/secret_scan.py .
```

## License

MIT. 示例数据仅用于演示。
