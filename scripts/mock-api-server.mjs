import http from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const host = "127.0.0.1";
const port = Number(process.env.MOCK_API_PORT || 9999);
// Discover dictionaries and merge them with configurable active mock locales.
const languageCodePattern = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/;
const rtlLanguageCodes = new Set(["ar", "fa", "he", "ps", "ur"]);
const languageNames = { ar: "العربية", en: "English", fa: "فارسی", ru: "Русский", zh: "中文" };
const dictionaryDirectory = join(process.cwd(), "public", "lang");
const localEnvContent = await readFile(join(process.cwd(), ".env.local"), "utf8").catch(() => "");
const localLanguageSetting = localEnvContent.match(/^\s*MOCK_ACTIVE_LANGUAGES\s*=\s*(.*?)\s*$/m)?.[1];
const configuredLanguageCodes = (process.env.MOCK_ACTIVE_LANGUAGES || localLanguageSetting || "fa,en,ar,ru,zh")
  .split(",").map((code) => code.trim()).filter((code) => languageCodePattern.test(code));
let dictionaryFileCodes = [];
try {
  dictionaryFileCodes = (await readdir(dictionaryDirectory))
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.slice(0, -5))
    .filter((code) => languageCodePattern.test(code));
} catch {
  // Configured locales still work through the English dictionary fallback.
}
const activeLanguageCodes = [...new Set([...configuredLanguageCodes, ...dictionaryFileCodes])];
const translationLanguages = activeLanguageCodes.map((code) => ({
  code,
  direction: rtlLanguageCodes.has(code.split("-")[0].toLowerCase()) ? "rtl" : "ltr",
  file_url: `http://${host}:${port}/lang/${code}.json`,
  name: languageNames[code] || code,
}));

const englishDictionaryPath = join(dictionaryDirectory, "en.json");
async function readLanguageDictionary(code) {
  try {
    return await readFile(join(dictionaryDirectory, `${code}.json`), "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    return readFile(englishDictionaryPath, "utf8");
  }
}

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
  id: "hm-2000001",
  code: "HM-2000001",
  name: "حسین قدیری",
  kyc: { fname: "حسین", lname: "قدیری", birth_date: "2000-01-01", phone: "0000000000", email: "citizen@example.test", address: "Sandbox address" },
  customs: { about: "پروفایل آزمایشی حسین قدیری برای بررسی مسیرهای شهروندی.", occupation: "Tester", education: "Test data", loved_city: "Sandbox", loved_country: "Test", loved_language: "English" },
  profilePhotos: [],
  current_level: { slug: "1", name: "Citizen" },
  achieved_levels: [],
  level: { name: "Citizen" },
  registered_at: "2026-01-01",
  position: "Test member",
  score: 10,
  score_percentage_to_next_level: "90",
};

const levelDefinitions = [
  { id: 1, unique_id: 382, route_name: "citizen-baguette", name: "Citizen", score: 10, image: "/svg/level/citizen.png" },
  { id: 2, unique_id: 383, route_name: "reporter-baguette", name: "Reporter", score: 990, image: "/svg/level/reporter.png" },
  { id: 3, unique_id: 589, route_name: "participation-baguette", name: "Participation", score: 3000, image: "/svg/level/participation.png" },
  { id: 4, unique_id: 68, route_name: "developer-baguette", name: "Developer", score: 8000, image: "/svg/level/developer.png" },
  { id: 5, unique_id: 69, route_name: "inspector-baguette", name: "Inspector", score: 18000, image: "/svg/level/inspector.png" },
  { id: 6, unique_id: 590, route_name: "businessman-baguette", name: "Businessman", score: 36000, image: "/svg/level/businessman.png" },
  { id: 7, unique_id: 71, route_name: "lawyer-baguette", name: "Lawyer", score: 76000, image: "/svg/level/lawyer.png" },
  { id: 8, unique_id: 591, route_name: "city-council-baguette", name: "City Council", score: 166000, image: "/svg/level/city-council.png" },
  { id: 9, unique_id: 592, route_name: "the-mayor-baguette", name: "The Mayor", score: 366000, image: "/svg/level/the-mayor.png" },
  { id: 10, unique_id: 74, route_name: "governor-baguette", name: "Governor", score: 796000, image: "/svg/level/governor.png" },
  { id: 11, unique_id: 75, route_name: "minister-baguette", name: "Minister", score: 1696000, image: "/svg/level/minister.png" },
  { id: 12, unique_id: 76, route_name: "judge-baguette", name: "Judge", score: 3696000, image: "/svg/level/judge.png" },
  { id: 13, unique_id: 77, route_name: "legislator-baguette", name: "Legislator", score: 7896000, image: "/svg/level/legislator.png" },
];

