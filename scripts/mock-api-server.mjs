import http from "node:http";

const host = "127.0.0.1";
const port = Number(process.env.MOCK_API_PORT || 9999);
const translationApiUrl =
  process.env.PLAYWRIGHT_TRANSLATION_API_URL ||
  "https://dev-admin.metarang.com/api/translations?active=true";

const videoFixture = {
  id: 1,
  slug: "1",
  title: "Sandbox tutorial video",
  description: "Deterministic tutorial content used by isolated end-to-end tests.",
  image_url: "/team.webp",
  upload_date: "2026-10-01",
  category: {
    id: 10,
    slug: "general",
    name: "General",
  },
  sub_category: {
    id: 11,
    slug: "basics",
    name: "Basics",
  },
  creator: {
    name: "Sandbox Creator",
    code: "TEST-1",
    image: "/team.webp",
  },
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

const articleFixture = {
  id: 1,
  slug: "sample-article",
  categorySlug: "general",
  title: "Sandbox article",
  description: "A deterministic article fixture for public route validation.",
  content: "<p>Article content used by isolated end-to-end tests.</p>",
  image: "/team.webp",
  date: "2026-10-01",
  category: "general",
  subCategory: "general",
  author: { name: "Sandbox Author", citizenId: "hm-123" },
  categoryImage: "/team.webp",
  categoryDec: "A deterministic article category for isolated route validation.",
  stats: { likes: 2, dislikes: 0, views: 10, comments: 0 },
};

const newsFixture = {
  id: 1,
  slug: "sample-news",
  categorySlug: "general",
  title: "Sandbox news",
  description: "A deterministic news fixture for public route validation.",
  content: "<p>News content used by isolated end-to-end tests.</p>",
  image: "/team.webp",
  date: "2026-10-01",
  category: "general",
  author: { name: "Sandbox News Author", citizenId: "hm-123" },
};

const versionFixtures = [
  {
    id: 1,
    title: "Sandbox release",
    description: "Deterministic version entry for route tests.",
    starts_at: "1405/08/10 12:00",
    version_title: "1.0",
    image_url: "/team.webp",
  },
];

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

const referralFixtures = [
  {
    id: 301,
    code: "HM-124",
    citizen_id: "hm-123",
    display_name: "Sandbox Referral",
    registered_at: "2026-10-01",
    status: "active",
  },
];

const referralChartFixture = {
  chart_data: [
    {
      year: "2026",
      total_referrals_count: 4,
      total_referral_orders_amount: 12,
      month: "October",
      day: "Thursday",
      hour: "12",
      referrals_count: 4,
      referral_orders_amount: 12,
    },
  ],
};

const featureSummaryFixtures = [
  { karbari: "blue", label: "Blue", count: 3, amount: 3 },
];

const featureChartFixture = {
  bought: [{ amount: 3, karbari: "blue", label: "2026" }],
  sold: [{ amount: 1, karbari: "blue", label: "2026" }],
};

const buildingSummaryFixtures = [
  { karbari: "blue", label: "Blue", count: 2 },
];

const buildingChartFixtures = [
  { amount: 2, karbari: "blue", label: "2026" },
];

const buildingListFixtures = [
  {
    building_id: 501,
    karbari: "blue",
    construction_end_date: "2026-12-31",
    visitors: 10,
    empty_units: 2,
    area: 100,
    density: 5,
    images: [{ id: 1, url: "/team.webp" }],
  },
];

const walletSummaryFixtures = [
  {
    asset: "blue",
    current_balance: 10,
    direction: "up",
    growth_percent: 5,
    period_income: 2,
    period_spending: 1,
    privacy_restricted: false,
  },
];

const walletChartFixture = {
  blue: {
    income: [{ amount: 2, label: "2026" }],
    spending: [{ amount: 1, label: "2026" }],
  },
};

function json(response, status, body, extraHeaders = {}) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,HEAD,OPTIONS",
    "access-control-allow-headers": "Accept,Authorization,Content-Type",
    ...extraHeaders,
  });
  response.end(JSON.stringify(body));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);

  if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS") {
    return json(response, 405, { message: "Method not allowed" });
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,HEAD,OPTIONS",
      "access-control-allow-headers": "Accept,Authorization,Content-Type,apikey,prefer",
    });
    return response.end();
  }

  if (url.pathname === "/health") {
    response.writeHead(200, { "content-type": "text/plain" });
    return response.end("ok");
  }

  // Translation metadata is the only Admin API request allowed to reach
  // the real Dev backend. Every other Admin/API endpoint stays on fixtures.
  if (url.pathname === "/api/translations") {
    if (request.method !== "GET" || url.searchParams.get("active") !== "true") {
      return json(response, 400, { message: "GET with active=true is required" });
    }

    try {
      const upstreamUrl = new URL(translationApiUrl);
      upstreamUrl.searchParams.set("active", "true");
      const upstreamResponse = await fetch(upstreamUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(9_000),
      });
      const body = await upstreamResponse.text();

      response.writeHead(upstreamResponse.status, {
        "content-type":
          upstreamResponse.headers.get("content-type") ||
          "application/json; charset=utf-8",
        "cache-control": "no-store",
      });
      return response.end(body);
    } catch (error) {
      return json(response, 502, {
        message: "Dev translations API is unavailable",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Supabase/PostgREST receives deterministic published records in E2E mode.
  if (url.pathname === "/rest/v1/news" || url.pathname === "/rest/v1/articles") {
    const records = url.pathname.endsWith("/news") ? [newsFixture] : [articleFixture];
    const singleRecord = request.headers.accept?.includes("application/vnd.pgrst.object+json");
    return json(response, 200, singleRecord ? records[0] : records, {
      "content-range": `0-${records.length - 1}/${records.length}`,
      "access-control-allow-origin": "*",
    });
  }

  if (url.pathname === "/api/levels/1") {
    return json(response, 200, levelFixture);
  }

  if (/^\/api\/levels\/1\/(general-info|licenses|gem|gift|prize)$/.test(url.pathname)) {
    return json(response, 200, levelTabFixture);
  }

  if (url.pathname === "/api/levels") {
    return json(response, 200, { data: [levelFixture.data] });
  }

  if (url.pathname === "/api/calendar") {
    if (url.searchParams.get("type") === "version") {
      return json(response, 200, { data: versionFixtures });
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

  if (/^\/api\/citizen\/[^/]+\/referrals\/chart$/.test(url.pathname)) {
    return json(response, 200, { data: referralChartFixture });
  }

  if (/^\/api\/citizen\/[^/]+\/referrals$/.test(url.pathname)) {
    return json(response, 200, {
      data: referralFixtures,
      meta: { current_page: 1, last_page: 1 },
      links: { next: null },
    });
  }

  if (/^\/api\/citizen\/[^/]+\/features\/summary$/.test(url.pathname)) {
    return json(response, 200, { data: featureSummaryFixtures });
  }

  if (/^\/api\/citizen\/[^/]+\/features\/chart$/.test(url.pathname)) {
    return json(response, 200, { data: featureChartFixture });
  }

  if (/^\/api\/citizen\/[^/]+\/buildings\/summary$/.test(url.pathname)) {
    return json(response, 200, { data: buildingSummaryFixtures });
  }

  if (/^\/api\/citizen\/[^/]+\/buildings\/chart$/.test(url.pathname)) {
    return json(response, 200, { data: buildingChartFixtures });
  }

  if (/^\/api\/citizen\/[^/]+\/buildings$/.test(url.pathname)) {
    return json(response, 200, {
      data: buildingListFixtures,
      meta: { current_page: Number(url.searchParams.get("page") || 1), last_page: 1 },
    });
  }

  if (/^\/api\/citizen\/[^/]+\/wallet\/history\/summary$/.test(url.pathname)) {
    return json(response, 200, { data: walletSummaryFixtures });
  }

  if (/^\/api\/citizen\/[^/]+\/wallet\/history\/chart$/.test(url.pathname)) {
    return json(response, 200, { data: walletChartFixture });
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
    return json(response, 200, {
      data: {
        id: 11,
        slug: "basics",
        name: "Basics",
        description: "Sandbox tutorial category.",
        image: "/team.webp",
        videos: [videoFixture],
        videos_count: 1,
      },
    });
  }

  if (url.pathname === "/api/tutorials/categories/general") {
    return json(response, 200, {
      data: {
        id: 10,
        slug: "general",
        name: "General",
        icon: "/team.webp",
        sub_categories: [
          {
            id: 11,
            slug: "basics",
            name: "Basics",
            image: "/team.webp",
          },
        ],
      },
    });
  }

  if (url.pathname === "/api/tutorials/categories") {
    return json(response, 200, {
      data: [
        {
          id: 10,
          slug: "general",
          name: "General",
          icon: "/team.webp",
        },
      ],
    });
  }

  return json(response, 404, { message: "No mock route configured", path: url.pathname });
});

server.listen(port, host, () => {
  process.stdout.write(`Mock API listening on http://${host}:${port}\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
