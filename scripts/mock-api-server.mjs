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

const videoFixture = {
  id: 1,
  slug: "1",
  title: "Sandbox tutorial video",
  description: "Deterministic tutorial content used by isolated end-to-end tests.",
  image_url: "/team.webp",
  upload_date: "2026-10-01",
  creator: { name: "Sandbox Creator", code: "TEST-1" },
  likes_count: 2,
  dislikes_count: 0,
  views_count: 10,
};

const citizenFixture = {
  id: "hm-123",
  code: "HM-123",
  name: "Sandbox Citizen",
  kyc: { fname: "Sandbox", lname: "Citizen", birth_date: "2000-01-01", phone: "0000000000", email: "citizen@example.test", address: "Sandbox address" },
  customs: { about: "A deterministic citizen profile used by isolated route tests.", occupation: "Tester", education: "Test data", loved_city: "Sandbox", loved_country: "Test", loved_language: "English" },
  profilePhotos: [],
  current_level: { slug: "1", name: "Citizen" },
  achieved_levels: [],
  level: { name: "Citizen" },
  registered_at: "2026-01-01",
  position: "Sandbox member",
  score: 10,
  score_percentage_to_next_level: "90",
};

const levelFixture = {
  data: {
    id: 1,
    general_info: {
      description: "Deterministic citizen level information for isolated tests.",
      png_file: "/team.webp",
    },
  },
};

const levelTabFixture = {
  data: {
    description: "General information for the sandbox citizen level.",
    png_file: "/team.webp",
  },
};

const calendarEvents = [
  {
    id: 1,
    title: "Sandbox calendar event",
    description: "Deterministic event data used by isolated calendar tests.",
    starts_at: "1405/08/10 12:00",
    ends_at: "1405/08/10 13:00",
    btn_link: "/fa/calendar/1",
    btn_name: "View event",
    color: "#336699",
    dislikes: 0,
    likes: 3,
    image: "/team.webp",
    views: 12,
    user_interaction: null,
  },
];

function json(response, status, body, extraHeaders = {}) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...extraHeaders,
  });
  response.end(JSON.stringify(body));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);

  if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
    return json(response, 405, { message: "Method not allowed" });
  }

  if (request.method === "OPTIONS" && url.pathname.startsWith("/rest/v1/")) {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "apikey,authorization,content-type,prefer",
    });
    return response.end();
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

  // Supabase/PostgREST is redirected to this local server in E2E mode.
  // Return deterministic empty collections instead of contacting a real DB.
  if (url.pathname === "/rest/v1/news" || url.pathname === "/rest/v1/articles") {
    return json(response, 200, [], {
      "content-range": "0-0/0",
      "access-control-allow-origin": "*",
    });
  }

  if (url.pathname === "/api/levels/1") {
    return json(response, 200, levelFixture);
  }

  if (url.pathname === "/api/levels/1/general-info") {
    return json(response, 200, levelTabFixture);
  }

  if (url.pathname === "/api/levels") {
    return json(response, 200, { data: [levelFixture.data] });
  }

  if (url.pathname === "/api/calendar") {
    if (url.searchParams.get("type") === "version") {
      return json(response, 200, { data: [] });
    }

    if (url.searchParams.get("type") === "event") {
      return json(response, 200, { data: calendarEvents });
    }

    return json(response, 200, { data: calendarEvents });
  }

  const calendarEventMatch = url.pathname.match(/^\/api\/calendar\/(\d+)$/);
  if (calendarEventMatch) {
    const event = calendarEvents.find(({ id }) => id === Number(calendarEventMatch[1]));
    return event
      ? json(response, 200, { data: event })
      : json(response, 404, { message: "Calendar event not found" });
  }

  if (url.pathname === "/api/users") {
    return json(response, 200, { data: [], meta: { page: Number(url.searchParams.get("page") || 1) } });
  }

  if (/^\/api\/citizen\/[^/]+$/.test(url.pathname)) {
    return json(response, 200, { data: citizenFixture });
  }

  if (url.pathname === "/api/tutorials") {
    return json(response, 200, { data: [videoFixture] });
  }

  if (url.pathname === "/api/tutorials/1") {
    return json(response, 200, { data: videoFixture });
  }

  if (url.pathname === "/api/tutorials/1/comments") {
    return json(response, 200, { data: [] });
  }

  if (url.pathname === "/api/tutorials/categories/general/basics") {
    return json(response, 200, { data: { videos: [videoFixture] } });
  }

  return json(response, 404, { message: "No mock route configured", path: url.pathname });
});

server.listen(port, host, () => {
  process.stdout.write(`Mock API listening on http://${host}:${port}\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
