#!/usr/bin/env python3
"""Debug the Bearer token auth for Stripe checkout."""
import json, urllib.request, urllib.error, http.cookiejar

BASE = "https://thickinfluencers-web.vercel.app"

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        return urllib.response.addinfourl(fp, headers, req.get_full_url(), code)
    http_error_307 = http_error_302

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(
    NoRedirectHandler,
    urllib.request.HTTPCookieProcessor(cj)
)

# Login
login_data = "email=testfix-1782556292@example.com&password=TestFix123".encode()
req = urllib.request.Request(
    f"{BASE}/api/public/auth/login?redirect=/dashboard",
    data=login_data,
    headers={"Accept": "text/html", "Content-Type": "application/x-www-form-urlencoded"},
    method='POST'
)
resp = opener.open(req, timeout=15)
print(f"✅ Login: {resp.status}")

for c in cj:
    if c.name == 'sb-access-token':
        token = c.value
        print(f"Access token: {len(token)} chars, starts with: {token[:20]}...")
        print(f"Parts: {len(token.split('.'))}")

# Test 1: Try the auth check API directly with token  
print("\n=== Test: auth.user.get (public endpoint) ===")
req_auth = urllib.request.Request(
    f"{BASE}/api/public/auth/login",
    data=json.dumps({"email":"testfix-1782556292@example.com","password":"TestFix123"}).encode(),
    headers={"Content-Type": "application/json"},
    method='POST'
)
try:
    ra = urllib.request.urlopen(req_auth, timeout=15)
    print(f"✅ Login API works: {ra.status}")
except Exception as e:
    print(f"❌ Login API: {e}")

# Test 2: Try the auth check via Supabase directly
print("\n=== Test: Supabase getUser API ===")
supabase_url = "https://baihkbjyghusbcmqbiyj.supabase.co/auth/v1/user"
req_sb = urllib.request.Request(
    supabase_url,
    headers={"Authorization": f"Bearer {token}"}
)
try:
    rs = urllib.request.urlopen(req_sb, timeout=10)
    result = json.loads(rs.read())
    print(f"✅ Supabase getUser: {rs.status}")
    print(f"   User: {result.get('email', 'N/A')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()[:200]
    print(f"❌ Supabase getUser: {e.code} - {body}")

# Test 3: Try Stripe checkout with Auth header
print("\n=== Test: Stripe Checkout with Bearer ===")
checkout_data = json.dumps({"package_slug": "vault_access"}).encode()
req_stripe = urllib.request.Request(
    f"{BASE}/api/stripe/checkout",
    data=checkout_data,
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    },
    method='POST'
)
try:
    rs2 = urllib.request.urlopen(req_stripe, timeout=15)
    result2 = json.loads(rs2.read())
    url2 = result2.get('url', '')
    print(f"✅ Stripe Checkout: {rs2.status}")
    print(f"   URL exists: {bool(url2)}")
    if url2.startswith("https://checkout.stripe.com"):
        print("   ✅ Valid Stripe Checkout URL!")
except urllib.error.HTTPError as e:
    body = e.read().decode()[:500]
    print(f"❌ Stripe Checkout: {e.code}")
    print(f"   Body: {body}")