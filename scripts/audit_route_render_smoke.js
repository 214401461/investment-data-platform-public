const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const appPath = path.join(repoRoot, "frontend", "app.js");
const manifestPath = path.join(repoRoot, "frontend", "route-parity.json");
const appCode = fs.readFileSync(appPath, "utf8");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")).routes;

const forbiddenVisiblePatterns = [
  ["OpenAI-style key", /sk-[A-Za-z0-9_-]{20,}/],
  ["Postgres DSN", /postgres(?:ql)?:\/\//i],
  ["MySQL DSN", /mysql:\/\//i],
  ["private key", /(?:OPENSSH|RSA) PRIVATE KEY/],
  ["database env name", /\bDATABASE_URL\b/],
  ["API key env name", /\bAPI_KEY\b/],
];

function createStorage() {
  const values = new Map([
    ["qiuqiu.auth.token", "public-demo-token"],
    ["qiuqiu.auth.user", JSON.stringify({ username: "hello", displayName: "Public Demo Admin", role: "admin" })],
  ]);
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

function renderRoute(routePath) {
  const appElement = { innerHTML: "" };
  const location = { pathname: routePath };
  const documentElement = {
    attrs: {},
    setAttribute(key, value) {
      this.attrs[key] = String(value);
    },
    getAttribute(key) {
      return this.attrs[key] || null;
    },
  };
  const sandbox = {
    console,
    Math,
    JSON,
    Array,
    String,
    Number,
    Boolean,
    encodeURIComponent,
    decodeURIComponent,
    window: {
      location,
      localStorage: createStorage(),
      history: {
        replaceState(_state, _title, nextPath) {
          location.pathname = String(nextPath).split("?", 1)[0] || "/";
        },
        pushState(_state, _title, nextPath) {
          location.pathname = String(nextPath).split("?", 1)[0] || "/";
        },
      },
      addEventListener() {},
    },
    document: {
      documentElement,
      getElementById(id) {
        return id === "app" ? appElement : null;
      },
      querySelectorAll() {
        return [];
      },
    },
  };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(appCode, sandbox, { filename: "frontend/app.js" });
  return { path: location.pathname, html: appElement.innerHTML };
}

function assertRoute(route) {
  const result = renderRoute(route.samplePath);
  const expectedPath = route.redirectTo || route.samplePath;
  const errors = [];

  if (result.path !== expectedPath) {
    errors.push(`expected final path ${expectedPath}, got ${result.path}`);
  }
  if (result.html.length < 500) {
    errors.push(`rendered HTML too short: ${result.html.length}`);
  }
  if (!route.redirectTo && !result.html.includes(route.title)) {
    errors.push(`missing route title: ${route.title}`);
  }
  if (!result.html.includes("mock")) {
    errors.push("missing visible mock marker");
  }
  if (route.samplePath.startsWith("/biz/") && !result.html.includes("biz-subnav")) {
    errors.push("missing Biz top navigation");
  }
  if (route.samplePath.startsWith("/ops/") && !result.html.includes("ops-shell")) {
    errors.push("missing Ops shell");
  }
  if (route.samplePath.startsWith("/ops/") && !result.html.includes("ops-compliance-footer")) {
    errors.push("missing Ops compliance footer");
  }
  if (route.samplePath.startsWith("/ops/") && !result.html.includes("京公网安备11010602202577号")) {
    errors.push("missing Ops public security record");
  }
  for (const [label, pattern] of forbiddenVisiblePatterns) {
    if (pattern.test(result.html)) {
      errors.push(`forbidden visible marker found: ${label}`);
    }
  }
  return errors;
}

const findings = [];
for (const route of manifest) {
  const errors = assertRoute(route);
  for (const error of errors) {
    findings.push(`${route.samplePath}: ${error}`);
  }
}

if (findings.length > 0) {
  console.error("Route render smoke audit failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

const bizCount = manifest.filter((route) => route.samplePath.startsWith("/biz/")).length;
const opsCount = manifest.filter((route) => route.samplePath.startsWith("/ops/")).length;
console.log(`Route render smoke audit passed: ${bizCount} biz routes, ${opsCount} ops routes rendered from frontend/app.js.`);
