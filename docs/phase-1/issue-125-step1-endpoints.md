<div dir="rtl" align="right">

## گام اول — فهرست کامل اندپوینت‌ها، متغیرهای محیطی و مسیرهای خزش (Issue #125)

**مبنای استخراج:** اسکن استاتیک تمام `src/**` (۴۰۲ فایل) روی شاخه‌ی `main` و بررسی `next.config.js`، `middleware.ts` و `env.example`. ریپازیتوری محلی شاخه‌ی `dev` نداشت؛ پیش از شروع پیاده‌سازی لطفاً تأیید شود که `dev` با `main` همسان است یا دیفِ آن اعلام شود.
**نکته‌ی صداقت:** ستون «فیلدهای پاسخ» فقط فیلدهایی است که کد فرانت واقعاً می‌خواند؛ شکل کامل پاسخ‌ها در گام ۸ (MSW) باید با پاسخ واقعی `dev-api` تطبیق داده شود، چون از این محیط به آن دسترسی ندارم.

---

### ۱. خلاصه‌ی عددی (مبنای ۱۰۰٪)

| دسته | تعداد |
|---|---|
| اندپوینت‌های بک‌اند Go (`NEXT_PUBLIC_API_BASE_URL`) | **44** |
| اندپوینت‌های Admin API (ترجمه‌ها + `file_url`) | **2** |
| Route Handlerهای خودِ Next (`/[lang]/api/*`) | **5** |
| جدول/Bucket در Supabase (خارج از محدوده‌ی Mock طبق بخش ۱۶) | **3** |
| سرویس‌های بیرونی | ۳ |
| الگوی مسیر صفحه‌ها (هر زبان) | ۴۹ (۳۲ الگو + ۱۷ ترکیب سطح/تب) |

> پوشش ۱۰۰٪ یعنی: هر ردیف جداول ۲ تا ۵ یک Handler در MSW و حداقل یک تست موفق + یک تست خطا داشته باشد، و هر الگوی مسیر بخش ۷ در Playwright خزش شود.

---

### ۲. متغیرهای محیطی (نتیجه‌ی بررسی کد)

