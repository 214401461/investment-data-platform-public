const AUTH_TOKEN_KEY = "qiuqiu.auth.token";
const AUTH_USER_KEY = "qiuqiu.auth.user";
const LAST_STOCK_ROUTE_KEY = "biz:last-stock-route";

const bizTabs = [
  ["市场总览", "/biz/market"],
  ["指数研究", "/biz/index/000300.SH"],
  ["宏观研究", "/biz/macro"],
  ["中观研究", "/biz/meso"],
  ["个股研究", "/biz/stock"],
  ["因子与策略库", "/biz/factors"],
  ["因子库", "/biz/factor-library/candidates"],
  ["主动量化", "/biz/alpha-lab/models"],
];

const opsNav = [
  ["总览", "/ops/overview", "dashboard"],
  ["任务监控", "/ops/jobs", "monitoring"],
  ["财报到数监控", "/ops/financial-reports", "finance_mode"],
  ["DAG", "/ops/dag", "account_tree"],
  ["调度编排", "/ops/orchestrator", "hub"],
  ["新鲜度", "/ops/freshness", "update"],
  ["质量", "/ops/quality", "verified_user"],
  ["SLA 监控", "/ops/sla", "timer"],
  ["告警中心", "/ops/alerts", "notifications_active"],
  ["性能监控", "/ops/performance", "speed"],
  ["生产备份", "/ops/backups", "backup"],
  ["项目周报", "/ops/project-weekly-report", "summarize"],
  ["数据资产", "/ops/assets", "inventory_2"],
  ["MCP 服务", "/ops/mcp", "extension"],
  ["AI Runs", "/ops/ai-runs", "memory"],
  ["用户日志", "/ops/user-logs", "manage_search"],
];

const routeRedirects = {
  "/biz/alpha-lab": "/biz/alpha-lab/models",
  "/biz/factor-library": "/biz/factor-library/candidates",
  "/biz/market/sector-cone": "/biz/meso",
};

const market = {
  businessDate: "2026-06-30",
  state: "震荡偏强",
  freshness: "最新交易日已完成",
  ai: "指数仍处风险偏好修复窗口，成交热度温和抬升，行业轮动由红利防御切向 AI 算力、创新药和高端制造。公开版仅展示 mock 结构。",
  indices: [
    ["沪深300", 3924.18, 0.42, 41],
    ["中证500", 5876.33, 0.71, 36],
    ["创业板指", 1842.91, -0.18, 48],
    ["上证指数", 3068.22, 0.31, 44],
  ],
  heatmap: [
    ["AI 算力", 86, 2.8],
    ["创新药", 73, 1.9],
    ["半导体", 66, 1.1],
    ["红利低波", 55, 0.3],
    ["地产链", 38, -0.7],
    ["煤炭", 34, -1.1],
  ],
  signals: [
    ["资金流", "北向和 ETF 同步小幅净流入"],
    ["估值", "宽基估值处于历史 36%-48% 分位"],
    ["情绪", "涨停扩散率改善，亏钱效应收敛"],
  ],
  etf: [
    ["科创芯片 ETF", "+3.4 亿", "+1.8%"],
    ["沪深300 ETF", "+2.9 亿", "+0.5%"],
    ["红利低波 ETF", "-1.1 亿", "-0.2%"],
  ],
};

const macro = {
  quadrant: "复苏早段",
  growthZ: 0.42,
  inflationZ: -0.18,
  nowcast: 51.6,
  factors: [
    ["增长动能", "PMI 新订单回升，工业开工率修复", "positive"],
    ["通胀压力", "PPI 低位震荡，CPI 温和", "neutral"],
    ["流动性", "DR007 稳定，信用利差收窄", "positive"],
    ["外部风险", "美元指数高位回落，出口链观察", "warning"],
  ],
  calendar: [
    ["07-05", "财新服务业 PMI", "10:45"],
    ["07-10", "社融与信贷", "盘后"],
    ["07-15", "二季度 GDP", "10:00"],
  ],
};

const alpha = {
  database: "DUCKDB MOCK",
  indices: market.indices,
  tabs: ["模型注册矩阵", "实时信号终值", "策略模拟组合", "归因中心", "优化对照", "舆情情绪矩阵"],
  models: [
    ["QEP-Momentum", "active", "IC 0.061", "覆盖 512"],
    ["Quality Value", "shadow", "IC 0.048", "覆盖 487"],
    ["Liquidity Shock", "active", "IC 0.039", "覆盖 463"],
    ["News Sentiment", "research", "IC 0.027", "覆盖 329"],
  ],
  portfolio: [
    ["主动量化一号", "+6.8%", "0.72", "3.2%"],
    ["红利质量增强", "+3.1%", "0.51", "1.4%"],
    ["小盘弹性篮子", "+8.9%", "0.66", "5.8%"],
  ],
};

const stockRows = [
  ["600519.SH", "贵州茅台", "食品饮料", 1642.3, 0.82, "质量高、估值中性"],
  ["300750.SZ", "宁德时代", "电力设备", 211.8, 1.94, "景气修复、波动偏高"],
  ["688981.SH", "中芯国际", "半导体", 79.2, 2.36, "产业链热度提升"],
  ["000300.SH", "沪深300", "宽基指数", 3924.18, 0.42, "权重稳健"],
];

const bizRoutes = [
  {
    match: /^\/biz\/ai$/,
    title: "AI 投研问答",
    family: "AI Research",
    description: "复刻真实 /biz/ai 的多智能体投研工作台：任务拆解、数智智能体、研判智能体、语音播报与来源说明均以 mock 事件呈现。",
    metrics: [["运行档位", "Smart"], ["会话", "mock-session"], ["来源", "3 个"], ["语音", "mock voice"]],
    modules: [["任务拆解智能体", "mock_ai_planner_events", "把问题拆成结构化数据和非结构化研判"], ["数智智能体", "mock_structured_agent_trace", "读取市场、宏观、个股、因子 mock 快照"], ["研判智能体", "mock_unstructured_agent_trace", "汇总公告、新闻和 wiki 检索来源"], ["AI 朗读", "mock_tts_summary", "不调用真实语音供应商凭据"]],
    steps: ["建立 AI 投研会话", "识别问题意图", "分派到结构化/研判智能体", "合成回答与来源", "生成语音播报状态"],
  },
  {
    match: /^\/biz\/ai\/hero-demo$/,
    title: "AI 投研 Hero Demo",
    family: "AI Research",
    description: "对应真实机甲风 Hero 实验页，公开版只保留视觉层和交互位，不加载真实模型或音频服务。",
    metrics: [["背景层", "CSS mock"], ["激活态", "ready"], ["音频", "关闭"], ["来源", "public"]],
    modules: [["Hero 视觉", "static_hero_scene", "球球投研 wordmark 与激活态"], ["模型选择", "mock_runtime_options", "Fast / Balanced / Smart 三档"], ["安全边界", "public_demo_guard", "无真实在线模型调用"]],
    steps: ["打开 Hero", "点击激活位", "展示 mock 能力清单", "回到 AI 投研问答"],
  },
  {
    match: /^\/biz\/ai\/mecha-sketch$/,
    title: "AI 投研静态背景测试页",
    family: "AI Research",
    description: "对应真实 Mecha Sketch 静态背景测试页，用于展示球球投研视觉方向。",
    metrics: [["画布", "静态"], ["主题", "mecha"], ["FPS", "N/A"], ["资源", "inline"]],
    modules: [["机甲背景", "static_mecha_layers", "无外部素材依赖"], ["标题层", "qiuqiu_wordmark", "球球投研主视觉"], ["状态灯", "mock_system_status", "离线视觉状态"]],
    steps: ["加载背景", "展示 wordmark", "展示系统状态", "不请求后端"],
  },
  {
    match: /^\/biz\/market\/signals$/,
    title: "市场信号列表",
    family: "Market",
    description: "对应真实 /biz/market/signals，列出市场总览页背后的今日信号、触发规则和业务日期。",
    metrics: [["信号数", "18"], ["强信号", "5"], ["业务日", market.businessDate], ["状态", "fresh"]],
    modules: [["今日信号", "mart_market_signal_daily", "资金、估值、情绪、行业轮动"], ["AI 市场摘要", "mart_market_ai_insight_daily", "只展示 mock 摘要"], ["页面健康", "ops_page_health", "模块级产出窗口"]],
    steps: ["读取信号快照", "按强度排序", "关联行业热力", "展示触发原因"],
  },
  {
    match: /^\/biz\/market\/sector-cone$/,
    title: "行业领导力锥",
    family: "Market",
    description: "对应真实 Three.js 行业锥页面，公开版用静态行业热力和排名替代 3D 场景。",
    metrics: [["行业", "31"], ["领先", "6"], ["拥挤度", "中"], ["动量", "偏强"]],
    modules: [["行业热力", "mart_industry_heatmap_daily", "申万一级行业 mock 分布"], ["领导力锥", "mart_sector_leadership_cone", "3D 场景公开版降级为静态"], ["轮动摘要", "mart_market_rotation_summary_daily", "行业切换解释"]],
    steps: ["归一化行业强度", "计算领导力分数", "映射拥挤度", "输出轮动视图"],
  },
  {
    match: /^\/biz\/index\/[^/]+$/,
    title: "指数研究详情",
    family: "Index",
    description: "对应真实 /biz/index/[code]，包含指数头部、收益卡、价格图、行业拆解、成分股、估值和 ETF 资金。",
    metrics: [["指数", "000300.SH"], ["近20日", "+2.4%"], ["估值分位", "41%"], ["成分股", "300"]],
    modules: [["指数头部", "mart_index_snapshot", "指数元信息和收盘价"], ["行业拆解", "mart_index_industry_weight", "权重行业 TopN"], ["成分股", "mart_index_constituent", "权重、涨跌幅、因子暴露"], ["AI 指数摘要", "mock_index_ai_summary", "不调用真实 LLM"]],
    steps: ["读取指数快照", "合并成分股权重", "计算收益和估值", "生成 AI 摘要"],
  },
  {
    match: /^\/biz\/macro\/key-ratios$/,
    title: "宏观关键比值详情",
    family: "Macro",
    description: "对应真实关键比值工作区，展示信用、利率、库存、汇率等跨周期观察。",
    metrics: [["比值组", "12"], ["异常", "1"], ["国家", "CN/US"], ["频率", "月/周"]],
    modules: [["关键比值", "mart_macro_key_ratio", "跨指标比值和阈值"], ["时序图", "mart_macro_indicator_series", "mock 趋势"], ["解释卡", "macro_ratio_detail_config", "指标含义和资产映射"]],
    steps: ["选择比值", "读取时序", "计算分位", "展示资产含义"],
  },
  {
    match: /^\/biz\/macro\/factors\/[^/]+$/,
    title: "宏观因子详情",
    family: "Macro",
    description: "对应真实 /biz/macro/factors/[code]，展示单个增长、通胀、流动性或海外因子。",
    metrics: [["因子", "growth_momentum"], ["Z-score", "+0.42"], ["方向", "扩张"], ["置信", "中高"]],
    modules: [["因子状态", "mart_macro_factor_state", "因子最新值和分位"], ["证据墙", "mart_macro_evidence", "相关指标列表"], ["资产映射", "mart_macro_asset_map", "权益、债券、商品影响"]],
    steps: ["加载因子", "拆解证据", "映射资产", "展示回测片段"],
  },
  {
    match: /^\/biz\/macro\/indicator\/[^/]+$/,
    title: "宏观指标详情",
    family: "Macro",
    description: "对应真实 /biz/macro/indicator/[code]，展示指标定义、发布节奏、历史时序和解释。",
    metrics: [["指标", "PMI_NEW_ORDER"], ["最新", "51.6"], ["发布", "月度"], ["滞后", "0D"]],
    modules: [["指标时序", "mart_macro_indicator_panel", "历史值与同比"], ["发布日历", "mart_macro_release_calendar", "下一次发布时间"], ["解释信息", "indicator_explanations", "口径说明"]],
    steps: ["读取指标定义", "加载时间序列", "计算变化", "展示发布窗口"],
  },
  {
    match: /^\/biz\/meso$/,
    title: "中观研究 · 行业全景比较",
    family: "Meso",
    description: "对应真实中观研究页，横向比较行业景气、估值、资金、盈利修复和产业链位置。",
    metrics: [["行业", "31"], ["链路", "8"], ["强势", "AI 算力"], ["风险", "地产链"]],
    modules: [["行业全景", "mart_meso_industry_panel", "景气和估值矩阵"], ["产业链视图", "mart_meso_chain_view", "上下游链条"], ["成员抽屉", "mart_meso_members", "行业成分股 mock 列表"], ["行业锥", "mart_sector_cone", "与市场页联动"]],
    steps: ["选择行业", "查看景气分位", "展开产业链", "打开成员列表"],
  },
  {
    match: /^\/biz\/stock$/,
    title: "个股研究入口",
    family: "Stock",
    description: "对应真实股票入口页：提示用户从顶部搜索进入个股详情，同时展示研究工作台模块。",
    metrics: [["搜索", "启用"], ["样例池", "4"], ["详情页", "mock"], ["业务日", market.businessDate]],
    modules: [["搜索入口", "stock_search", "股票、指数、研报搜索"], ["研究面板", "stock_research_workspace", "价格、估值、财务、股东模块"], ["页面健康", "stock_research", "依赖 mart 快照"]],
    steps: ["输入股票代码", "跳转详情页", "读取研究快照", "展示 AI 摘要"],
  },
  {
    match: /^\/biz\/stock\/[^/]+$/,
    title: "个股研究详情",
    family: "Stock",
    description: "对应真实 /biz/stock/[code]，包含价格趋势、关键指标、估值因子、财务质量、股东和 AI 个股摘要。",
    metrics: [["股票", "600519.SH"], ["120D", "+8.6%"], ["ROE", "29.4%"], ["估值分位", "52%"]],
    modules: [["价格趋势 (120D)", "mart_stock_price_trend", "OHLC 和资本事件"], ["关键指标小结", "mart_stock_key_metrics", "估值、成长、质量"], ["财务报告解读", "mart_stock_finance_panel", "近 8 季度"], ["AI 个股研究摘要", "mock_stock_ai_summary", "公开 mock"]],
    steps: ["加载股票头部", "绘制价格趋势", "合并财务和股东", "生成研究摘要"],
  },
  {
    match: /^\/biz\/factors$/,
    title: "因子与策略观察池",
    family: "Factor Pool",
    description: "对应真实策略观察池，汇总入池标的、策略命中、因子拆解和风险规则。",
    metrics: [["入池标的", "128"], ["策略", "6"], ["高风险", "4"], ["数据日", market.businessDate]],
    modules: [["策略卡片", "mart_strategy_pool", "策略命中结果"], ["因子森林", "mart_factor_exposure", "价值、成长、质量、动量"], ["风险提示", "mart_strategy_risk_alert", "风险规则"], ["入池表格", "mart_strategy_pool_members", "标的明细"]],
    steps: ["读取因子得分", "合成策略命中", "执行风险规则", "输出观察池"],
  },
  {
    match: /^\/biz\/factor-library$/,
    title: "因子库入口",
    family: "Factor Library",
    description: "真实项目入口会导向候选因子、准入验证、因子图谱和正式注册库。",
    metrics: [["候选", "42"], ["验证", "18"], ["正式", "26"], ["图谱", "可用"]],
    modules: [["候选因子", "mart_factor_candidate", "从真实因子生成候选视图"], ["因子验证", "mart_factor_validation_result", "可计算性、IC、冗余度"], ["因子图谱", "mart_factor_graph", "依赖关系"], ["正式库", "mart_factor_registry", "已准入因子"]],
    steps: ["提出候选", "触发验证", "进入注册库", "持续监控"],
  },
  {
    match: /^\/biz\/factor-library\/candidates$/,
    title: "候选因子",
    family: "Factor Library",
    description: "对应真实候选因子列表，基于 mart_factor_snapshot 生成候选视图。",
    metrics: [["候选因子", "42"], ["待验证", "9"], ["通过", "26"], ["拒绝", "7"]],
    modules: [["候选因子列表", "mart_factor_candidate", "候选编号、类型、来源、状态"], ["最近验证", "mart_factor_validation_result", "最近 run id"], ["操作", "factor_candidate_actions", "查看、验证、新增"]],
    steps: ["筛选候选", "查看详情", "进入验证", "注册正式因子"],
  },
  {
    match: /^\/biz\/factor-library\/candidates\/new$/,
    title: "新增因子入口",
    family: "Factor Library",
    description: "对应真实新增候选因子表单，公开版只展示字段和提交流程，不写入后端。",
    metrics: [["状态", "draft"], ["字段", "12"], ["提交", "disabled"], ["安全", "mock"]],
    modules: [["基础信息", "candidate_form_meta", "名称、类型、来源"], ["表达式", "candidate_formula", "因子计算表达式"], ["处理方法", "candidate_preprocess", "去极值、中性化、标准化"], ["审计", "candidate_audit", "公开版不落库"]],
    steps: ["填写基础信息", "配置表达式", "设置预处理", "校验候选因子草稿"],
  },
  {
    match: /^\/biz\/factor-library\/candidates\/[^/]+$/,
    title: "候选因子详情",
    family: "Factor Library",
    description: "对应真实候选详情页，展示因子定义、数据检查、验证历史和准入路径。",
    metrics: [["候选 ID", "FAC_CAND_001"], ["状态", "验证中"], ["验证", "3 次"], ["结论", "观察"]],
    modules: [["真实因子定义", "mart_factor_candidate", "公式和口径"], ["数据检查", "mart_factor_quality_check", "覆盖率和空值"], ["验证历史", "mart_factor_validation_result", "历史 run"], ["正式库链路", "mart_factor_registry", "准入后写入"]],
    steps: ["真实因子定义", "数据检查", "有效性验证", "准入结论", "正式库"],
  },
  {
    match: /^\/biz\/factor-library\/validations$/,
    title: "因子准入验证",
    family: "Factor Library",
    description: "对应真实验证列表，输出可计算性、预测力、稳定性、冗余度和准入结论。",
    metrics: [["验证 Run", "18"], ["通过", "11"], ["观察", "4"], ["失败", "3"]],
    modules: [["验证列表", "mart_factor_validation_result", "历史样本、IC、RankIC"], ["分位收益", "mart_factor_bucket_return", "Top-Bottom Spread"], ["最大相关性", "mart_factor_corr", "冗余度检查"], ["准入结论", "factor_admission_rule", "ACCEPT / WATCH / REJECT"]],
    steps: ["读取候选因子", "历史回测", "稳定性检查", "输出准入结论"],
  },
  {
    match: /^\/biz\/factor-library\/validations\/[^/]+$/,
    title: "验证记录详情",
    family: "Factor Library",
    description: "对应真实验证详情页，展开单次 validation run 的指标和分桶图。",
    metrics: [["Run ID", "VAL_20260630_001"], ["IC Mean", "0.041"], ["Rank IC", "0.052"], ["结论", "ACCEPT"]],
    modules: [["Run 概览", "mart_factor_validation_result", "核心指标"], ["分桶收益", "mart_factor_bucket_return", "单调性"], ["相关性", "mart_factor_corr", "与已有因子最大相关"], ["审计日志", "factor_validation_audit", "运行参数"]],
    steps: ["加载 run", "查看核心指标", "检查分桶收益", "确认准入结论"],
  },
  {
    match: /^\/biz\/factor-library\/registry$/,
    title: "因子注册库",
    family: "Factor Library",
    description: "对应真实正式库列表，展示已准入因子的类型、来源候选和最近验证。",
    metrics: [["正式因子", "26"], ["价值", "7"], ["质量", "8"], ["动量", "6"]],
    modules: [["注册列表", "mart_factor_registry", "正式因子元数据"], ["验证历史", "mart_factor_validation_result", "最近监控"], ["来源候选", "mart_factor_candidate", "候选追踪"]],
    steps: ["筛选正式因子", "查看定义", "查看验证历史", "进入图谱"],
  },
  {
    match: /^\/biz\/factor-library\/registry\/[^/]+$/,
    title: "因子注册详情",
    family: "Factor Library",
    description: "对应真实注册因子详情，展示来源候选、因子分类、公式和验证历史。",
    metrics: [["Factor ID", "Q_VAL_001"], ["类型", "value"], ["最近 IC", "0.048"], ["监控", "PASS"]],
    modules: [["因子定义", "mart_factor_registry", "公式和口径"], ["来源候选", "mart_factor_candidate", "候选回溯"], ["验证历史", "mart_factor_validation_result", "准入与持续监控"]],
    steps: ["读取注册信息", "查看来源候选", "检查最近验证", "确认生产状态"],
  },
  {
    match: /^\/biz\/factor-library\/graph$/,
    title: "因子图谱",
    family: "Factor Library",
    description: "对应真实因子图谱页，展示候选、正式因子、数据源和验证 run 的关系。",
    metrics: [["节点", "86"], ["边", "142"], ["簇", "9"], ["异常", "0"]],
    modules: [["因子图", "mart_factor_graph", "节点和边"], ["依赖源", "mart_factor_source_lineage", "数据来源"], ["验证关系", "mart_factor_validation_edge", "run 与因子关系"]],
    steps: ["构建节点", "聚合边", "按类型着色", "聚焦候选或正式因子"],
  },
  {
    match: /^\/biz\/alpha-lab$/,
    title: "主动量化实验室",
    family: "Active Quant Lab",
    description: "真实入口会默认进入模型注册矩阵，公开版保留终端壳和全部 Alpha Lab 子页。",
    metrics: [["模型", "4"], ["信号", "128"], ["组合", "3"], ["状态", "running"]],
    modules: [["模型打分", "mart_alpha_score", "多因子模型注册"], ["最新信号", "mart_signal_latest", "实时截面信号"], ["模拟组合", "mart_target_portfolio", "组合和 NAV"], ["新闻情绪", "mart_news_entity", "舆情矩阵"]],
    steps: ["注册模型", "生成信号", "构建组合", "归因与优化", "跟踪新闻情绪"],
  },
  {
    match: /^\/biz\/alpha-lab\/models$/,
    title: "模型注册矩阵",
    family: "Active Quant Lab",
    description: "量化选股模型评测矩阵 (Alpha Models Registry)，展示模型编号、策略名称、覆盖率和 IC。",
    metrics: [["模型", "4"], ["Active", "2"], ["Shadow", "1"], ["Research", "1"]],
    modules: [["模型注册表", "mart_alpha_score", "模型评分"], ["模型元数据", "alpha_model_registry", "策略名称和权重"], ["归因入口", "qepm_attribution", "跳转归因中心"]],
    steps: ["读取模型注册表", "统计 active 模型", "查看模型评分", "进入归因中心"],
  },
  {
    match: /^\/biz\/alpha-lab\/signals$/,
    title: "实时信号终值",
    family: "Active Quant Lab",
    description: "实时截面信号交易簿，展示信号漏斗、候选股票池和买卖方向。",
    metrics: [["候选池", "512"], ["买入", "36"], ["卖出", "18"], ["过滤", "458"]],
    modules: [["最新信号", "mart_signal_latest", "模型终值"], ["信号漏斗", "mart_signal_funnel", "候选、过滤、目标"], ["交易簿", "signal_order_book", "买卖方向和权重"]],
    steps: ["选择模型", "读取信号", "应用过滤", "输出目标交易簿"],
  },
  {
    match: /^\/biz\/alpha-lab\/portfolio$/,
    title: "策略模拟组合",
    family: "Active Quant Lab",
    description: "组合构建与模拟回测页面，展示 NAV、IR、持仓热力、回撤区间和事件信号。",
    metrics: [["NAV", "1.086"], ["IR", "0.72"], ["回撤", "3.2%"], ["持仓", "36"]],
    modules: [["模拟组合", "mart_target_portfolio", "目标权重"], ["组合净值", "sim_nav", "NAV 和收益"], ["策略评估", "mart_strategy_eval", "IR 和回撤"], ["事件信号", "mart_alpha_event_signal", "调仓解释"]],
    steps: ["读取信号", "构建目标组合", "模拟 NAV", "归因和风险分析"],
  },
  {
    match: /^\/biz\/alpha-lab\/attribution$/,
    title: "归因中心",
    family: "Active Quant Lab",
    description: "QEPM 归因研究态页面，拆解执行归因、约束归因和组合收益来源。",
    metrics: [["归因日", market.businessDate], ["执行", "+0.18%"], ["约束", "-0.04%"], ["残差", "+0.02%"]],
    modules: [["执行归因", "qepm_execution_attribution", "成交和滑点"], ["约束归因", "qepm_constraint_attribution", "仓位约束影响"], ["组合净值", "sim_nav", "收益拆解"]],
    steps: ["选择策略", "读取 PnL", "分解执行/约束", "输出归因报告"],
  },
  {
    match: /^\/biz\/alpha-lab\/optimizer$/,
    title: "优化对照",
    family: "Active Quant Lab",
    description: "Shadow 组合优化对照页，比较当前组合与优化器输出的风险收益特征。",
    metrics: [["Shadow", "3"], ["换手", "18%"], ["风险预算", "OK"], ["提升", "+0.7%"]],
    modules: [["模拟组合", "mart_target_portfolio", "当前组合"], ["Shadow 优化", "shadow_optimizer_result", "优化权重"], ["约束检查", "optimizer_constraints", "行业、个股、换手约束"]],
    steps: ["选择策略", "生成 shadow 组合", "比较约束", "输出优化建议"],
  },
  {
    match: /^\/biz\/alpha-lab\/news$/,
    title: "舆情情绪矩阵",
    family: "Active Quant Lab",
    description: "新闻实体、去重和情绪矩阵，用于解释 Alpha 信号中的事件驱动部分。",
    metrics: [["新闻", "286"], ["实体", "94"], ["正面", "41%"], ["负面", "18%"]],
    modules: [["新闻去重", "mart_news_dedup", "去重新闻"], ["新闻实体", "mart_news_entity", "股票/行业实体"], ["情绪矩阵", "mart_news_sentiment", "情绪和强度"], ["信号联动", "mart_signal_news_link", "与 Alpha 信号关联"]],
    steps: ["去重新闻", "抽取实体", "计算情绪", "关联信号"],
  },
];

const ops = {
  overview: {
    system: "healthy",
    total: 128,
    success: 119,
    failed: 2,
    running: 3,
    warning: 4,
    sla: 97.4,
    alerts: [
      ["warning", "market_cleaned_incremental_job 延迟 8 分钟，已进入观察窗口"],
      ["info", "alpha_lab_shadow_optimizer 完成 mock 演练"],
      ["critical", "财报到数监控发现 2 个样例主体缺失三表"],
    ],
  },
  pageHealth: [
    ["市场总览", "/biz/market", "ok", "2026-06-30", 0, 10],
    ["指数研究", "/biz/index/000300.SH", "ok", "2026-06-30", 0, 6],
    ["宏观研究", "/biz/macro", "delayed", "2026-06-30", 1, 8],
    ["中观研究", "/biz/meso", "ok", "2026-06-30", 0, 7],
    ["个股研究", "/biz/stock", "partial", "2026-06-30", 2, 11],
    ["因子与策略库", "/biz/factors", "ok", "2026-06-30", 0, 9],
    ["因子库", "/biz/factor-library/candidates", "ok", "2026-06-30", 0, 12],
    ["主动量化", "/biz/alpha-lab/models", "ok", "2026-06-30", 0, 14],
  ],
  pageHealthDetail: {
    displayName: "个股研究",
    route: "/biz/stock/600519.SH",
    status: "partial",
    businessDate: "2026-06-30",
    lastCheckedAt: "2026-07-01 09:40:12",
    failingModules: [
      ["价格趋势", "mart_stock_price_trend_daily", "freshness", "部分样例标的等待下一批 mart 快照", "2026-06-29", "2026-06-30"],
      ["估值因子", "mart_stock_factor_exposure_daily", "row_count", "公开版用 mock 保留故障解释形状", "18", ">=20"],
    ],
    blockingJobs: [
      ["cleaned_stock_daily", "股票 cleaned 日线归一", "cleaned_stock_daily"],
      ["mart_stock_research_panel", "个股研究面板", "mart_stock_research_panel"],
    ],
    schedules: [
      ["价格趋势", "mart_stock_price_trend_daily", "09:35", "event", "cleaned_stock_daily", "2026-07-01 09:32", "42s"],
      ["估值因子", "mart_stock_factor_exposure_daily", "09:45", "due", "factor_snapshot_job", "2026-07-01 09:36", "1m"],
      ["财务概况", "mart_financial_report_summary", "21:00", "pending", "financial_reports_arrival", "2026-06-30 21:12", "3m"],
    ],
  },
  domains: [
    ["宏观", 96, "成功 24/25 · 失败 0 · 警告 1", "cleaned_macro_ifind_job"],
    ["行情", 99, "成功 31/31 · 失败 0 · 警告 0", ""],
    ["指数", 98, "成功 18/18 · 失败 0 · 警告 0", ""],
    ["基金", 95, "成功 19/20 · 失败 0 · 警告 1", "etf_flow_snapshot"],
    ["主动量化", 100, "成功 36/36 · 失败 0 · 警告 0", ""],
  ],
  keyPaths: [
    ["ODS", "success", "任务状态", "jobs 42", []],
    ["CLEANED", "running", "任务状态", "jobs 51", [["运行中", "股票 cleaned 日线归一", "等待行情源端批次结束"]]],
    ["MART", "warning", "新鲜度提示", "jobs 35", [["延迟", "个股研究面板", "部分样例标的落后 1 个业务日"], ["警告", "财报到数监控", "24 个主体等待下一批"]]],
  ],
  tasks: [
    ["market_ods_daily", "行情 ODS 增量", "ods", "success", "市场", "cron", "09:35", "42s"],
    ["cleaned_macro_ifind_job", "宏观 cleaned 归一", "cleaned", "running", "宏观", "依赖触发", "上游完成后", "8m"],
    ["mart_market_overview_daily", "市场总览 Mart 快照", "mart", "success", "市场", "依赖触发", "上游完成后", "1m"],
    ["mart_stock_research_panel", "个股研究面板", "mart", "failed", "股票", "依赖触发", "上游完成后", "2m"],
    ["alpha_lab_signal_latest", "主动量化信号终值", "mart", "success", "主动量化", "cron", "15:30", "55s"],
    ["financial_reports_arrival", "财报到数监控", "mart", "warning", "财报", "cron", "21:00", "3m"],
  ],
  queue: { pending: 0, blocked: 2, stale: 0, worker: "idle" },
};

const genericOps = {
  "/ops/financial-reports": ["财报到数监控", "跟踪三表、公告、解析和主体覆盖情况", ["应到主体 4302", "已到 4278", "缺失 24", "异常 2"]],
  "/ops/dag": ["DAG", "展示 ODS / CLEANED / MART 依赖拓扑和影响资产", ["节点 64", "边 92", "关键路径 7", "阻塞 2"]],
  "/ops/orchestrator": ["调度编排", "查看调度策略、级联重跑和 dry-run 结果", ["计划 38", "事件触发 21", "手动 5", "锁正常"]],
  "/ops/freshness": ["新鲜度", "按资产层和业务页检查数据日期", ["ODS 正常", "CLEANED 正常", "MART 1 延迟", "业务日 2026-06-30"]],
  "/ops/quality": ["质量", "断言规则、空值、主键和分布漂移监控", ["规则 186", "通过 181", "警告 3", "失败 2"]],
  "/ops/sla": ["SLA 监控", "按业务域统计发布窗口达成率", ["总体 97.4%", "市场 99.1%", "宏观 94.8%", "财报 92.0%"]],
  "/ops/alerts": ["告警中心", "当前 open 告警、处理状态和审计记录", ["open 3", "acked 1", "resolved 19", "升级 0"]],
  "/ops/performance": ["性能监控", "API 延迟、任务耗时和前端可用性", ["P95 128ms", "慢任务 2", "错误率 0.1%", "前端健康"]],
  "/ops/backups": ["生产备份", "Mac 计算、NAS 冷备的只读状态面板", ["周备份正常", "最新 2026-06-28", "ODS/Cleaned/Mart", "校验通过"]],
  "/ops/project-weekly-report": ["项目周报", "汇总本周发布、修复、风险和下周计划", ["已发布 7", "风险 2", "待验证 3", "草稿就绪"]],
  "/ops/assets": ["数据资产", "资产目录、层级、生产 job 和页面依赖", ["资产 214", "MART 73", "页面依赖 42", "owner 完整"]],
  "/ops/mcp": ["MCP 服务", "工具服务、健康探针和连接状态", ["服务 8", "在线 8", "慢响应 1", "凭据未暴露"]],
  "/ops/ai-runs": ["AI Runs", "AI 问答链路、检索事件和回答来源", ["今日 23", "成功 22", "fallback 1", "平均 4.2s"]],
  "/ops/user-logs": ["用户日志", "页面访问、点击和异常行为审计", ["PV 312", "UV 18", "错误 0", "导出关闭"]],
};

