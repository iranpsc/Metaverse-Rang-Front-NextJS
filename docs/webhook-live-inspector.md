# Live Webhook Inspector

The inspector observes inbound backend-to-frontend webhook calls handled by:

- `POST /api/webhook`
- `POST /{lang}/api/webhook`

For each request it records the received payload, the actual JSON response returned by the frontend, HTTP status, timestamp, and processing duration. It does not monitor frontend-to-backend API calls.

## Enable on a trusted development/staging environment

Set the following server-side environment variable:

```env
WEBHOOK_INSPECTOR_ENABLED=true
```

The existing `WEBHOOK_SECRET` must also be configured as before. Do not expose either variable with a `NEXT_PUBLIC_` prefix.

Open `/{lang}/admin/webhook-inspector` while signed in with one of the admin accounts already allowlisted by the admin panel. The log API independently verifies the session against `/api/auth/me` and applies the same admin ID allowlist.

## Data handling and runtime limitations

- The inspector is disabled unless `WEBHOOK_INSPECTOR_ENABLED=true`.
- Request and response objects are sanitized recursively; fields whose names indicate credentials, secrets, tokens, passwords, or API keys are redacted.
- Only an allowlist of request headers is retained. The webhook secret, authorization, and cookie headers are never recorded.
- At most 150 records are held in process memory. They are lost when the server restarts.
- The store is local to a single Node.js process. In multi-instance/serverless deployments, requests handled by another instance will not appear in the current instance's list. This implementation is intended for a trusted single-instance development/staging environment, not durable production observability.
- The UI polls every 1.5 seconds. Clearing logs clears the current process memory only.

The webhook response contract remains unchanged: valid requests still receive HTTP 200 with the existing success JSON; unauthorized requests receive 401 and invalid payloads receive 400.
