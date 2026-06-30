const API_BASE = window.localStorage.getItem("demoApiBase") || "http://127.0.0.1:8001";

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`${path} failed: ${response.status}`);
  }
  return response.json();
}

function metric(label, value) {
  return `<div class="metric"><div class="label">${label}</div><div class="value">${value}</div></div>`;
}

async function render() {
  const health = await getJson("/health");
  document.getElementById("health").textContent = `API ${health.status}`;

  const market = await getJson("/api/biz/market/overview");
  document.getElementById("market").innerHTML = [
    metric("业务日", market.business_date),
    metric("市场状态", market.market_state),
    metric("主力净流入", `${market.capital_flow.main_net_inflow} 亿`),
    ...market.indices.map((item) => metric(item.name, `${item.change_pct}%`)),
  ].join("");

  const macro = await getJson("/api/biz/macro");
  document.getElementById("macro").innerHTML = [
    metric("当前象限", macro.current_quadrant),
    metric("增长 Z", macro.growth_z),
    metric("通胀 Z", macro.inflation_z),
  ].join("");

  const alpha = await getJson("/api/biz/alpha-lab/overview");
  document.getElementById("alpha").innerHTML = [
    metric("状态", alpha.status),
    metric("策略", alpha.strategy.name),
    metric("20日收益", alpha.strategy.return_20d),
  ].join("");

  const ops = await getJson("/api/ops/page-health");
  document.getElementById("ops").innerHTML = [
    metric("总体状态", ops.overall_status),
    metric("页面数", ops.pages.length),
    metric("任务数", ops.jobs.length),
  ].join("");
}

document.getElementById("ai-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = document.getElementById("question").value;
  const response = await fetch(`${API_BASE}/api/biz/ai/ask`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({question}),
  });
  const payload = await response.json();
  document.getElementById("answer").textContent = payload.answer || JSON.stringify(payload, null, 2);
});

render().catch((error) => {
  document.getElementById("health").textContent = "API offline";
  document.getElementById("answer").textContent = String(error);
});