| متغیر | استفاده | مقدار Mock پیشنهادی در `.env.example` |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | ۸۱ جا؛ هم SSR هم مرورگر | `http://127.0.0.1:4010` (Mock Server) |
| `NEXT_PUBLIC_ADMIN_API_BASE_URL` | `getLangArray()` | `http://127.0.0.1:4010` |
| `NEXT_PUBLIC_BASE_URL` | آدرس سایت | `http://127.0.0.1:5175` |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | کلاینت Supabase | `http://127.0.0.1:4010/supabase` / `mock-anon-key` |
| `NEXT_PUBLIC_HERO_VIDEO_BASE` | HeroVideo | `/firstpage` |
| `SITE_URL` | `version/[[...version]]/page.tsx` | `http://127.0.0.1:5175` |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` `EMAIL_FROM` `EMAIL_TO` | فقط `api/sendEmail` | مقادیر ساختگی؛ در تست nodemailer Mock می‌شود |
| `ANALYZE`، `NODE_ENV` | build | — |
| **`INTERNAL_GO_SERVICE_URL`، `INTERNAL_SERVICE_KEY`، کلید HMAC-SHA256** | **در کد فعلی وجود ندارند** (grep: صفر نتیجه؛ نه `revalidateTag` سفارشی، نه webhook) | جدید و فقط سمت سرور؛ بدون پیشوند `NEXT_PUBLIC_` |

**دو نکته‌ی مهم برای طراحی:**
1. آدرس Go در پروژه **عمومی** است (`NEXT_PUBLIC_API_BASE_URL`) و مرورگر مستقیم به آن درخواست می‌زند (۳۵ فایل `use client`، جدول ۳). پس MSW باید هم در Node (برای Server Components) و هم در مرورگر Playwright (Service Worker یا `page.route`) فعال باشد؛ `INTERNAL_GO_SERVICE_URL` فقط می‌تواند مسیر سروری باشد.
2. فایل موجود `env.example` (بدون نقطه) یک `NEXT_PUBLIC_SUPABASE_ANON_KEY` **واقعی** (JWT پروژه‌ی `zvnsprrucxrcfwynoeeh`) و آدرس‌های dev دارد؛ طبق معیار پذیرش باید با مقدار Mock جایگزین و به نام `.env.example` تغییر کند. (کلید anon عمومی است ولی تعبیه‌ی آن در نمونه با شرط «بدون اطلاعات واقعی» نمی‌خواند.)

---

### ۳. اندپوینت‌های بک‌ِاند Go — `api.metarang.com`

| # | متد | مسیر | Query | Body | احراز | سمت | مصرف‌کننده‌ها (زیر `src/`) | فیلدهای پاسخِ مصرف‌شده |
|---|---|---|---|---|---|---|---|---|
| A1 | `POST` | `/api/auth/me` | — | — | Bearer token (cookie `token`) | CSR | sidebar/LoginMenuModule.tsx; features/comments/CommentList.tsx; app/[lang]/admin/page.tsx; app/[lang]/news/admin/page.tsx | data.code (+ پروفایل کاربر) |
| A2 | `POST` | `/api/auth/register` | — | {referral, back_url} | — | CSR | sidebar/LoginMenuModule.tsx; system/ReferralHandler.tsx | — |
| A3 | `GET` | `/api/auth/redirect` | redirect_to, referral? | — | — | CSR | sidebar/LoginMenuModule.tsx; features/video/LoginButtonModule.tsx; utils/authRedirect.ts | url |
| A4 | `POST` | `/api/auth/referral` | — | {referral} | Bearer token | CSR | sidebar/LoginMenuModule.tsx | — |
| A5 | `POST` | `/api/auth/logout` | — | — | Bearer token | CSR | sidebar/LoginMenuModule.tsx | — |
| C1 | `GET` | `/api/calendar` | type=event|version, page, search, date | — | — | SSR+CSR | calendar/page.tsx; calendar/[id]/page.tsx; version/[[...version]]/page.tsx; utils/actions.js(getAllVersions); templates/firstpage/{homeData.ts,VersionSection.tsx,SectionTimer.tsx}; templates/envent/{EventCalendarClient,EventList,EventsCalendar,SingleEventCalendarClient}.tsx; templates/verion/versionList.tsx; utils/getEvent.ts | data[] {id,title,image,btn_link,btn_name,description,starts_at,ends_at,color,views,likes,dislikes,version_title,user_interaction} |
| C2 | `GET` | `/api/calendar/filter` | start_date, end_date | — | — | CSR | templates/envent/{EventsCalendar,SingleEventCalendarClient}.tsx | data[] |
| C3 | `GET` | `/api/calendar/{id}` | — | — | Bearer (اختیاری) | SSR+CSR | calendar/[id]/page.tsx; templates/envent/SingleEvent.tsx | data {…, user_interaction.has_liked/has_disliked} |
| C4 | `GET` | `/api/calendar/events/{id}` | — | — | — | SSR | utils/getEvent.ts (getEventById) | data (مسیر متفاوت از C3؛ بخش ۵ را ببینید) |
| C5 | `POST` | `/api/calendar/events/{id}/interact` | — | {liked: 0|1} | Bearer token | CSR | templates/envent/{EventList,SingleEvent}.tsx | — |
| T1 | `GET` | `/api/tutorials` | page | — | — | SSR+CSR | utils/actions.js(getAllCategoryVideos); firstpage/homeData.ts; list/{EducationList,ListSubCategoriesEducation}.tsx; PageTemplate/NewEducationSectionTemp.tsx; features/comments/CommentSection.tsx | data[] {id,slug,title,description,image_url,created_at,likes_count,dislikes_count,views_count,category{name,slug},sub_category{name,slug},creator{code,image}} |
| T2 | `POST` | `/api/tutorials/search` | — | {searchTerm} | — | CSR | Search/SearchComponent.tsx | data[] |
| T3 | `GET` | `/api/tutorials/categories` | — | — | — | SSR | utils/actions.js(getAllCategories) | data[] |
| T4 | `GET` | `/api/tutorials/categories/{category}` | — | — | — | SSR+CSR | utils/actions.js(getEducationSingleCategory); list/ListSubCategoriesEducation.tsx | data.subcategories[] |
| T5 | `GET` | `/api/tutorials/categories/{category}/{subcategory}` | — | — | — | SSR | utils/actions.js(getSubcategoryData) | data / videos[] |
| T6 | `GET` | `/api/tutorials/{slug}` | page (برای زیردسته) | — | Bearer (اختیاری، در SSR) | SSR+CSR | utils/actions.js(getSingleVideoData); PageTemplate/SubcategoryPageSection.tsx | data / videos[] |
| T7 | `GET` | `/api/tutorials/{videoId}/comments` | page | — | — | SSR+CSR | utils/actions.js(getVideoComments); PageTemplate/VideoSection.tsx | data[] |
| T8 | `POST` | `/api/tutorials/{videoId}/comments` | — | {content} | Bearer token | CSR | features/video/SingleVideoDetailsModule.tsx | — |
| T9 | `POST` | `/api/tutorials/{videoId}/comments/{commentId}` | — | {content} | Bearer token | CSR | features/comments/utils/helper.tsx (ویرایش) | — |
| T10 | `DELETE` | `/api/tutorials/{videoId}/comments/{commentId}` | — | — | Bearer token | CSR | features/comments/utils/helper.tsx | — |
| T11 | `POST` | `/api/tutorials/{videoId}/comments/{commentId}/like` | — | {data:" "} | Bearer token | CSR | features/comments/utils/helper.tsx | — |
| T12 | `POST` | `/api/tutorials/{videoId}/comments/{commentId}/dislike` | — | {data:" "} | Bearer token | CSR | features/comments/utils/helper.tsx | — |
| T13 | `POST` | `/api/tutorials/{videoId}/comments/{commentId}/report` | — | {content} | Bearer token | CSR | features/comments/utils/helper.tsx | — |
| T14 | `POST` | `/api/tutorials/{videoId}/comments/{commentId}/interactions` | liked=0|1 | — | Bearer token | CSR | features/comments/CommentList.tsx | — |
| R1 | `GET` | `/api/comments/{commentId}/replies` | — | — | Bearer token | CSR | features/comments/{CommentList,ReplyList}.tsx | data[] |
| R2 | `POST` | `/api/comments/{commentId}/reply` | — | {content} | Bearer token | CSR | features/comments/CommentList.tsx | — |
| R3 | `POST` | `/api/comments/{commentId}/replies/{replyId}/interactions` | liked=0|1 | — | Bearer token | CSR | features/comments/ReplyList.tsx | — |
| R4 | `DELETE` | `/api/comments/{commentId}/replies/{replyId}` | — | — | Bearer token | CSR | features/comments/ReplyList.tsx | — |
| L1 | `GET` | `/api/levels` | — | — | — | SSR | utils/actions.js(getAllLevels) | data[] |
| L2 | `GET` | `/api/levels/{levelId}` | — | — | — | SSR | utils/actions.js(getSingleLevel) | data {…} |
| L3 | `GET` | `/api/levels/{levelId}/{tab}  tab∈general-info|licenses|gem|gift|prize` | — | — | — | SSR | utils/actions.js(getLevelTabs) | data |
| U1 | `GET` | `/api/users` | page | — | — | SSR+CSR | utils/actions.js(getAllCitizen); list/citizenList.jsx | data[], meta.to |
| U2 | `POST` | `/api/search/users` | — | multipart/form-data {searchTerm} | — | CSR | Search/SearchComponent.tsx | data[] |
| U3 | `GET` | `/api/citizen/{id}` | — | — | — | SSR+CSR | utils/actions.js(getUserData); shared/BreadCrumb.tsx; (Next route /[lang]/api/citizen/[id]) | data {code, kyc{fname,lname}, …} |
| U4 | `GET` | `/api/citizen/{id}/referrals` | search, page | — | — | SSR+CSR | utils/actions.js(getAllReferral); templates/referral/invite-list.tsx | data[], meta |
| U5 | `GET` | `/api/citizen/{id}/referrals/chart` | range | — | — | SSR+CSR | utils/actions.js(getChartReferral); templates/referral/invite-chart.js | data |
| U6 | `GET` | `/api/citizen/{id}/features/summary` | period, karbari (تکرارشونده) | — | — | CSR | citizens/[id]/summary/{FeaturesSummary,FeaturesMap}.tsx | data[] {karbari,label,…} |
| U7 | `GET` | `/api/citizen/{id}/features/chart` | period, karbari (تکرارشونده) | — | — | CSR | citizens/[id]/summary/FeaturesChart.tsx | data.bought[], data.sold[] {amount,karbari,label} |
| U8 | `GET` | `/api/citizen/{id}/features` | karbari, search, page, per_page | — | — | CSR | citizens/[id]/summary/FeaturesMap.tsx | data[], map_markers[], meta.last_page |
| U9 | `GET` | `/api/citizen/{id}/buildings` | karbari[] ، page | — | — | CSR | citizens/[id]/buildings/BuildingsList.tsx | data[], meta |
| U10 | `GET` | `/api/citizen/{id}/buildings/summary` | — | — | — | CSR | citizens/[id]/buildings/BuildingsSummary.tsx | data[] {karbari,label,…} |
| U11 | `GET` | `/api/citizen/{id}/buildings/chart` | period, karbari[] | — | — | CSR | citizens/[id]/buildings/BuildingsChart.tsx | data[] |
| U12 | `GET` | `/api/citizen/{id}/wallet/history/summary` | period, assets (تکرارشونده) | — | — | CSR | citizens/[id]/wallet/WalletHistory.tsx | data[] |
| U13 | `GET` | `/api/citizen/{id}/wallet/history/chart` | period, assets (تکرارشونده) | — | — | CSR | citizens/[id]/wallet/WalletHistory.tsx | data{} |

**قراردادهای مهم برای Handlerهای MSW:**
- هدر ثابت اکثر درخواست‌ها `Content-Type: application/json`؛ درخواست‌های احرازشده `Authorization: Bearer <token>` (توکن از کوکی `token`).
- پارامتر `karbari` تکرارشونده است ولی در ساختمان‌ها `karbari[]` (U9, U11) و در ملک‌ها `karbari` (U6, U7, U8). Handlerها باید هر دو را بپذیرند.
- `A1` برای تست مسیرهای `admin` باید `data.code` را برگرداند؛ دسترسی صفحه‌های ادمین بر اساس همین کد (مقایسه‌ی lowercase) است.
- `T6` هم برای ویدیوی تکی (SSR، `cache: no-store`) و هم برای زیردسته با `?page=` (CSR) استفاده می‌شود؛ Handler باید با شکل `videos` یا `data` پاسخ دهد.

---

### ۴. Admin API و فایل ترجمه

| # | متد | مسیر | سمت | توضیح |
|---|---|---|---|---|
| AD1 | `GET` | `/api/translations?active=true` | SSR | utils/actions.js(getLangArray) — `[{code, direction, file_url, …}]`  (revalidate 3600, tag translations) |
| AD2 | `GET` | `{file_url} (لیستِ AD1)` | SSR | utils/actions.js(getMainFile) — دیکشنریِ مسطح id→متن؛ پیش‌فرض fa: https://rgb.irpsc.com/lang/fa.json |

**ساختار داینامیک زبان‌ها (مطابق تأییدیه):** Handler پارامتریک `GET /translations?active=true` یک آرایه‌ی داده‌محور از زبان‌ها (`fa, en, ar, ru, zh, …`) برمی‌گرداند و `file_url` هر زبان به `GET {mock}/lang/:code.json` اشاره می‌کند. برای کدی که فایل ثابت ندارد، یک Generator همان دیکشنری `fa` را با `id` یکسان و متن پیشوندشده تولید می‌کند تا افزودن زبان جدید نیاز به تغییر تست نداشته باشد. در کد هیچ‌جا زبان هاردکد برای دریافت دیکشنری نیست (`getTranslation` فقط به آرایه‌ی API وابسته است)؛ تنها موارد هاردکدِ `fa/en` در **خارج** از این زنجیره‌اند و در بخش ۸ آمده‌اند.

---

### ۵. Route Handlerهای خودِ Next و میدل‌ور

| # | متد | مسیر | رفتار برای تست |
|---|---|---|---|
| N1 | `GET` | `/{lang}/api/citizen/{id}` | wrapper روی U3؛ 404 اگر data نباشد؛ 500 روی خطا |
| N2 | `GET` | `/{lang}/api/model` | type=gltf|bin، url، bin، expectedLength — پروکسی فقط برای host مجاز (admin/api/dev-admin/dev-api .metarang.com)، 3 بار retry، پشتیبانی Range/206 |
| N3 | `POST` | `/{lang}/api/sendEmail` | body {formData{name,email,phoneNo,title,message,website(honeypot)}, startTime}؛ 200 spam، 429 (<3s)، 400 اعتبارسنجی، SMTP (nodemailer) |
| N4 | `GET` | `/{lang}/api/flag/{filename}` | فقط FA.svg|EN.svg → admin.metarang.com/assets/images/flags/ (⚠ فقط fa/en؛ ar/ru/zh در لیست مجاز نیستند) |
| N5 | `GET` | `/{lang}/api/firstpage-video/{filename}` | فقط mob2.mp4|metaverse-rang.mp4 → s3.metarang.com/metarang/firstpage/، پشتیبانی Range |

- **Middleware:** `^/([a-z]{2})/citizens/(HM-\d+)$` ← ریدایرکت **۳۰۱** به همان مسیر با `id` حروف‌کوچک (matcher: `/:lang/citizens/:id*`). تست واحد/E2E لازم.
- **Redirectهای `next.config.js`:** `/ → /fa` (۳۰۸)، `/:lang/citizen → /:lang/citizens`، `/:lang/citizen/:id → /:lang/citizens/:id` (دائمی).
- **Headerهای کش:** `/data/*`، `/lang/*` (CORS)، `/uploads/calendars/*`، `/fonts/*`، `/firstpage/*`.

---

### ۶. Supabase و سرویس‌های بیرونی

**Supabase (طبق بخش ۱۶ Mock اختصاصی ندارد؛ فقط Stub/Bypass حداقلی برای `next build` و رندر):**

| هدف | عملیات مشاهده‌شده در کد |
|---|---|
| `articles` | select(*) ± order(date)، eq(slug|categorySlug)، single، limit(5|50|500)، insert/update/delete(id) |
| `news` | select(* | ستون‌های مشخص) ، order(date)، eq(categorySlug|slug)، neq/not(video)، limit(5|40)، insert/update/delete(id) |
| `storage: articles` | upload(path,file,{upsert:false})، getPublicUrl — utils/uploadImage.ts |

شمارش: `.from("articles")` ← ۱۹ جا، `.from("news")` ← ۱۴ جا. اکثر صفحه‌های اخبار/مقالات (SSR) هنگام خطا به `public/data/news-fallback.json` برمی‌گردند (اخبار) ولی **مقالات هیچ fallback داده‌ای ندارند** (فقط `Suspense fallback`ِ اسکلتی) و در خطا خالی/۴۰۴ می‌شوند؛ پس Stub باید برای `articles` داده‌ی حداقلی برگرداند تا مسیرهای `articles/*` خزش‌پذیر باشند.

**بیرونی:**

| متد | آدرس | توضیح |
|---|---|---|
| `GET` | `https://ipapi.co/json/?t={ts}` | components/system/VPNDetector.tsx — country_code/country؛ `IR` ⇒ بدون مودال |
| `GET` | `/data/news-fallback.json` | داخلی (public/data)؛ نیاز به Mock ندارد |
| `GET` | `https://s3.metarang.com/metarang/**، https://admin.metarang.com/**، https://world.metarang.com/**` | تصویر/ویدیو/لینک؛ در Playwright با `route.fulfill`/`abort` مسدود می‌شوند تا تست به اینترنت وابسته نشود |

---

### ۷. مسیرهای خزش Playwright (بیش از ۶۰ URL، زبان‌ها داینامیک از `getLangArray()`)

برای هر `{lang}` در خروجی آرایه‌ی زبان‌ها. اسلاگ‌های Mock: `mock-cat`، `mock-sub`، `mock-video`، `mock-article`، `1` (id رویداد)، `hm-2000001` (شهروند)، سطح‌ها و تب‌ها از `levelData.ts`.

**الف) ثابت — ۱۸ مسیر:**
`/{lang}` ، `/about` ، `/admin` ، `/articles` ، `/articles/categories` ، `/calendar` ، `/citizens` ، `/contact` ، `/education` ، `/education/category` ، `/enamad` ، `/levels/citizen` ، `/news` ، `/news/admin` ، `/news/categories` ، `/rand-id/hm` ، `/version` ، `/whitepaper`

**ب) پویا — ۱۴ مسیر:**
`/articles/categories/mock-cat` ، `/articles/categories/mock-cat/mock-article` ، `/calendar/1` ، `/citizens/hm-2000001` ، `/citizens/hm-2000001/summary` ، `/citizens/hm-2000001/wallet` ، `/citizens/hm-2000001/buildings` ، `/citizens/hm-2000001/referral` ، `/education/category/mock-cat` ، `/education/category/mock-cat/mock-sub` ، `/education/category/mock-cat/mock-sub/mock-video` ، `/news/categories/mock-cat` ، `/news/categories/mock-cat/mock-news` ، `/version/1.0.0`

**ج) سطوح شهروندی — ۱۷ مسیر:**
`/levels/citizen/{level}/general-info` برای هر ۱۳ سطح (`citizen-baguette`، `reporter-baguette`، `participation-baguette`، `developer-baguette`، `inspector-baguette`، `businessman-baguette`، `lawyer-baguette`، `city-council-baguette`، `the-mayor-baguette`، `governor-baguette`، `minister-baguette`، `judge-baguette`، `legislator-baguette`) + چهار تب دیگر (`licenses`، `gem`، `gift`، `prize`) روی `citizen-baguette`.

**جمع:** ۴۹ مسیر در هر زبان؛ فقط با `fa` و `en` = **۹۸ URL** (بالاتر از حداقل ۶۱)، و با اضافه‌شدن `ar/ru/zh` = ۲۴۵ URL. علاوه بر آن: ۵ Route Handler و ۴ ریدایرکت بخش ۵ و صفحه‌ی `not-found` (مسیر نامعتبر).

---

### ۸. ناسازگاری‌ها و ریسک‌هایی که بر Mock و پوشش ۱۰۰٪ اثر می‌گذارند

1. **باگ واقعی — `utils/getEvent.ts`:** `const BASE = "${process.env.NEXT_PUBLIC_API_BASE_URL}/api"` داخل `" "` معمولی است، نه Template Literal؛ پس URL به‌صورت رشته‌ی لفظی `${process.env...}` ساخته می‌شود و هرگز به بک‌اند نمی‌رسد. (توابع `getAllEvents/getEventById` اگر استفاده شوند همیشه خطا می‌دهند.) باید برای رسیدن به پوشش اصلاح شود.
2. **دو مسیر برای رویداد:** `GET /api/calendar/{id}` (C3، استفاده‌ی زنده) در برابر `GET /api/calendar/events/{id}` (C4، فقط `getEvent.ts`). هر دو باید Mock شوند تا مسیر ردنشده نماند؛ تأیید کنید C4 در بک‌اند وجود دارد.
3. **کد مرده/کامنت‌شده که پوشش را تحت تأثیر می‌گذارد:** `GET /api/levels/1` در `Gem/Gift/Permissions/Prize` و `POST /api/tutorials/{id}/interactions` در `SingleVideoDashboardModule` کامنت‌اند؛ در لیست بالا **نیامده‌اند**. اگر قرار است در پوشش ۱۰۰٪ بیایند، لطفاً اعلام کنید.
4. **`CommentSection.tsx`** مسیر `GET /api/tutorials?page=` را صدا می‌زند ولی نتیجه را دور می‌ریزد (TODO در کد)؛ در Mock پاسخ دارد ولی تست رفتار ندارد.
5. **هاردکدِ فقط fa/en بیرون از زنجیره‌ی ترجمه (برای زبان‌های جدید `ar/ru/zh` مهم):**
   - `api/flag/[filename]` فقط `FA.svg|EN.svg` را مجاز می‌داند.
   - `components/system/VPNDetector.tsx` شرط `lang !== "en"`.
   - مودال‌های `AllSideTab.jsx` به‌صورت `langData.code === "fa" ? Modals_fa : Modals_en`.
   - ۲۱ فایل زیر `app/` (عمدتاً `generateMetadata` و عنوان/توضیح‌های سئو) شرط `lang === 'fa' ? … : …` دارند؛ برای `ar/ru/zh` متن انگلیسی می‌گیرند و بررسی طول Title/Description در `test:seo` را تحت‌تأثیر می‌گذارد.
   تست «زبان جدید به‌صورت خودکار» با این موارد شکست می‌خورد مگر اصلاح شوند یا صریحاً استثنا شوند.
6. **Hostهای هاردکد dev در کد:** `Header.tsx`/`HeaderMobile.tsx`/`DropdownLanguageModule.tsx` به `https://dev-admin.metarang.com/assets/images/flags/` اشاره می‌کنند و `featuresShared.tsx`/`walletHistory.types.ts` به `dev-reactjs`/`dev-nextjs.metarang.com`؛ در Sandbox باید مسدود/Mock شوند.
7. **`debug.log`، `test.txt`، `witch dev` و `package.json.audit-backup`** در ریشه‌ی ریپو هستند و `package.json` هیچ اسکریپت تست ندارد؛ نصب Vitest/Playwright روی Next 16 + React 19 + `--webpack` انجام می‌شود (اسکریپت‌های `dev/build` صراحتاً `--webpack` دارند و باید در `webServer` Playwright رعایت شود).
8. **ریسک Mock در Server Components:** چون SSR مستقیماً با `fetch` به `NEXT_PUBLIC_API_BASE_URL` می‌رود، مسیر پیشنهادی ما **Mock Server محلی** (Node/`msw/node` standalone روی پورت ۴۰۱۰) است نه `instrumentation.ts`؛ هر دو سمت (SSR و مرورگر) یک آدرس را می‌بینند و `next build` بدون Go موفق می‌شود. اگر `instrumentation.ts` ترجیح داده شود، برای مرورگر یک لایه‌ی دوم لازم است.

---

**سؤال‌های باز (لازم برای تثبیت معیار ۱۰۰٪):**
- شاخه‌ی `dev` با `main` یکسان است؟
- موارد ۳ و ۱ بخش ۸ (کد مرده و اصلاح `getEvent.ts`) داخل پوشش و محدوده‌ی فاز اول هستند؟
- برای زبان‌های جدید، اصلاح هاردکدهای بخش ۸-۵ جزو محدوده است یا فقط تست‌ها روی `fa/en` سخت‌گیرانه و بقیه «بدون خطای بحرانی»؟

</div>
