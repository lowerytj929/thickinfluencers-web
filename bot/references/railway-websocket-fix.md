# Railway Bot — Supabase WebSocket Fix

## Problem
Railway runs Node.js 20 (no native WebSocket support). The `@supabase/supabase-js` v2 library (and its dependency `@supabase/realtime-js`) throws on init:
```
Supabase init error: Node.js 20 detected without native WebSocket support.
import ws from "ws"
new RealtimeClient(url, { transport: ws })
```

## Root Cause
`@supabase/supabase-js` eagerly checks for WebSocket support during `createClient()`. On Node.js < 22, WebSocket is not globally available, and the library errors out before any REST query can be executed.

## Two Solutions

### Solution A: Install `ws` + pass transport (preferred if you still need realtime)
1. `npm install ws` in the bot directory
2. Require it and pass to createClient:
```js
const WebSocket = require('ws');
supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WebSocket },
});
```

**Drawback:** Still adds dependency weight for features the bot doesn't use (realtime subscriptions).

### Solution B: Use raw Supabase REST API (chosen)
The Telegram bot only does simple CRUD (select profiles, update telegram_chat_id, query memberships) — no realtime subscriptions needed. Replaced `@supabase/supabase-js` with raw `fetch()` calls to Supabase REST API.

**Implementation:**
- `bot/index.js` now uses `fetch()` against `SUPABASE_URL/rest/v1/<table>` 
- Auth headers: `apikey` + `Authorization: Bearer <key>`
- Uses `SUPABASE_SERVICE_ROLE_KEY` (preferred) or `NEXT_PUBLIC_SUPABASE_ANON_KEY` (fallback)
- Two helper functions: `supabaseQuery()` (SELECT) and `supabaseUpdate()` (PATCH)
- Dependencies reduced to just `express`

## Verification
```bash
curl -s https://thickinfluencers-web-production.up.railway.app/
# Expected: {"status":"running","supabase":true,"telegram":true,"env":{"hasUrl":true,"hasKey":true,"hasAnon":true,"hasToken":true}}
```

## Env Vars Needed on Railway
```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY  # needed as fallback
TELEGRAM_BOT_TOKEN
PORT (8080)
```