const opsDetails = {
  "/ops/financial-reports": {
    title: "财报到数监控",
    description: "跟踪三表、公告、解析和上市主体覆盖情况",
    metrics: [["上市主体", "4302"], ["利润表覆盖", "99.4%"], ["资产负债表", "99.1%"], ["现金流量表", "98.9%"]],
    sections: [
      ["采集阶段", ["阶段", "状态", "覆盖", "说明"], [["公告窗口", statusBadge("success"), "已关闭", "交易所公告拉取完成"], ["三表解析", statusBadge("warning"), "4278/4302", "24 个主体等待下一批"], ["mart 汇总", statusBadge("success"), "T+0", "财报到数快照已生成"]]],
      ["覆盖率趋势", ["日期", "利润表", "资产负债表", "现金流量表"], [["2026-06-30", "99.4%", "99.1%", "98.9%"], ["2026-06-29", "98.8%", "98.7%", "98.2%"]]],
    ],
  },
  "/ops/dag": {
    title: "DAG",
    description: "展示外部来源、贴源、清洗宽表、集市和功能页面之间的数据流",
    metrics: [["节点", "64"], ["依赖边", "92"], ["关键路径", "7"], ["阻塞", "2"]],
    sections: [
      ["DAG 层级", ["层级", "样例节点", "状态", "说明"], [["外部来源", "Tushare / iFinD / 新闻源", statusBadge("success"), "公开版只展示来源名"], ["贴源数据", "ods_ts_daily", statusBadge("success"), "采集快照"], ["清洗宽表", "cleaned_stock_daily", statusBadge("running"), "依赖上游"], ["功能页面", "市场总览 / 主动量化", statusBadge("success"), "页面健康联动"]]],
      ["页面映射", ["mart 表", "页面", "健康", "影响"], [["mart_market_overview_daily", "市场总览", statusBadge("success"), "市场状态和 AI 感知"], ["mart_signal_latest", "主动量化", statusBadge("success"), "实时信号终值"], ["mart_stock_research_panel", "个股研究", statusBadge("warning"), "详情页部分延迟"]]],
    ],
  },
  "/ops/orchestrator": {
    title: "调度编排",
    description: "Orchestrator dry-run preview：展示 DAG、资源锁、retry 与 timeout 元数据，不入队、不执行任务。",
    metrics: [["DAG 节点", "64"], ["依赖边", "92"], ["资源锁", "5"], ["Retry 队列", "2"]],
    sections: [
      ["Dry-run 状态", ["root", "mode", "mutates_runtime", "说明"], [["mart_market_overview_daily", "incremental", "false", "只预览不写入"], ["alpha_lab_signal_latest", "incremental", "false", "验证资源锁和 timeout"]]],
      ["DAG 进度预览", ["Order", "Job", "Upstream", "Target tables", "Retry"], [["01", "market_ods_daily", "-", "ods_ts_daily", "0/2"], ["02", "cleaned_market_job", "market_ods_daily", "cleaned_market_daily", "0/2"], ["03", "mart_market_overview_daily", "cleaned_market_job", "mart_market_overview_daily", "1/3"]]],
    ],
  },
  "/ops/freshness": {
    title: "新鲜度",
    description: "按资产层和业务页检查数据日期、滞后原因与末层 mart 影响",
    metrics: [["正常", "42"], ["延迟", "3"], ["缺失", "1"], ["业务日", "2026-06-30"]],
    sections: [
      ["新鲜度明细", ["资产", "层级", "状态", "末层影响", "原因"], [["mart_market_overview_daily", "mart", statusBadge("success"), "市场总览", "已到最新业务日"], ["mart_macro_indicator_panel", "mart", statusBadge("warning"), "宏观研究", "源端发布时间未到"], ["mart_stock_research_panel", "mart", statusBadge("warning"), "个股研究", "上游 cleaned 延迟"]]],
      ["页面影响", ["页面", "状态", "业务日", "提示"], [["市场总览", statusBadge("success"), "2026-06-30", "可用"], ["宏观研究", statusBadge("warning"), "2026-06-30", "部分指标等待发布"], ["个股研究", statusBadge("partial"), "2026-06-30", "少量标的延迟"]]],
    ],
  },
  "/ops/quality": {
    title: "质量",
    description: "断言规则、空值、主键、日期范围和分布漂移监控",
    metrics: [["规则", "186"], ["通过", "181"], ["警告", "3"], ["失败", "2"]],
    sections: [
      ["规则分布", ["规则类型", "数量", "通过率", "说明"], [["主键唯一性检查", "42", "100%", "keys 唯一"], ["关键字段非空检查", "58", "99.2%", "少量样本为空"], ["指标范围检查", "63", "97.8%", "极值待确认"], ["日期范围与时效检查", "23", "95.7%", "源端滞后"]]],
      ["异常样本", ["表", "规则", "结果", "样例"], [["mart_stock_research_panel", "指标范围检查（ROE）", statusBadge("warning"), "2 个样本超阈值"], ["mart_financial_report_arrival", "行数下限检查", statusBadge("failed"), "缺少 24 个主体"], ["mart_macro_indicator_panel", "日期范围检查", statusBadge("warning"), "等待月度发布"]]],
    ],
  },
  "/ops/sla": {
    title: "SLA 监控",
    description: "监控核心任务和关键链路是否按时完成",
    metrics: [["今日 SLA 达成率", "97.4%"], ["今日逾期任务", "2"], ["今日准点任务", "119"], ["评估时间", "09:40"]],
    sections: [
      ["7 天 SLA 趋势", ["日期", "达成率", "逾期", "准点"], [["06-24", "96.1%", "4", "116"], ["06-26", "98.2%", "1", "121"], ["06-30", "97.4%", "2", "119"]]],
      ["逾期明细", ["任务", "run_id", "SLA(分钟)", "截止时间", "完成时间", "逾期(分钟)"], [["cleaned_macro_ifind_job", "run_mock_001", "30", "09:30", "09:38", "8"], ["financial_reports_arrival", "run_mock_002", "60", "21:00", "21:12", "12"]]],
    ],
  },
  "/ops/alerts": {
    title: "告警中心",
    description: "当前 open 告警、确认状态、影响页面和处理审计",
    metrics: [["open", "3"], ["acked", "1"], ["resolved", "19"], ["升级", "0"]],
    sections: [
      ["告警列表", ["级别", "对象", "状态", "摘要"], [["warning", "cleaned_macro_ifind_job", statusBadge("warning"), "延迟 8 分钟"], ["critical", "financial_reports_arrival", statusBadge("failed"), "24 个主体缺失三表"], ["info", "alpha_lab_shadow_optimizer", statusBadge("success"), "mock 演练完成"]]],
      ["处理审计", ["时间", "操作", "用户", "备注"], [["09:20", "ack", "demo-admin", "观察下一批次"], ["09:32", "rerun-preview", "demo-admin", "未实际入队"], ["09:40", "resolve", "system", "mock 状态恢复"]]],
    ],
  },
  "/ops/performance": {
    title: "性能监控",
    description: "API 延迟、任务耗时、前端可用性和慢查询分布",
    metrics: [["API P95", "128ms"], ["慢任务", "2"], ["错误率", "0.1%"], ["前端健康", "OK"]],
    sections: [
      ["接口性能", ["接口", "P50", "P95", "错误率"], [["/api/biz/market/overview", "42ms", "96ms", "0%"], ["/api/ops/page-health", "58ms", "128ms", "0.1%"], ["/api/biz/ai/ask", "mock", "mock", "0%"]]],
      ["任务耗时", ["任务", "最近耗时", "基线", "状态"], [["mart_market_overview_daily", "1m", "1m", statusBadge("success")], ["cleaned_macro_ifind_job", "8m", "5m", statusBadge("warning")], ["financial_reports_arrival", "12m", "10m", statusBadge("warning")]]],
    ],
  },
  "/ops/backups": {
    title: "生产备份",
    description: "真实备份页面结构的公开 mock 面板，展示策略、冷备目标与脱敏状态",
    metrics: [["备份状态", "mock 正常"], ["raw 文件数", "128k mock"], ["最新备份快照", "426 MB mock"], ["mock 磁盘余量", "312 GB"]],
    sections: [
      ["备份对象 mock 面", ["对象", "类型", "状态", "体积", "文件数", "路径"], [["控制面快照", "mock dump", statusBadge("success"), "426 MB", "1", "mock/backup/control"], ["业务数据层快照", "ODS/Cleaned/Mart mock", statusBadge("success"), "38 GB", "12", "mock/backup/business"], ["raw mirror", "ODS raw mock", statusBadge("success"), "1.8 TB", "128k", "mock/backup/raw"]]],
      ["备份策略", ["策略", "值", "说明"], [["周备份", "周日 07:40", "公开 mock 时间窗"], ["备份内容", "control + business + raw mock", "控制面和业务数据层结构"], ["队列保护", "忙时跳过", "只展示策略形状"], ["一致性", "先停 worker", "公开版不执行真实操作"]]],
    ],
  },
  "/ops/project-weekly-report": {
    title: "项目周报",
    description: "汇总本周发布、修复、风险和下周计划",
    metrics: [["已发布", "7"], ["风险", "2"], ["待验证", "3"], ["草稿", "就绪"]],
    sections: [
      ["周报摘要", ["栏目", "内容", "状态", "说明"], [["本周发布", "AI voice / ops jobs / alpha lab", statusBadge("success"), "mock 汇总"], ["风险", "数据窗口和外部接口", statusBadge("warning"), "需要持续监控"], ["下周计划", "路由 parity 和公开 demo", statusBadge("running"), "持续推进"]]],
      ["证据清单", ["证据", "路径", "状态"], [["路由审计", "frontend/route-parity.json", statusBadge("success")], ["测试", "pytest / secret_scan", statusBadge("success")], ["浏览器 smoke", "47 routes", statusBadge("success")]]],
    ],
  },
  "/ops/assets": {
    title: "数据资产产出监控",
    description: "追踪最终投研数据资产可用性与质量状态",
    metrics: [["核心资产可用率", "97.8%"], ["异常资产", "3"], ["受影响看板", "2"], ["依赖任务", "42"]],
    sections: [
      ["数据资产明细", ["资产名称", "类型", "主题域", "依赖任务", "最新日期", "是否可用"], [["mart_market_overview_daily", "指标宽表", "市场", "mart_market_overview_daily", "2026-06-30", statusBadge("success")], ["mart_stock_research_panel", "指标宽表", "股票", "mart_stock_research_panel", "2026-06-30", statusBadge("warning")], ["mart_macro_indicator_panel", "指标宽表", "宏观", "cleaned_macro_ifind_job", "2026-06-30", statusBadge("warning")]]],
      ["根因分析", ["受影响资产", "失败依赖任务", "影响页面", "动作"], [["mart_stock_research_panel", "cleaned_stock_daily", "个股研究", "确认告警 / 预览重跑"], ["mart_macro_indicator_panel", "cleaned_macro_ifind_job", "宏观研究", "等待发布窗口"]]],
    ],
  },
  "/ops/mcp": {
    title: "MCP 服务清单",
    description: "查看已注册工具、白名单暴露范围与最近调用健康度",
    metrics: [["已注册工具", "8"], ["24h 调用", "126"], ["24h 成功率", "99.2%"], ["最慢 p95", "420ms"]],
    sections: [
      ["工具注册态", ["Tool", "说明", "输入摘要", "24h 调用", "成功率", "p95"], [["wiki.search", "知识库检索", "query, limit", "42", "100%", "180ms"], ["market.snapshot", "市场快照", "date, symbols", "35", "100%", "96ms"], ["ai.run_trace", "AI run 追踪", "run_id", "18", "98%", "420ms"]]],
      ["最近调用", ["时间", "Tool", "结果", "质量", "耗时", "Caller"], [["09:31", "wiki.search", statusBadge("success"), "完整", "120ms", "biz.ai"], ["09:32", "market.snapshot", statusBadge("success"), "完整", "88ms", "biz.market"], ["09:34", "ai.run_trace", statusBadge("warning"), "部分", "420ms", "ops.ai-runs"]]],
    ],
  },
  "/ops/ai-runs": {
    title: "AI 投研 Runs",
    description: "复核 planner、工具、wiki、合成与打分链路",
    metrics: [["Runs", "23"], ["Coverage", "4.5"], ["Grounding", "4.3"], ["Fallback", "4.3%"], ["Wiki 命中", "82.0%"], ["待复核", "2"]],
    sections: [
      ["Plan 形状分布", ["形状", "数量", "说明"], [["双路 · deep", "8", "结构化 + 研判"], ["单路 · normal", "12", "结构化直答"], ["fallback", "1", "mock 降级"]]],
      ["Run 列表", ["时间", "模型", "耗时", "问题", "Plan", "工具", "文章"], [["09:20", "Smart · deepseek-v4-flash", "4.2s", "今天市场怎么样", "双路 · deep", "3", "2"], ["09:28", "Balanced · mock", "2.1s", "宏观状态如何", "单路 · normal", "2", "0"], ["09:36", "Fast · fallback", "1.2s", "解释个股风险", "fallback", "0", "0"]]],
    ],
  },
  "/ops/user-logs": {
    title: "用户日志",
    description: "查看登录、权限拒绝、页面访问与核心点击行为",
    metrics: [["PV", "312"], ["UV", "18"], ["点击", "64"], ["Auth", "9"]],
    sections: [
      ["活动趋势", ["时间", "访问", "用户", "主要页面"], [["09:00", "42", "8", "/biz/market"], ["10:00", "51", "9", "/ops/jobs"], ["11:00", "33", "7", "/biz/alpha-lab/models"]]],
      ["日志列表", ["时间", "用户", "角色", "事件", "页面", "Payload"], [["09:12", "hello", "admin", "login_success", "/login", "{}"], ["09:14", "hello", "admin", "page_view", "/ops/overview", "{\"demo\":true}"], ["09:18", "hello", "admin", "click", "/ops/jobs", "{\"target\":\"refresh\"}"]]],
    ],
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getPath() {
  return window.location.pathname === "/" ? "/login" : window.location.pathname;
}

function isAuthed() {
  return Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY));
}

function applyStoredTheme() {
  const theme = window.localStorage.getItem("alpha-lab-theme");
  document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
}

function navigate(path) {
  rememberStockRoute(path);
  window.history.pushState({}, "", path);
  render();
}

function rememberStockRoute(path) {
  if (path.startsWith("/biz/stock/")) {
    window.localStorage.setItem(LAST_STOCK_ROUTE_KEY, path);
  }
}

function getStockTabHref(activePath) {
  if (activePath.startsWith("/biz/stock/")) return activePath;
  const saved = window.localStorage.getItem(LAST_STOCK_ROUTE_KEY);
  return saved && saved.startsWith("/biz/stock/") ? saved : "/biz/stock";
}

function isBizTabActive(activePath, href) {
  if (href === "/biz/market") return activePath === "/biz/market" || activePath.startsWith("/biz/market/");
  if (href === "/biz/stock") return activePath === "/biz/stock" || activePath.startsWith("/biz/stock/");
  if (href === "/biz/factor-library/candidates") return activePath.startsWith("/biz/factor-library/");
  if (href === "/biz/alpha-lab/models") return activePath.startsWith("/biz/alpha-lab/");
  if (href === "/biz/index/000300.SH") return activePath.startsWith("/biz/index/");
  return activePath === href || activePath.startsWith(`${href}/`);
}

function pct(value) {
  const cls = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const sign = value > 0 ? "+" : "";
  return `<span class="${cls}">${sign}${value.toFixed(2)}%</span>`;
}

function statusBadge(value) {
  const labels = { ok: "可用", partial: "部分可用", delayed: "延迟", success: "正常", failed: "失败", running: "运行中", warning: "警告", healthy: "正常" };
  return `<span class="badge ${value}">${labels[value] || value}</span>`;
}

function metric(label, value, detail = "") {
  return `<div class="metric-card"><div class="metric-label">${label}</div><div class="metric-value">${value}</div>${detail ? `<div class="metric-detail">${detail}</div>` : ""}</div>`;
}

function iconSlot(icon, label = "") {
  const glyphs = {
    search: "SE",
    dashboard: "DB",
    monitoring: "MO",
    finance_mode: "FI",
    account_tree: "DG",
    hub: "HB",
    update: "UP",
    verified_user: "QA",
    timer: "SL",
    notifications_active: "AL",
    speed: "PF",
    backup: "BK",
    summarize: "RP",
    inventory_2: "AS",
    extension: "MC",
    memory: "AI",
    manage_search: "LG",
    warning: "!",
    insights: "BI",
    settings: "ST",
    palette: "TH",
    light_mode: "LI",
    dark_mode: "DA",
    account_circle: "AC",
    logout: "LO",
    analytics: "AN",
    check_circle: "OK",
    error: "ER",
    autorenew: "RN",
    percent: "%",
  };
  const glyph = glyphs[icon] || icon.slice(0, 2).toUpperCase();
  return `<span class="icon-slot" aria-hidden="true" title="${escapeHtml(label || icon)}" data-glyph="${escapeHtml(glyph)}"></span>`;
}

function opsMetric(label, value, icon, detail = "", tone = "blue") {
  return `<div class="metric-card ops-metric ${tone}">
    <div class="metric-top"><div class="metric-label">${label}</div>${iconSlot(icon, label)}</div>
    <div class="metric-value">${value}</div>
    ${detail ? `<div class="metric-detail">${detail}</div>` : ""}
  </div>`;
}

function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function currentRoute(path) {
  return bizRoutes.find((route) => route.match.test(path)) || null;
}

function routeModuleTable(route) {
  return table(
    ["模块", "公开 mock 表", "状态", "说明"],
    route.modules.map(([name, source, desc]) => [name, `<code>${source}</code>`, statusBadge(source.includes("mock") ? "warning" : "success"), desc]),
  );
}

function routeMetrics(route) {
  return `<div class="route-metrics">${route.metrics.map(([label, value]) => metric(label, value)).join("")}</div>`;
}

function routeSteps(route) {
  return `<div class="workflow-steps">${route.steps.map((step, index) => `<div><b>${String(index + 1).padStart(2, "0")}</b><span>${step}</span></div>`).join("")}</div>`;
}

function factorLibraryTabs(activePath) {
  const tabs = [
    ["候选因子", "/biz/factor-library/candidates"],
    ["因子验证", "/biz/factor-library/validations"],
    ["正式因子库", "/biz/factor-library/registry"],
    ["因子图谱", "/biz/factor-library/graph"],
  ];
  return `<div class="factor-tabs">${tabs.map(([label, href]) => `<a href="${href}" data-link class="${activePath.startsWith(href) ? "active" : ""}">${label}</a>`).join("")}</div>`;
}

function factorLibraryShell(path, route, actions, body, backHref = "", backLabel = "返回列表") {
  const back = backHref ? `<a class="factor-back" href="${backHref}" data-link><span>‹</span>${backLabel}</a>` : "";
  return `
    <section class="factor-shell">
      <header class="factor-head">
        <div>
          <div class="factor-crumb"><a href="/biz/market" data-link>球球投研</a><span>/</span><span>因子库</span></div>
          ${back}
          <h1>${route.title}</h1>
          <p>${route.description}</p>
        </div>
        <div class="factor-actions">${actions || ""}</div>
      </header>
      ${factorLibraryTabs(path)}
      <div class="module-guard"><b>页面健康</b><span>mock factor_library · 当前模块可用 · 不读取真实数据库</span></div>
      ${body}
    </section>`;
}

function renderFactorNewForm(route) {
  const guards = [
    ["CandidateNewPage", "新增候选因子表单", "candidate_form_meta", "正常", "基础信息、类型、方向、频率"],
    ["createFactorCandidate", "新增候选因子动作", "factor_candidate_actions", "mock", "公开版禁用提交，不写入后端"],
    ["IndicatorParser", "基础指标解析", "candidate_formula", "mock", "公式与指标字段预览"],
    ["ValidationPreview", "验证任务预览", "factor_validation_job", "正常", "准入验证参数形状"],
  ];
  const body = `
    <section class="factor-card factor-module-guard-grid"><div class="factor-card-head"><h2>组件级更新护栏</h2><p>CandidateNewPage · createFactorCandidate parity · public mock</p></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
    <section class="factor-card">
      <div class="factor-card-head"><h2>新增候选因子</h2><p>公开版展示真实表单结构，保存按钮禁用，不写入后端。</p></div>
      <div class="factor-form">
        <label>因子名称<input value="盈利修复因子" placeholder="例如：盈利修复因子" /></label>
        <label>来源标题<input value="人工新增候选因子" /></label>
        <label>类型<select><option>质量</option><option>估值</option><option>动量</option><option>成长</option><option>情绪/关注度</option><option>其他</option></select></label>
        <label>子类型<input value="盈利质量" /></label>
        <label>股票池<select><option>全 A</option><option>沪深300</option><option>中证500</option><option>中证1000</option></select></label>
        <label>调仓频率<select><option>月度</option><option>周度</option><option>日度</option><option>季度</option></select></label>
        <label>方向<select><option>越大越好</option><option>越小越好</option><option>绝对值越大越好</option></select></label>
        <label>基础指标<textarea>ROE
GROSS_MARGIN
OCF_TO_NP</textarea></label>
        <label class="span-2">公式<textarea>mean(rank(ROE), rank(GROSS_MARGIN), rank(OCF_TO_NP)) - rank(DEBT_ASSET_RATIO)</textarea></label>
        <label class="span-2">投资假设<textarea>盈利质量改善且估值未充分反映时，未来一段时间具备超额收益。</textarea></label>
        <label class="span-2">经济解释<textarea>公开 demo 只保留字段和流程，不落库、不调用真实校验任务。</textarea></label>
      </div>
      <div class="factor-new-preview">
        <section><h3>基础指标解析</h3>${table(["indicator_code", "data_table", "data_field"], [["ROE", "mart_factor_snapshot", "roe_ttm"], ["GROSS_MARGIN", "mart_factor_snapshot", "gross_margin"], ["OCF_TO_NP", "mart_financial_quality", "ocf_to_np"], ["DEBT_ASSET_RATIO", "mart_balance_sheet", "debt_asset_ratio"]])}</section>
        <section><h3>验证任务预览</h3>${table(["参数", "值"], [["validation_type", "ADMISSION"], ["history_window", "2019-01 ~ 2026-06"], ["neutralization_method", "行业 + 市值"], ["winsorization_method", "MAD 3x"], ["standardization_method", "zscore"]])}</section>
      </div>
      <div class="factor-form-message">请至少填写因子名称、公式、投资假设和基础指标。公开版不会提交到后端。</div>
      <div class="factor-form-actions"><button disabled>保存候选因子</button><a href="/biz/factor-library/candidates" data-link>返回真实因子列表</a></div>
    </section>`;
  return factorLibraryShell("/biz/factor-library/candidates/new", route, "", body, "/biz/factor-library/candidates", "返回候选因子");
}

function renderRoutePage(path, route) {
  const factorTabs = route.family === "Factor Library" ? factorLibraryTabs(path) : "";
  const rows = route.modules.map(([name, source, desc], index) => [
    `<b>${name}</b><br><small>${route.family}</small>`,
    `<code>${source}</code>`,
    index === 0 ? "2026-06-30" : "mock",
    desc,
  ]);
  return `
    <section class="route-hero">
      <div>
        <p>${route.family}</p>
        <h1>${route.title}</h1>
        <span>${route.description}</span>
      </div>
      ${routeMetrics(route)}
    </section>
    ${factorTabs}
    <div class="biz-grid">
      <section class="card span-8"><h2>页面模块</h2>${routeModuleTable(route)}</section>
      <section class="card span-4"><h2>工作流</h2>${routeSteps(route)}</section>
      <section class="card span-8"><h2>数据快照</h2>${table(["对象", "来源", "业务日", "说明"], rows)}</section>
      <section class="card span-4"><h2>公开边界</h2>${["只使用 mock 数据", "不读取真实数据库", "不包含真实凭据", "不暴露内网部署路径"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
    </div>`;
}

