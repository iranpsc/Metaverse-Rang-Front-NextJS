import http from "node:http";

const host = "127.0.0.1";
const port = Number(process.env.MOCK_API_PORT || 9999);

const languages = [
  {
    code: "fa",
    direction: "rtl",
    file_url: `http://${host}:${port}/lang/fa.json`,
    name: "فارسی",
  },
  {
    code: "en",
    direction: "ltr",
    file_url: `http://${host}:${port}/lang/en.json`,
    name: "English",
  },
  {
    code: "ar",
    direction: "rtl",
    file_url: `http://${host}:${port}/lang/ar.json`,
    name: "العربية",
  },
];

const dictionaries = {
  fa: { 1457: "متاورس رنگ", 482: "توضیحات نمونه فارسی" },
  en: { 1457: "Metaverse Rang", 482: "Sample English description" },
  ar: { 1457: "ميتافيرس رنگ", 482: "وصف تجريبي باللغة العربية" },
};

function json(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);

  if (request.method !== "GET" && request.method !== "HEAD") {
    return json(response, 405, { message: "Method not allowed" });
  }

  if (url.pathname === "/health") {
    response.writeHead(200, { "content-type": "text/plain" });
    return response.end("ok");
  }

  if (url.pathname === "/api/translations") {
    if (url.searchParams.get("active") !== "true") {
      return json(response, 400, { message: "active=true is required" });
    }
    return json(response, 200, { data: languages });
  }

  const dictionaryMatch = url.pathname.match(/^\/lang\/(fa|en|ar)\.json$/);
  if (dictionaryMatch) {
    return json(response, 200, dictionaries[dictionaryMatch[1]]);
  }

  if (url.pathname === "/api/calendar" && url.searchParams.get("type") === "version") {
    return json(response, 200, { data: [] });
  }

  if (url.pathname === "/api/users") {
    return json(response, 200, { data: [], meta: { page: Number(url.searchParams.get("page") || 1) } });
  }

  if (/^\/api\/citizen\/[^/]+$/.test(url.pathname)) {
    return json(response, 200, { data: null });
  }

  if (url.pathname === "/api/tutorials") {
    return json(response, 200, { data: [] });
  }

  return json(response, 404, { message: "No mock route configured", path: url.pathname });
});

server.listen(port, host, () => {
  process.stdout.write(`Mock API listening on http://${host}:${port}\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