const levelFixtures = levelDefinitions.map((level) => ({
  data: {
    ...level,
    photo: level.image,
    general_info: {
      description: `Deterministic ${level.name.toLowerCase()} level information for isolated tests.`,
      png_file: "/team.webp",
    },
  },
}));

function createLevelTabFixture(level, tab) {
  return {
    data: {
      description: `Sandbox ${tab} content for the ${level.name.toLowerCase()} level.`,
      png_file: "/team.webp",
      score: level.score,
      rank: level.id,
      points: level.score,
      file_volume: "1 MB",
      subcategories: 1,
      lines: 1,
      creation_date: "2026-01-01",
      has_animation: false,
      persian_font: "Sandbox Persian",
      designer: "Sandbox Designer",
      english_font: "Sandbox English",
      model_designer: "Sandbox Model Designer",
      used_colors: "#336699",
    },
  };
}

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
  author: { name: "Sandbox Author", citizenId: "hm-2000001" },
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
  author: { name: "Sandbox News Author", citizenId: "hm-2000001" },
  stats: { likes: 2, dislikes: 0, views: 10, comments: 0 },
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
    citizen_id: "hm-2000001",
    name: "Sandbox Referral",
    image: "/team.webp",
    referrerOrders: [{ amount: 12 }],
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
  {
    karbari: "blue",
    label: "Blue",
    current_count: 3,
    bought_count: 3,
    sold_count: 1,
  },
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

  // Translation metadata and dictionaries are served from repository fixtures.
  // The isolated E2E environment never calls Dev Admin or any external service.
  if (url.pathname === "/api/translations") {
    if (request.method !== "GET" || url.searchParams.get("active") !== "true") {
      return json(response, 400, { message: "GET with active=true is required" });
    }

    return json(response, 200, { data: translationLanguages });
  }

  const dictionaryMatch = url.pathname.match(/^\/lang\/([A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*)\.json$/);
  if (dictionaryMatch) {
    const languageCode = dictionaryMatch[1];
    if (!activeLanguageCodes.includes(languageCode)) {
      return json(response, 404, { message: "Translation language is not active" });
    }
    try {
      const dictionary = await readLanguageDictionary(languageCode);
      response.writeHead(200, {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=86400",
      });
      return response.end(dictionary);
    } catch (error) {
      return json(response, 500, {
        message: "Local translation dictionary could not be read",
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

  const singleLevelMatch = url.pathname.match(/^\/api\/levels\/(\d+)$/);
  if (singleLevelMatch) {
    const level = levelFixtures.find(({ data }) => data.id === Number(singleLevelMatch[1]));
    return level
      ? json(response, 200, level)
      : json(response, 404, { message: "Level not found" });
  }

  const levelTabMatch = url.pathname.match(/^\/api\/levels\/(\d+)\/(general-info|licenses|gem|gift|prize)$/);
  if (levelTabMatch) {
    const level = levelDefinitions.find(({ id }) => id === Number(levelTabMatch[1]));
    return level
      ? json(response, 200, createLevelTabFixture(level, levelTabMatch[2]))
      : json(response, 404, { message: "Level not found" });
  }

  if (url.pathname === "/api/levels") {
    return json(response, 200, { data: levelFixtures.map(({ data }) => data) });
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
        description: "Deterministic education category description for isolated route validation.",
        image: "/team.webp",
        icon: "/team.webp",
        subcategories: [
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