function renderAiWorkbench(path, route) {
  const lanes = [
    ["任务拆解智能体", "planner", "识别问题意图：市场复盘 + 行业轮动 + 个股风险", "done"],
    ["数智智能体", "structured_agent", "读取市场、宏观、个股、因子 mock 快照", "running"],
    ["研判智能体", "research_agent", "整理新闻、wiki 和来源说明", "done"],
    ["回答合成器", "answer_synthesizer", "合并数值证据、研判路径和来源", "queued"],
  ];
  const components = [
    ["metric_grid", "市场状态指标", "主力净流入 +42.6亿 / 情绪 68 / 估值中性"],
    ["table", "行业轮动证据", "AI 算力、创新药领先；半导体拥挤观察"],
    ["line_chart", "宽基趋势", "沪深300 1Y mock trend"],
    ["ranked_list", "今日关注", "深挖 / 观察 / 风险信号"],
  ];
  const sources = [
    ["mart_market_overview_daily", "市场总览日报", "2026-06-30"],
    ["mart_industry_rotation_daily", "行业轮动信号", "2026-06-30"],
    ["mart_stock_research_panel", "个股研究面板", "2026-06-30"],
    ["mock_wiki_retrieval", "非结构化研判来源", "public"],
  ];
  const trace = [
    ["Wake", "球球 / OK Jarvis", "唤醒态识别，本地 mock residue strip", "done"],
    ["ASR", "qwen3-asr-flash-realtime", "mock 流式识别，最终转写不出网", "done"],
    ["Planner", "structured + unstructured", "双路 planner 拆出市场、行业、个股、风险", "running"],
    ["Tools", "market.snapshot / wiki.search", "工具参数脱敏，只展示 schema 摘要", "queued"],
    ["Synthesis", "component composer", "组装 metric_grid/table/chart/evidence_card", "queued"],
  ];
  const componentGuards = [
    ["AiResearchPage", "主工作台", "wake / activating / ready / answering", "正常", "保持真实页面的唤醒、输入、答案和侧栏结构"],
    ["CyberModelSelector", "运行档位", "fast / balanced / smart", "正常", "Fast、Balanced、Smart 三档和真实页面一致"],
    ["AiComponentRenderer", "组件化回答", "metric_grid / table / gauge / evidence_card", "mock", "仅渲染公开 mock specs，不调用真实模型"],
    ["aiFetch + stream events", "双路智能体", "planner / tools / synthesis", "mock", "展示事件形状和阶段状态，参数脱敏"],
    ["Voice state machine", "语音控制", "ASR / TTS / local command", "mock", "展示 qwen ASR 与 TTS 状态，不上传真实音频"],
    ["OpsAiRuns link", "质量追踪", "coverage / grounding / human tags", "正常", "对应 /ops/ai-runs 的复核链路"],
  ];
  return `
    <section class="ai-research-console">
      <div class="ai-research-main">
        <section class="ai-wake-strip">
          ${[["Wake screen", "等待唤醒", "球球 / OK Jarvis"], ["Activation", "激活中", "mecha warmup 720ms"], ["Active", "可问答", "typed + voice"], ["Auto listen", "可暂停", "VAD silence 2.8s"]].map(([k, v, d], index) => `<div class="${index === 2 ? "active" : ""}"><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}
        </section>
        <section class="ai-query-stage">
          <div class="ai-query-brand">
            <p>${route.family}</p>
            <h1>${route.title}</h1>
            <span>${route.description}</span>
          </div>
          <div class="ai-wave-area">
            <div class="ai-wave-line">${Array.from({ length: 46 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
            <div class="voice-orb large">AI</div>
            <div class="voice-state"><b>READY</b><span>唤醒词：球球 · ASR/TTS 均为 mock</span></div>
          </div>
          <form class="ai-ask-console">
            <input value="今天市场怎么样？顺便看一下 AI 算力和贵州茅台。" aria-label="AI mock question" />
            <button type="button">ASK</button>
            <button type="button" class="mic">MIC</button>
          </form>
        </section>

        <section class="ai-answer-card">
          <div class="module-head"><h2>回答草稿</h2><span>answer_stream · mock</span></div>
          <p class="insight">公开版 mock 回答：当前示例市场处于震荡偏强，风险偏好修复但尚未过热；行业轮动由红利防御切向 AI 算力、创新药和高端制造。个股层面，贵州茅台质量稳定、估值中性偏低，短期弹性弱于成长板块。本回答只演示结构，不构成投资建议。</p>
          <div class="ai-component-grid">${components.map(([type, title, desc]) => `<div><b>${type}</b><span>${title}</span><em>${desc}</em></div>`).join("")}</div>
        </section>

        <section class="ai-answer-card">
          <div class="module-head"><h2>组件化回答预览</h2><span>AiComponentRenderer · mock specs</span></div>
          <div class="ai-renderer-grid">
            <div><h3>市场温度 Gauge</h3><div class="ai-gauge"><span style="--rot:42deg"></span><b>68</b><em>风险偏好修复</em></div></div>
            <div><h3>行业热力 Heatmap</h3><div class="ai-mini-heatmap">${["AI 算力", "创新药", "半导体", "红利", "地产链", "港股"].map((x, i) => `<span class="h${i}">${x}</span>`).join("")}</div></div>
            <div><h3>证据卡</h3>${["市场成交扩散", "资金分位抬升", "估值未极端", "拥挤度观察"].map((x) => `<p class="ai-evidence-card">${x}</p>`).join("")}</div>
          </div>
        </section>

        <section class="ai-answer-card ai-module-guard-grid">
          <div class="module-head"><h2>组件级更新护栏</h2><span>AiResearchPage parity · public mock</span></div>
          ${componentGuards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}
        </section>

        <section class="ai-answer-card ai-contract-panel">
          <div class="module-head"><h2>能力契约与阶段详情</h2><span>AiResearchPage runtime contract · mock</span></div>
          <div class="ai-contract-grid">
            ${[["唤醒与控制", "wake / activating / ready / answering", "唤醒词、按钮和本地控制指令"], ["ASR 输入", "qwen stream shape", "只展示流式状态，不上传真实音频"], ["Planner", "lanes + depth + route", "选择结构化、研判和合成通道"], ["工具白名单", "market.snapshot / wiki.search / stock.panel", "参数只展示 schema 摘要"], ["组件渲染", "metric_grid / table / gauge / evidence_card", "由 AiComponentRenderer mock specs 驱动"], ["质量追踪", "coverage / grounding / human tags", "对应 ops/ai-runs 复核链路"]].map(([title, code, desc]) => `<div><b>${title}</b><code>${code}</code><span>${desc}</span></div>`).join("")}
          </div>
          <div class="ai-stage-detail-grid">
            ${[["StageItem", "kind / lane / label / detail / done", "对应真实 stream event 列表"], ["LaneAnswers", "structured / unstructured / synthesis", "双路答案聚合"], ["VoiceStatus", "idle / preparing / speaking / unsupported / error", "语音状态机"], ["RuntimeTier", "fast / balanced / smart", "与右侧运行档位一致"]].map(([name, fields, desc]) => `<div><b>${name}</b><span>${fields}</span><em>${desc}</em></div>`).join("")}
          </div>
        </section>

        <section class="ai-agent-trace">
          <div class="module-head"><h2>智能体运行轨迹</h2><span>stream events · planner / structured / research / synthesizer</span></div>
          <div class="ai-lane-grid">${lanes.map(([name, code, desc, state], index) => `<div class="${state}"><header><b>${name}</b>${statusBadge(state === "running" ? "running" : state === "queued" ? "warning" : "success")}</header><code>${code}</code><span>${desc}</span><em>phase ${index + 1}/${lanes.length}</em></div>`).join("")}</div>
          <div class="ai-trace-timeline">${trace.map(([stage, label, desc, state]) => `<div class="${state}"><b>${stage}</b><span>${label}</span><em>${desc}</em></div>`).join("")}</div>
        </section>
      </div>

      <aside class="ai-research-side">
        <section class="ai-runtime-card">
          <h2>运行档位</h2>
          <div class="runtime-slider">
            ${["Fast", "Balanced", "Smart"].map((label, index) => `<button class="${index === 2 ? "active" : ""}"><b>${label}</b><span>${index === 0 ? "V4 Flash 云端" : index === 1 ? "GPT-5.5 普通" : "GPT-5.5 快速"}</span></button>`).join("")}
          </div>
          <div class="ai-runtime-meta">${[["Response", "stream"], ["Tools", "4 enabled"], ["Voice", "edge/browser fallback"], ["Config", "mock only"]].map(([k, v]) => `<span><b>${k}</b>${v}</span>`).join("")}</div>
          ${routeMetrics(route)}
        </section>
        <section class="ai-runtime-card">
          <h2>来源说明</h2>
          ${table(["来源", "模块", "业务日"], sources)}
        </section>
        <section class="ai-runtime-card">
          <h2>语音与会话</h2>
          <div class="ai-session-kv">${[["Session", "mock-session"], ["ASR", "qwen3-asr mock"], ["TTS", "zh-CN mock voice"], ["Phase", "ready"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
        </section>
        <section class="ai-runtime-card">
          <h2>公开边界</h2>
          ${["不调用真实模型或语音服务", "不包含真实凭据", "不读取真实数据库", "不暴露供应商账号"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}
        </section>
      </aside>
    </section>`;
}

function renderAiHeroDemo(route) {
  return `
    <section class="ai-hero-demo-public">
      <div class="hero-demo-bg">
        <div class="hero-demo-layer idle"></div>
        <div class="hero-demo-layer arming"></div>
        <div class="hero-demo-layer online"></div>
      </div>
      <header class="hero-demo-topbar">
        <div class="hero-demo-brand"><span></span><b>QIUQIU AI RESEARCH</b></div>
        <button>激活</button>
      </header>
      <div class="hero-demo-copy">
        <h1>${route.title}</h1>
        <h2>球球投研</h2>
        <div class="hero-state-row"><span></span><b>STANDBY / ACTIVATING / ONLINE</b></div>
        <p>${route.description}</p>
      </div>
      <aside class="hero-demo-console">
        <div><b>Phase</b><span>idle → arming → online</span></div>
        <div><b>Assets</b><span>ai-hero-bg-1 / 2 / 3 · CSS public fallback</span></div>
        <div><b>Reduced motion</b><span>prefers-reduced-motion → online</span></div>
        <div><b>Runtime</b><span>MechaHeroDemoPage mock visual state only</span></div>
        <div><b>Boundary</b><span>不调用真实模型 · 不包含真实凭据</span></div>
      </aside>
    </section>`;
}

function renderAiMechaSketch(route) {
  return `
    <section class="ai-static-mecha-public">
      <button class="mecha-activate">激活</button>
      <div class="mecha-viewport">
        <div class="mecha-frame">
          <div class="mecha-head"></div>
          <div class="mecha-eye left"></div>
          <div class="mecha-eye right"></div>
          <div class="mecha-core"></div>
          <div class="mecha-arm left"></div>
          <div class="mecha-arm right"></div>
        </div>
      </div>
      <div class="mecha-center">
        <h1>${route.title}</h1>
        <h2>球球投研</h2>
        <div class="mecha-wave">${Array.from({ length: 5 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}</div>
        <p>持续聆听中 · 点击激活后进入已激活状态</p>
        <em>${route.description} 公开版使用 CSS 机甲视觉层，不加载真实素材、不调用真实服务。</em>
      </div>
      <div class="mecha-boundary">${["MechaSketchPage parity", "ai-mecha-test-bg public fallback", "静态视觉 mock", "不请求后端模型", "不包含真实凭据", "不读取真实数据库"].map((item) => `<span>${item}</span>`).join("")}</div>
    </section>`;
}

function renderIndexResearch(route) {
  const valuationRows = [["PE(TTM)", "12.43", 42], ["PB(LF)", "1.42", 38], ["股息率", "2.31%", 68]];
  const pctBar = (value) => `<div class="mini-percentile"><span style="width:${value}%"></span><b>${value}%</b></div>`;
  const moduleGuards = [
    ["IndexHeader", "指数研究快照", "mart_index_research_daily", "正常", "名称、代码、收盘价、成交额、估值标签"],
    ["IndexAISummary", "指数研究快照", "mart_index_research_daily", "正常", "摘要只使用 mock 行情和成分证据"],
    ["IndexPriceChart", "指数表现", "mart_index_performance", "正常", "1m / 3m / 1Y / 3Y / 5Y 区间"],
    ["IndexIndustryBreakdown", "行业分布", "mart_index_research_daily", "正常", "今日、5D、20D 权重和贡献"],
    ["IndexFinancialTrends", "指数财务汇总", "mart_index_research_daily", "正常", "盈利韧性与财务趋势"],
    ["IndexEtfFlow", "代表性 ETF", "mart_index_etf_flow", "mock", "场内规模和 5D 资金流"],
    ["IndexValuationBars", "估值百分位", "mart_index_research_daily", "正常", "PE / PB / ERP 十年分位"],
    ["IndexFactorExposure", "指数因子暴露", "mart_index_research_daily", "正常", "0-100 因子得分，50 为中枢"],
    ["IndexConstituentTable", "指数成分", "mart_index_constituent", "正常", "前十大权重股与涨跌幅"],
    ["IndexObservationsCard", "关键观察", "mart_index_research_daily", "正常", "正面信号与风险提示"],
  ];
  const industryRows = [
    ["银行", 13.2, 0.4, 0.052],
    ["食品饮料", 10.8, 0.7, 0.076],
    ["电子", 9.6, 1.8, 0.173],
    ["非银金融", 8.1, 0.2, 0.016],
    ["医药生物", 7.4, 1.2, 0.089],
    ["电力设备", 6.9, -0.6, -0.041],
    ["汽车", 5.8, 0.9, 0.052],
    ["计算机", 4.7, 1.5, 0.071],
  ];
  const maxIndustryWeight = Math.max(...industryRows.map(([, weight]) => weight));
  const constituents = [
    ["600519.SH", "贵州茅台", "食品饮料", "5.60", 0.82],
    ["300750.SZ", "宁德时代", "电力设备", "3.80", 1.94],
    ["601318.SH", "中国平安", "非银金融", "2.90", 0.31],
    ["600036.SH", "招商银行", "银行", "2.60", 0.22],
    ["000858.SZ", "五粮液", "食品饮料", "2.10", 0.68],
  ];
  const etfRows = [["510300", "沪深300 ETF", "1248 亿", "+2.9 亿"], ["159919", "核心300 ETF", "732 亿", "+1.8 亿"], ["510310", "增强300 ETF", "286 亿", "-0.4 亿"]];
  return `
    <section class="asset-header">
      <div>
        <div class="asset-title"><h1>沪深300</h1><span>000300.SH</span></div>
        <div class="chip-row"><span>宽基指数</span><span>大盘核心</span><span>指数研究详情</span><span>mock snapshot</span></div>
      </div>
      <div class="asset-quote">
        <div><b>3826.42</b>${pct(0.72)}</div>
        <p>成交额(亿): 2864.2 / PE(TTM): 12.43 / 股息率: 2.31% / PB(LF): 1.42</p>
        <em>数据日期: 2026-06-30</em>
      </div>
    </section>
    <section class="module-guard asset-guard"><b>页面健康</b><span>指数研究快照、指数成分、行业分布、财务汇总、因子暴露、表现序列均为 mock mart 快照，不读取真实数据库。</span></section>
    <div class="biz-grid">
      <section class="card span-8 ai-summary-card"><div class="summary-title"><span>AI</span><h2>AI 指数研究摘要</h2><em>估值修复</em><em>权重稳定</em><em>风险中性</em></div><p>权重行业处于估值修复阶段，金融与消费稳定贡献，科技成长提供弹性。公开版只展示真实页面结构和 mock 研判文本，不调用真实模型。</p><div class="evidence-line">依据：指数行情、成分股估值分位、因子画像、财务综合指标。</div></section>
      <section class="card span-4"><h2>收益与风险</h2><div class="return-grid">${[["近5日", "+1.20%"], ["近20日", "+2.40%"], ["今年以来", "+6.60%"], ["近1年", "+8.80%"]].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div></section>
      <section class="card span-12 asset-module-strip">${[["指数研究快照", "mart_index_research_daily", "healthy"], ["价格趋势", "mart_index_performance", "healthy"], ["成分权重", "mart_index_constituent", "healthy"], ["行业分布", "mart_index_research_daily", "healthy"], ["财务汇总", "mart_index_research_daily", "healthy"], ["因子暴露", "mart_factor_snapshot", "mock"]].map(([name, source, state]) => `<div><b>${name}</b><span>${source}</span><em>${state}</em></div>`).join("")}</section>
      <section class="card span-12 index-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>IndexClientShell · ModuleUpdateGuard parity · mock page health</span></div>${moduleGuards.map(([component, module, tableName, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${tableName}</code><em>${detail}</em></div>`).join("")}</section>
      <section class="card span-8"><div class="module-head"><h2>价格趋势</h2><div class="range-tabs">${["1m", "3m", "1Y", "3Y", "5Y"].map((r) => `<button class="${r === "1Y" ? "active" : ""}">${r}</button>`).join("")}</div></div><div class="index-price-chart"></div></section>
      <section class="card span-4 index-valuation-panel"><h2>估值百分位 (Valuation)</h2>${valuationRows.map(([label, value, pct]) => `<div class="valuation-factor-row"><div><b>${label}</b><span>${value}</span></div>${pctBar(pct)}</div>`).join("")}<div class="valuation-factor-row"><div><b>ERP 风险溢价</b><span>3.42%</span></div>${pctBar(55)}</div><p class="muted">近10年历史分位 · mock</p></section>
      <section class="card span-8 index-industry-card"><div class="module-head"><h2>行业分布与收益贡献</h2><div class="range-tabs"><button class="active">今日</button><button>5D</button><button>20D</button></div></div><div class="index-industry-layout"><div><h3>前八大行业权重分布</h3>${industryRows.map(([name, weight]) => `<div class="industry-weight-row"><div><span>${name}</span><b>${weight.toFixed(1)}%</b></div><em><i style="width:${(weight / maxIndustryWeight) * 100}%"></i></em></div>`).join("")}</div><div><h3>今日收益贡献 TOP 5</h3>${table(["行业板块", "涨跌幅", "贡献点数"], industryRows.slice(0, 5).map(([name, , chg, contribution]) => [name, pct(chg), pct(contribution)]))}</div></div></section>
      <section class="card span-4 factor-exposure-panel index-factor-card"><h2>风格因子暴露度 (Z-Score)</h2>${[["估值", 72], ["成长", 57], ["盈利", 64], ["动量", 58], ["低波", 44]].map(([name, score]) => `<div><span>${name}</span><b style="--score:${score};width:${Math.abs(score - 50) * 2}%"></b><em>${score >= 50 ? "+" : ""}${score - 50}</em></div>`).join("")}<p>因子得分 0-100，50 为市场中枢；高于 50 为正向暴露。</p></section>
      <section class="card span-6 index-finance-trends"><h2>盈利韧性与财务趋势</h2><div class="finance-metric-grid">${[["归母净利 YOY", "+9.8%"], ["ROE (TTM)", "11.2%"]].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div><div class="finance-bars">${[["营收同比", 12.4], ["净利同比", 9.8], ["ROE中位", 11.2], ["毛利率", 28.6]].map(([label, value]) => `<div><span>${label}</span><b style="height:${Math.max(16, value * 4)}px"></b><em>${value}%</em></div>`).join("")}</div><p>财务指标基于最新季报加权快照。</p></section>
      <section class="card span-6 index-etf-flow"><h2>代表性 ETF 与资金流向</h2><div class="etf-flow-summary"><span>场内总规模 (合计)</span><b>~2266 亿</b><em>持续增持</em></div>${etfRows.map(([code, name, nav, flow]) => `<div class="etf-flow-row"><span>${code} · ${name}</span><b>${nav}</b><em class="${flow.startsWith("-") ? "down" : "up"}">${flow} (5D)</em></div>`).join("")}</section>
      <section class="card span-8 index-constituent-card"><div class="module-head"><h2>前十大权重股 (核心成分)</h2><span>权重日期: 2026-06-30</span></div><div class="constituent-list">${constituents.map(([code, name, industry, weight, chg]) => `<a href="/biz/stock/${code}" data-link><div><b>${name}</b><span>${code} · ${industry}</span></div><strong>${weight}%</strong>${pct(chg)}</a>`).join("")}</div></section>
      <section class="card span-4 observation-card"><h2>关键观察与风险预警</h2><div class="observation-positive"><b>正面信号</b><span>估值处历史中位，金融、消费权重稳定贡献底仓，电子与医药提供短期弹性。</span></div><div class="observation-risk"><b>风险提示</b><span>若成交额不能持续放大，指数修复可能转为箱体震荡；公开版不读取真实指数库。</span></div></section>
    </div>`;
}

function renderStockResearch(path, route) {
  const isDetail = path !== "/biz/stock";
  const pctBar = (value) => `<div class="mini-percentile"><span style="width:${value}%"></span><b>${value}</b></div>`;
  if (!isDetail) {
    const entryGuards = [
      ["StockSkeletonPage", "个股入口骨架", "frontend/app/biz/stock/page.tsx", "正常", "提示从右上角搜索进入详情页"],
      ["StockSearchWorkbench", "搜索入口", "mock_stock_pool", "mock", "公开版 typeahead 和样例池"],
      ["StockPageHeader", "详情页头部", "mart_stock_snapshot_daily", "正常", "从入口跳转到 /biz/stock/[code] 后展示"],
      ["PriceTrendPanel", "价格趋势", "mart_stock_daily_detail", "正常", "120D K 线模块入口"],
      ["FinancePanel", "财务报告", "mart_stock_finance_snapshot", "正常", "8 季度财务模块入口"],
      ["ValuationFactorPanel", "估值因子", "mart_factor_snapshot", "正常", "估值分位和因子暴露入口"],
      ["ShareholderPanel", "股东资本事件", "mart_top10_holders_detail", "mock", "公开版脱敏快照入口"],
      ["ModuleUpdateGuard", "页面健康护栏", "stock_research", "正常", "入口和详情共用健康口径"],
    ];
    return `
      <section class="asset-header">
        <div><div class="asset-title"><h1>个股研究入口</h1><span>Stock Research</span></div><div class="chip-row"><span>股票搜索</span><span>指数搜索</span><span>研究模块</span><span>mock pool</span></div></div>
        <div class="asset-quote"><p>请在右上角搜索框输入股票代码或名称，回车进入个股研究详情。公开版提供可点击样例和真实页面结构。</p></div>
      </section>
      <section class="module-guard asset-guard"><b>页面健康</b><span>搜索、行情、财务、估值、股东和 AI 摘要均为 mock snapshot；不调用真实搜索 API、不读取真实数据库。</span></section>
      <div class="stock-entry-layout">
        <section class="card stock-search-workbench">
          <div class="module-head"><h2>股票 / 指数搜索工作台</h2><span>mock search · typeahead shape</span></div>
          <div class="stock-search-box"><input value="贵州茅台 / 600519.SH" /><a href="/biz/stock/600519.SH" data-link>进入研究页</a></div>
          <div class="stock-quick-list">${stockRows.map(([code, name, ind, close, chg, note]) => `<a href="/biz/stock/${code}" data-link><b>${name}</b><span>${code} · ${ind}</span><em>${close} · ${pct(chg)} · ${note}</em></a>`).join("")}</div>
        </section>
        <aside class="card stock-entry-side">
          <h2>入口状态</h2>
          ${[["默认样例", "600519.SH"], ["搜索源", "mock_stock_pool"], ["支持对象", "股票 / 指数 / 研报"], ["默认跳转", "/biz/stock/[code]"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}
        </aside>
        <section class="card span-12 stock-skeleton-grid">
          ${[["头部行情", "StockPageHeader", "名称、代码、价格、涨跌幅、市场标签"], ["价格趋势", "PriceTrendPanel", "120D K 线、均线、成交量和事件标记"], ["关键指标小结", "KeyMetricsSummaryCard", "估值、财务、因子、风险摘要"], ["财务报告", "FinancePanel", "近 8 季度趋势和财报解读"], ["估值/因子", "ValuationFactorPanel", "估值分位和六维因子暴露"], ["股东/资本事件", "ShareholderPanel", "前十大股东、北向持仓、资本事件"]].map(([title, component, desc]) => `<div><b>${title}</b><span>${component}</span><em>${desc}</em></div>`).join("")}
        </section>
        <section class="card span-12 stock-module-guard-grid"><div class="module-head"><h2>入口组件级更新护栏</h2><span>StockSkeletonPage · ModuleUpdateGuard parity · mock page health</span></div>${entryGuards.map(([component, module, tableName, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${tableName}</code><em>${detail}</em></div>`).join("")}</section>
        <section class="card span-12"><h2>公开边界</h2>${["搜索结果为 mock pool", "不请求真实股票搜索接口", "不读取真实行情数据库", "不包含真实凭据"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
      </div>`;
  }
  return `
    ${isDetail ? `
      <section class="asset-header">
        <div>
          <div class="asset-title"><h1>贵州茅台</h1><span>600519.SH</span></div>
          <div class="chip-row"><span>主板</span><span>沪深300</span><span>食品饮料</span><span>个股研究详情</span><span>mock snapshot</span></div>
        </div>
        <div class="asset-quote">
          <div><b>1688.20</b>${pct(0.82)}<strong>+13.76</strong></div>
          <p>市值: 21204.8亿 / 换手率: 0.41% / 量比: 0.92</p>
          <em>数据日期: 2026-06-30</em>
        </div>
      </section>` : `
      <section class="asset-header"><div><div class="asset-title"><h1>个股研究入口</h1><span>Stock Research</span></div><div class="chip-row"><span>股票搜索</span><span>指数搜索</span><span>mock pool</span></div></div><div class="asset-quote"><p>请在右上角搜索框输入股票代码或名称，回车进入个股研究详情。</p></div></section>`}
    <section class="module-guard asset-guard"><b>页面健康</b><span>行情、财务、估值、因子画像、股东变化、资本事件、AI 摘要全部使用 mock snapshot，不调用真实模型、不读取真实数据库。</span></section>
    <div class="biz-grid">
      <section class="card span-12 ai-summary-card"><div class="summary-title"><span>AI</span><h2>AI 个股研究摘要</h2><em>估值·中性偏低</em><em>质量·较强</em><em>风险·低</em></div><p>贵州茅台盈利质量高、现金流稳定，估值处于历史中位附近，短期动量修复但弹性弱于成长板块。公开版依据 mock 行情、财务、估值、因子画像、股东变化和资本事件生成，不连接真实模型。</p><div class="evidence-line">依据：行情快照、财务指标、估值分位、因子画像、股东变化、资本事件与行业数据。</div></section>
      <section class="card span-12 asset-module-strip">${[["行情快照", "mart_stock_snapshot_daily", "healthy"], ["价格趋势", "mart_stock_daily_detail", "healthy"], ["财务报告", "mart_finance_quarterly_detail", "healthy"], ["估值/因子", "mart_factor_snapshot", "healthy"], ["股东变化", "mart_top10_holders_detail", "mock"], ["资本事件", "mart_holder_trade_detail", "mock"]].map(([name, source, state]) => `<div><b>${name}</b><span>${source}</span><em>${state}</em></div>`).join("")}</section>
      <section class="card span-12 stock-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>ModuleUpdateGuard parity · mock page health</span></div>${[["StockPageHeader", "个股行情快照", "mart_stock_snapshot_daily", "正常", "头部行情可用"], ["AiSummaryCard", "个股行情快照", "mart_stock_snapshot_daily", "正常", "摘要只使用 mock 证据"], ["PriceTrendPanel", "价格趋势", "mart_stock_daily_detail", "正常", "120D K 线可用"], ["FinancePanel", "个股财务快照", "mart_stock_finance_snapshot", "正常", "近 8 季度可用"], ["QualitySignalsCard", "质量信号", "mart_stock_quality_signal", "正常", "信号已更新"], ["KeyMetricsSummaryCard", "关键指标", "mart_stock_key_metrics", "正常", "估值/财务/因子合并"], ["ValuationFactorPanel", "估值因子", "mart_factor_snapshot", "正常", "六维因子暴露"], ["ShareholderPanel", "股东变化", "mart_top10_holders_detail", "mock", "公开版脱敏快照"]].map(([component, module, tableName, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${tableName}</code><em>${detail}</em></div>`).join("")}</section>
      <section class="card span-8"><div class="module-head"><h2>${isDetail ? "价格趋势 (120D)" : "股票 / 指数搜索工作台"}</h2>${isDetail ? `<div class="range-tabs">${["1m", "3m", "1Y", "3Y", "5Y"].map((r) => `<button class="${r === "1Y" ? "active" : ""}">${r}</button>`).join("")}</div>` : ""}</div>${isDetail ? '<div class="stock-kline-panel"><div class="kline-grid"></div><div class="volume-bars"></div><div class="ma-legend"><span>MA5</span><span>MA10</span><span>MA20</span><em>日K线 | 前复权 | mock</em></div></div>' : ''}${table(["代码", "名称", "行业/类型", "收盘", "涨跌幅", "AI 摘要"], stockRows.map(([code, name, ind, close, chg, note]) => [code, name, ind, close, pct(chg), note]))}</section>
      <section class="card span-4"><h2>关键指标小结</h2><div class="summary-grid">${[["估值小结", "PE(TTM) 28.4，52% 分位；股息率 2.15%，68% 分位。"], ["财务小结", "营收同比 12.8%，归母净利润同比 15.2%，毛利率 91.4%。"], ["因子小结", "质量、价值相对较强，其余维度保持中性。"], ["风险小结", "暂无明显重大财务风险。"]].map(([title, text]) => `<div><b>${title}</b><span>${text}</span></div>`).join("")}</div></section>
      <section class="card span-6 stock-factor-panel"><h2>估值百分位 / 因子暴露</h2>${[["市盈率 PE (TTM)", "28.40", 52], ["市净率 PB", "9.80", 58], ["市销率 PS", "14.20", 61], ["股息率", "2.15%", 68]].map(([label, value, score]) => `<div class="valuation-factor-row"><div><b>${label}</b><span>${value}</span></div>${pctBar(score)}</div>`).join("")}<div class="factor-exposure-panel inline">${[["估值", 68], ["成长", 55], ["盈利", 91], ["动量", 62], ["低波", 77], ["规模", 96]].map(([name, score]) => `<div><span>${name}</span><b style="width:${score}%"></b><em>${score}</em></div>`).join("")}</div></section>
      <section class="card span-6"><h2>财务报告解读 (2026Q1)</h2><div class="finance-key-grid">${[["营业收入", "464.8亿", "+12.8% YoY"], ["归母净利润", "247.3亿", "+15.2% YoY"], ["毛利率", "91.4%", "稳定"], ["经营现金流", "1.18x", "质量良好"]].map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</div><div class="finance-bars stock">${[["2024Q2", 18], ["2024Q3", 24], ["2024Q4", 31], ["2025Q1", 34], ["2025Q2", 38], ["2025Q3", 42], ["2025Q4", 48], ["2026Q1", 54]].map(([q, h]) => `<div><b style="height:${h * 2}px"></b><span>${q}</span></div>`).join("")}</div></section>
      <section class="card span-6"><h2>质量信号</h2>${["ROE 连续 8 季度稳定在高位", "经营现金流覆盖净利润", "费用率保持低波动", "无明显重大财务风险"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
      <section class="card span-6"><h2>股东变化 / 资本事件</h2>${table(["模块", "状态", "摘要"], [["前十大股东", statusBadge("success"), "结构稳定，长期资金占比高"], ["北向持股", statusBadge("success"), "近 20 日小幅回补"], ["资本事件", statusBadge("warning"), "事件摘要为 mock 快照"]])}</section>
      <section class="card span-12 stock-data-footer"><span>数据来源: 交易所、公司财报 mock snapshot</span><span>报告生成时间: 2026-06-30 15:30:00 (HGT)</span><span>公开版不读取真实数据库</span></section>
    </div>`;
}

function renderFactorPool(route) {
  const summary = [["策略池数量", "6"], ["入池标的总数", "128"], ["今日新增", "9"], ["今日移出", "3"], ["高风险观察", "4"]];
  const moduleGuards = [
    ["PoolSummaryBar", "策略观察池", "mart_strategy_pool", "正常", "汇总口径与筛选清空入口"],
    ["StrategyCards", "策略观察池", "mart_strategy_pool", "正常", "5 列策略卡与拥挤度状态"],
    ["StrategyDetail", "策略观察池", "strategy_details", "正常", "规则、因子权重、收益快照"],
    ["RiskAlerts", "策略观察池", "risk_alerts", "mock", "风险预警脱敏展示"],
    ["FactorForest", "因子快照", "mart_factor_snapshot", "正常", "核心因子字段森林"],
    ["PoolTable", "策略观察池名单", "pool_list", "正常", "固定高度观察池表格"],
  ];
  const strategies = [
    ["红利质量增强", "ROE 稳定、现金流好、股息率处于高分位", "42", "+3", "+4.8%", "-3.1%", "周观察 / 月确认", "active"],
    ["小盘弹性篮子", "成长动量修复且拥挤度未过热", "36", "+2", "+8.1%", "-7.8%", "日观察 / 周确认", "watch"],
    ["主动量化一号", "多因子综合评分靠前并通过风险过滤", "50", "+4", "+6.4%", "-4.9%", "日观察 / 日确认", "active"],
    ["低波质量防御", "低波、现金流与盈利质量共同约束", "28", "+0", "+2.9%", "-2.2%", "周观察 / 双周确认", "active"],
    ["事件催化观察", "公告、舆情与价格动量形成短期事件候选", "18", "+1", "+5.2%", "-6.0%", "日观察 / 日确认", "watch"],
  ];
  const poolRows = [
    ["贵州茅台", "600519.SH", "食品饮料", "红利质量增强", "89", "估值 68 / 成长 55 / 质量 91 / 动量 62 / 风险 低", "持续观察", "2026-06-18", "/biz/stock/600519.SH"],
    ["宁德时代", "300750.SZ", "电力设备", "小盘弹性篮子", "76", "估值 48 / 成长 82 / 质量 71 / 动量 74 / 风险 中", "待复核", "2026-06-28", "/biz/stock/300750.SZ"],
    ["中芯国际", "688981.SH", "半导体", "主动量化一号", "81", "估值 61 / 成长 88 / 质量 64 / 动量 77 / 风险 中", "新入观察", "2026-06-30", "/biz/stock/688981.SH"],
    ["工业富联", "601138.SH", "电子", "主动量化一号", "84", "估值 57 / 成长 91 / 质量 72 / 动量 80 / 风险 中", "持续观察", "2026-06-20", "/biz/stock/601138.SH"],
    ["招商银行", "600036.SH", "银行", "低波质量防御", "73", "估值 72 / 成长 41 / 质量 86 / 动量 49 / 风险 低", "持续观察", "2026-06-12", "/biz/stock/600036.SH"],
    ["药明康德", "603259.SH", "医药生物", "事件催化观察", "69", "估值 52 / 成长 78 / 质量 67 / 动量 71 / 风险 高", "高风险观察", "2026-06-29", "/biz/stock/603259.SH"],
    ["海康威视", "002415.SZ", "计算机", "红利质量增强", "71", "估值 63 / 成长 60 / 质量 80 / 动量 54 / 风险 中", "待复核", "2026-06-22", "/biz/stock/002415.SZ"],
    ["迈瑞医疗", "300760.SZ", "医药生物", "低波质量防御", "78", "估值 59 / 成长 74 / 质量 88 / 动量 61 / 风险 低", "新入观察", "2026-06-30", "/biz/stock/300760.SZ"],
  ];
  const riskAlerts = [
    ["L2", "半导体拥挤度升温", "需关注", "主动量化一号 14 只标的", "建议降低单行业新增权重"],
    ["L1", "事件催化波动扩大", "极高风险", "事件催化观察 3 只标的", "需复核公告来源与流动性"],
    ["L3", "红利质量增强稳定", "提示", "红利质量增强 42 只标的", "维持原观察频率"],
  ];
  const factorForest = [
    ["价值", "12个字段 · 日频", "PE_TTM / PB / PS / 股息率"],
    ["成长", "10个字段 · 季频", "营收增速 / 净利增速 / 预期修正"],
    ["质量", "14个字段 · 季频", "ROE / 毛利率 / 现金流覆盖"],
    ["动量", "9个字段 · 日频", "20D 收益 / 60D 收益 / 突破强度"],
    ["波动", "8个字段 · 日频", "下行波动 / 最大回撤 / 跳空风险"],
    ["流动性", "7个字段 · 日频", "成交额 / 换手率 / 冲击成本"],
  ];
  return `
    <section class="research-header"><div><p>${route.family}</p><h1>${route.title}</h1><span>${route.description}</span></div>${routeMetrics(route)}</section>
    <section class="module-guard"><b>页面健康</b><span>mock mart_strategy_pool + mart_factor_snapshot · 不读取真实数据库</span></section>
    <section class="factor-pool-module-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>FactorsClientShell · ModuleUpdateGuard parity</span></div>${moduleGuards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
    <div class="strategy-summary">${summary.map(([label, value], index) => `<button class="${index === 4 ? "risk" : ""}"><span>${label}</span><b>${value}</b></button>`).join("")}</div>
    <div class="strategy-card-grid">
      ${strategies.map(([name, desc, count, added, ret, drawdown, freq, state]) => `
        <button class="strategy-card ${state === "watch" ? "watch" : "active"}">
          <div><b>${name}</b>${statusBadge(state === "watch" ? "warning" : "success")}</div>
          <span>${desc}</span>
          <strong>${count}<small>只</small><i>今日 ${added}</i></strong>
          <em>近20日均值 ${ret} · 最大回撤 ${drawdown} · ${freq}</em>
        </button>`).join("")}
    </div>
    <div class="strategy-layout">
      <section class="card strategy-detail span-8">
        <div class="module-head"><h2>策略剖析：红利质量增强</h2><span class="muted">对应真实 StrategyDetail 主面板</span></div>
        <div class="rule-grid">
          <div><h3>策略目标</h3><p>寻找盈利质量稳定、现金流充裕且股息率处于相对高分位的标的，作为防御与稳健收益底仓。</p></div>
          <div><h3>调仓频率</h3><p><b>观察频率</b> 每周 / <b>确认频率</b> 每月</p></div>
          <div><h3>入池规则</h3><ul><li>ROE 近 8 季度稳定</li><li>股息率高于行业中位</li><li>经营现金流连续为正</li></ul></div>
          <div><h3>移出规则</h3><ul><li>质量因子跌出前 40%</li><li>拥挤度进入高风险区</li><li>财务质量出现异常警示</li></ul></div>
        </div>
        <div class="factor-stack"><span style="--w:32">价值 32%</span><span style="--w:26">质量 26%</span><span style="--w:18">成长 18%</span><span style="--w:14">动量 14%</span><span style="--w:10">风险 10%</span></div>
        <div class="strategy-perf-grid">${[["近20日加权均值", "+4.8%"], ["近60日加权均值", "+7.2%"], ["近20日上涨比例", "64%"], ["最大回撤中位数", "-3.1%"]].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div>
        <p class="strategy-footnote">基于今日入池标的的历史回溯，按综合得分加权，仅用于观察池解释，不代表策略真实净值。</p>
      </section>
      <aside class="strategy-side">
        <section class="card"><div class="module-head"><h2>风险预警</h2><span>${riskAlerts.length} 条待处理</span></div><div class="risk-list">${riskAlerts.map(([level, title, severity, scope, suggestion]) => `<div class="${severity === "极高风险" ? "danger" : severity === "需关注" ? "warn" : ""}"><b><small>${level}</small>${title}</b><span>${severity} · ${scope}</span><em>${suggestion}</em></div>`).join("")}</div></section>
        <section class="card"><h2>核心因子森林</h2><div class="forest-grid">${factorForest.map(([name, meta, fields], i) => `<div style="--heat:${42 + i * 9}"><b>${name}</b><span>${meta}</span><em>${fields}</em></div>`).join("")}</div><p class="forest-foot">覆盖范围: 沪深全A · 更新频率: 视因子类别而定</p></section>
      </aside>
      <section class="card pool-table-card span-12">
        <div class="module-head"><h2>策略观察池名单</h2><div class="mini-search">⌕ 搜索股票名称/代码</div></div>
        ${table(["标的名称", "所属行业", "命中策略", "综合评分", "因子拆解", "入池状态", "入池日期", "操作"], poolRows.map(([name, code, ind, strategy, score, factors, state, date, href]) => [`<b>${name}</b><br><small>${code}</small>`, ind, `<span class="mini-chip">${strategy}</span>`, score, factors, state, date, `<a href="${href}" data-link>查看个股</a>`]))}
      </section>
      <section class="card span-12"><h2>公开边界</h2>${["策略池数据为 mock snapshot", "不读取真实数据库", "不包含真实凭据", "不写入真实策略池"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
    </div>`;
}

function renderFactorLibrary(path, route) {
  if (path.includes("/candidates/new")) return renderFactorNewForm(route);
  const moduleGuardsByKey = {
    candidates: [
      ["FactorLibraryShell", "因子库外壳", "factor_library page health", "正常", "breadcrumb、tab、actions、ModuleUpdateGuard"],
      ["CandidateListPage", "候选因子列表", "mart_factor_snapshot", "正常", "搜索、状态筛选、类型筛选"],
      ["useFactorLibrary", "因子库数据 hook", "frontend-api/biz/factor-library", "mock", "公开版本地 mock payload"],
      ["PrimaryButton", "新增因子入口", "factor_candidate_actions", "mock", "只展示动作，不写入后端"],
    ],
    validations: [
      ["FactorLibraryShell", "因子库外壳", "factor_library page health", "正常", "tab pending 与模块护栏"],
      ["ValidationListPage", "验证列表", "mart_factor_validation_result", "正常", "历史样本、IC、Rank IC、分位收益"],
      ["MetricLabel", "指标解释", "factor_metric_help", "正常", "Top-Bottom Spread / Max Corr 解释"],
      ["FactorValidationCharts", "验证图表", "mart_factor_ic_series", "mock", "公开版静态图表"],
    ],
    registry: [
      ["FactorLibraryShell", "因子库外壳", "factor_library page health", "正常", "正式库 tab 与返回链路"],
      ["RegistryListPage", "正式因子库入口", "mart_factor_registry", "正常", "真实 /biz/factor-library/registry 入口组件"],
      ["FactorRegistryPages", "正式因子库", "mart_factor_monitor_summary", "正常", "健康、60期 Rank IC、策略使用"],
      ["FactorGraphPage", "图谱关系", "mart_factor_graph", "mock", "来源候选、验证 run、策略池关系"],
      ["MonitorSummary", "持续监控", "mart_factor_monitor_summary", "正常", "PASS/WARN/FAIL 和告警"],
    ],
    graph: [
      ["FactorGraphPage", "因子图谱", "mart_factor_graph", "mock", "节点和边静态展示"],
      ["FactorLibraryShell", "因子库外壳", "factor_library page health", "正常", "图谱 tab active"],
      ["LineageEdges", "依赖关系", "mart_factor_source_lineage", "mock", "source、candidate、validation、registry"],
      ["ValidationEdges", "验证关系", "mart_factor_validation_edge", "mock", "run 与因子关系"],
    ],
  };
  const tableMap = {
    candidates: [["候选因子编号", "因子名称", "类型", "来源", "数据日期", "状态", "基础指标摘要", "最近验证", "操作"], ["FAC_CAND_001", "质量稳定性", "质量 / 盈利质量", "研报提炼 + mart_factor_snapshot", "2026-06-30", statusBadge("running"), "ROE, GROSS_MARGIN, OCF", "VAL_001", `<a href="/biz/factor-library/candidates/FAC_CAND_001" data-link>查看</a> <a href="/biz/factor-library/validations/VAL_001" data-link>验证</a>`], ["FAC_CAND_002", "低波红利", "估值 / 股息", "人工新增候选因子", "2026-06-30", statusBadge("success"), "DIVIDEND_YIELD, VOL_60D", "VAL_002", `<a href="/biz/factor-library/candidates/FAC_CAND_002" data-link>查看</a> <a href="/biz/factor-library/validations/VAL_002" data-link>验证</a>`]],
    validations: [["Validation Run ID", "因子名称", "验证类型", "因子类型", "历史样本", "可计算性", "IC Mean", "Rank IC", "分位收益", "最大相关性", "准入结论", "运行状态", "操作"], ["VAL_001", "质量稳定性", "准入验证", "质量", statusBadge("success"), statusBadge("success"), "0.041", "0.052", "+6.8%", "0.43", statusBadge("success"), statusBadge("success"), `<a href="/biz/factor-library/validations/VAL_001" data-link>详情</a>`], ["VAL_002", "低波红利", "准入验证", "估值", statusBadge("success"), statusBadge("success"), "0.028", "0.031", "+3.1%", "0.57", statusBadge("warning"), statusBadge("success"), `<a href="/biz/factor-library/validations/VAL_002" data-link>详情</a>`], ["VAL_003", "事件情绪反转", "持续监控", "情绪/关注度", statusBadge("warning"), statusBadge("running"), "0.012", "0.018", "+1.6%", "0.61", statusBadge("warning"), statusBadge("running"), `<a href="/biz/factor-library/validations/VAL_003" data-link>详情</a>`]],
    registry: [["Factor ID", "因子名称", "类型", "状态", "健康", "60期 Rank IC", "60期正占比", "最新评分", "准入 Rank IC", "策略使用", "操作"], ["Q_VAL_001", "质量稳定性", "质量 / 盈利质量", statusBadge("success"), statusBadge("success"), "0.055", "63.3%", "88", "0.052", "4", `<a href="/biz/factor-library/registry/Q_VAL_001" data-link>详情</a>`], ["Q_VAL_002", "低波红利", "估值 / 股息", statusBadge("success"), statusBadge("success"), "0.037", "58.1%", "76", "0.031", "2", `<a href="/biz/factor-library/registry/Q_VAL_002" data-link>详情</a>`], ["Q_EVT_001", "事件情绪反转", "情绪/关注度", statusBadge("warning"), statusBadge("warning"), "0.019", "51.4%", "62", "0.018", "0", `<a href="/biz/factor-library/registry/Q_EVT_001" data-link>详情</a>`]],
    graph: [["节点", "类型", "边数", "说明"], ["FAC_CAND_001", "candidate", "4", "候选到验证到注册"], ["VAL_001", "validation", "3", "准入验证 run"], ["Q_VAL_001", "registry", "5", "正式因子"], ["mart_factor_snapshot", "source", "12", "真实生产页的数据源节点，公开版仅展示 mock"]],
  };
  const key = path.includes("/validations") ? "validations" : path.includes("/registry") ? "registry" : path.includes("/graph") ? "graph" : "candidates";
  const [headers, ...rows] = tableMap[key];
  const isDetail = /\/(candidates|validations|registry)\/[^/]+$/.test(path) && !path.includes("/new");
  const detailId = path.split("/").pop();
  const actions = key === "candidates" ? `<a class="primary-action" href="/biz/factor-library/candidates/new" data-link>新增因子入口</a>` : "";
  const summaryStrip = {
    candidates: [["候选因子", "42", "mart_factor_snapshot"], ["观察中", "9", "Watch"], ["已准入", "26", "Approved"], ["最新日期", "2026-06-30", "biz_date"]],
    validations: [["验证 Run", "18", "history"], ["通过", "11", "APPROVED"], ["观察", "4", "WATCH"], ["失败", "3", "REJECTED"]],
    registry: [["正式因子", "26", "registry"], ["健康", "21", "PASS"], ["预警", "5", "WARNING"], ["策略使用", "14", "strategy refs"]],
    graph: [["节点", "32", "candidate/validation/registry"], ["边", "64", "lineage"], ["数据源", "8", "source tables"], ["更新", "2026-06-30", "mock"]],
  }[key];
  const detailGuardsByKey = {
    candidates: [
      ["CandidateDetailPage", "候选因子详情", "mart_factor_candidate", "正常", "定义、公式、基础指标"],
      ["FactorQualityCheck", "数据检查", "mart_factor_quality_check", "mock", "coverage、null、极值形态"],
      ["ValidationHistory", "验证历史", "mart_factor_validation_result", "正常", "历史 run 与准入路径"],
      ["RegistryPath", "正式库链路", "mart_factor_registry", "正常", "候选到正式库流程"],
    ],
    validations: [
      ["ValidationDetailPage", "验证详情", "mart_factor_validation_result", "正常", "核心指标、准入结论"],
      ["FactorValidationCharts", "验证图表", "mart_factor_ic_series", "mock", "IC、分桶、衰减曲线"],
      ["RobustnessPanels", "稳健性面板", "factor_validation_slices", "正常", "年份、行业、市值、状态切片"],
      ["AdmissionDecision", "准入结论", "factor_admission_rule", "正常", "APPROVED/WATCH/REJECTED"],
    ],
    registry: [
      ["RegistryDetailPage", "正式因子详情", "mart_factor_registry", "正常", "元数据、状态、定义"],
      ["MonitorSummary", "持续监控", "mart_factor_monitor_summary", "正常", "60期 Rank IC 与告警"],
      ["StrategyUsage", "策略使用", "strategy_factor_weight", "mock", "策略引用与权重"],
      ["FactorLineage", "图谱关系", "mart_factor_graph", "mock", "来源候选、验证、正式库"],
    ],
  };
  const guardItems = isDetail ? (detailGuardsByKey[key] || moduleGuardsByKey[key]) : moduleGuardsByKey[key];
  const librarySummary = `<section class="factor-summary-strip">${summaryStrip.map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</section>`;
  const guardGrid = `<section class="factor-card factor-module-guard-grid"><div class="factor-card-head"><h2>组件级更新护栏</h2><p>${isDetail ? "Detail page" : "FactorLibraryShell"} · ModuleUpdateGuard parity · mock page health</p></div>${guardItems.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>`;
  const filterBar = key === "candidates" ? `
    <section class="factor-card factor-filter">
      <input placeholder="搜索因子名称、来源、基础指标" value="" />
      <select><option>状态：全部</option><option>观察中</option><option>已准入</option></select>
      <select><option>类型：全部</option><option>估值</option><option>质量</option><option>动量</option></select>
    </section>` : key === "validations" ? `
    <section class="factor-card factor-filter validation">
      <input placeholder="搜索 validation run、因子名称" value="" />
      <select><option>验证类型：全部</option><option>准入验证</option><option>持续监控</option></select>
      <select><option>准入结论：全部</option><option>APPROVED</option><option>WATCH</option><option>REJECTED</option></select>
    </section>` : key === "registry" ? `
    <section class="factor-card factor-filter registry">
      <input placeholder="搜索 Factor ID、因子名称、策略使用" value="" />
      <select><option>健康：全部</option><option>PASS</option><option>WARNING</option></select>
      <select><option>类型：全部</option><option>质量</option><option>估值</option><option>情绪/关注度</option></select>
    </section>` : "";
  const listAnalytics = !isDetail && key === "validations" ? `
    <section class="factor-card factor-validation-dashboard">
      <div class="factor-card-head"><h2>验证质量概览</h2><p>FactorValidationCharts · IC 时间序列 / 分桶收益 / 冗余度检查。</p></div>
      <div class="factor-chart-grid">
        <div><h3>IC 时间序列</h3><div class="factor-line-chart"></div><span>monthly IC · mock 84 periods</span></div>
        <div><h3>分桶收益</h3><div class="factor-bucket-bars compact">${[["Q1", -2.1], ["Q2", 0.4], ["Q3", 1.2], ["Q4", 3.8], ["Q5", 6.8]].map(([q, v]) => `<div><b style="height:${Math.max(12, Math.abs(v) * 8)}px"></b><span>${q}</span><em>${v}%</em></div>`).join("")}</div></div>
        <div><h3>冗余度</h3>${[["Q_VAL_001", "0.43"], ["Q_VAL_002", "0.57"], ["Q_EVT_001", "0.61"]].map(([name, value]) => `<p class="factor-corr-row"><span>${name}</span><b style="width:${Number(value) * 100}%"></b><em>${value}</em></p>`).join("")}</div>
      </div>
    </section>` : !isDetail && key === "registry" ? `
    <section class="factor-card factor-monitor-dashboard">
      <div class="factor-card-head"><h2>正式因子持续监控</h2><p>FactorRegistryPages · 60期 Rank IC、正占比、策略引用和告警状态。</p></div>
      <div class="factor-monitor-grid">${[["Q_VAL_001", "0.055", "63.3%", "PASS", 88], ["Q_VAL_002", "0.037", "58.1%", "PASS", 76], ["Q_EVT_001", "0.019", "51.4%", "WARNING", 62]].map(([id, ic, positive, state, score]) => `<div class="${state === "PASS" ? "ok" : "warn"}"><b>${id}</b><span>60期 Rank IC ${ic}</span><em>正占比 ${positive}</em><strong>${score}</strong></div>`).join("")}</div>
    </section>` : "";
  const graph = key === "graph" ? `
    <section class="factor-card graph-panel">
      ${["候选因子", "验证 Run", "正式因子", "数据源", "IC 序列"].map((node, index) => `<div class="graph-node n${index}"><b>${node}</b><span>${index === 0 ? "FAC_CAND_001" : index === 1 ? "VAL_001" : index === 2 ? "Q_VAL_001" : index === 3 ? "mart_factor_snapshot" : "mart_factor_ic_series"}</span></div>`).join("")}
    </section>` : "";
  const detailMetrics = (items) => `<div class="factor-metric-grid">${items.map(([label, value, hint]) => `<div><span>${label}</span><b>${value}</b><em>${hint}</em></div>`).join("")}</div>`;
  const indicatorCards = (items) => `<div class="factor-indicators">${items.map(([code, tableName, field]) => `<div><b>${code}</b><span>${tableName}.${field}</span></div>`).join("")}</div>`;
  const detailContent = {
    candidates: `
      <section class="factor-card detail-panel">
        <div class="factor-card-head"><h2>${detailId}</h2><p>候选因子详情：定义、基础指标、数据检查、验证历史与准入路径。</p></div>
        ${detailMetrics([["状态", "观察中", "等待验证任务补齐"], ["股票池", "全 A", "target_universe"], ["调仓频率", "月度", "rebalance_frequency"], ["方向", "越大越好", "expected_direction"]])}
        <div class="factor-detail-layout">
          <div>
            <h3>因子档案</h3>
            ${table(["字段", "值"], [["投资假设", "盈利质量改善且估值未充分反映时，未来一段时间具备超额收益。"], ["经济解释", "ROE、毛利率和经营现金流共同刻画质量稳定性。"], ["公式", "rank(ROE) + rank(GROSS_MARGIN) + rank(OCF_TO_NP) - rank(LEV)"], ["公开边界", "mock-only，不写入候选因子表"]])}
          </div>
          <aside>
            <h3>基础指标</h3>
            ${indicatorCards([["ROE", "mart_factor_snapshot", "roe_ttm"], ["GROSS_MARGIN", "mart_factor_snapshot", "gross_margin"], ["OCF_TO_NP", "mart_financial_quality", "ocf_to_np"], ["LEV", "mart_balance_sheet", "debt_asset_ratio"]])}
          </aside>
        </div>
        <div class="factor-timeline">${["真实因子定义", "数据检查", "有效性验证", "准入结论", "正式库"].map((item, index) => `<span class="${index < 2 ? "done" : ""}"><b>${index + 1}</b>${item}</span>`).join("")}</div>
      </section>`,
    validations: `
      <section class="factor-card detail-panel">
        <div class="factor-card-head"><h2>${detailId}</h2><p>验证详情：可计算性、预测力、稳定性、冗余度与准入结论，指标名对齐真实页。</p></div>
        ${detailMetrics([["IC Mean", "0.041", "预测力均值"], ["Rank IC", "0.052", "秩相关均值"], ["Top-Bottom Spread", "+6.8%", "分位收益"], ["Max Corr", "0.43", "最大相关性"]])}
        <div class="factor-detail-layout">
          <div>
            <h3>验证结果</h3>
            ${table(["检查项", "状态", "说明"], [["历史样本", statusBadge("success"), "样本覆盖 2019-01 至 2026-06"], ["可计算性", statusBadge("success"), "coverage 98.2% / null 0.4%"], ["冗余度", statusBadge("success"), "与现有正式因子最大相关 0.43"], ["准入结论", statusBadge("success"), "APPROVED，进入正式库候选队列"]])}
          </div>
          <aside>
            <h3>分桶收益</h3>
            <div class="factor-bucket-bars">${[["Q1", -2.1], ["Q2", 0.4], ["Q3", 1.2], ["Q4", 3.8], ["Q5", 6.8]].map(([q, v]) => `<div><b style="height:${Math.max(12, Math.abs(v) * 9)}px"></b><span>${q}</span><em>${v}%</em></div>`).join("")}</div>
          </aside>
        </div>
        <div class="factor-chart-grid">
          <div><h3>IC 时间序列</h3><div class="factor-line-chart"></div><span>monthly IC · mock 84 periods</span></div>
          <div><h3>IC 衰减</h3><div class="factor-decay-chart">${[72, 58, 42, 31, 24].map((v, i) => `<span style="height:${v}px"><em>T+${i + 1}</em></span>`).join("")}</div></div>
          <div><h3>滚动 Rank IC</h3><div class="factor-line-chart rolling"></div><span>rolling 12M Rank IC · mock</span></div>
        </div>
        <div class="factor-robust-grid">
          ${[["按年份 IC", [["2022", "0.038"], ["2023", "0.044"], ["2024", "0.052"], ["2025", "0.049"]]], ["按行业 IC", [["消费", "0.061"], ["医药", "0.047"], ["科技", "0.039"], ["金融", "0.033"]]], ["按市值 IC", [["大盘", "0.052"], ["中盘", "0.044"], ["小盘", "0.029"]]], ["按市场状态 IC", [["复苏", "0.058"], ["震荡", "0.041"], ["下行", "0.026"]]]].map(([title, items]) => `<div><h3>${title}</h3>${items.map(([k, v]) => `<p><span>${k}</span><b>${v}</b></p>`).join("")}</div>`).join("")}
        </div>
        <div class="factor-admission-box"><h3>准入结论与原因</h3>${["Rank IC 显著为正且跨年份稳定。", "Top-Bottom Spread 单调性良好。", "与既有因子最大相关性低于阈值，具备增量价值。"].map((reason) => `<span>${reason}</span>`).join("")}</div>
      </section>`,
    registry: `
      <section class="factor-card detail-panel">
        <div class="factor-card-head"><h2>${detailId}</h2><p>正式因子详情：持续跟踪、基础指标、图谱关系与策略使用。</p></div>
        ${detailMetrics([["健康状态", "HEALTHY", "60期持续监控"], ["60期 Rank IC", "0.055", "rank_ic_60d"], ["60期 ICIR", "0.82", "rank_icir_60d"], ["告警等级", "无告警", "alert_level"]])}
        <div class="factor-detail-layout">
          <div>
            <h3>准入后持续跟踪</h3>
            ${table(["字段", "值"], [["截至日期", "2026-06-30"], ["60期正占比", "63.3%"], ["60期高低分位差", "+6.8%"], ["健康说明", "预测力稳定，冗余度低，未触发降级。"]])}
          </div>
          <aside>
            <h3>策略使用</h3>
            ${["红利质量增强 · 权重 26%", "主动量化一号 · 权重 18%", "质量防御篮子 · 权重 22%"].map((item) => `<div class="factor-usage">${item}</div>`).join("")}
          </aside>
        </div>
        <div class="factor-detail-layout">
          <div>
            <h3>基础指标</h3>
            ${indicatorCards([["ROE", "mart_factor_snapshot", "roe_ttm"], ["GROSS_MARGIN", "mart_factor_snapshot", "gross_margin"], ["OCF_TO_NP", "mart_financial_quality", "ocf_to_np"], ["LEV", "mart_balance_sheet", "debt_asset_ratio"]])}
          </div>
          <aside>
            <h3>图谱关系</h3>
            ${["comes_from_candidate: FAC_CAND_001", "validated_by: VAL_001", "uses_table: mart_factor_snapshot", "same_cluster_as: Q_VAL_002"].map((item) => `<div class="factor-usage">${item}</div>`).join("")}
          </aside>
        </div>
        <div class="factor-lineage">${["FAC_CAND_001", "VAL_001", "Q_VAL_001", "strategy_pool"].map((item, index) => `<span>${item}${index < 3 ? "<em>→</em>" : ""}</span>`).join("")}</div>
      </section>`,
  };
  const detail = isDetail ? `
    ${detailContent[key]}` : "";
  const body = `
    ${librarySummary}
    ${guardGrid}
    ${filterBar}
    ${graph}
    ${listAnalytics}
    ${detail || `<section class="factor-card"><div class="factor-card-head"><h2>${route.title}</h2><p>表格列宽、筛选和操作形状对齐真实因子库页面。</p></div>${table(headers, rows)}</section>`}
    <div class="biz-grid">
      <section class="card span-4"><h2>准入流程</h2>${routeSteps(route)}</section>
      <section class="card span-8"><h2>页面模块</h2>${routeModuleTable(route)}</section>
      <section class="card span-12"><h2>公开边界</h2>${["因子数据为 mock snapshot", "不读取真实数据库", "不包含真实凭据", "不执行新增/验证/注册写入"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
    </div>`;
  const backHref = isDetail ? (key === "validations" ? "/biz/factor-library/validations" : key === "registry" ? "/biz/factor-library/registry" : "/biz/factor-library/candidates") : "";
  return factorLibraryShell(path, route, actions, body, backHref, key === "validations" ? "返回验证列表" : key === "registry" ? "返回正式库" : "返回候选因子");
}

function renderMeso(route) {
  const industries = [
    ["AI 算力", 88, "+6.8%", "+4.2%", "34.2 / 72%", "4.8 / 69%", "+42.6 亿", "83%", "18.1%", "32.4%", "71%", 76],
    ["创新药", 81, "+4.9%", "+2.5%", "28.1 / 42%", "3.2 / 38%", "+18.2 亿", "66%", "12.4%", "19.6%", "58%", 62],
    ["半导体", 77, "+5.1%", "+2.8%", "45.3 / 81%", "5.1 / 77%", "+25.5 亿", "73%", "9.4%", "22.8%", "63%", 84],
    ["红利低波", 69, "+1.4%", "+0.2%", "9.6 / 31%", "1.1 / 28%", "+8.4 亿", "54%", "14.2%", "8.8%", "42%", 41],
    ["地产链", 38, "-2.6%", "-4.1%", "12.8 / 18%", "0.8 / 12%", "-12.3 亿", "19%", "5.1%", "-18.0%", "15%", 52],
  ];
  const dims = ["量", "价", "库存", "利润", "出口", "需求", "投资", "景气"];
  const moduleGuards = [
    ["MesoResearchPage", "中观研究页", "fetchMesoIndustryCompare + fetchMesoConceptHeat + fetchMesoProsperity", "正常", "行业比较、景气、概念热度总入口"],
    ["LoadingState", "加载态", "compare === null", "mock", "真实页数据加载中提示形态"],
    ["UnavailableState", "快照未就绪", "compare.available=false", "mock", "展示生成快照建议，不伪造真实可用"],
    ["ErrorState", "错误降级", "fetch error", "mock", "中观研究数据加载失败提示"],
    ["IndustryCompareTable", "申万一级行业四维比较", "mart_meso_industry_panel", "正常", "估值、动量、资金、盈利、拥挤度"],
    ["ProsperityMatrix", "行业景气热力矩阵", "mart_meso_prosperity", "正常", "近 5 年 z-score 和 3 月方向"],
    ["MesoSectorConeSection", "轮动锥", "mart_sector_leadership_cone", "正常", "行业/赛道 20D 相对强弱结构"],
    ["SectorLeadershipCone", "行业锥可视化", "sector-cone snapshots", "mock", "公开版静态节点替代 3D 交互"],
    ["MesoChainView", "产业链传导", "mart_meso_chain_transmission", "正常", "上游到下游 EDB 景气 z"],
    ["MesoMembersDrawer", "成员抽屉", "mart_meso_members", "mock", "行业/概念成分股搜索和收益率表"],
    ["ConceptHeatTop", "赛道热度 Top", "mart_meso_concept_heat", "正常", "同花顺概念 20D 涨幅"],
    ["LimitUpByIndustry", "涨停聚集", "mart_meso_limit_up", "正常", "最新交易日按行业聚集"],
  ];
  const prosperity = [
    ["AI 算力", 86, "↑ 0.8", [1.7, 1.2, 0.4, 1.4, 0.9, 1.8, 1.5, 1.6], 22],
    ["创新药", 74, "↑ 0.4", [0.8, 1.1, 0.1, 0.7, 0.3, 1.2, 0.6, 0.9], 18],
    ["地产链", 32, "↓ -0.6", [-1.1, -0.8, -1.6, -0.9, -0.2, -1.3, -1.8, -1.2], 20],
  ];
  const zClass = (z) => z >= 1.5 ? "hot" : z >= 0.5 ? "warm" : z <= -1.5 ? "cold" : z <= -0.5 ? "cool" : "";
  return `
    <section class="research-header"><div><p>${route.family}</p><h1>${route.title}</h1><span>${route.description}</span></div>${routeMetrics(route)}</section>
    <section class="module-guard"><b>页面健康</b><span>mock meso snapshots · 行业比较 / 景气热力 / 轮动锥 / 产业链均不读取真实数据库</span></section>
    <section class="meso-control-strip">
      ${[["排序", "综合分", "composite"], ["样本", "31 个行业", "SW2021"], ["成员抽屉", "可查看成分股", "mock drawer"], ["轮动锥轴", "行业 / 赛道", "industry active"], ["业务日", market.businessDate, "0 lag"]].map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}
    </section>
    <section class="card meso-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>MesoResearchPage parity · async fetch shape · mock page health</span></div>${moduleGuards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
    <section class="card wide-table">
      <div class="module-head"><h2>申万一级行业四维比较（估值 / 动量 / 资金 / 盈利 + 拥挤度）</h2><div class="filter-pills">${["按综合分", "按动量", "按资金", "按盈利", "按估值性价比", "按拥挤度"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div></div>
      ${table(["行业", "综合分", "20D收益", "20D超额", "PE / 5年分位", "PB / 5年分位", "20D主力净流入", "净流入1年分位", "ROE中位", "净利同比中位", "预告上修占比", "拥挤度"], industries)}
      <p class="muted">综合分 = 动量 30% + 资金 25% + 盈利 25% + 估值性价比 20%；拥挤度不计入综合分。公开版全部为 mock。</p>
    </section>
    <div class="meso-layout">
      <section class="card span-8">
        <div class="module-head"><h2>行业景气热力矩阵（近 5 年 z-score）</h2><span class="muted">数据截至 ${market.businessDate}</span></div>
        <div class="prosperity-table">
          <div class="prosperity-head"><b>行业</b><b>景气分</b><b>3月方向</b>${dims.map((d) => `<b>${d}</b>`).join("")}<b>锚点数</b></div>
          ${prosperity.map(([name, score, direction, values, count]) => `<div class="prosperity-row"><span>${name}</span><strong>${score}</strong><em>${direction}</em>${values.map((z) => `<i class="${zClass(z)}">${z.toFixed(1)}</i>`).join("")}<small>${count}</small></div>`).join("")}
        </div>
      </section>
      <section class="card span-4 sector-cone-panel">
        <div class="module-head"><h2>轮动锥（20D 相对强弱结构）</h2><div class="filter-pills"><button class="active">行业（申万一级）</button><button>赛道（活跃概念 Top40）</button></div></div>
        <div class="cone-stage">${market.heatmap.map(([name, heat, change], index) => `<button class="cone-node n${index}" style="--heat:${heat}; --x:${14 + (index % 3) * 30}%; --y:${18 + Math.floor(index / 3) * 34}%"><b>${index + 1}</b><span>${name}</span><em>${pct(change)}</em></button>`).join("")}</div>
        <div class="cone-selected"><b>选中：AI 算力</b><span>score 86 · strong_up</span><em>20D +2.8% / 60D +14.6% / 排名上升 3</em></div>
      </section>
      <section class="card span-8">
        <h2>产业链传导 / 产业链视图</h2>
        <div class="chain-view">
          ${[["上游材料", "铜箔 / 光模块材料", "AI 算力", "+1.7", "↑"], ["中游制造", "服务器 / 先进封装", "半导体", "+1.2", "↑"], ["下游应用", "云厂商 / 医疗信息化", "创新药", "+0.8", "→"], ["需求端", "地产后周期 / 消费电子", "地产链", "-1.1", "↓"]].map(([layer, nodes, focus, z, direction]) => `<div><b>${layer}</b><span>${nodes}</span><em>${focus} · z=${z} ${direction}</em></div>`).join("")}
        </div>
        <div class="meso-chain-detail">${[["链路", "光模块 → 服务器 → 云厂商"], ["传导强度", "0.72"], ["利润方向", "上游材料稳定 / 中游制造改善"], ["点击节点", "打开成员抽屉 mock"]].map(([k, v]) => `<p><span>${k}</span><b>${v}</b></p>`).join("")}</div>
        <div class="single-chain-list"><b>单节点链：</b>${[["白酒", "+0.4"], ["医美", "+0.7"], ["煤炭", "-0.6"], ["港口", "-0.3"]].map(([name, z]) => `<button>${name} ${z}</button>`).join("")}</div>
      </section>
      <section class="card span-4">
        <h2>成员抽屉</h2>
        ${table(["行业", "代表标的", "状态"], [["AI 算力", "中际旭创 / 工业富联", statusBadge("success")], ["创新药", "恒瑞医药 / 药明康德", statusBadge("success")], ["地产链", "保利发展 / 东方雨虹", statusBadge("warning")]])}
        <div class="meso-drawer-preview">
          <header><b>AI 算力 · 成分股（42）</b><button>×</button></header>
          <input value="AI / 光模块 / 服务器" />
          ${[["601138.SH", "工业富联", "电子", "+1.8%", "+4.2%"], ["300308.SZ", "中际旭创", "通信", "+3.5%", "+6.8%"], ["002463.SZ", "沪电股份", "电子", "+1.1%", "+3.1%"]].map(([code, name, industry, r5, r20]) => `<div><span>${code}</span><strong>${name}</strong><em>${industry} · 5D ${r5} · 20D ${r20}</em></div>`).join("")}
        </div>
      </section>
      <section class="card span-12">
        <div class="module-head"><h2>赛道热度 Top / Bottom / 涨停聚集</h2><span class="muted">对应真实中观页底部三列概念热度区</span></div>
        <div class="concept-grid">${[["赛道热度 Top", [["液冷服务器", "+12.4%"], ["CPO", "+9.8%"], ["创新药出海", "+7.1%"]]], ["赛道热度 Bottom", [["地产服务", "-5.8%"], ["煤化工", "-3.4%"], ["港口航运", "-2.6%"]]], ["涨停聚集（按行业）", [["电子", "9 家涨停"], ["医药生物", "5 家涨停"], ["计算机", "4 家涨停"]]]].map(([title, rows]) => `<div><h3>${title}</h3>${rows.map(([a, b]) => `<p><span>${a}</span><b>${b}</b></p>`).join("")}</div>`).join("")}</div>
      </section>
      <section class="card span-12"><h2>公开边界</h2>${["中观数据为 mock 快照", "不读取真实数据库", "不包含真实凭据", "不暴露供应商账号或内网路径"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
    </div>`;
}

function renderLogin() {
  return `
    <main class="login-page">
      <section class="login-story">
        <div class="glitch-grid"></div>
        <div class="story-copy">
          <div class="online-pill"><span></span> ARCHĒ ONLINE · QIUQIU RESEARCH</div>
          <h1><span>球球投研</span><i></i></h1>
          <p class="mono">AI · driven · research · workbench</p>
          <div class="gold-line"></div>
          <p class="serif">投资研究不是追逐每一次波动，而是在纷繁的数据、观点与叙事中，持续建立可验证的理解。把零散的信息沉淀为知识，把孤立的结论还原为路径，让每一次判断都有来源、有逻辑，也有被修正的可能。</p>
          <p class="signature">—— ARCHĒ · 球球投研的 AI 小伙伴</p>
        </div>
        <div class="system-line">SYSTEM ONLINE · v1.0 · 2026</div>
      </section>
      <section class="login-panel-wrap">
        <div class="mobile-brand">
          <p>● ARCHĒ ONLINE</p>
          <h2>球球投研</h2>
        </div>
        <div class="login-card">
          <div class="login-card-head"><span>// SECURE LOGIN</span><b>AUTH · 01</b></div>
          <div class="login-parity-markers" hidden data-components="CursorHalo GlitchCanvas LoginForm ComplianceFooter"></div>
          <h2>欢迎回来</h2>
          <p>登录后进入你的 AI 投研工作台。</p>
          <form id="login-form" class="login-form">
            <label>用户名 / 邮箱<input id="username" name="username" value="hello" autocomplete="username" /></label>
            <label>密码<input id="password" name="password" value="hello" type="password" autocomplete="current-password" /></label>
            <label class="remember"><input id="remember" type="checkbox" checked /> 记住登录状态</label>
            <div id="login-error" class="login-error" hidden></div>
            <button type="submit">进入未来 →</button>
          </form>
          <p class="security-copy">公网访问已启用安全登录 · Public demo 默认账号 hello / hello</p>
        </div>
        <div class="login-links">安全策略 · 使用协议 · 技术支持</div>
        <footer class="login-compliance-footer">
          <span>京ICP备2024044293号-3</span>
          <span aria-hidden="true">|</span>
          <span>京公网安备11010602202577号</span>
        </footer>
      </section>
    </main>`;
}

function renderTopNav(activePath) {
  const user = JSON.parse(window.localStorage.getItem(AUTH_USER_KEY) || '{"displayName":"Public Demo"}');
  const stockTabHref = getStockTabHref(activePath);
  return `
    <header class="top-nav">
      <a class="brand" href="/biz/market" data-link>球球投研系统</a>
      <div class="search-box">
        ${iconSlot("search", "搜索")}
        <input type="search" placeholder="搜索股票、指数、研报..." value="" />
        <div class="search-suggestions" role="listbox" aria-label="公开 demo 搜索建议">
          <a href="/biz/stock/600519.SH" data-link>
            <div><b>贵州茅台</b><span>600519.SH · 食品饮料</span></div>
            <em>1688.00 · +0.82%</em>
          </a>
          <a href="/biz/index/000300.SH" data-link>
            <div><b>沪深300</b><span>000300.SH · 宽基指数</span></div>
            <em>3924.18 · +0.42%</em>
          </a>
          <a href="/biz/market/signals" data-link>
            <div><b>今日信号</b><span>市场资金流 / 估值 / 情绪</span></div>
            <em>4 条生效</em>
          </a>
        </div>
      </div>
      <div class="nav-actions">
        <a class="icon-link" href="/ops/overview" data-link aria-label="切换到后台监控总览" title="切换到后台监控总览">${iconSlot("monitoring", "运维后台")}</a>
        <a class="icon-link ai-entry" href="/biz/ai" data-link aria-label="打开 AI 投研" title="AI 投研">AI</a>
        <button class="icon-button" data-theme aria-label="切换白天/黑色主题" title="切换白天/黑色主题">${iconSlot("palette", "主题")}</button>
        <button class="icon-button" aria-label="系统设置" title="系统设置">${iconSlot("settings", "设置")}</button>
        <span class="user-avatar" title="${escapeHtml(user.displayName || user.username)}">${escapeHtml((user.displayName || user.username || "P").slice(0, 1).toUpperCase())}</span>
        <button class="icon-button" data-logout aria-label="退出" title="退出">${iconSlot("logout", "退出")}</button>
      </div>
    </header>
    <nav class="biz-subnav">
      ${bizTabs
        .map(([label, href]) => {
          const targetHref = href === "/biz/stock" ? stockTabHref : href;
          const active = isBizTabActive(activePath, href);
          return `<a href="${targetHref}" data-link class="${active ? "active" : ""}">${label}</a>`;
        })
        .join("")}
    </nav>`;
}

function renderBizMarket() {
  const statusCells = [
    ["上涨", "2,846", "up"],
    ["下跌", "1,914", "down"],
    ["涨停", "74", "up"],
    ["跌停", "9", "down"],
    ["两市成交", "1.08万亿", "flat"],
    ["北向资金", "+18.42亿", "up"],
    ["融资余额", "1.52万亿", "flat"],
    ["换手率", "1.42%", "flat"],
  ];
  const broadIndices = [
    ["000300.SH", "沪深300", "3924.18", "+0.42%", "A股核心"],
    ["000001.SH", "上证指数", "3068.22", "+0.31%", "主板"],
    ["000905.SH", "中证500", "5876.33", "+0.71%", "中盘"],
    ["399006.SZ", "创业板指", "1842.91", "-0.18%", "成长"],
    ["SPX", "标普500", "5486.20", "+0.24%", "海外"],
    ["HSI", "恒生指数", "18122.34", "+0.68%", "港股"],
    ["N225", "日经225", "39281.10", "-0.36%", "海外"],
    ["GDAXI", "德国DAX", "18302.44", "+0.18%", "海外"],
    ["KS11", "韩国综合", "2796.52", "+0.41%", "海外"],
    ["SENSEX", "印度SENSEX", "79412.20", "+0.11%", "海外"],
    ["HKTECH", "恒生科技", "3742.66", "+1.23%", "港股科技"],
    ["IXIC", "纳斯达克", "17798.01", "+0.52%", "海外科技"],
  ];
  const valuations = [["沪深300", 42, 38], ["上证指数", 36, 33], ["中证500", 41, 45], ["创业板指", 48, 52], ["恒生科技", 28, 31]];
  const heatItems = [
    ["AI 算力", 3, "+2.8%"],
    ["创新药", 2, "+1.9%"],
    ["半导体", 1, "+1.1%"],
    ["电子", 1, "+0.8%"],
    ["红利低波", 0, "+0.3%"],
    ["银行", 0, "+0.2%"],
    ["煤炭", -1, "-1.1%"],
    ["地产链", -2, "-0.7%"],
    ["建材", -2, "-1.5%"],
    ["商贸零售", -1, "-0.8%"],
    ["传媒", 1, "+0.9%"],
    ["军工", 0, "+0.1%"],
  ];
  const heatClass = (level) => level >= 3 ? "hot3" : level === 2 ? "hot2" : level === 1 ? "hot1" : level === 0 ? "neutral" : level === -1 ? "cold1" : "cold2";
  const percentileBar = (value) => `<div class="percentile"><span style="width:${value}%"></span><b>${value}%</b></div>`;
  return `
    <section class="freshness">${market.freshness} · 业务日 ${market.businessDate} · public demo mock snapshot</section>
    <section class="market-status real-market-status">
      <div class="market-date"><span class="material">calendar_month</span><div><b>${market.businessDate}</b><em>市场总览日报 · mart_market_overview_daily mock</em></div></div>
      <div class="market-status-cells">${statusCells.map(([label, value, tone]) => `<div><span>${label}</span><b class="${tone}">${value}</b></div>`).join("")}</div>
    </section>
    <section class="card market-module-guard-grid">
      <div class="module-head"><h2>市场总览模块健康</h2><span>MarketOverviewClient · ModuleUpdateGuard parity · mock page health</span></div>
      ${[["MarketOverviewPage", "服务端入口", "fetchMarketOverview + fetchBizPageHealth", "正常"], ["ModuleSkeleton", "加载骨架", "data === null", "mock"], ["ModuleError", "错误降级", "market overview load failed", "mock"], ["MarketStatusBar", "市场总览日报", "mart_market_overview_daily", "正常"], ["AiMarketInsightCard", "AI 市场感知", "mart_market_ai_insight_daily", "正常"], ["BroadIndexGrid", "指数表现", "mart_index_performance", "正常"], ["IndustryHeatmap", "申万行业热力", "mart_industry_heatmap_daily", "正常"], ["IndustryRotationInsight", "行业轮动信号 / 摘要", "mart_industry_rotation_daily + mart_market_rotation_summary_daily", "正常"], ["TodaySignalsCard", "今日信号", "mart_market_signal_daily", "正常"], ["EtfRankingCard", "ETF 排行", "mart_etf_snapshot_daily", "mock"], ["IndexValuationCard", "宽基估值", "mart_broad_index_valuation_daily", "正常"], ["CapitalFlowCard", "资金流向", "mart_capital_flow_daily", "正常"], ["MarketSentimentCard", "市场情绪", "mart_market_sentiment", "正常"]].map(([component, module, tableName, state]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${tableName}</code><em>${state === "正常" ? "模块可用" : "公开版 mock 快照"}</em></div>`).join("")}
    </section>
    <div class="market-overview-layout">
      <div class="market-main-column">
        <section class="card ai-market-card">
          <div class="module-head"><h2>AI 市场感知</h2><span>依据：宽基估值、资金流、行业扩散度、ETF 申赎与异动信号</span></div>
          <div class="insight-pills">${[["温度", "偏暖", "thermo"], ["风险", "修复中", "risk"], ["估值", "中性", "value"], ["宽度", "改善", "breadth"]].map(([dim, level, tone]) => `<span class="${tone}">${dim}: ${level}</span>`).join("")}</div>
          <p class="insight">${market.ai}</p>
        </section>
        <section class="market-index-section">
          <div class="module-head"><h2>大盘指数</h2><span>交易日：${market.businessDate} · 海外指数按各自收盘日显示</span></div>
          <div class="broad-index-grid">${broadIndices.map(([code, name, close, chg, tag]) => `<a href="/biz/index/${code}" data-link class="broad-index-card"><div><b>${name}</b><em>${tag}</em></div><strong>${close}</strong><span class="${chg.startsWith("-") ? "down" : "up"}">${chg}</span><small>${code}</small></a>`).join("")}</div>
        </section>
        <section class="card">
          <div class="module-head"><h2>申万一级行业表现</h2><span>SW2021 · mock heat levels</span></div>
          <div class="sw-heatmap">${heatItems.map(([name, level, chg]) => `<button class="${heatClass(level)}"><span>${name}</span><b>${chg}</b></button>`).join("")}</div>
        </section>
        <section class="card">
          <div class="module-head"><h2>行业轮动信号</h2><span>mart_industry_rotation_daily + rotation_summary mock</span></div>
          <div class="rotation-board">
            ${[["领先扩散", "AI 算力 / 创新药", "动量与资金共振"], ["风险收缩", "地产链 / 建材", "资金分位回落"], ["拥挤观察", "半导体", "热度高但短线拥挤"]].map(([title, scope, desc]) => `<div><b>${title}</b><span>${scope}</span><em>${desc}</em></div>`).join("")}
          </div>
        </section>
      </div>
      <aside class="market-side-column">
        <section class="card today-signals-card">
          <div class="module-head"><h2>今日信号</h2><a href="/biz/market/signals" data-link>${market.signals.length + 1} 条生效</a></div>
          ${[["AI 算力成交扩散", "重点跟踪", "行业机会"], ["半导体拥挤度升温", "风险提示", "策略风险"], ["沪深300估值仍处中位", "持续观察", "宽基估值"], ["涨停扩散率改善", "持续观察", "市场结构"]].map(([title, tag, reason], index) => `<a href="/biz/market/signals" data-link class="market-signal-item level-${index}"><div><b>${title}</b><span>${tag}</span></div><em>触发原因：${reason}</em></a>`).join("")}
        </section>
        <section class="card"><h2>ETF 排行</h2>${market.etf.map(([n, f, r]) => `<div class="rank-row"><span>${n}</span><b>${f}</b><em>${r}</em></div>`).join("")}</section>
        <section class="card valuation-card">
          <h2>宽基估值与安全边际</h2>
          <div class="valuation-head"><span>指数</span><span>PE 分位</span><span>PB 分位</span></div>
          ${valuations.map(([name, pe, pb]) => `<div class="valuation-row"><b>${name}</b>${percentileBar(pe)}${percentileBar(pb)}</div>`).join("")}
          <p class="muted">基于近10年历史数据分位数计算 · mock</p>
        </section>
        <section class="card">
          <h2>资金流向</h2>
          ${[["北向资金", "+18.42亿", "连续 3 日净流入"], ["主力净流入", "+42.60亿", "科技成长占优"], ["融资余额", "1.52万亿", "较昨日 +0.4%"]].map(([k, v, d]) => `<div class="capital-row"><b>${k}</b><strong>${v}</strong><span>${d}</span></div>`).join("")}
        </section>
        <section class="card sentiment-card">
          <h2>市场情绪</h2>
          <div class="sentiment-gauge"><b>68</b><span>风险偏好修复</span></div>
          <div class="signal-row"><b>公开边界</b><span>market overview 全部 mock · 不读取真实数据库 · 不包含真实凭据</span></div>
        </section>
      </aside>
    </div>`;
}

function renderMarketSignals(route) {
  const signals = [
    ["SIG-001", "AI 算力成交扩散", "行业机会", "深挖", "AI 算力指数 20D 超额 +4.2%，主力净流入分位升至 83%。", [["20D超额", "+4.2%"], ["资金分位", "83%"], ["触发", "动量+资金"]]],
    ["SIG-002", "半导体拥挤度升温", "策略风险", "风险", "半导体行业拥挤度 84，短线波动可能放大，策略池需要复核。", [["拥挤度", "84"], ["估值分位", "81%"], ["触发", "crowding"]]],
    ["SIG-003", "沪深300估值仍处中位", "宽基估值", "观察", "沪深300 PE(TTM) 12.43，历史分位 42%，估值修复未过热。", [["PE", "12.43"], ["分位", "42%"], ["触发", "valuation"]]],
    ["SIG-004", "涨停扩散率改善", "市场结构", "观察", "涨停行业从电子扩散到医药和计算机，亏钱效应收敛。", [["涨停行业", "7"], ["情绪", "68/100"], ["触发", "breadth"]]],
  ];
  const tagClass = (tag) => tag === "深挖" ? "deep" : tag === "风险" ? "risk" : "watch";
  const guards = [["SignalsListClient", "今日信号列表", "mart_market_signal_daily", "正常", "排序、展开、证据指标"], ["TodaySignalsCard", "市场总览信号入口", "market overview signals", "正常", "总览页跳转一致"], ["signalLevel", "信号优先级", "deep_dig/caution/observe", "正常", "深挖优先、风险次之"], ["evidence_metrics", "信号证据", "mock evidence payload", "mock", "公开版静态证据"]];
  return `
    <section class="signal-list-page">
      <header>
        <div><p>${route.family}</p><h1>${route.title}</h1><span>今日信号 · ${route.description}</span></div>
        <a href="/biz/market" data-link>返回市场总览</a>
      </header>
      <section class="market-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>SignalsListClient · TodaySignalsCard parity</span></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
      <div class="signal-summary-strip">${[["深挖", "1", "行业机会"], ["观察", "2", "估值 / 结构"], ["风险", "1", "拥挤度"], ["生效时间", "09:35", market.businessDate]].map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</div>
      <div class="signal-layout">
        <section class="signal-list">
          ${signals.map(([id, title, type, tag, desc, evidence], index) => `
            <button class="signal-card ${index === 0 ? "active" : ""}">
              <div><b>${title}</b><span class="signal-tag ${tagClass(tag)}">${tag}</span></div>
              <p>${desc}</p>
              <em>类型：${type} · 触发：${evidence[2][1]} · 时间：${market.businessDate} 09:35</em>
              <div class="evidence-metrics">${evidence.map(([k, v]) => `<span><b>${k}</b>${v}</span>`).join("")}</div>
              ${index === 0 ? `<section class="signal-expanded"><b>展开说明</b><span>AI 算力方向同时满足成交扩散、主力资金分位抬升、行业热度未进入极端拥挤区，建议进入深挖队列。</span><strong>关联页面：/biz/meso · /biz/factors · /biz/stock/[code]</strong></section>` : ""}
              <small>${id}</small>
            </button>`).join("")}
        </section>
        <aside>
          <section class="card"><h2>筛选</h2><div class="filter-pills vertical">${["全部", "深挖", "观察", "风险", "行业机会", "市场结构"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div></section>
          <section class="card"><h2>公开边界</h2>${["市场信号为 mock snapshot", "不读取真实数据库", "不调用真实模型", "不包含真实凭据"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
        </aside>
      </div>
    </section>`;
}

function renderSectorCone(route) {
  const ranking = [
    ["AI 算力", "801750.SI", 1, 86, "+2.8%", "+14.6%", "+3"],
    ["创新药", "801150.SI", 2, 73, "+1.9%", "+9.2%", "+4"],
    ["半导体", "801081.SI", 3, 66, "+1.1%", "+8.5%", "-1"],
    ["红利低波", "000922.SH", 4, 55, "+0.3%", "+4.4%", "0"],
    ["地产链", "801180.SI", 5, 38, "-0.7%", "-5.6%", "-2"],
  ];
  const guards = [["SectorLeadershipCone", "行业锥可视化", "sector cone snapshots", "mock", "公开版静态节点替代 3D 交互"], ["MesoSectorConeSection", "中观联动入口", "meso sector-cone", "正常", "行业/赛道切换结构"], ["timeline controls", "时间轴/播放/速度", "cone timeline", "mock", "播放、俯视、拖拽控件形态"], ["ranking table", "领先行业排行", "mart_sector_leadership", "正常", "rank/score/20D/60D"]];
  return `
    <section class="research-header"><div><p>${route.family}</p><h1>行业领导力锥</h1><span>${route.description}</span></div>${routeMetrics(route)}</section>
    <section class="module-guard"><b>页面健康</b><span>mock mart_sector_leadership_cone · 公开版用静态可视化替代 Three.js 场景</span></section>
    <section class="market-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>SectorLeadershipCone parity · public snapshot</span></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
    <div class="sector-page">
      <section class="card span-8 sector-cone-panel">
        <div class="module-head"><h2>轮动锥（20D 相对强弱结构）</h2><div class="filter-pills"><button class="active">行业（申万一级）</button><button>赛道（活跃概念 Top40）</button></div></div>
        <div class="cone-toolbar"><div><button>0.5×</button><button class="active">1×</button><button>2×</button></div><div><button>拖拽旋转</button><button>俯视</button><button>重置视角</button></div></div>
        <div class="cone-stage large">
          <div class="cone-rings"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
          {nodes}
        </div>
      </section>
      <section class="card span-4"><h2>选中行业</h2><div class="cone-selected"><b>AI 算力</b><span>score 86 · strong_up</span><em>20D +2.8% / 60D +14.6% / 排名上升 3</em></div><h2>领先行业排行</h2>${table(["Rank", "行业", "Score", "20D", "60D"], ranking.map(([name, code, rank, score, r20, r60]) => [rank, `<b>${name}</b><br><small>${code}</small>`, score, r20, r60]))}</section>
      <section class="card span-12"><h2>快照明细</h2>${table(["行业", "代码", "排名", "领导力分", "20D收益", "60D收益", "排名变化"], ranking)}</section>
      <section class="card span-12"><h2>公开边界</h2>${["行业锥数据为 mock 快照", "不读取真实数据库", "不加载真实 3D 资产", "不包含真实凭据"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
    </div>`.replace("{nodes}", ranking.map(([name, code, rank, score, r20], index) => `<button class="cone-node n${index}" style="--heat:${score}; --x:${12 + (index % 3) * 34}%; --y:${14 + Math.floor(index / 3) * 36}%"><b>${rank}</b><span>${name}</span><em>${r20}</em><small>${code}</small></button>`).join(""));
}

function renderMacroDetail(path, route) {
  const isRatio = path.includes("/key-ratios");
  const isFactor = path.includes("/factors/");
  const title = isRatio ? "宏观关键比值详情" : isFactor ? "宏观因子详情" : "宏观指标详情";
  const heroMeta = isRatio ? "信用/利率、库存/订单、铜金比等跨周期观察" : isFactor ? "增长、通胀、流动性和海外因子的证据墙" : "指标定义、发布节奏、历史时序和解释";
  const detailMetrics = isFactor
    ? [["Z", "+0.42"], ["3M", "+0.18"], ["分位", "64%"], ["覆盖", "92%"]]
    : isRatio
      ? [["最新", "1.08"], ["z", "+0.31"], ["分位", "61%"], ["变化", "+0.04"]]
      : [["最新", "51.6"], ["同比", "+1.2"], ["分位", "72%"], ["下一发布", "07-15"]];
  const drivers = isFactor
    ? [["PMI 新订单", "51.6", "权重 28% · Z +0.71"], ["社融脉冲", "+0.42", "权重 22% · Z +0.38"], ["PPI 同比", "-1.4%", "权重 18% · Z -0.22"], ["DR007", "1.82%", "权重 16% · Z +0.08"]]
    : isRatio
      ? [["信用脉冲", "+0.42", "辅助指标 · iFinD EDB"], ["10Y 国债", "2.28%", "辅助指标 · iFinD 行情"], ["库存订单比", "0.92", "辅助指标 · 本地 mart"], ["铜金比", "7.20", "辅助指标 · FRED mock"]]
      : [["原始值", "51.6", "主指标读数"], ["同比", "+1.2", "变化率"], ["环比", "+0.4", "短期动量"], ["Surprise", "+0.7", "预期差"]];
  const guards = isRatio
    ? [["KeyRatioDetailWorkspace", "关键比值图库", "key_ratios", "正常", "主指标 + 辅助指标"], ["keyRatioDetailConfig", "比值配置", "frontend config", "正常", "主指标、辅助指标、解释文案"], ["RatioSection", "单个比值区块", "ratio config", "正常", "标题、解释、最新值"], ["MacroTimeSeriesChart", "同步时序图", "ratio series", "mock", "公开版静态曲线"], ["AuxiliaryChartRow", "两列辅助指标", "aux indicators", "正常", "辅助指标矩阵"], ["MacroBackToTopButton", "返回顶部", "client ui", "mock", "公开版静态控件"]]
    : isFactor
      ? [["FactorDetailWorkspace", "宏观因子详情", "macro_factor_state", "正常", "主因子与驱动项"], ["MacroEvidenceWall", "证据墙", "macro_evidence", "正常", "相关指标与资产映射"], ["MacroTimeSeriesChart", "主因子时序", "factor.series", "mock", "公开版静态曲线"], ["AuxiliaryChartRow", "驱动项两列图", "factor.contributions", "正常", "贡献项矩阵"], ["AssetMapBoard", "资产映射", "macro_asset_map", "正常", "权益、债券、商品含义"], ["MacroBackToTopButton", "返回顶部", "client ui", "mock", "公开版静态控件"]]
      : [["MacroIndicatorDetailWorkspace", "宏观指标详情", "macro_indicator_detail", "正常", "指标定义与最新值"], ["indicatorExplanations", "指标解释", "indicator explanations", "正常", "口径、频率、滞后说明"], ["MacroIndicatorGalleryLoader", "全量指标图库", "indicator gallery", "mock", "公开版静态图库"], ["MacroIndicatorChartGrid", "三列时序图", "all indicators", "正常", "所有指标时序"], ["ReleaseCalendar", "发布日历入口", "macro calendar", "正常", "从日历进入详情"], ["MacroBackToTopButton", "返回顶部", "client ui", "mock", "公开版静态控件"]];
  return `
    <section class="macro-detail-page">
      <header class="macro-detail-head">
        <div><p>${route.family}</p><h1>${title}</h1><span>${heroMeta} · mock snapshot</span></div>
        ${routeMetrics(route)}
      </header>
      <a class="macro-back-link" href="/biz/macro" data-link>← 返回宏观策略</a>
      <section class="macro-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>${isRatio ? "KeyRatioDetailWorkspace" : isFactor ? "FactorDetailWorkspace" : "MacroIndicatorDetailWorkspace"} parity · public mock</span></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
      <section class="card macro-factor-hero">
        <div><p>${isRatio ? "Macro Ratio Gallery" : isFactor ? "Macro Factor · CN" : "Macro Indicator · CN"}</p><h2>${isRatio ? "关键比值与辅助指标时序" : isFactor ? "增长合成因子" : "PMI 新订单"}</h2><span>${heroMeta}</span></div>
        <div class="macro-factor-metrics">${detailMetrics.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
      </section>
      <div class="macro-detail-layout">
        <section class="card span-8">
          <div class="module-head"><h2>${isRatio ? "主指标时序" : isFactor ? "主因子时序" : "指标时序"}</h2><div class="range-tabs">${["1Y", "3Y", "5Y", "MAX"].map((x, i) => `<button class="${i === 2 ? "active" : ""}">${x}</button>`).join("")}</div></div>
          <div class="time-series-panel"></div>
          <div class="ratio-strip">${[["最新", isRatio ? "1.08" : isFactor ? "+0.42" : "51.6"], ["分位", isRatio ? "61%" : isFactor ? "64%" : "72%"], ["方向", isRatio ? "信用修复" : isFactor ? "扩张" : "改善"], ["置信", "中高"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
        </section>
        <section class="card span-4"><h2>解释信息</h2>${table(["项目", "说明"], [["频率", isRatio ? "周/月" : isFactor ? "月度聚合" : "月度发布"], ["口径", "公开版保留真实页面解释结构"], ["下一发布", "2026-07-15 10:00"], ["数据源", "mock_macro_snapshot"]])}</section>
        <section class="card span-12"><h2>${isRatio ? "辅助指标两列矩阵" : isFactor ? "驱动项两列矩阵" : "指标拆解矩阵"}</h2><div class="macro-driver-grid">${drivers.map(([name, value, desc], index) => `<div><div class="mini-time-series s${index}"></div><b>${name}</b><span>${value}</span><em>${desc}</em></div>`).join("")}</div></section>
        <section class="card span-6"><h2>证据墙</h2>${table(["证据", "最新", "解释"], [["PMI 新订单", "51.6", "增长动能改善"], ["DR007", "1.82%", "流动性平稳"], ["PPI 同比", "-1.4%", "通胀压力温和"], ["美元指数", "104.2", "外部压力缓和"]])}</section>
        <section class="card span-6"><h2>资产映射</h2>${table(["资产", "方向", "置信", "解释"], [["权益", "偏多", "中高", "增长修复"], ["利率债", "中性", "中", "流动性平稳"], ["商品", "结构性", "中", "供需分化"]])}</section>
        <section class="card span-12"><h2>公开边界</h2>${["宏观详情数据为 mock 快照", "不读取真实数据库", "不包含真实凭据", "不暴露供应商账号或内网路径"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
      </div>
    </section>`;
}

function renderMacro() {
  const coreGrid = [
    ["CN_PMI", "PMI", "制造业景气", "51.6", "Latest: 2026-06", "扩张"],
    ["CN_GDP", "GDP Nowcast", "桥接回归轻量模型", "4.86%", "2026Q2", "改善"],
    ["CN_SF", "社融脉冲", "信用传导", "¥3.20T", "Latest: 2026-06", "偏积极"],
    ["CN_M1_M2_SCISSORS", "M1-M2 剪刀差", "货币活化", "-1.6%", "Latest: 2026-06", "修复中"],
    ["CN_CPI", "CPI", "居民通胀", "0.7%", "Latest: 2026-06", "温和"],
    ["CN_PPI", "PPI", "工业品价格", "-1.4%", "Latest: 2026-06", "低位"],
  ];
  const dimensions = [["增长", "+0.42", "生产、消费、投资、订单共同改善"], ["通胀", "-0.18", "CPI 温和，PPI 仍低位"], ["流动性", "+0.22", "资金价格稳定"], ["信用", "+0.31", "社融脉冲回暖"], ["政策", "+0.27", "财政与货币协同"], ["风险偏好", "+0.14", "美元压力缓和"]];
  const crossCycle = [["CN", "复苏早段", "增长改善 / 通胀温和", "权益偏多"], ["US", "软着陆观察", "通胀回落 / 利率高位", "美债中性"], ["COMPARE", "中美剪刀差收敛", "美元压力缓和", "港股弹性"]];
  const moduleGuards = [
    ["BizMacroPage", "服务端入口", "fetchMacroOverview + fetchBizPageHealth", "正常", "summary profile 与页面健康并行读取"],
    ["ModuleError", "错误降级", "macro-overview fetch failed", "mock", "公开版展示错误形状，不暴露后端地址"],
    ["moduleWarning", "模块健康映射", "mart_macro_factor_state / mart_macro_indicator_panel", "正常", "周期状态和宏观看板健康口径"],
    ["MacroResearchWorkspace", "宏观工作台", "macro-overview?profile=summary", "正常", "总览、模式切换和资产映射壳"],
    ["MacroStateHeader", "宏观状态头部", "cycle_state + factor_state", "正常", "增长、通胀、流动性、海外总览"],
    ["CoreMacroGrid", "核心指标网格", "macro dashboard", "正常", "PMI、社融、通胀、利率等核心指标"],
    ["FactorTape", "宏观周期状态", "mart_macro_factor_state", "正常", "增长、通胀、流动性、信用、政策、风险偏好"],
    ["RegimeDiagnostics", "宏观周期状态", "mart_macro_factor_state", "正常", "HMM 持续判定、概率、观测坐标"],
    ["KeyRatioStrip", "关键比值", "mart_macro_key_ratio", "正常", "信用/利率、库存/订单、铜金比"],
    ["MacroEvidenceWall", "宏观二级证据", "mart_macro_evidence_group", "mock", "不改核心权重，只展示辅助证据"],
    ["MacroClock", "宏观象限轨迹", "mart_macro_factor_state", "正常", "增长和通胀二维轨迹"],
    ["FactorCards", "宏观因子卡", "mart_macro_factor_state", "正常", "单因子详情入口"],
    ["NowcastPanel", "GDP Nowcast", "mart_macro_nowcast", "正常", "桥接回归轻量模型结果"],
    ["SurpriseIndex", "Surprise 指数", "mart_macro_surprise_index", "mock", "高频偏离度监控"],
    ["AssetMapBoard", "多资产配置评分", "mart_macro_asset_map", "正常", "资产分数、驱动和修正项"],
    ["PortfolioPanel", "组合映射", "mart_macro_portfolio_map", "mock", "复苏弹性、稳健防御、久期资产"],
    ["ReleaseCalendar", "发布日历", "mart_macro_release_calendar", "正常", "下一次发布时间"],
    ["HighFreqBoard", "高频监控", "mart_macro_highfreq", "正常", "周度和日频观察项"],
  ];
  const evidenceGroups = [
    ["中国增长辅助证据", [["PMI 新订单", "51.6", "+1.2", "同步指标"], ["工业开工率", "68.4%", "+2.1", "高频"], ["地产销售", "-8.6%", "+1.4", "候选"], ["出口运价", "112.4", "+3.8", "候选"], ["挖机开工", "61.2%", "+0.9", "高频"]]],
    ["中国通胀辅助证据", [["PPI 同比", "-1.4%", "+0.3", "核心"], ["南华工业品", "2184", "+1.8", "高频"], ["猪价", "15.8", "-0.6", "候选"], ["CPI 服务", "1.1%", "+0.1", "核心"], ["原油", "82.6", "+2.2", "外部"]]],
  ];
  const assetScores = [
    ["A股", "沪深300", "偏多", 82, "增长修复 + 信用改善", ["增长", "信用", "估值中位"]],
    ["港股", "恒生科技", "偏多", 76, "美元压力缓和，弹性更高", ["美元", "风险偏好", "盈利弹性"]],
    ["利率债", "10Y 国债", "中性", 52, "流动性平稳但增长修复压制久期", ["DR007", "期限利差"]],
    ["商品", "铜", "结构性", 61, "铜金比稳定，供需分化", ["铜金比", "库存周期"]],
  ];
  const highfreq = [["地铁客运", "周频", "+3.4%", "消费活动改善"], ["钢厂开工", "周频", "68.4%", "生产修复"], ["票据利率", "日频", "1.62%", "融资需求温和"], ["BDI", "日频", "1840", "外需韧性"]];
  return `
    <section class="macro-console">
      <div class="macro-top">
        <div>
          <p>Macro Research Console</p>
          <h1>宏观策略研究</h1>
          <span>CN · 复苏早段 · 增长改善 / 通胀温和 · mock snapshot</span>
        </div>
        <div class="mode-tabs">${["中国", "美国", "中美对比"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div>
      </div>
      <div class="macro-summary-grid">
        <div class="macro-state"><b>当前状态</b><strong>${macro.quadrant}</strong><span>2026-06 · HMM 持续判定 / 本月观测坐标</span></div>
        <div>${metric("覆盖度", "92%", "核心指标已接入")}</div>
        <div>${metric("GDP 预测", macro.nowcast, "2026Q2 · 桥接回归轻量模型")}</div>
        <div>${metric("政策脉冲", "偏积极", "利率与财政协同")}</div>
      </div>
      <section class="card macro-diagnostics">
        <div><b>当前状态（HMM 持续判定）</b><span>过渡中：持续判定 复苏早段 / 当前数据偏 扩张</span><em>置信 64% · 内部状态 RECOVERY_EARLY</em></div>
        <div><b>HMM 状态概率</b><div class="prob-bars compact">${[["复苏", 64], ["过热", 18], ["衰退", 11], ["滞胀", 7]].map(([label, value]) => `<p><span>${label}</span><b style="width:${value}%"></b><em>${value}%</em></p>`).join("")}</div></div>
        <div><b>本月观测坐标</b><span>复苏</span><em>仅作本月观测坐标，不替代持续判定。</em></div>
        <div><b>诊断细节</b><span>文案映射 v1</span><em>持续判定 64% / 本月观测 72%</em></div>
      </section>
      <div class="macro-workspace">
        <section class="card span-12 macro-module-guard-grid"><div class="module-head"><h2>组件级更新护栏</h2><span>MacroResearchWorkspace · ModuleUpdateGuard parity · mock page health</span></div>${moduleGuards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>
        <section class="card span-12"><div class="module-head"><h2>核心宏观指标</h2><span class="muted">对应真实 CoreMacroGrid · mock series</span></div><div class="core-macro-grid">${coreGrid.map(([code, title, sub, value, latest, state], index) => `<div><header><b>${title}</b><span>${code}</span></header><strong>${value}</strong><em>${latest} · ${state}</em><div class="mini-time-series s${index % 4}"></div><p>${sub}</p></div>`).join("")}</div></section>
        <section class="card span-8"><h2>HMM 状态概率</h2><div class="prob-bars">${[["复苏", 64], ["过热", 18], ["衰退", 11], ["滞胀", 7]].map(([label, value]) => `<div><span>${label}</span><b style="width:${value}%"></b><em>${value}%</em></div>`).join("")}</div></section>
        <section class="card span-4"><h2>本月观测坐标</h2><div class="quadrant"><span></span><b>复苏</b></div><p class="muted">仅作本月观测坐标，不替代持续判定。</p></section>
        <section class="card span-8"><h2>核心因子墙</h2><div class="factor-tape">${macro.factors.map(([name, desc, state]) => `<div class="factor ${state}"><b>${name}</b><strong>${state === "positive" ? "+0.42" : "-0.18"}</strong><span>${desc}</span><a href="/biz/macro/factors/${name === "增长" ? "growth_momentum" : "inflation_pressure"}" data-link>详情</a></div>`).join("")}</div></section>
        <section class="card span-4"><h2>Nowcast</h2>${table(["目标季度", "预测", "方法"], [["2026年第2季度", macro.nowcast, "桥接回归轻量模型"], ["2026年第3季度", "4.72%", "mock pending"]])}</section>
        <section class="card span-12 macro-evidence-wall"><div class="module-head"><div><p>Evidence Wall</p><h2>中国二级证据</h2></div><span>不改核心权重</span></div>${evidenceGroups.map(([title, items]) => `<div class="macro-evidence-group"><h3>${title}</h3><div>${items.map(([name, value, change, tier], index) => `<article><header><b>${name}</b><em>${tier}</em></header><strong>${value}</strong><span>${change}</span><div class="mini-time-series s${index % 4}"></div></article>`).join("")}</div></div>`).join("")}</section>
        <section class="card span-6 macro-clock-card"><h2>宏观时钟</h2><div class="macro-clock"><span class="axis x"></span><span class="axis y"></span>${[["2026-03", 42, 58], ["2026-04", 48, 53], ["2026-05", 54, 47], ["2026-06", 61, 42]].map(([label, x, y], index) => `<i class="p${index}" style="left:${x}%;top:${y}%"><b>${index + 1}</b><em>${label}</em></i>`).join("")}<strong>复苏</strong></div><p class="muted">增长动能右移，通胀仍处温和区间；仅展示 mock 轨迹。</p></section>
        <section class="card span-6 macro-factor-cards"><h2>因子卡片</h2>${dimensions.map(([name, value, desc]) => `<a href="/biz/macro/factors/${name === "增长" ? "growth_momentum" : name === "通胀" ? "inflation_pressure" : "liquidity"}" data-link><b>${name}</b><strong>${value}</strong><span>${desc}</span></a>`).join("")}</section>
        <section class="card span-12"><h2>维度墙</h2><div class="dimension-wall">${dimensions.map(([name, value, desc]) => `<div><b>${name}</b><strong>${value}</strong><span>${desc}</span></div>`).join("")}</div></section>
        <section class="card span-6"><h2>跨周期矩阵</h2>${table(["模式", "状态", "解释", "资产线索"], crossCycle)}</section>
        <section class="card span-6 macro-asset-board"><div class="module-head"><div><h2>多资产配置评分</h2><span>2026-06 · 评分 -2 到 +2</span></div><em>置信度 中高</em></div><p class="asset-claim">增长修复早段，权益和港股弹性优于久期资产；若海外利率再上行则降低风险资产评分。</p>${assetScores.map(([asset, sub, label, score, reason, drivers]) => `<article><header><div><b>${asset}${sub ? ` · ${sub}` : ""}</b><span>${reason}</span></div><em>${label}</em></header><div class="asset-score"><i style="width:${score}%"></i></div><footer>${drivers.map((driver) => `<small>${driver}</small>`).join("")}</footer></article>`).join("")}<div class="asset-modifiers">${["港股 +0.3 · 美元回落", "商品 -0.2 · 库存偏高", "利率债 -0.1 · 增长修复"].map((item) => `<span>${item}</span>`).join("")}</div></section>
        <section class="card span-6"><h2>关键比值</h2>${table(["比值", "当前", "分位", "含义"], [["信用/利率", "1.08", "61%", "信用修复"], ["库存/订单", "0.92", "44%", "补库早段"], ["铜金比", "7.2", "56%", "风险偏好稳定"]])}<a class="macro-inline-link" href="/biz/macro/key-ratios" data-link>查看关键比值图库</a></section>
        <section class="card span-4"><h2>发布日历</h2>${macro.calendar.map(([d, n, t]) => `<div class="calendar-row"><b>${d}</b><span>${n}</span><em>${t}</em></div>`).join("")}</section>
        <section class="card span-8"><h2>高频观察 / Surprise</h2>${table(["指标", "最新值", "方向", "解释"], [["PMI 新订单", "51.6", "扩张", "增长动能改善"], ["PPI 同比", "-1.4%", "低位", "通胀压力温和"], ["DR007", "1.82%", "稳定", "流动性平稳"], ["美元指数", "104.2", "回落", "外部压力缓和"]])}</section>
        <section class="card span-6"><h2>利率与流动性</h2><div class="rates-board">${[["DR007", "1.82%", "资金价格平稳"], ["10Y 国债", "2.28%", "长端利率震荡"], ["期限利差", "64bp", "曲线偏陡"], ["信用利差", "92bp", "风险补偿温和"]].map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</div></section>
        <section class="card span-6"><h2>收益率曲线</h2><div class="yield-curve"><span style="height:38px"></span><span style="height:62px"></span><span style="height:82px"></span><span style="height:92px"></span><span style="height:104px"></span></div><div class="curve-labels"><span>1Y</span><span>3Y</span><span>5Y</span><span>10Y</span><span>30Y</span></div></section>
        <section class="card span-6"><h2>组合映射</h2>${table(["组合", "建议", "权重", "说明"], [["复苏弹性", "增配", "35%", "权益与顺周期"], ["稳健防御", "持有", "30%", "红利与低波"], ["久期资产", "中性", "20%", "利率债"], ["商品链", "结构性", "15%", "铜金比观察"]])}</section>
        <section class="card span-6 macro-backtest"><h2>状态回测</h2><div class="backtest-bars">${[["复苏", 68], ["过热", 42], ["滞胀", 26], ["衰退", 58]].map(([name, score]) => `<div><span>${name}</span><b style="height:${score}px"></b><em>${score}%</em></div>`).join("")}</div><p>真实页 RegimeBacktestPanel 形状，公开版展示 mock 胜率和历史表现。</p></section>
        <section class="card span-6 macro-risk-gauge"><h2>地缘与宏观风险</h2><div class="risk-gauge"><b>42</b><span>中性偏低</span></div>${["海外利率高位压制估值", "地产链需求恢复慢于预期", "PPI 修复弱于名义库存周期"].map((item) => `<div class="signal-row"><b>!</b><span>${item}</span></div>`).join("")}</section>
        <section class="card span-6 macro-highfreq-board"><h2>高频监控</h2>${highfreq.map(([name, freq, value, desc]) => `<div><span>${name}</span><b>${value}</b><em>${freq} · ${desc}</em></div>`).join("")}</section>
        <section class="card span-12"><h2>公开边界</h2>${["宏观数据为 mock 快照", "不读取真实数据库", "不包含真实凭据", "不暴露供应商账号或内网路径"].map((item) => `<div class="signal-row"><b>✓</b><span>${item}</span></div>`).join("")}</section>
      </div>
    </section>`;
}

function renderAlphaSelector(title, options = ["等权基础", "事件增强", "IC 加权"]) {
  return `
    <div class="alpha-selector">
      <div><b>${title}</b>${options.map((item, index) => `<button class="${index === 0 ? "active" : ""}">${item}</button>`).join("")}</div>
      <span>快照：${market.businessDate} · lineage: mock-a1b2c3d4</span>
    </div>`;
}

function renderAlphaPanel(title, body, extra = "") {
  return `<section class="alpha-panel ${extra}"><div class="alpha-panel-head"><h2>${title}</h2><span>DUCKDB MOCK · public demo</span></div>${body}</section>`;
}

function renderAlphaMarketStrip() {
  const items = [["上证指数", "3068.22", "+0.31%"], ["深证成指", "9820.14", "+0.45%"], ["创业板指", "1842.91", "-0.18%"], ["沪深300", "3924.18", "+0.42%"]];
  return `<section class="alpha-market-strip">${items.map(([name, close, chg]) => `<div><span>${name}</span><b>${close}</b><em class="${chg.startsWith("-") ? "down" : "up"}">${chg}</em></div>`).join("")}<p>市场数据日期：${market.businessDate} / 滞后天数：0 · public mock overview</p></section>`;
}

function renderAlphaModuleGuards(path) {
  const key = path.includes("/signals") ? "signals" : path.includes("/portfolio") ? "portfolio" : path.includes("/attribution") ? "attribution" : path.includes("/optimizer") ? "optimizer" : path.includes("/news") ? "news" : "models";
  const shared = [
    ["AlphaLabShell", "终端外壳", "alpha_lab page health", "正常", "市场指数、引擎参数、终端 tab 和 page health"],
    ["useAlphaLabOverview", "总览数据 hook", "api/biz/alpha-lab/overview", "mock", "公开版静态 overview payload"],
    ["useBizPageHealth", "页面健康刷新", "alpha_lab", "正常", "refresh=true，按当前 tab 标记数据健康"],
    ["useAlphaLabTheme", "主题状态", "localStorage.alpha_lab_theme", "mock", "仅保存前端偏好，不连接真实账户"],
    ["fetchAlphaLab", "缓存和并发保护", "CACHE_MS=60000", "mock", "保留 cache/inflight 语义，数据来自静态 payload"],
    ["moduleWarning", "数据告警条", "module_status", "正常", "空数据、延迟、错误态统一入口"],
  ];
  const specific = {
    models: [
      ["AlphaLabModelsPage", "模型注册矩阵", "mart_alpha_score", "正常", "模型注册、IC、IR、因子权重"],
      ["LoadingState", "模型注册表加载态", "模型注册表", "正常", "对齐“正在查询模型注册表...”"],
      ["ErrorState", "策略注册表错误态", "alpha_model_job", "正常", "读取失败时保留错误边界"],
      ["EmptyState", "模型注册表空态", "mart_alpha_score", "正常", "提示等待 alpha_model_job"],
      ["ParameterInfoBar", "运行参数条", "model_params", "mock", "截面、窗口、回测周期公开 mock"],
      ["QepmExplainLayer", "QEPM 解释层", "qepm_attribution", "正常", "跳转归因中心"],
      ["ModelRegistryMatrix", "模型注册表格", "model_registry", "正常", "method/status/backtest 标签"],
      ["FactorWeights", "因子权重", "factor_weights", "mock", "价值、质量、动量、风险权重静态展示"],
      ["BacktestStatus", "回测状态", "strategy_eval", "正常", "IC、IR、换手、胜率和回撤摘要"],
    ],
    signals: [
      ["AlphaLabSignalsPage", "实时信号终值", "mart_signal_latest", "正常", "模型选择、交易簿、信号漏斗"],
      ["StrategySelector", "策略选择器", "strategy_code", "正常", "3 个策略选项与 query 参数语义一致"],
      ["LoadingState", "信号加载态", "latest_signals", "正常", "查询信号簿时保留骨架"],
      ["ErrorState", "信号错误态", "mart_signal_latest", "正常", "读取失败时可见错误边界"],
      ["EmptyState", "信号空态", "total_buy,total_sell", "正常", "无信号时保留提示"],
      ["SignalOrderBook", "实时截面信号交易簿", "signal_order_book", "mock", "BUY/SELL/WATCH 静态信号"],
      ["FilterStats", "过滤统计", "mart_signal_funnel", "正常", "候选、过滤、多空、冷却"],
      ["StockLinks", "标的跳转", "ts_code", "mock", "股票代码链接到公开个股页"],
      ["MetadataBar", "信号元数据", "latest_date,total_buy,total_sell", "正常", "日期和多空数量对齐真实契约"],
    ],
    portfolio: [
      ["AlphaLabPortfolioPage", "策略模拟组合", "mart_target_portfolio", "正常", "目标权重、持仓 sleeve"],
      ["NavPanel", "组合净值", "sim_nav", "正常", "NAV、IR、回撤和成本"],
      ["DailyPnlSource", "今日 PnL 来源", "qepm_daily_pnl", "mock", "因子、成本、事件拆分"],
      ["SectorExposureCard", "行业持仓暴露", "mart_sector_exposure", "正常", "行业权重和上限"],
      ["OrderSummaryCard", "订单执行摘要", "mart_alpha_orders", "mock", "成交、拒单、成本"],
      ["RiskConstraintLogCard", "风控约束日志", "mart_risk_events", "正常", "行业上限、T+1、跌停"],
      ["EventSignalCard", "事件增强", "mart_alpha_event_signal", "mock", "事件方向和持仓联动"],
      ["DrawdownSection", "回撤下钻", "drawdown_detail", "正常", "峰值、低点、订单、风控"],
    ],
    attribution: [
      ["AlphaLabAttributionPage", "QEPM 归因中心", "qepm_attribution", "正常", "因子、执行、约束归因"],
      ["StrategySelector", "策略选择器", "strategy_code", "正常", "按策略切换归因视角"],
      ["StatusBadge", "快照状态徽章", "snapshot,lineage", "正常", "状态、快照日期和 lineage 一起展示"],
      ["StateBlock", "加载/错误/空态", "attribution_state", "正常", "loading、error、empty 对齐真实页面"],
      ["MetricCard", "PnL 指标卡", "pnl_summary", "mock", "总收益、Alpha、成本、约束损耗"],
      ["FactorContribution", "因子贡献", "qepm_factor_attribution", "正常", "暴露、因子收益、贡献"],
      ["ExecutionAttribution", "执行归因", "qepm_execution_attribution", "mock", "成本、拒单、跳过 Alpha"],
      ["ConstraintAttribution", "约束归因", "qepm_constraint_attribution", "正常", "行业上限和交易约束"],
      ["TableBlock", "归因表格组件", "factor/execution/constraint tables", "正常", "三类归因表保持同一列结构"],
    ],
    optimizer: [
      ["AlphaLabOptimizerPage", "优化对照", "shadow_optimizer_result", "正常", "Shadow vs 生产组合"],
      ["StrategySelector", "策略选择器", "strategy_code", "正常", "按策略切换优化预览"],
      ["StatusBadge", "优化快照徽章", "snapshot,lineage", "正常", "展示 shadow 批次和生产参考"],
      ["StateBlock", "加载/错误/空态", "optimizer_state", "正常", "loading、error、empty 对齐真实页面"],
      ["OptimizerMetrics", "优化指标", "optimizer_constraints", "正常", "Alpha、Risk、Turnover、TC"],
      ["TransferCoefficient", "转移系数", "transfer_coefficient", "mock", "Shadow 与生产组合相似度"],
      ["ShadowWeights", "Shadow 权重", "shadow_optimizer_weight", "mock", "权重、风险、成本"],
      ["ProductionWeights", "生产当前组合", "mart_target_portfolio", "正常", "生产持仓和目标参考"],
      ["DiffTable", "组合差异表", "optimizer_weight_diff", "正常", "delta、risk、cost、action"],
    ],
    news: [
      ["AlphaLabNewsPage", "舆情情绪矩阵", "mart_news_entity", "正常", "新闻入库、实体、情绪"],
      ["StateBlock", "加载/错误/空态", "news_state", "正常", "loading、error、empty 对齐真实页面"],
      ["NewsIngestMatrix", "新闻入库矩阵", "news_ingest_matrix", "正常", "标题、时间、来源、情绪、实体"],
      ["NewsDedup", "新闻去重", "mart_news_dedup", "正常", "去重新闻和渠道标签"],
      ["LinkedTsCodeChips", "实体股票标签", "linked_ts_codes", "mock", "新闻到股票代码的公开 mock 关联"],
      ["ChannelTags", "渠道标签", "source_channel", "正常", "公告、媒体、社媒、研报渠道"],
      ["SentimentMatrix", "情绪矩阵", "mart_news_sentiment", "mock", "正负面和强度"],
      ["SignalLink", "信号联动", "mart_signal_news_link", "正常", "情绪到 Alpha 信号"],
      ["LimitParam", "查询上限", "limit=50", "正常", "保留真实 useAlphaLabSection 参数形状"],
    ],
  };
  const guards = [...shared, ...specific[key]];
  return `<section class="alpha-module-guard-grid"><div class="alpha-panel-head"><h2>组件级更新护栏</h2><span>AlphaLabShell · ModuleUpdateGuard parity</span></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>`;
}

function renderAlphaLabContent(path, route) {
  const guardGrid = renderAlphaModuleGuards(path);
  if (path.endsWith("/signals")) {
    const rows = [["600519.SH", "贵州茅台", "0.842", "96.2%", "91.4%", "0D", "BUY", market.businessDate], ["300750.SZ", "宁德时代", "0.791", "92.8%", "88.1%", "1D", "BUY", market.businessDate], ["688981.SH", "中芯国际", "0.732", "88.4%", "85.0%", "0D", "WATCH", market.businessDate], ["000651.SZ", "格力电器", "-0.284", "18.6%", "24.2%", "2D", "SELL", market.businessDate]];
    return `
      ${renderAlphaSelector("模型选择：")}
      ${guardGrid}
      <div class="alpha-terminal-grid">
        ${renderAlphaPanel("实时截面信号交易簿", table(["证券代码", "证券名称", "预测分值", "截面分位", "行业分位", "冷却", "交易指令", "生效日期"], rows), "span-8")}
        ${renderAlphaPanel("信号漏斗", `<div class="alpha-funnel">${[["候选池", 512], ["过滤后", 128], ["多头", 36], ["空头", 18], ["冷却", 12]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>${table(["过滤项", "数量", "说明"], [["ST / 停牌", "8", "交易约束"], ["涨跌停", "5", "不可成交"], ["行业上限", "11", "风险预算"]])}`, "span-4")}
        ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>信号表为 mock，不读取 mart_signal_latest 真实库，不包含真实凭据</span></div>`, "span-12")}
      </div>`;
  }
  if (path.endsWith("/portfolio")) {
    const holdings = [["600519.SH", "贵州茅台", "8.2%", "7.8%", "+0.42%", "alpha"], ["300750.SZ", "宁德时代", "6.4%", "6.0%", "+0.31%", "event_positive"], ["601138.SH", "工业富联", "5.6%", "5.2%", "+0.28%", "alpha"], ["688981.SH", "中芯国际", "4.1%", "3.6%", "-0.12%", "risk"]];
    const perf = [["最新组合净值 (NAV)", "1.0864", "单位净值"], ["回测累计收益", "+8.64%", "累计收益"], ["沪深300超额回报", "+4.18%", "相对沪深300"], ["组合信息比率 (IR)", "0.72", "信息比率"], ["策略最大回撤", "-3.20%", "最大回撤"], ["风控约束违规", "3 次", "触发次数"], ["现金余额", "128.6万", "可用现金"]];
    const sectorExposure = [["食品饮料", "18.2%", 91], ["电力设备", "14.6%", 73], ["电子", "13.1%", 66], ["半导体", "9.8%", 49], ["医药生物", "8.4%", 42]];
    const orderSummary = [["已成交", "28", "good"], ["部分成交", "4", "warn"], ["已拒单", "3", "bad"], ["平均成本", "0.0018", "neutral"]];
    const orderRows = [["BUY", "600519.SH", "已成交", "strategy target", "8.2%", "0.0002"], ["BUY", "300750.SZ", "部分成交", "event overlay", "6.4%", "0.0004"], ["SELL", "000651.SZ", "已拒单", "跌停不可卖出", "0.0%", "0.0000"], ["BUY", "688981.SH", "已拒单", "行业上限", "3.6%", "0.0006"]];
    const riskRows = [["2026-06-30", "688981.SH", "IndustryCap", "5.2%", "3.6%", "行业上限"], ["2026-06-30", "600519.SH", "TradingConstraint", "8.6%", "8.2%", "T+1 锁定"], ["2026-06-29", "000651.SZ", "LimitDown", "2.2%", "0.0%", "跌停不可卖出"]];
    const events = [["内部人增持", "300750.SZ", "正向事件", "BUY +0.18", "event_positive"], ["公告减持预案", "000651.SZ", "负向事件", "SELL -0.16", "event_negative"], ["行业上限", "688981.SH", "风控事件", "削减 1.6%", "risk"]];
    const drawdowns = [["2026-05-08", "2026-05-19", "2026-06-03", "-3.20%", "14", "3"], ["2026-04-02", "2026-04-09", "2026-04-18", "-2.41%", "9", "2"], ["2026-03-12", "2026-03-18", "2026-03-27", "-1.86%", "7", "1"]];
    return `
      ${renderAlphaSelector("当前回测策略：")}
      ${guardGrid}
      <div class="alpha-terminal-grid">
        ${renderAlphaPanel("绩效与风险 Metadata Strip", `<div class="alpha-kpi-row dense">${perf.map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</div>`, "span-12")}
        ${renderAlphaPanel("模拟投资组合累计收益走势", `<div class="alpha-nav-chart"></div><div class="alpha-kpi-row">${[["NAV", "1.0864"], ["IR", "0.72"], ["最大回撤", "-3.20%"], ["执行成本", "0.0018"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>${table(["交易日期", "单位净值", "单日变动", "调仓双边换手"], [["2026-06-30", "1.0864", "+0.42%", "6.1%"], ["2026-06-27", "1.0818", "-0.18%", "4.8%"], ["2026-06-26", "1.0837", "+0.36%", "5.4%"]])}`, "span-8")}
        ${renderAlphaPanel("Pipeline Logs", `<div class="alpha-log">${["alpha_model_job 成功 42s · Alpha 模型打分", "signal_generator_job 成功 31s · 交易信号生成", "portfolio_job 成功 58s · 组合构建与模拟回测", "event_overlay_job mock · 事件增强已脱敏"].map((line) => `<p>&gt; ${line}</p>`).join("")}</div>`, "span-4")}
        ${renderAlphaPanel("组合实际持仓分配热力", `<div class="alpha-sleeve-filter">${["全部", "策略", "正向事件", "负向事件", "风控"].map((item, index) => `<button class="${index === 0 ? "active" : ""}">${item}</button>`).join("")}</div>${table(["代码", "名称", "持仓权重", "目标权重", "当日 PnL", "Sleeve"], holdings)}`, "span-8")}
        ${renderAlphaPanel("行业持仓暴露", `<div class="alpha-sector-bars">${sectorExposure.map(([name, value, width]) => `<div><span>${name}</span><b><i style="width:${width}%"></i></b><em>${value}</em></div>`).join("")}</div>`, "span-4")}
        ${renderAlphaPanel("订单执行摘要", `<div class="alpha-order-summary">${orderSummary.map(([label, value, tone]) => `<div class="${tone}"><span>${label}</span><b>${value}</b></div>`).join("")}</div>${table(["方向", "代码", "状态", "原因", "目标权重", "成本"], orderRows)}`, "span-6")}
        ${renderAlphaPanel("系统风控及主动调仓交易约束日志", table(["风控日期", "代码", "规则", "约束前", "约束后", "原因"], riskRows), "span-6")}
        ${renderAlphaPanel("事件增强", table(["事件", "对象", "方向", "信号联动", "Sleeve"], events), "span-6")}
        ${renderAlphaPanel("投资组合核心回撤区间透视分析", `<div class="alpha-drawdown-stack">${drawdowns.map(([peak, trough, recovery, drawdown, orders, risks], index) => `<article class="${index === 0 ? "active" : ""}"><b>${peak} → ${trough}</b><span>复原: ${recovery}</span><em>${drawdown}</em><small>区间订单 ${orders} · 风控事件 ${risks}</small></article>`).join("")}</div>${table(["峰值日", "低点日", "复原日", "回撤幅度", "区间订单", "风控事件"], drawdowns)}`, "span-6")}
        ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>组合、订单、NAV 均为 mock，不读取真实 sim_nav / mart_target_portfolio，不包含运行时凭据</span></div>`, "span-12")}
      </div>`;
  }
  if (path.endsWith("/attribution")) {
    return `
      ${renderAlphaSelector("归因策略：", ["基础等权", "事件增强", "IC 加权"])}
      ${guardGrid}
      <div class="alpha-terminal-grid">
        ${renderAlphaPanel("QEPM 指标", `<div class="alpha-kpi-row">${[["总 PnL", "+0.62%"], ["因子 PnL", "+0.48%"], ["成本 PnL", "-0.06%"], ["执行成本", "0.0012"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>`, "span-12")}
        ${renderAlphaPanel("因子贡献", table(["因子", "暴露", "因子收益", "贡献"], [["质量", "0.42", "+0.38%", "+0.16%"], ["价值", "0.31", "+0.22%", "+0.07%"], ["动量", "0.28", "+0.51%", "+0.14%"], ["事件", "0.16", "+0.62%", "+0.10%"]]), "span-6")}
        ${renderAlphaPanel("执行归因", table(["Gross Alpha", "拒单 Alpha", "换手成本", "跳过 Alpha", "事件换手"], [["+0.74%", "-0.03%", "-0.06%", "-0.02%", "+0.11%"]]), "span-6")}
        ${renderAlphaPanel("约束归因", table(["代码", "约束前", "约束后", "差异", "原因", "TC"], [["688981.SH", "5.2%", "3.6%", "-1.6%", "行业上限", "0.71"], ["000651.SZ", "2.2%", "0.0%", "-2.2%", "SELL_SIGNAL", "0.00"]]), "span-12")}
        ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>归因数据为 mock，不读取真实 PnL，不暴露真实交易约束参数</span></div>`, "span-12")}
      </div>`;
  }
  if (path.endsWith("/optimizer")) {
    return `
      ${renderAlphaSelector("优化策略：")}
      ${guardGrid}
      <div class="alpha-terminal-grid">
        ${renderAlphaPanel("Shadow Optimizer Metrics", `<div class="alpha-kpi-row dense">${[["Shadow Alpha", "0.0184"], ["Shadow Risk", "0.0421"], ["Turnover", "18.2%"], ["Shadow Cost", "0.0016"], ["Prod Gross", "0.94"], ["Gross Delta", "+0.07"], ["TC", "0.823"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>`, "span-12")}
        ${renderAlphaPanel("Shadow 权重", table(["代码", "权重", "预期 Alpha", "风险", "换手", "成本", "约束"], [["600519.SH", "8.6%", "0.020", "0.041", "2.1%", "0.0002", "PASS"], ["300750.SZ", "6.8%", "0.025", "0.052", "3.4%", "0.0004", "PASS"], ["688981.SH", "3.2%", "0.031", "0.071", "4.8%", "0.0006", "IndustryCap"]]), "span-6")}
        ${renderAlphaPanel("生产实际持仓", table(["代码", "持仓权重", "目标权重", "排名", "行业", "原因", "Sleeve"], [["600519.SH", "8.2%", "7.8%", "96%", "食品饮料", "strategy target", "alpha"], ["300750.SZ", "6.4%", "6.0%", "93%", "电力设备", "event overlay", "event_positive"], ["688981.SH", "4.1%", "3.6%", "88%", "半导体", "industry cap", "risk"]]), "span-6")}
        ${renderAlphaPanel("Shadow vs 生产持仓差异", table(["代码", "Shadow", "生产持仓", "目标参考", "差异"], [["600519.SH", "8.6%", "8.2%", "7.8%", "+0.4%"], ["300750.SZ", "6.8%", "6.4%", "6.0%", "+0.4%"], ["688981.SH", "3.2%", "4.1%", "3.6%", "-0.9%"]]), "span-12")}
        ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>优化器输出为 mock，不运行真实求解器，不暴露真实约束或运行时凭据</span></div>`, "span-12")}
      </div>`;
  }
  if (path.endsWith("/news")) {
    const news = [["06-30 09:12", "创新药出海订单密集落地，机构关注研发兑现节奏", "eastmoney,stock", "300760.SZ / 600276.SH"], ["06-30 10:28", "算力链需求延续，液冷服务器板块热度上行", "eastmoney,industry", "601138.SH / 300308.SZ"], ["06-30 13:40", "半导体设备国产替代推进，短线拥挤度抬升", "eastmoney,concept", "688981.SH / 002371.SZ"]];
    return `
      ${guardGrid}
      <div class="alpha-terminal-grid">
        ${renderAlphaPanel("东财新闻入库矩阵 (News Ingest Matrix)", table(["入库时间", "新闻标题与正文", "渠道标签", "关联实体"], news), "span-12 alpha-news-table")}
        ${renderAlphaPanel("舆情情绪矩阵", table(["实体", "新闻数", "正面", "负面", "信号联动"], [["AI 算力", "42", "61%", "12%", "BUY +0.18"], ["创新药", "31", "54%", "16%", "WATCH +0.09"], ["半导体", "28", "39%", "24%", "Risk -0.06"]]), "span-8")}
        ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>新闻、实体、情绪均为 mock，不抓取真实内容，不包含真实凭据</span></div>`, "span-4")}
      </div>`;
  }
  const modelRows = [["AQ-AM-EQ-BASE", "等权基础模型", "等权配置", statusBadge("success"), "0.061", "0.72", "价值 / 质量 / 动量"], ["AQ-AM-EQ-FULL", "等权含事件", "事件增强", statusBadge("running"), "0.057", "0.68", "价值 / 事件 / 低波"], ["AQ-AM-IC-BASE", "IC 加权模型", "IC 倒数加权", statusBadge("success"), "0.064", "0.75", "成长 / 质量 / 动量"], ["AQ-AM-NEWS", "新闻情绪研究", "shadow", statusBadge("warning"), "0.027", "0.31", "新闻 / 实体 / 情绪"]];
  return `
    <div class="alpha-info-bar">
      <div>已注册多因子模型：<b>4 UNITS</b></div>
      <div>就绪运行状态：<b>2 个模型</b></div>
      <div>基准：<b>沪深300（行业上限 20%）</b></div>
    </div>
    ${guardGrid}
    <div class="alpha-terminal-grid">
      ${renderAlphaPanel("量化选股模型评测矩阵 (Alpha Models Registry)", table(["模型编号 ID", "策略模型名称", "回测权重配置方法", "系统状态", "信息 IC 分", "信息比 IR", "关联特征因子"], modelRows), "span-8")}
      ${renderAlphaPanel("QEPM 解释层", `<div class="alpha-kpi-row">${[["信息期限样本", "6"], ["状态", "研究态"], ["最近快照", market.businessDate], ["Lineage", "mock-a1b2c3d4"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div><a href="/biz/alpha-lab/attribution" data-link>查看归因中心</a>`, "span-4")}
      ${renderAlphaPanel("模型因子权重", table(["模型", "价值", "成长", "质量", "动量", "事件"], [["AQ-AM-EQ-BASE", "25%", "20%", "30%", "25%", "0%"], ["AQ-AM-EQ-FULL", "20%", "18%", "24%", "22%", "16%"], ["AQ-AM-IC-BASE", "18%", "28%", "26%", "28%", "0%"]]), "span-6")}
      ${renderAlphaPanel("公开边界", `<div class="signal-row"><b>✓</b><span>模型注册矩阵为 mock，不读取真实 mart_alpha_score，不包含真实凭据</span></div>`, "span-6")}
    </div>`;
}

function renderAlphaLab(path) {
  const route = currentRoute(path) || currentRoute("/biz/alpha-lab");
  const alphaTabs = [
    ["模型注册矩阵", "/biz/alpha-lab/models", ""],
    ["实时信号终值", "/biz/alpha-lab/signals", ""],
    ["策略模拟组合", "/biz/alpha-lab/portfolio", ""],
    ["归因中心", "/biz/alpha-lab/attribution", "研究态"],
    ["优化对照", "/biz/alpha-lab/optimizer", "Shadow"],
    ["舆情情绪矩阵", "/biz/alpha-lab/news", ""],
  ];
  return `
    <section class="alpha-shell">
      <div class="alpha-meta">
        <div><p>球球量化投研终端 (QIUQIU QUANT) / Active Quant Lab Pro</p><h1>主动量化实验室</h1></div>
        <div class="engine"><span></span> 系统引擎：public mock | 数据库：${alpha.database}（离线快照）</div>
        <div class="alpha-command"><b>&gt;_</b><span>量化命令：</span><code>./alpha-lab --strategy=ALL --extract=mock --engine=public-snapshot</code><em>连接状态：离线 mock，无真实连接</em></div>
      </div>
      <div class="alpha-tickers">${alpha.indices.map(([n, c, p]) => `<div><b>${n}</b><span>${c.toFixed(2)}</span>${pct(p)}</div>`).join("")}</div>
      <div class="alpha-market-date">市场数据日期：${market.businessDate} / 滞后天数：0 / mock snapshot</div>
      <div class="alpha-tabs">${alphaTabs.map(([tab, href, badge]) => `<a href="${href}" data-link class="${path === href || (path === "/biz/alpha-lab" && href.endsWith("/models")) ? "active" : ""}"><span>${tab}</span>${badge ? `<em>${badge}</em>` : ""}</a>`).join("")}</div>
      <div class="alpha-terminal">
        <div class="terminal-glow"></div>
        ${renderAlphaLabContent(path === "/biz/alpha-lab" ? "/biz/alpha-lab/models" : path, route)}
      </div>
    </section>`;
}

function renderStock() {
  return `
    <div class="biz-grid">
      <section class="card span-12"><h2>个股 / 指数搜索工作台</h2><p class="muted">公开版使用 mock 池，展示真实球球投研的研究表格结构。</p>${table(["代码", "名称", "行业/类型", "收盘", "涨跌幅", "AI 摘要"], stockRows.map(([code, name, ind, close, chg, note]) => [code, name, ind, close, pct(chg), note]))}</section>
      <section class="card span-6"><h2>价格趋势</h2><div class="sparkline"></div></section>
      <section class="card span-6"><h2>质量信号</h2>${["ROE 稳定", "现金流改善", "估值处历史中位", "机构关注度上升"].map((x) => `<div class="signal-row"><b>✓</b><span>${x}</span></div>`).join("")}</section>
    </div>`;
}

function renderGenericBiz(path) {
  const route = currentRoute(path);
  if (path.startsWith("/biz/alpha-lab")) return renderAlphaLab(path);
  if (path === "/biz/ai/hero-demo" && route) return renderAiHeroDemo(route);
  if (path === "/biz/ai/mecha-sketch" && route) return renderAiMechaSketch(route);
  if (path === "/biz/market/signals" && route) return renderMarketSignals(route);
  if (path === "/biz/market/sector-cone" && route) return renderSectorCone(route);
  if (path === "/biz/macro") return renderMacro();
  if ((path === "/biz/macro/key-ratios" || path.startsWith("/biz/macro/factors/") || path.startsWith("/biz/macro/indicator/")) && route) return renderMacroDetail(path, route);
  if (path === "/biz/ai" && route) return renderAiWorkbench(path, route);
  if (route?.family === "Index" || route?.family === "Index Research") return renderIndexResearch(route);
  if (route?.family === "Stock" || route?.family === "Stock Research") return renderStockResearch(path, route);
  if (route?.family === "Factor Pool") return renderFactorPool(route);
  if (route?.family === "Factor Library") return renderFactorLibrary(path, route);
  if (route?.family === "Meso" || route?.family === "Meso Research") return renderMeso(route);
  if (route) return renderRoutePage(path, route);
  const title = path.includes("meso") ? "中观研究" : path.includes("factor-library") ? "因子库" : path.includes("factors") ? "因子与策略库" : "市场总览";
  return `
    <div class="biz-grid">
      <section class="card span-8"><h2>${title}</h2><p class="insight">该 public demo 复刻真实球球投研的页面入口和信息结构，数据全部为 mock。你可以从顶部导航切换到市场、宏观、个股、因子库和主动量化。</p></section>
      <section class="card span-4">${metric("模块状态", "可用")}${metric("业务日", "2026-06-30")}</section>
      <section class="card span-12">${table(["模块", "依赖表", "状态", "说明"], [["研究工作区", "mart_public_workspace", statusBadge("success"), "公开 mock 快照"], ["信号列表", "mart_public_signal", statusBadge("success"), "mock 数据"], ["AI 摘要", "public_ai_summary", statusBadge("warning"), "不调用真实模型"]])}</section>
    </div>`;
}

function renderBiz(path) {
  const body = path === "/biz/market" ? renderBizMarket() : renderGenericBiz(path);
  return `${renderTopNav(path)}<main class="biz-page">${body}</main>`;
}

function opsShell(path, title, description, body) {
  const contentMode = path === "/ops/dag" ? "dag" : "compact";
  return `
    <main class="ops-shell">
      <aside class="ops-sidebar">
        <div class="ops-batch">
          <div class="ops-batch-title">${iconSlot("warning", "批次状态")}<div><b>批次：2026-07-01</b><em>状态：healthy | SLA：97.4%</em></div></div>
          <a href="/ops/jobs?status=failed" data-link>重跑失败任务</a>
        </div>
        <nav>${opsNav.map(([label, href, icon]) => `<a href="${href}" data-link class="${path === href ? "active" : ""}">${iconSlot(icon, label)}${label}</a>`).join("")}</nav>
      </aside>
      <section class="ops-main">
        <header class="ops-header">
          <div class="ops-heading"><b>投资智能平台</b><h1>${title}</h1><p>${description}</p></div>
          <div class="ops-actions"><button>日期</button><button>刷新</button><button>导出</button><a href="/biz/market" data-link title="切换到前台业务系统">${iconSlot("insights", "前台")}</a><button title="设置">${iconSlot("settings", "设置")}</button><button title="用户">${iconSlot("account_circle", "用户")}</button><button data-logout title="退出">${iconSlot("logout", "退出")}</button></div>
        </header>
        <div class="ops-content"><div class="ops-content-frame ${contentMode}">${body}<footer class="ops-compliance-footer"><span>© 球球投研 Public Demo · mock 数据仅用于工程演示，不构成投资建议。</span><span>京ICP备2024044293号-3</span><span>京公网安备11010602202577号</span></footer></div></div>
      </section>
    </main>`;
}

function renderOpsEntryGuard(component, source, detail) {
  return `<section class="ops-card ops-entry-guard"><div class="ops-card-head"><div><h2>组件入口护栏</h2><p>${component} · real page entry parity</p></div>${statusBadge("success")}</div><div class="chain-row"><b>${component}</b><span>${source}</span><em>${detail}</em></div></section>`;
}

function renderOpsOverview(path) {
  const o = ops.overview;
  const detail = ops.pageHealthDetail;
  const body = `
    ${renderOpsEntryGuard("OpsOverviewPage", "fetchOpsOverview + fetchOpsLayerSummary + fetchOpsDomainSummary + fetchOpsPageHealth + fetchOpsSlaOverview + fetchOpsTaskRuns", "总览、分层、主题域、页面健康、SLA 和最近 runs 初始数据")}
    <section class="ops-card page-health-card">
      <div class="ops-card-head"><div><h2>业务健康</h2><p>按 /biz 页面真实依赖的 mart 快照判断用户侧可用性</p></div></div>
      <div class="page-health-strip">${ops.pageHealth.map(([name, route, status, date, fail, windows]) => `<button class="${status}"><div><b>${name}</b>${statusBadge(status)}</div><span>${route}</span><em>${date} · 异常模块 ${fail} · 产出窗口 ${windows}</em></button>`).join("")}</div>
      <div class="page-health-detail">
        <div class="detail-title"><div><b>${detail.displayName}</b><span>${detail.route}</span></div><em>当前业务日 ${detail.businessDate} · 检查 ${detail.lastCheckedAt}</em></div>
        <div class="detail-grid">
          <div><h3>失败模块</h3>${detail.failingModules.map(([module, source, rule, message, observed, expected]) => `<div class="detail-row"><b>${module}</b><code>${source} · ${rule}</code><span>${message}</span><em>observed ${observed} / expected ${expected}</em></div>`).join("")}</div>
          <div><h3>责任 job</h3>${detail.blockingJobs.map(([source, name, tableName]) => `<div class="detail-row"><b>${name}</b><code>${tableName}</code><span>${source}</span></div>`).join("")}</div>
        </div>
        <h3>模块产出窗口</h3>
        <div class="schedule-grid">${detail.schedules.map(([module, source, release, state, producer, latest, duration]) => `<div class="schedule-row"><div><b>${module}</b><code>${source}</code></div><div><span>最早 ${release}</span><em>${state}</em><small>${producer} · 最近成功 ${latest} · 耗时 ${duration}</small></div></div>`).join("")}</div>
      </div>
    </section>
    <div class="ops-metrics">
      ${opsMetric("任务定义数", o.total, "analytics")}
      ${opsMetric("成功", o.success, "check_circle", "", "green")}
      ${opsMetric("失败", o.failed, "error", "", "red")}
      ${opsMetric("运行中", o.running, "autorenew", "", "amber")}
      ${opsMetric("跳过/警告", o.warning, "warning", "", "orange")}
      ${opsMetric("成功率", "93.0%", "percent")}
      ${opsMetric("SLA", `${o.sla}%`, "timer", "", "violet")}
    </div>
    <div class="ops-grid">
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>任务成功率趋势 (24H)</h2><p>按 job 最新状态统计，空桶保持基线</p></div></div><div class="ops-chart"></div><div class="chart-axis">${["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map((x) => `<span>${x}</span>`).join("")}</div></section>
      <section class="ops-card"><div class="ops-card-head"><div><h2>告警区</h2><p>最近 5 条 open 告警（当前 3 条）</p></div></div>${o.alerts.map(([level, text]) => `<div class="alert-row ${level}"><b>${level}</b><span>${text}</span><em>09:${level === "critical" ? "36" : "2" + o.alerts.indexOf(o.alerts.find((a) => a[0] === level))}</em></div>`).join("")}</section>
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>主题域任务成功率</h2><p>按 job 最新状态统计，不代表业务页健康度</p></div></div><div class="domain-tiles">${ops.domains.map(([label, rate, stats, issue]) => `<div class="${rate < 96 ? "warn" : ""}"><span></span><b>${label}</b><strong>${rate}%</strong><em>${stats}</em>${issue ? `<small>提示 · ${issue}</small>` : ""}</div>`).join("")}</div></section>
      <section class="ops-card"><div class="ops-card-head"><div><h2>关键链路区</h2><p>ODS / CLEANED / MART 分层状态</p></div></div>${ops.keyPaths.map(([layer, status, label, jobs, issues]) => `<div class="chain-block"><div class="chain-row"><b>${layer}</b><span>${statusBadge(status)} ${label}</span><em>${jobs}</em></div>${issues.length ? `<div class="chain-issues">${issues.map(([state, name, msg]) => `<p><b>${state}</b><span>${name}</span><em>${msg}</em></p>`).join("")}</div>` : ""}</div>`).join("")}</section>
    </div>`;
  return opsShell(path, "总览驾驶舱", "监控今日投研数据跑批整体健康度与资产可用性", body);
}

function renderOpsJobs(path) {
  const modes = [["incremental", "增量"], ["backfill", "回补"], ["rebuild", "重建"]];
  const body = `
    ${renderOpsModuleGuards("jobs")}
    <div class="ops-metrics">${opsMetric("今日任务", ops.overview.total, "analytics")}${opsMetric("成功", ops.overview.success, "check_circle", "", "green")}${opsMetric("失败", ops.overview.failed, "error", "", "red")}${opsMetric("队列等待", ops.queue.pending, "pending", "worker 可领取 PENDING", "orange")}${opsMetric("依赖阻塞", ops.queue.blocked, "account_tree", "父任务失败的子任务", "amber")}${opsMetric("可疑运行中", ops.queue.stale, "sync_problem", `worker: ${ops.queue.worker}`, "red")}</div>
    <section class="ops-card queue-console">
      <div class="ops-card-head"><div><h2>队列摘要</h2><p>对应真实 OpsJobQueueSummary：PENDING / BLOCKED / STALE / worker 心跳</p></div><button>刷新队列</button></div>
      <div class="queue-cells">${[["PENDING", ops.queue.pending, "worker 可领取"], ["BLOCKED", ops.queue.blocked, "父任务失败"], ["STALE RUNNING", ops.queue.stale, "运行态失真"], ["WORKER", ops.queue.worker, "mock-worker-01"]].map(([k, v, d]) => `<div><b>${k}</b><strong>${v}</strong><span>${d}</span></div>`).join("")}</div>
    </section>
    <div class="ops-warning-strip">
      <div><b>PENDING 子任务被失败父任务阻塞</b><span>mart_stock_research_panel <= cleaned_stock_daily (failed) | financial_reports_arrival <= exchange_notice_fetch (warning)</span></div>
      <div><b>RUNNING 状态可能已失真</b><span>暂无 stale running · 公开版仅展示真实诊断形状</span></div>
    </div>
    <section class="ops-card"><div class="ops-toolbar"><input placeholder="搜索任务（任务名 / task_id / 域）" /><button>FILTER</button><button>刷新</button></div><div class="ops-filter-row"><select><option>状态：全部</option><option>成功</option><option>运行中</option><option>失败</option></select><select><option>层级：全部</option><option>ods</option><option>cleaned</option><option>mart</option></select><select><option>调度：全部</option><option>cron</option><option>依赖触发</option><option>manual</option></select></div></section>
    <div class="jobs-layout">
      <section class="ops-card jobs-table"><div class="ops-card-head"><div><h2>任务列表</h2><p>点击行查看任务详情和依赖影响</p></div></div>${table(["任务名称", "层级", "状态", "域", "调度周期", "调度时间", "最近完成", "耗时"], ops.tasks.map(([id, name, layer, status, domain, schedule, time, dur]) => [`<b>${name}</b><br><small>${id}</small>`, `<span class="layer">${layer}</span>`, statusBadge(status), domain, schedule, time, "2026-07-01 09:38", dur]))}</section>
      <aside class="ops-card job-detail"><div class="ops-card-head"><div><h2>任务详情</h2><p>mart_stock_research_panel</p></div>${statusBadge("failed")}</div><div class="job-kv"><div><span>层级</span><b>mart</b></div><div><span>主题域</span><b>股票</b></div><div><span>调度时间</span><b>上游完成后</b></div></div><div class="job-action-row"><button>查看完整日志</button><button>重跑当前任务</button><button>级联重跑下游</button></div><div class="job-section"><h3>错误摘要</h3><div class="log-box">KeyError: mock_missing_factor_column<br>公开版仅演示错误解释，不连接真实日志。</div><div class="explain-box"><b>业务解释：</b><span>任务执行出现异常，当前需要结合日志进一步定位根因。</span><b>建议处理：</b><span>优先查看完整日志，确认报错阶段后再执行重跑。</span></div></div><div class="job-section"><h3>重跑参数</h3><div class="rerun-box"><label>日期窗口<input value="2026-06-30 ~ 2026-07-01" /></label><div>${modes.map(([id, label], index) => `<button class="${index === 0 ? "active" : ""}">${label}<small>${id}</small></button>`).join("")}</div><textarea>public demo rerun reason: 验证任务详情形状，不入队</textarea></div></div><div class="job-section"><h3>级联重跑预览</h3><div class="cascade-preview">${["mart_stock_research_panel", "stock_page_health_check", "factor_snapshot_refresh"].map((item, index) => `<div><b>${index + 1}</b><span>${item}</span><em>${index === 0 ? "selected" : "downstream"}</em></div>`).join("")}</div></div><div class="job-section"><h3>依赖影响</h3><div class="dep-grid"><div><b>上游依赖</b><span>cleaned_stock_daily</span><span>factor_snapshot_job</span></div><div><b>下游影响</b><span>stock_research_page</span><span>ops_page_health</span></div></div></div><div class="job-section"><h3>运行历史</h3>${table(["Run", "状态", "开始", "耗时"], [["run_mock_0940", statusBadge("failed"), "09:40:12", "42s"], ["run_mock_0920", statusBadge("success"), "09:20:01", "38s"], ["run_mock_0900", statusBadge("success"), "09:00:04", "41s"]])}</div><div class="job-section"><h3>受影响资产</h3><ul><li>mart_stock_research_panel</li><li>mart_stock_factor_exposure_daily</li><li>/biz/stock/[code]</li></ul></div></aside>
    </div>`;
  return opsShell(path, "任务运行监控", "监控批处理任务执行状态，快速识别失败、阻塞、超时与异常波动任务", body);
}

function renderOpsDetail(path, detail) {
  const body = `
    <div class="ops-metrics">${detail.metrics.map(([label, value, desc]) => metric(label, value, desc || "")).join("")}</div>
    <div class="ops-grid">
      ${detail.sections.map(([title, headers, rows], index) => `
        <section class="ops-card ${index === 0 ? "span-2" : ""}">
          <h2>${title}</h2>
          ${table(headers, rows)}
        </section>
      `).join("")}
      <section class="ops-card">
        <h2>公开边界</h2>
        ${["只读取 public mock snapshot", "不连接真实数据库", "不包含运行时凭据", "不暴露内网路径"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}
      </section>
    </div>`;
  return opsShell(path, detail.title, detail.description, body);
}

function renderOpsDag(path) {
  const lanes = [
    ["外部来源", ["Tushare", "iFinD", "交易所公告", "新闻源"]],
    ["贴源数据", ["ods_ts_daily", "ods_if_edb_series", "ods_ts_news"]],
    ["清洗宽表", ["cleaned_stock_daily", "cleaned_macro_factor", "cleaned_news_entity"]],
    ["基础集市", ["mart_market_overview_daily", "mart_index_research_daily", "mart_factor_snapshot"]],
    ["派生集市", ["mart_factor_validation_result", "mart_signal_latest", "sim_nav"]],
    ["功能页面", ["市场总览", "指数研究", "宏观研究", "主动量化"]],
  ];
  const body = `
    ${renderOpsEntryGuard("OpsDagPage", "fetchTableDagGraph", "真实入口读取表级 DAG graph；公开版转为 mock graph")}
    <div class="ops-metrics">${opsMetric("节点", "64", "account_tree")}${opsMetric("依赖边", "92", "hub")}${opsMetric("关键路径", "7", "speed", "", "amber")}${opsMetric("阻塞", "2", "warning", "", "orange")}</div>
    <div class="ops-warning-strip">
      <div><b>公开演示边界</b><span>DAG、任务元信息、页面消费关系均为 mock snapshot，不读取真实调度库、日志或内网配置。</span></div>
    </div>
    <section class="ops-card dag-control-panel">
      <div class="ops-card-head"><div><h2>血缘视图控制</h2><p>模拟真实 DAG 页面选择节点、播放流向、筛选层级和查看窗口策略。</p></div><button>播放数据流</button></div>
      <div class="dag-control-grid">${[["选中节点", "mart_market_overview_daily"], ["高亮范围", "上游 + 下游"], ["流速", "0.5x"], ["窗口策略", "latest"], ["重建策略", "requires reason"], ["页面消费", "market / ai / freshness"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
    </section>
    <div class="dag-detail-layout">
      <section class="ops-card dag-card">
        <div class="ops-card-head"><div><h2>DAG 数据流</h2><p>外部来源 → ODS → CLEANED → MART → 功能页面，公开版只展示 mock 图谱。</p></div><div class="dag-legend">${lanes.map(([label]) => `<span>${label}</span>`).join("")}</div></div>
        <div class="dag-board">${lanes.map(([label, nodes]) => `<div class="dag-lane"><h3>${label}</h3>${nodes.map((node, index) => `<div class="dag-node ${label === "功能页面" ? "page" : index === 0 ? "active" : ""}"><b>${node}</b><span>${label}</span><em>${label === "功能页面" ? "consumer" : index === 0 ? "selected" : "healthy"}</em></div>`).join("")}</div>`).join("")}</div>
      </section>
      <aside class="ops-card dag-inspector"><div class="ops-card-head"><div><h2>选中节点</h2><p>mart_market_overview_daily</p></div>${statusBadge("success")}</div><div class="job-kv"><div><span>层级</span><b>基础集市</b></div><div><span>Domain</span><b>market</b></div><div><span>Window</span><b>latest</b></div></div><h3>上游路径</h3><div class="dag-path">${["Tushare", "ods_ts_daily", "cleaned_market_daily", "mart_market_overview_daily"].map((x, i) => `<span>${i + 1}. ${x}</span>`).join("")}</div><h3>消费页面</h3>${["市场总览", "AI 投研问答", "Ops 新鲜度"].map((x) => `<div class="chain-row"><span>${x}</span>${statusBadge("success")}</div>`).join("")}<h3>调度元信息</h3>${table(["字段", "值"], [["producerJob", "mart_market_overview_daily_job"], ["resourceLock", "analytics_market_write"], ["retry", "1:30s / 2:2m"], ["timeout", "15m"]])}</aside>
    </div>
    <div class="ops-grid">
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>页面映射</h2><p>mart 表到 biz 页面消费关系</p></div></div>${table(["mart 表", "页面", "健康", "影响"], [["mart_market_overview_daily", "市场总览", statusBadge("success"), "市场状态和 AI 感知"], ["mart_index_research_daily", "指数研究", statusBadge("success"), "指数详情"], ["mart_stock_research_panel", "个股研究", statusBadge("warning"), "价格/财务/因子"], ["mart_factor_validation_result", "因子库", statusBadge("success"), "准入验证"], ["mart_signal_latest", "主动量化", statusBadge("success"), "实时信号终值"], ["sim_nav", "主动量化", statusBadge("success"), "组合 NAV"]])}</section>
      <section class="ops-card"><h2>公开边界</h2>${["DAG 为 mock graph", "不读取真实任务日志", "不暴露内网路径", "不包含运行时凭据"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>
    </div>`;
  return opsShell(path, "DAG", "展示外部来源、贴源、清洗宽表、集市和功能页面之间的数据流", body);
}

function renderOpsAiRuns(path) {
  const runRows = [["09:20", "Smart · deepseek-v4-flash", "4.2s", "今天市场怎么样", "双路 · deep", "3", "2", "4.5", "—"], ["09:28", "Balanced · mock", "2.1s", "宏观状态如何", "单路 · normal", "2", "0", "4.2", "4"], ["09:36", "Fast · fallback", "1.2s", "解释个股风险", "fallback", "0", "0", "3.1", "—"]];
  const routeMeta = [["档位", "Smart"], ["模型", "deepseek-v4-flash"], ["模式", "cloud"], ["思考档", "深度"], ["主路径", "cloud"], ["最终路径", "structured+wiki"]];
  const body = `
    ${renderOpsEntryGuard("OpsAiRunsPage", "fetchOpsAiRuns + fetchOpsAiRunsSummary", "Run 列表、分页、summary、trace 和人工评分入口")}
    <div class="ops-metrics">${opsMetric("Runs", "23", "memory")}${opsMetric("Coverage", "4.5", "check_circle", "", "green")}${opsMetric("Grounding", "4.3", "analytics", "", "green")}${opsMetric("Fallback", "4.3%", "alt_route")}${opsMetric("Wiki 命中", "82.0%", "article", "", "violet")}${opsMetric("待复核", "2", "warning", "", "orange")}</div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>Plan 形状分布</h2><p>planner lanes / depth / fallback 统计</p></div></div><div class="plan-shapes">${["双路 · deep: 8", "单路 · normal: 12", "fallback: 1"].map((item) => `<span>${item}</span>`).join("")}</div></section>
    <div class="ai-runs-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>Run 列表</h2><p>点击行查看 planner、工具、wiki、合成与打分链路</p></div><div class="ai-run-pager"><span>第 1 / 2 页 · 1-3 / 23</span><select><option>10</option><option>20</option><option>50</option></select></div></div>${table(["时间", "模型", "耗时", "问题", "Plan", "工具", "文章", "自动分", "人工"], runRows)}<div class="ops-pagination"><button disabled>上一页</button><span>page 1</span><button>下一页</button></div></section>
      <aside class="ops-card run-detail"><div class="ops-card-head"><div><h2>全量 Trace</h2><p>run_mock_0920 · Smart · deepseek-v4-flash</p></div>${statusBadge("warning")}</div><div class="trace-lane">${["Planner", "Tools", "Wiki", "Synthesis", "Score"].map((x, i) => `<div><b>${i + 1}</b><span>${x}</span></div>`).join("")}</div><div class="score-grid">${[["Coverage", "4.5"], ["Grounding", "4.3"], ["Human", "—"], ["Duration", "4.2s"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div><div class="route-meta-grid">${routeMeta.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div><div class="trace-question"><span>问题</span><b>今天市场怎么样？</b><em>Resolved: 市场总览 + 行业轮动 + 风险偏好</em></div><div class="json-panel"><b>Planner reason</b><pre>用户询问市场状态，需要同时读取结构化市场快照和 wiki 口径说明。</pre></div><div class="json-panel"><b>Codex prompt</b><pre>使用公开 mock 数据回答市场状态，引用市场总览、今日信号和行业轮动，不调用真实模型或外部数据源。</pre></div><div class="json-panel"><b>Plan</b><pre>{"lanes":["structured","unstructured"],"depth":"deep","route":"cloud"}</pre></div><div class="json-panel"><b>工具调用</b><pre>[{"tool":"market.snapshot","ok":true},{"tool":"wiki.search","ok":true},{"tool":"factor.registry.lookup","ok":true}]</pre></div><div class="json-panel"><b>Wiki 文章</b><pre>[{"title":"市场总览口径","hit":true},{"title":"行业轮动说明","hit":true}]</pre></div><div class="json-panel"><b>Synthesis</b><pre>{"answer_gist":"风险偏好修复，AI 算力和创新药更强，红利低波降温。","citations":2}</pre></div><div class="json-panel"><b>最终答案与 quality_eval</b><pre>市场处于震荡偏强，成交扩散改善，但半导体拥挤度需要观察。\n{"coverage":4.5,"grounding":4.3,"needs_review":true}</pre></div><div class="json-panel"><b>错误兜底链</b><pre>[]</pre></div><div class="human-score-box"><label>人工分<input type="number" min="1" max="5" step="0.5" value="4" /></label><div><span>标签</span><div class="review-tags">${["好", "差", "选错工具", "选错文章", "幻觉", "漏数据", "路由错", "规划差"].map((x, i) => `<button class="${i === 0 ? "active" : ""}">${x}</button>`).join("")}</div></div><label>修正<textarea>公开 demo：仅展示人工复核表单形态，不保存到真实评分表。</textarea></label><button>保存人工打分</button></div></aside>
    </div>`;
  return opsShell(path, "AI 投研 Runs", "复核 planner、工具、wiki、合成与打分链路", body);
}

function renderOpsMcp(path) {
  const toolRows = [["wiki.search", "知识库检索", "query, limit, filters", "42", "100%", "180ms"], ["market.snapshot", "市场快照", "date, symbols", "35", "100%", "96ms"], ["ai.run_trace", "AI run 追踪", "run_id", "18", "98%", "420ms"], ["factor.registry.lookup", "正式因子检索", "factor_id, include_usage", "31", "99%", "260ms"]];
  const callRows = [["09:31", "wiki.search", statusBadge("success"), "完整", "120ms", "biz.ai", "8e12a9f0"], ["09:32", "market.snapshot", statusBadge("success"), "完整", "88ms", "biz.market", "91b0f31a"], ["09:34", "ai.run_trace", statusBadge("warning"), "部分", "420ms", "ops.ai-runs", "f02a77ce"], ["09:36", "factor.registry.lookup", statusBadge("success"), "完整", "210ms", "biz.factor-library", "4bc1a928"]];
  const qualityRows = [["full", "104", "82.5%", "可直接用于回答"], ["partial", "19", "15.1%", "需要降级或补充来源"], ["empty", "2", "1.6%", "返回空集合"], ["error", "1", "0.8%", "工具错误或超时"]];
  const body = `
    ${renderOpsEntryGuard("OpsMcpPage", "fetchOpsMcpTools + fetchOpsMcpCalls + fetchOpsMcpCallSummary", "工具注册、调用列表和 24h 质量摘要")}
    <div class="ops-metrics">${opsMetric("已注册工具", "8", "extension")}${opsMetric("24h 调用", "126", "history", "", "green")}${opsMetric("24h 成功率", "99.2%", "verified_user", "最慢 p95 420ms", "green")}${opsMetric("部分返回", "15.1%", "rule", "需要复核来源", "orange")}</div>
    <div class="mcp-tabs"><button class="active">Tools</button><button>Calls</button><button>Quality</button></div>
    <div class="mcp-layout">
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>工具注册态</h2><p>工具名、白名单说明、输入 schema 摘要、调用健康度</p></div><span>active=tools</span></div>${table(["Tool", "说明", "输入摘要", "24h 调用", "成功率", "p95"], toolRows)}</section>
      <aside class="ops-card mcp-tool-detail"><div class="ops-card-head"><div><h2>工具详情</h2><p>wiki.search</p></div>${statusBadge("success")}</div>${table(["字段", "值"], [["暴露范围", "biz.ai / ops.ai-runs"], ["输入字段", "query, limit, filters"], ["输出质量", "full / partial / empty / error"], ["调用限制", "只读检索"], ["参数策略", "公开版仅展示 args hash"]])}</aside>
    </div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>最近调用</h2><p>公开版只保留调用元信息，不展示真实参数和凭据。</p></div><select><option>全部工具</option><option>wiki.search</option><option>market.snapshot</option><option>factor.registry.lookup</option></select></div>${table(["时间", "Tool", "结果", "质量", "耗时", "Caller", "Args Hash"], callRows)}</section>
    <div class="mcp-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>调用质量分布</h2><p>对应真实组件里的 dataQualityLabel 聚合。</p></div></div>${table(["质量", "调用数", "占比", "处理建议"], qualityRows)}</section>
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>Schema 摘要</h2><p>仅展示字段名，不展示真实参数。</p></div></div><div class="schema-grid">${toolRows.map(([name, desc, schema]) => `<div><b>${name}</b><span>${desc}</span><em>${schema}</em></div>`).join("")}</div></section>
    </div>
    <section class="ops-card"><h2>公开边界</h2>${["工具输入为 mock schema 摘要", "不暴露真实参数", "不包含真实凭据", "不连接真实 MCP 服务"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "MCP 服务清单", "查看已注册工具、白名单暴露范围与最近调用健康度", body);
}

function renderOpsModuleGuards(key) {
  const groups = {
    jobs: [["OpsJobsPage", "任务运行监控", "fetchOpsTasks", "正常", "任务列表、状态、详情侧栏"], ["OpsJobQueueSummary", "队列摘要", "fetchOpsJobQueueSummary", "mock", "pending、blocked、stale、workerState"], ["triggerOpsJob", "单任务重跑", "api/ops/jobs/{task}/trigger", "mock", "模式、日期窗口、reason"], ["triggerOpsCascadeRun", "级联重跑", "api/ops/jobs/{task}/cascade", "mock", "dry-run 预览和下游影响"], ["fetchOpsRunLog", "完整日志", "ops_run_log", "mock", "公开版仅展示脱敏错误摘要"], ["OpsFilterControls", "筛选搜索", "client_filter", "正常", "状态、层级、调度周期"]],
    orchestrator: [["OpsOrchestratorPage", "调度编排", "orchestrator_preview", "正常", "root job、dry-run、DAG 预览"], ["fetchOpsOrchestratorPreview", "预览 API", "api/ops/orchestrator/preview", "mock", "公开版静态 preview"], ["RuntimeSummary", "运行态摘要", "resource_locks / job_queue", "mock", "当前持锁、retry 队列、runtime 源"], ["RetryChips", "重试策略", "retry_policy", "正常", "attempt delay 与 timeout"], ["LockCoverage", "资源锁覆盖", "resource_locks", "正常", "域锁和 target tables"], ["RootJobSelector", "Root job 切换", "query.root_job", "mock", "只改变展示形状，不入队"]],
    backups: [["OpsBackupsPage", "生产备份", "fetchOpsBackupStatus", "正常", "备份状态、mock 对象面、策略和恢复清单"], ["BackupPathTable", "备份对象 mock 面", "backup_components", "正常", "业务层、raw、控制面、本地 staging mock"], ["PolicyItem", "备份策略", "public_backup_policy", "mock", "周备份、队列保护、一致性"], ["LatestBackupRun", "最近一次备份", "latest-backup.json", "mock", "公开版脱敏 manifest"], ["ColdBackupTarget", "冷备目标", "mock runtime / backup roots", "mock", "仅展示 mock 路径"], ["RestoreChecklist", "恢复演练", "manual_runbook", "正常", "四步只读 smoke 流程"]],
    assets: [["OpsAssetsPage", "资产产出监控", "fetchOpsAssets", "正常", "资产列表、可用率、异常资产"], ["AssetDetailPanel", "资产详情", "ops_asset_detail", "mock", "根因、影响页面、日志片段"], ["acknowledgeOpsAlert", "告警确认", "ops_alerts", "mock", "公开版按钮不落库"], ["triggerOpsJob", "失败依赖重跑", "ops_jobs", "mock", "只展示动作形状"]],
    freshness: [["OpsFreshnessPage", "新鲜度监控", "fetchOpsFreshness", "正常", "业务日期、预期日期、延迟原因"], ["OpsSearchInput", "表名搜索", "client_filter", "mock", "公开版静态筛选控件"], ["FreshnessStatusBadge", "状态徽标", "freshness_status", "正常", "正常/延迟/缺失"], ["ImpactHintRows", "影响提示", "mart_to_page", "正常", "末层 mart 到业务页面"]],
    quality: [["OpsQualityPage", "质量监控", "fetchOpsQuality + fetchOpsQualityOverview", "正常", "规则结果与质量分"], ["RuleDistribution", "规则类型分布", "quality_distribution", "正常", "完整性、唯一性、非空性"], ["QualitySamplesDrawer", "异常样本抽屉", "quality_samples", "mock", "公开版脱敏样本"], ["StatusBadge", "规则结果", "quality_result", "正常", "pass/warning/fail"]],
    alerts: [["OpsAlertsPage", "告警中心", "fetchOpsAlerts", "正常", "open 级别统计和列表"], ["OpsFilterControls", "告警筛选", "client_filter", "mock", "级别、类型、状态"], ["AlertActions", "处理动作", "alert_actions", "mock", "确认、忽略、恢复不落库"], ["AlertDetail", "告警详情", "alert_payload", "mock", "对象、影响页面、处理动作"]],
    performance: [["OpsPerformancePage", "资源性能监控", "fetchPerfOverview", "正常", "系统资源和外部源延迟"], ["OpsLineChart", "CPU/内存趋势", "system_history", "mock", "公开版曲线"], ["PerfBar", "数据源延迟", "source_metrics", "正常", "平均延迟、成功率、调用量"], ["SlowJobPanel", "慢任务", "ops_job_runtime", "正常", "耗时与基线对照"]],
    sla: [["OpsSlaPage", "SLA 监控", "ops_sla", "正常", "今日达成率与逾期明细"], ["OpsLineChart", "7天 SLA 趋势", "fetchOpsSlaTrend", "mock", "公开版趋势点"], ["BreachTable", "逾期明细", "fetchOpsSlaBreaches", "正常", "截止、完成、逾期分钟"], ["DomainSlaMatrix", "业务域 SLA", "sla_domain_rollup", "mock", "市场、宏观、财报、Alpha"]],
  };
  const guards = groups[key] || [];
  return `<section class="ops-module-guard-grid"><div class="ops-card-head"><div><h2>组件级更新护栏</h2><p>OpsShell · SectionCard · MetricCard parity · public mock page health</p></div></div>${guards.map(([component, module, source, state, detail]) => `<div class="${state === "正常" ? "ok" : "mock"}"><b>${component}</b><span>${module}</span><code>${source}</code><em>${detail}</em></div>`).join("")}</section>`;
}

function renderOpsAssets(path) {
  const body = `
    ${renderOpsModuleGuards("assets")}
    <div class="ops-metrics">${opsMetric("核心资产可用率", "97.8%", "inventory_2", "", "red")}${opsMetric("异常资产", "3", "warning", "", "red")}${opsMetric("受影响看板", "2", "dashboard", "", "orange")}</div>
    <div class="asset-monitor-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>数据资产明细</h2><p>最终投研资产可用性、质量、新鲜度和依赖任务</p></div></div>${table(["资产名称", "类型", "主题域", "依赖任务", "最新日期", "是否可用"], [["mart_market_overview_daily", "指标宽表", "市场", "市场总览 Mart 快照", "2026-06-30", statusBadge("success")], ["mart_stock_research_panel", "指标宽表", "股票", "个股研究面板", "2026-06-30", statusBadge("warning")], ["mart_macro_indicator_panel", "指标宽表", "宏观", "宏观 cleaned 归一", "2026-06-30", statusBadge("warning")], ["mart_factor_validation_result", "指标宽表", "因子库", "因子准入验证", "2026-06-30", statusBadge("success")]])}</section>
      <aside class="ops-card asset-detail"><div class="ops-card-head"><div><h2>资产详情</h2><p>mart_stock_research_panel</p></div>${statusBadge("warning")}</div><div class="job-kv"><div><span>类型</span><b>指标宽表</b></div><div><span>主题域</span><b>股票</b></div><div><span>最新日期</span><b>2026-06-30</b></div></div><div class="job-section"><h3>根因分析</h3>${table(["项", "值"], [["失败依赖任务", "cleaned_stock_daily"], ["影响页面", "/biz/stock/[code]"], ["关联告警", "ALERT_STOCK_PANEL_001"]])}</div><div class="job-section"><h3>执行日志片段</h3><div class="log-box">KeyError: mock_missing_factor_column<br>公开版仅展示日志片段形状，不读取真实日志。</div></div><button>确认告警</button><button>强制重跑失败依赖</button></aside>
    </div>
    <section class="ops-card"><h2>公开边界</h2>${["资产数据为 mock snapshot", "不连接真实 PostgreSQL / DuckDB", "不暴露真实日志", "不包含运行时凭据"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "数据资产产出监控", "追踪最终投研数据资产可用性与质量状态", body);
}

function renderOpsFreshness(path) {
  const rows = [
    ["mart_market_overview_daily", "MART", "市场数据", statusBadge("success"), "2026-06-30", "2026-06-30", "—", "—", "市场总览"],
    ["mart_macro_indicator_panel", "MART", "宏观", statusBadge("warning"), "2026-06-29", "2026-06-30", "源端滞后", "宏观总览", "宏观研究"],
    ["mart_stock_research_panel", "MART", "股票", statusBadge("warning"), "2026-06-29", "2026-06-30", "链路滞后", "个股研究 / 因子与策略池", "个股研究"],
    ["cleaned_stock_daily", "CLEANED", "股票", statusBadge("warning"), "2026-06-29", "2026-06-30", "采集滞后", "mart_stock_research_panel", "个股研究 / 因子库"],
    ["mart_factor_snapshot", "MART", "因子", statusBadge("success"), "2026-06-30", "2026-06-30", "—", "—", "因子库"],
    ["mart_signal_latest", "MART", "Alpha Lab", statusBadge("success"), "2026-06-30", "2026-06-30", "—", "—", "主动量化"],
  ];
  const pageImpact = [
    ["市场总览", "mart_market_overview_daily", "正常", "市场状态、行业轮动、AI 感知"],
    ["宏观研究", "mart_macro_indicator_panel", "延迟", "宏观总览与指标详情落后 1 个业务日"],
    ["个股研究", "mart_stock_research_panel", "部分可用", "价格/财务/因子部分指标延迟"],
    ["因子库", "mart_factor_snapshot", "正常", "候选、验证、注册 mock 结构完整"],
  ];
  const body = `
    ${renderOpsModuleGuards("freshness")}
    <div class="ops-metrics">${opsMetric("正常表", "42", "check_circle", "批次已对齐预期业务日期", "green")}${opsMetric("延迟表", "3", "warning", "真实延迟表，不做链路重复计数", "red")}${opsMetric("受影响 Mart", "2", "event_busy")}${opsMetric("影响页面", "3", "dashboard", "", "orange")}</div>
    <section class="ops-card"><div class="ops-toolbar"><input placeholder="搜索表名、资产、主题域" /><button>状态：全部</button><button>正常</button><button>延迟</button><button>缺失</button></div></section>
    <div class="freshness-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>数据新鲜度日志</h2><p>检查各数据表最新业务日期是否与预期对齐；公开版静态模拟分页和筛选结果。</p></div><span>Page 1 / 1 · 6 rows</span></div>${table(["表", "层级", "主题域", "状态", "最新业务日", "预期业务日", "延迟原因", "受影响资产", "影响页面"], rows)}<div class="ops-pagination"><button disabled>上一页</button><span>1-6 / 6</span><button disabled>下一页</button></div></section>
      <aside class="ops-card freshness-hints"><div class="ops-card-head"><div><h2>影响提示</h2><p>模拟真实页展开 hint row 后看到的业务解释</p></div></div>
        ${rows.filter((row) => String(row[3]).includes("warning")).map((row) => `<div class="freshness-hint-card"><b>${row[0]}</b><span>${row[6]} · ${row[7]}</span><em>建议先检查上游任务窗口和源端发布时间，再决定是否重跑。</em></div>`).join("")}
      </aside>
    </div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>页面影响</h2><p>末层 mart 表到业务页面的影响聚合，按业务页去重。</p></div></div><div class="freshness-impact">${pageImpact.map(([pageName, mart, state, desc]) => `<div><b>${pageName}</b><span>${mart}</span><em>${desc}</em>${statusBadge(state === "正常" ? "success" : "warning")}</div>`).join("")}</div></section>
    <section class="ops-card"><h2>公开边界</h2>${["新鲜度数据为 mock snapshot", "不轮询真实 API", "不连接 PG resource_locks", "不暴露真实数据表行数或内网路径"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "数据新鲜度监控", "检查各数据表最新业务日期是否与预期对齐", body);
}

function renderOpsQuality(path) {
  const body = `
    ${renderOpsModuleGuards("quality")}
    <div class="ops-metrics">${opsMetric("今日质量分", "96.8", "verified", "/ 100（规则总数 186）", "green")}${opsMetric("失败规则", "2", "cancel", "", "red")}${opsMetric("预警规则", "3", "warning", "", "orange")}</div>
    <div class="quality-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>规则类型分布</h2><p>完整性、唯一性、非空性、时间范围、数值范围</p></div></div><div class="quality-bars">${[["完整性", 28], ["唯一性", 22], ["非空性", 31], ["时间范围", 12], ["数值范围", 7]].map(([name, pctValue]) => `<div><span>${name}</span><b style="width:${pctValue}%"></b><em>${pctValue}%</em></div>`).join("")}</div></section>
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>异常样本</h2><p>点击真实页会打开右侧抽屉；公开版静态展示样本摘要。</p></div></div>${table(["表", "规则", "结果", "异常数", "占比", "样例"], [["mart_stock_research_panel", "指标范围检查（ROE）", statusBadge("warning"), "2", "0.4%", "ROE 超出阈值"], ["mart_financial_report_arrival", "行数下限检查", statusBadge("failed"), "24", "0.6%", "缺少主体"], ["mart_macro_indicator_panel", "日期范围检查", statusBadge("warning"), "1", "0.2%", "等待月度发布"]])}</section>
      <aside class="ops-card quality-drawer"><div class="ops-card-head"><div><h2>异常样本抽屉</h2><p>mart_stock_research_panel / 指标范围检查</p></div></div><div class="detail-row"><b>检查时间</b><span>2026-07-01 09:40:12</span></div><div class="detail-row"><b>run_id</b><span>run_quality_mock_001</span></div><div class="log-box">observed=92.4; expected<=80.0; sample=600519.SH</div><button>关闭</button></aside>
    </div>
    <section class="ops-card"><h2>公开边界</h2>${["质量结果为 mock snapshot", "异常样本不来自真实数据", "不连接生产库", "不包含敏感字段"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "数据质量监控", "自动化稽核投研数据完整性、准确性与一致性", body);
}

function renderOpsOrchestrator(path) {
  const jobs = [
    ["01", "ods_stock_market_daily_job", "-", "ods_stock_daily, ods_index_daily", "analytics_stock_write", "1:30s / 2:2m", "5m"],
    ["02", "cleaned_market_job", "ods_stock_market_daily_job", "cleaned_stock_daily, cleaned_index_daily", "analytics_market_write", "1:30s / 2:2m", "10m"],
    ["03", "mart_market_overview_daily_job", "cleaned_market_job", "mart_market_overview_daily", "analytics_market_write", "1:30s / 2:2m", "15m"],
    ["04", "mart_signal_latest_job", "mart_market_overview_daily_job", "mart_signal_latest, sim_nav", "analytics_factor_write", "1:30s / 2:2m", "15m"],
    ["05", "ops_page_health_job", "mart_signal_latest_job", "ops_page_health_snapshot", "-", "1:30s / 2:2m", "5m"],
  ];
  const locks = [["analytics_market_write", "mart_market_overview_daily_job", "run_mock_a12c", "held"], ["analytics_stock_write", "-", "-", "free"], ["analytics_factor_write", "mart_signal_latest_job", "run_mock_f92d", "held"], ["analytics_macro_write", "-", "-", "free"]];
  const retryQueue = [["mart_signal_latest_job", "RETRYING", "1", "run_mock_f92d"], ["ops_page_health_job", "PENDING", "0", "run_mock_77aa"]];
  const body = `
    ${renderOpsModuleGuards("orchestrator")}
    <section class="ops-card orchestrator-form"><label>Root job<select><option>mart_market_overview_daily_job</option><option>ods_stock_market_daily_job</option><option>mart_strategy_pool_job</option></select></label><button>预览</button></section>
    <div class="ops-metrics">${opsMetric("DAG 节点", "64", "account_tree")}${opsMetric("依赖边", "92", "schema")}${opsMetric("资源锁", "5", "lock", "", "amber")}${opsMetric("最大 timeout", "15m", "timer", "retry attempts 12", "green")}${opsMetric("当前持锁", "1", "lock_open", "PG resource_locks", "orange")}${opsMetric("Retry 队列", "2", "pending_actions", "PENDING / RETRYING / FAILED", "violet")}${opsMetric("Runtime 源", "preview", "database", "public mock only", "violet")}</div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>Dry-run 状态</h2><p>root=mart_market_overview_daily_job | mode=incremental | mutates_runtime=false</p></div><a href="/ops/dag" data-link>查看数据 DAG</a></div><div class="lock-chips">${["analytics_market_write", "analytics_stock_write", "analytics_factor_write"].map((lock) => `<span>${lock}</span>`).join("")}</div></section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>DAG 进度预览</h2><p>按 orchestrator 拓扑顺序展示节点、上游、目标表、资源锁、retry 与 timeout。</p></div></div>${table(["Order", "Job", "Upstream", "Target tables", "Locks", "Retry", "Timeout"], jobs)}</section>
    <div class="runtime-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>运行态摘要</h2><p>只读展示当前 PG 锁占用。</p></div></div>${table(["Lock", "Holder job", "Run", "State"], locks.map(([lock, holder, run, state]) => [lock, holder, run, statusBadge(state === "held" ? "warning" : "success")]))}</section>
      <section class="ops-card"><div class="ops-card-head"><div><h2>Retry 队列</h2><p>PENDING / RETRYING / FAILED 队列快照</p></div></div>${table(["Job", "Status", "Retry", "Run"], retryQueue.map(([job, state, retry, run]) => [job, state, retry, run]))}</section>
    </div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>锁覆盖</h2><p>用于核查域锁是否进入调度预览；公开版只展示 mock 锁矩阵。</p></div></div><div class="lock-coverage-grid">${jobs.filter((job) => job[4] !== "-").map((job) => `<div><b>${job[1]}</b><span>${job[4]}</span><em>${job[3]}</em></div>`).join("")}</div></section>
    <section class="ops-card"><h2>公开边界</h2>${["Orchestrator 为 dry-run mock preview", "不入队、不执行任务", "不读取真实 PG resource_locks", "不包含运行时凭据或内网连接串"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "调度编排", "Orchestrator dry-run preview：展示 DAG、资源锁、retry 与 timeout 元数据，不入队、不执行任务。", body);
}

function renderOpsAlerts(path) {
  const alerts = [
    ["P1", "数据延迟", "mart_stock_research_panel", "待处理", "个股研究面板落后 1 个业务日", "09:32", "<button>确认</button><button>忽略</button>"],
    ["P2", "数据质量预警", "mart_macro_indicator_panel", "已确认", "日期范围检查等待月度发布", "09:18", "<button>恢复</button>"],
    ["P2", "业务健康异常", "/biz/stock/[code]", "待处理", "部分模块可用", "09:10", "<button>确认</button>"],
    ["P3", "任务超时", "cleaned_news_entity_job", "已忽略", "新闻实体抽取超过基线", "08:42", "<button>恢复</button>"],
  ];
  const body = `
    <div class="ops-message info">告警刷新完成：评估 42，新增 1，更新 3。公开版不调用真实告警接口。</div>
    ${renderOpsModuleGuards("alerts")}
    <div class="ops-metrics">${opsMetric("P0 open", "0", "error", "", "green")}${opsMetric("P1 open", "1", "warning", "", "orange")}${opsMetric("P2 open", "2", "info", "", "amber")}${opsMetric("P3 open", "0", "notifications")}</div>
    <section class="ops-card"><div class="ops-toolbar"><input placeholder="搜索告警、对象、摘要..." /><button>筛选</button><button>刷新告警</button></div><div class="ops-filter-row"><select><option>级别：全部</option><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select><select><option>类型：全部</option><option>任务失败</option><option>任务超时</option><option>数据延迟</option><option>数据质量异常</option><option>业务健康异常</option></select><select><option>状态：全部</option><option>待处理</option><option>已确认</option><option>已恢复</option><option>已忽略</option></select></div></section>
    <div class="alerts-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>告警列表</h2><p>集中展示告警处理状态，快速响应数据链路异常。</p></div><span>Page 1 / 1 · 4 rows</span></div>${table(["级别", "类型", "对象", "状态", "摘要", "发生时间", "操作"], alerts)}<div class="ops-pagination"><button disabled>上一页</button><span>1-4 / 4</span><button disabled>下一页</button></div></section>
      <aside class="ops-card alert-detail"><div class="ops-card-head"><div><h2>告警详情</h2><p>ALERT_STOCK_PANEL_001</p></div>${statusBadge("warning")}</div><div class="job-kv"><div><span>级别</span><b>P1</b></div><div><span>类型</span><b>数据延迟</b></div><div><span>状态</span><b>待处理</b></div></div><div class="job-section"><h3>影响对象</h3><div class="log-box">object_type=mart_table<br>object_name=mart_stock_research_panel<br>page=/biz/stock/[code]</div></div><div class="job-section"><h3>处理动作</h3><div class="alert-actions"><button>确认</button><button>忽略</button><button>标记恢复</button></div></div></aside>
    </div>
    <section class="ops-card"><h2>公开边界</h2>${["告警为 mock snapshot", "操作按钮不调用真实后端", "不暴露真实告警 payload", "不包含凭据"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "异常告警中心", "集中展示告警处理状态，快速响应数据链路异常", body);
}

function renderOpsPerformance(path) {
  const sourceRows = [["Tushare", "128ms", "99.8%", "3,421", statusBadge("success")], ["iFinD", "214ms", "99.2%", "1,208", statusBadge("success")], ["交易所公告", "182ms", "100%", "642", statusBadge("success")], ["新闻源", "420ms", "97.8%", "2,318", statusBadge("warning")]];
  const body = `
    ${renderOpsModuleGuards("performance")}
    <div class="ops-metrics">${opsMetric("运行中任务", "3", "autorenew")}${opsMetric("队列等待", "0", "pending")}${opsMetric("API 失败率", "0.1%", "warning")}${opsMetric("磁盘占用", "62.4%", "hard_drive", "已用 386.2 GB", "green")}</div>
    <div class="performance-layout">
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>系统资源利用率（CPU / 内存）</h2><p>公开版以 mock 曲线展示真实性能监控面板结构。</p></div><div class="chart-legend"><span>CPU 占用</span><span>内存占用</span></div></div><div class="perf-chart"><div class="chart-tip"><b>09:40</b><span>CPU 42.1%</span><span>内存 68.4%</span></div></div></section>
      <section class="ops-card"><div class="ops-card-head"><div><h2>外部数据源延迟</h2><p>按平均延迟排序</p></div></div><div class="quality-bars">${[["Tushare", 42], ["iFinD", 68], ["交易所公告", 36], ["新闻源", 82]].map(([name, pctValue]) => `<div><span>${name}</span><b style="width:${pctValue}%"></b><em>${pctValue}ms</em></div>`).join("")}</div></section>
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>慢任务</h2><p>调度引擎运行负荷与慢查询分布</p></div></div>${table(["任务", "最近耗时", "基线", "状态"], [["mart_market_overview_daily", "1m", "1m", statusBadge("success")], ["cleaned_macro_ifind_job", "8m", "5m", statusBadge("warning")], ["financial_reports_arrival", "12m", "10m", statusBadge("warning")]])}</section>
      <section class="ops-card"><div class="ops-card-head"><div><h2>数据源健康</h2><p>接口成功率、调用量与延迟状态。</p></div></div>${table(["Source", "Avg latency", "Success", "Calls", "Status"], sourceRows)}</section>
    </div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>系统快照</h2><p>对应真实页面 CPU / memory / disk / history 的只读概览。</p></div></div><div class="perf-bars">${[["CPU", 42.1, "8 core"], ["Memory", 68.4, "24.6 GB used"], ["Disk", 62.4, "386.2 GB used"], ["API Failure", 0.1, "0.1%"]].map(([label, value, detail]) => `<div><span>${label}</span><b style="width:${Math.min(100, value)}%"></b><em>${detail}</em></div>`).join("")}</div></section>
    <section class="ops-card"><h2>公开边界</h2>${["性能曲线为 mock snapshot", "不读取真实主机指标", "不暴露主机路径", "不包含运行时密码"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "资源与性能监控", "调度引擎运行负荷与外部API响应分析", body);
}

function renderOpsBackups(path) {
  const body = `
    ${renderOpsModuleGuards("backups")}
    <div class="ops-metrics">${opsMetric("备份状态", "mock 正常", "backup", "检查 2026-07-01 09:40", "green")}${opsMetric("raw 文件数", "128k mock", "dataset", "1.8 TB mock")}${opsMetric("最新备份快照", "426 MB mock", "database", "2026-06-28 07:40", "green")}${opsMetric("mock 磁盘余量", "312 GB", "hard_drive", "已用 62%", "green")}</div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>最近一次备份</h2><p>公开版 manifest、控制面快照、业务数据层快照、raw mirror 摘要。</p></div></div><div class="backup-summary">${[["结果", "success", "weekly · 20260628"], ["完成时间", "2026-06-28 07:52", "git abc1234 mock"], ["备份内容", "control 426 MB", "business 38 GB / raw 128k 文件"], ["归档目录", "mock/backup/weekly/20260628", "raw mirror: mocked"]].map(([title, value, detail]) => `<div><b>${title}</b><span>${value}</span><em>${detail}</em></div>`).join("")}</div></section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>备份对象 mock 面</h2><p>周备份覆盖控制面快照、业务数据层快照和 ODS raw mirror 的公开结构</p></div></div>${table(["对象", "类型", "状态", "体积", "文件数", "最近变更", "路径"], [["业务数据层快照", "ODS / Cleaned / Mart mock", statusBadge("success"), "38 GB", "12", "2026-06-28 07:52", "mock/backup/business"], ["raw / parquet mock", "ODS raw", statusBadge("success"), "1.8 TB", "128k", "2026-06-28 07:51", "mock/backup/raw"], ["控制面快照", "serving mock dump", statusBadge("success"), "426 MB", "1", "2026-06-28 07:40", "mock/backup/control"], ["本地 staging", "执行缓存 mock", statusBadge("success"), "12 GB", "92", "2026-06-28 07:53", "mock/backup/local"]])}</section>
    <div class="ops-grid"><section class="ops-card"><h2>备份策略</h2>${["周备份：周日 07:40 mock", "备份内容：control + business + raw mock", "一致性：公开版只展示策略形状", "队列保护：忙时跳过"].map((x) => `<div class="chain-row">${x}${statusBadge("success")}</div>`).join("")}</section><section class="ops-card span-2"><h2>冷备目标</h2><div class="cold-targets">${[["Public demo runtime", "mock/runtime/root", "container data: mock/runtime/container-data"], ["Cold backup mock target", "mock/backup/weekly/20260628", "只展示脱敏路径"], ["latest-backup.json", "mock/manifests/latest-backup.json", "公开版静态 manifest"]].map(([title, value, detail]) => `<div><b>${title}</b><span>${value}</span><em>${detail}</em></div>`).join("")}</div></section><section class="ops-card span-2"><h2>恢复演练清单</h2><div class="restore-steps">${["选取最近一次公开 mock 周备份", "恢复控制面快照到临时演示环境", "挂载业务数据 mock 到临时目录", "只读 smoke 后记录证据"].map((x, i) => `<div><b>${i + 1}</b><span>${x}</span></div>`).join("")}</div></section></div>
    <section class="ops-card"><h2>公开边界</h2>${["备份路径为 mock 脱敏路径", "不读取真实 manifest", "不暴露 NAS 地址", "不包含运行时凭据或容器挂载密钥"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "生产备份", "真实备份页面结构的公开 mock 面板，展示策略、冷备目标与脱敏状态", body);
}

function renderOpsWeeklyReport(path) {
  const reportItems = [
    ["2026-06-26", "ops financial reports parity", "补齐财报到数监控的报告期总览、缺口池、披露后复核和历史报告期列表。", "新增功能"],
    ["2026-06-25", "public demo route audit", "新增 47 条 biz/ops 路由 parity 审计，确保公开 demo 不漏真实入口。", "优化功能"],
    ["2026-06-24", "factor library parity", "新增因子库候选、验证、注册库、因子图谱的公开 mock 信息结构。", "新增功能"],
    ["2026-06-23", "ops jobs queue health", "修复任务队列阻塞识别和右侧详情解释，补齐重跑参数与级联预览。", "优化功能"],
    ["2026-06-22", "biz navigation parity", "顶栏、二级导航、搜索建议和个股入口记忆对齐真实球球投研。", "新增功能"],
  ];
  const historyRows = [
    ["2026-W26", "2026-06-22 至 2026-06-28", "7", "4", "3", "ready"],
    ["2026-W25", "2026-06-15 至 2026-06-21", "6", "2", "4", "ready"],
    ["2026-W24", "2026-06-08 至 2026-06-14", "5", "3", "2", "archived"],
    ["2026-W23", "2026-06-01 至 2026-06-07", "4", "1", "3", "archived"],
  ];
  const reportTableRows = reportItems.map(([date, event, content, type]) => [
    date,
    `<b>${event}</b>`,
    content,
    `<span class="report-type ${type === "新增功能" ? "new" : "opt"}">${type === "新增功能" ? "新增" : "优化"}</span>`,
  ]);
  const historyTableRows = historyRows.map(([week, period, pr, created, optimized, state], index) => [
    `<div class="week-cell ${index === 0 ? "selected" : ""}"><b>${week}</b><span>${period}</span></div>`,
    pr,
    created,
    optimized,
    statusBadge(state === "ready" ? "success" : "healthy"),
  ]);
  const body = `
    ${renderOpsEntryGuard("OpsProjectWeeklyReportPage", "fetchOpsProjectWeeklyReports", "周报列表、当前周报、历史周报和生成状态")}
    <div class="ops-metrics">${opsMetric("当前周报", "2026-W26", "summarize", "2026-06-22 至 2026-06-28", "green")}${opsMetric("任务(PR)", "7", "merge")}${opsMetric("新增功能", "4", "add_circle", "", "green")}${opsMetric("优化功能", "3", "tune", "报告数 8", "amber")}</div>
    <div class="weekly-layout"><section class="ops-card"><div class="ops-card-head"><div><h2>周报内容</h2><p>每周按任务口径汇总项目新增与优化。</p></div><span>生成 2026-07-01 09:40</span></div><div class="report-period"><b>周期</b><span>2026-06-22 至 2026-06-28</span></div>${table(["日期", "事件", "内容", "类型"], reportTableRows)}</section><aside class="ops-card"><div class="ops-card-head"><div><h2>周报历史</h2><p>选择历史周报查看内容</p></div><span>4 weeks</span></div>${table(["周", "任务(PR)", "新增", "优化", "状态"], historyTableRows)}</aside></div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>报告产物</h2><p>对应真实页面的 reportRoot、生成模式和最近生成时间。</p></div><span>status=ready</span></div><div class="report-product">${[["产物目录", "mock/reports/weekly", "公开版脱敏路径"], ["生成模式", "合并请求与提交记录", "只展示 mock 汇总"], ["最近生成", "2026-07-01 09:40", "public snapshot"], ["加载状态", "ready", "当前选中周报已加载"]].map(([k, v, d]) => `<div><span>${k}</span><b>${v}</b><em>${d}</em></div>`).join("")}</div></section>
    <section class="ops-card"><h2>公开边界</h2>${["周报内容为 mock summary", "不读取真实 PR 或 commit", "不暴露仓库私有路径", "不包含凭据"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "项目周报", "每周按任务口径汇总项目新增与优化，存量周报按实际内容折算任务数", body);
}

function renderOpsUserLogs(path) {
  const logRows = [
    ["09:12:04", "hello", "Public Demo Admin", "admin", "login_success", "auth", "/login", "login.form", "进入未来", "masked"],
    ["09:14:32", "hello", "Public Demo Admin", "admin", "page_view", "ops", "/ops/overview", "ops.shell", "总览", "masked"],
    ["09:18:20", "hello", "Public Demo Admin", "admin", "click", "ops", "/ops/jobs", "jobs.refresh", "刷新", "masked"],
    ["09:22:41", "hello", "Public Demo Admin", "admin", "page_view", "biz", "/biz/factor-library/candidates", "subnav.factor-library", "因子库", "masked"],
    ["09:25:19", "hello", "Public Demo Admin", "admin", "api_forbidden", "auth", "/ops/user-logs", "guard.audit", "权限校验", "masked"],
  ];
  const body = `
    ${renderOpsEntryGuard("OpsUserLogsPage", "client-side audit log filters", "登录、权限拒绝、页面访问、点击行为和脱敏 payload")}
    <div class="ops-metrics">${opsMetric("匹配日志", "128", "manage_search")}${opsMetric("本页点击", "18", "ads_click")}${opsMetric("本页访问", "42", "visibility")}${opsMetric("本页认证事件", "9", "admin_panel_settings", "", "green")}</div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>筛选</h2><p>用户名、角色、事件、模块、页面路径和时间窗口。</p></div><span>pageSize=20</span></div><div class="ops-filter-row compact"><input placeholder="用户名" value="hello" /><select><option>全部角色</option><option>admin</option><option>biz_user</option></select><select><option>全部事件</option><option>login_success</option><option>login_failed</option><option>logout</option><option>credential_changed</option><option>page_view</option><option>click</option><option>api_forbidden</option></select><select><option>全部模块</option><option>biz</option><option>ops</option><option>auth</option><option>unknown</option></select></div><div class="ops-filter-row compact"><input placeholder="页面路径" /><input type="datetime-local" value="2026-07-01T09:00" /><input type="datetime-local" value="2026-07-01T10:00" /><button>查询</button><button>重置</button><span class="filter-loading">加载中...</span></div></section>
    <div class="user-log-layout"><section class="ops-card span-2"><div class="ops-card-head"><div><h2>访问量时序</h2><p>页面访问、点击和异常行为审计。</p></div><div class="mcp-tabs"><button class="active">小时</button><button>日</button></div></div><div class="ops-chart"></div><div class="active-users">${["Public Demo Admin · 42", "demo_admin · 18", "biz_viewer · 9", "readonly_guest · 4"].map((item, index) => `<button class="${index === 0 ? "active" : ""}">${item}</button>`).join("")}</div></section><section class="ops-card"><h2>核心事件分布</h2><div class="quality-bars">${[["page_view", 52], ["click", 26], ["login_success", 12], ["api_forbidden", 10]].map(([name, pctValue]) => `<div><span>${name}</span><b style="width:${pctValue}%"></b><em>${pctValue}%</em></div>`).join("")}</div><h2>模块分布</h2><div class="module-pill-grid">${["ops 58%", "biz 31%", "auth 9%", "unknown 2%"].map((item) => `<span>${item}</span>`).join("")}</div></section></div>
    <div class="user-log-layout"><section class="ops-card span-2"><div class="ops-card-head"><div><h2>日志列表</h2><p>公开版只保留脱敏后的 mock event payload。</p></div><span>Page 1 / 1 · 1-5 / 128</span></div>${table(["时间", "用户", "显示名", "角色", "事件", "模块", "页面", "元素", "文案", "IP"], logRows)}<div class="ops-pagination"><button disabled>上一页</button><span>1-5 / 128</span><button>下一页</button></div></section><aside class="ops-card user-log-detail"><div class="ops-card-head"><div><h2>日志详情</h2><p>log_mock_091820</p></div>${statusBadge("success")}</div><div class="user-log-time-grid">${[["服务器时间", "2026-07-01 09:18:20"], ["客户端时间", "2026-07-01 09:18:19"]].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>${table(["字段", "值"], [["username", "hello"], ["role", "admin"], ["eventType", "click"], ["module", "ops"], ["pagePath", "/ops/jobs"], ["elementKey", "jobs.refresh"], ["elementText", "刷新"], ["userAgent", "Chrome public-demo masked"]])}<div class="json-panel"><b>extra_json</b><pre>{"target":"refresh","source":"ops.jobs","demo":true}</pre></div></aside></div>
    <section class="ops-card"><h2>公开边界</h2>${["用户日志为 mock snapshot", "不读取真实审计表", "Payload 已脱敏", "不包含 IP、token、cookie 或真实 user agent"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "用户日志", "查看登录、权限拒绝、页面访问与核心点击行为", body);
}

function renderOpsFinancialReports(path) {
  const coverageRows = [
    ["利润表", "income", "4,278", "99.4%", "+42", "24"],
    ["资产负债表", "balancesheet", "4,263", "99.1%", "+39", "39"],
    ["现金流量表", "cashflow", "4,254", "98.9%", "+31", "48"],
    ["财务指标", "fina_indicator", "4,220", "98.1%", "+28", "82"],
  ];
  const gapRows = [
    ["000001.SZ", "平安银行", "现金流量表", "2", "待补"],
    ["600000.SH", "浦发银行", "利润表、资产负债表、现金流", "3", "重试中"],
    ["300750.SZ", "宁德时代", "财务指标", "1", "人工复核"],
    ["688981.SH", "中芯国际", "现金流量表、财务指标", "0", "待补"],
  ];
  const reviewChanges = [
    ["600519.SH", "利润表", "operate_profit", "242.10亿", "244.32亿", "关键"],
    ["000858.SZ", "现金流", "net_cash_flows_oper_act", "51.4亿", "53.8亿", "普通"],
    ["300750.SZ", "财务指标", "roe_dt", "22.1", "22.4", "普通"],
  ];
  const body = `
    ${renderOpsEntryGuard("OpsFinancialReportsPage", "fetchOpsFinancialPeriods + fetchOpsFinancialPeriodSummary + fetchOpsFinancialPeriodTrend + fetchOpsFinancialPeriodGaps + fetchOpsFinancialPeriodReview", "报告期、总览、趋势、缺口池和披露后复核")}
    <div class="ops-metrics">${opsMetric("报告期", "2026Q1", "event_note", "20260331")}${opsMetric("当前阶段", "WAITING_REVIEW", "timeline", "阈值 90.0%", "violet")}${opsMetric("统计基准数", "4302", "domain", "剔除退市标记股票")}${opsMetric("四表完整覆盖率", "97.9%", "check_circle", "四表完整 4211 家", "green")}${opsMetric("四表缺口率", "2.1%", "warning", "四表未完整 91 家", "orange")}${opsMetric("任一表覆盖率", "99.8%", "donut_large", "任一表覆盖 4293 家", "green")}${opsMetric("最近捕捉日期", "2026-06-30", "schedule", "复核状态：待复核")}</div>
    <section class="ops-card financial-overview">
      <div class="ops-card-head"><div><h2>当前报告期总览</h2><p>对应真实财报到数页的 period summary，展示报告期生命周期、精细补偿阈值和手动动作入口。</p></div><span>period=20260331</span></div>
      <div class="period-selector"><label>报告期<select><option>2026Q1</option><option>2025A</option><option>2025Q3</option></select></label><button>刷新</button><button>运行全市场捕捉</button><button>尾部补偿</button><button>披露后复核</button></div>
      <div class="active-run-banner"><b>全市场捕捉运行中</b><span>run_id: run_fin_mock_001</span><span>开始: 2026-07-01 09:12</span><span>已运行: 28分钟</span><span>阶段: cashflow_gap_compensation</span></div>
    </section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>期间阶段</h2><p>开始捕捉、理论截止、延长期、复核、关闭。</p></div><span>stage=WAITING_REVIEW</span></div><div class="financial-timeline">${[["开始捕捉", "2026-04-01"], ["理论截止", "2026-04-30"], ["延长期结束", "2026-05-15"], ["复核", "2026-05-20"], ["关闭", "复核稳定后"]].map(([label, date], index) => `<div class="${index === 3 ? "active" : ""}"><span>${label}</span><b>${date}</b></div>`).join("")}</div></section>
    <div class="financial-layout"><section class="ops-card span-2"><div class="ops-card-head"><div><h2>四张表覆盖率</h2><p>利润表、资产负债表、现金流量表、财务指标。</p></div></div><div class="financial-coverage">${coverageRows.map(([name, api, count, rate, delta, missing]) => `<div><div><b>${name}</b><code>${api}</code></div><span>${count}</span><em>覆盖 ${rate} · 较前快照 ${delta} · 缺口 ${missing}</em></div>`).join("")}</div></section><aside class="ops-card"><h2>今日捕捉日报</h2>${table(["指标", "值"], [["四表完整公司新增数", "+37"], ["任一表公司新增数", "+51"], ["当前四表缺口率", "2.1%"], ["精细补偿阈值", "90.0%"]])}<div class="ops-advice">四表完整覆盖率已达到精细补偿阈值，下一步处理尾部缺口池。</div></aside></div>
    <div class="financial-layout">
      <section class="ops-card"><div class="ops-card-head"><div><h2>覆盖快照缺口结构</h2><p>对应真实页面覆盖快照缺口结构。</p></div></div><div class="financial-stat-grid">${[["财务指标缺口", "82"], ["现金流量表缺口", "48"], ["利润表缺口", "24"], ["四表完整缺口", "91"]].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div></section>
      <section class="ops-card span-2"><div class="ops-card-head"><div><h2>精细补偿池（剔除退市标记股票）</h2><p>缺口接口、重试次数和补偿状态。</p></div></div>${table(["代码", "名称", "缺口接口", "重试", "状态"], gapRows)}</section>
    </div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>披露后复核结果</h2><p>新增公司、修订记录和关键字段变化。</p></div><span>review_date=2026-05-20</span></div><div class="financial-stat-grid five">${[["复核执行日", "2026-05-20"], ["新增公司数", "7"], ["新增记录数", "128"], ["发生修订公司数", "19"], ["关键字段变化数", "6"]].map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div>${table(["代码", "接口", "字段", "旧值", "新值", "级别"], reviewChanges)}</section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>覆盖率趋势</h2><p>按日统计四表到数覆盖率。</p></div></div>${table(["日期", "利润表", "资产负债表", "现金流量表", "财务指标", "任一表覆盖", "四表完整"], [["2026-06-30", "99.4%", "99.1%", "98.9%", "98.1%", "99.8%", "97.9%"], ["2026-06-29", "98.8%", "98.7%", "98.2%", "97.4%", "99.2%", "96.8%"], ["2026-06-28", "97.5%", "97.2%", "96.9%", "96.2%", "98.4%", "95.7%"]])}</section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>历史报告期列表</h2><p>报告期、阶段、覆盖率和复核状态。</p></div></div>${table(["报告期", "类型", "阶段", "四表完整", "任一表覆盖", "复核状态", "最近捕捉"], [["2026Q1", "一季报", "等待复核", "97.9%", "99.8%", "待复核", "2026-06-30"], ["2025A", "年报", "已关闭", "99.2%", "99.9%", "已复核", "2026-05-08"], ["2025Q3", "三季报", "已关闭", "98.7%", "99.5%", "已复核", "2025-11-12"]])}</section>
    <section class="ops-card"><h2>公开边界</h2>${["财报到数为 mock snapshot", "不读取真实公告文件", "不连接真实数据库", "不暴露供应商账号"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "财报到数监控", "跟踪三表、公告、解析和上市主体覆盖情况", body);
}

function renderOpsSla(path) {
  const body = `
    ${renderOpsModuleGuards("sla")}
    <div class="ops-metrics">${opsMetric("今日 SLA 达成率", "97.4%", "timer", "", "green")}${opsMetric("今日逾期任务", "2", "warning", "", "orange")}${opsMetric("今日准点任务", "119", "check_circle", "", "green")}${opsMetric("评估时间", "09:40", "schedule")}</div>
    <section class="ops-card"><div class="ops-card-head"><div><h2>7 天 SLA 趋势</h2><p>按业务域统计发布窗口达成率。</p></div></div><div class="sla-trend">${["06-24 96.1%", "06-25 97.2%", "06-26 98.2%", "06-27 97.8%", "06-28 98.1%", "06-29 96.9%", "06-30 97.4%"].map((item) => `<div><span>${item.split(" ")[0]}</span><b>${item.split(" ")[1]}</b></div>`).join("")}</div></section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>业务域 SLA 矩阵</h2><p>按市场、宏观、财报、Alpha Lab 聚合发布窗口。</p></div></div><div class="sla-domain-grid">${[["市场", "99.1%", "38/38", "0"], ["宏观", "94.8%", "18/19", "1"], ["财报", "92.0%", "23/25", "2"], ["Alpha Lab", "98.6%", "40/41", "1"]].map(([domain, rate, ontime, breach]) => `<div><span>${domain}</span><b>${rate}</b><em>准点 ${ontime} · 逾期 ${breach}</em></div>`).join("")}</div></section>
    <section class="ops-card"><div class="ops-card-head"><div><h2>逾期明细</h2><p>SLA 截止、实际完成、逾期分钟数和评估时间。</p></div></div>${table(["任务", "run_id", "SLA(分钟)", "截止时间", "完成时间", "逾期(分钟)", "评估时间"], [["cleaned_macro_ifind_job", "run_mock_001", "30", "09:30", "09:38", "8", "09:40"], ["financial_reports_arrival", "run_mock_002", "60", "21:00", "21:12", "12", "21:15"]])}</section>
    <section class="ops-card"><h2>公开边界</h2>${["SLA 数据为 mock snapshot", "不读取真实 job_run_log", "不暴露真实 run_id", "不连接生产控制面"].map((item) => `<div class="chain-row">${item}${statusBadge("success")}</div>`).join("")}</section>`;
  return opsShell(path, "SLA 监控", "监控核心任务和关键链路是否按时完成", body);
}

function renderGenericOps(path) {
  const detail = opsDetails[path];
  if (detail) {
    return renderOpsDetail(path, detail);
  }
  const [title, desc, stats] = genericOps[path] || ["运维页面", "公开 mock 运维页面", ["状态正常", "mock 数据", "无敏感信息", "可公开"]];
  const body = `
    <div class="ops-metrics">${stats.map((item) => metric(item.split(" ")[0], item.split(" ").slice(1).join(" ") || "正常")).join("")}</div>
    <div class="ops-grid">
      <section class="ops-card span-2"><h2>${title}</h2><p class="insight">${desc}。本页面复刻真实入口和运维信息密度，但只读取 public mock snapshot。</p>${table(["对象", "状态", "最近更新", "说明"], [["public_pipeline", statusBadge("success"), "2026-07-01 09:30", "公开 mock 快照"], ["qiuqiu_public_demo", statusBadge("success"), "2026-07-01 09:35", "无真实凭据"], ["sensitive_runtime", statusBadge("warning"), "不包含", "真实凭据未进入仓库"]])}</section>
      <section class="ops-card"><h2>操作区</h2><button>刷新</button><button>导出 mock CSV</button><button>查看审计</button></section>
    </div>`;
  return opsShell(path, title, desc, body);
}

function renderOps(path) {
  if (path === "/ops/overview") return renderOpsOverview(path);
  if (path === "/ops/jobs") return renderOpsJobs(path);
  if (path === "/ops/financial-reports") return renderOpsFinancialReports(path);
  if (path === "/ops/dag") return renderOpsDag(path);
  if (path === "/ops/orchestrator") return renderOpsOrchestrator(path);
  if (path === "/ops/freshness") return renderOpsFreshness(path);
  if (path === "/ops/quality") return renderOpsQuality(path);
  if (path === "/ops/sla") return renderOpsSla(path);
  if (path === "/ops/alerts") return renderOpsAlerts(path);
  if (path === "/ops/performance") return renderOpsPerformance(path);
  if (path === "/ops/backups") return renderOpsBackups(path);
  if (path === "/ops/project-weekly-report") return renderOpsWeeklyReport(path);
  if (path === "/ops/assets") return renderOpsAssets(path);
  if (path === "/ops/ai-runs") return renderOpsAiRuns(path);
  if (path === "/ops/mcp") return renderOpsMcp(path);
  if (path === "/ops/user-logs") return renderOpsUserLogs(path);
  return renderGenericOps(path);
}

function bindEvents() {
  document.querySelectorAll("[data-link]").forEach((node) => {
    node.addEventListener("click", (event) => {
      const href = node.getAttribute("href");
      if (!href || href.startsWith("http")) return;
      event.preventDefault();
      navigate(href);
    });
  });

  document.querySelectorAll("[data-logout]").forEach((node) => {
    node.addEventListener("click", () => {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(AUTH_USER_KEY);
      navigate("/login");
    });
  });

  document.querySelectorAll(".top-nav button[data-theme]").forEach((node) => {
    node.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      window.localStorage.setItem("alpha-lab-theme", next);
      document.documentElement.setAttribute("data-theme", next);
    });
  });

  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const passcode = document.getElementById("password").value;
      const error = document.getElementById("login-error");
      if (username !== "hello" || passcode !== "hello") {
        error.hidden = false;
        error.textContent = "Public demo 默认账号密码为 hello / hello。";
        return;
      }
      window.localStorage.setItem(AUTH_TOKEN_KEY, "public-demo-token");
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify({ username, displayName: "Public Demo Admin", role: "admin" }));
      navigate("/biz/market");
    });
  }
}

function render() {
  let path = getPath();
  if (routeRedirects[path]) {
    path = routeRedirects[path];
    window.history.replaceState({}, "", path);
  }
  rememberStockRoute(path);
  const app = document.getElementById("app");

  if (path === "/login") {
    app.innerHTML = renderLogin();
    bindEvents();
    return;
  }

  if (!isAuthed()) {
    window.history.replaceState({}, "", `/login?next=${encodeURIComponent(path)}`);
    app.innerHTML = renderLogin();
    bindEvents();
    return;
  }

  if (path.startsWith("/ops")) {
    app.innerHTML = renderOps(path);
  } else if (path.startsWith("/biz")) {
    app.innerHTML = renderBiz(path);
  } else {
    window.history.replaceState({}, "", "/biz/market");
    app.innerHTML = renderBiz("/biz/market");
  }
  bindEvents();
}

window.addEventListener("popstate", render);
applyStoredTheme();
render();
