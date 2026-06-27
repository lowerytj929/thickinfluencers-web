#!/usr/bin/env python3
"""Test full Stripe checkout flow end-to-end using Python's http client."""
import json, urllib.request, urllib.error, http.cookiejar, sys

BASE = "https://thickinfluencers-web.vercel.app"

# Step 1: Login via form submission to get cookies
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

login_url = f"{BASE}/api/public/auth/login?redirect=/dashboard"
login_data = "email=testfix-1782556292@example.com&password=TestFix123".encode()
login_headers = {"Accept": "text/html", "Content-Type": "application/x-www-form-urlencoded"}

req = urllib.request.Request(login_url, data=login_data, headers=login_headers, method='POST')
try:
    resp = opener.open(req, timeout=15)
    print(f"✅ Login: {resp.status} redirected to {resp.url}")
except urllib.error.HTTPError as e:
    print(f"✅ Login: {e.code} redirected to {e.url}")

print(f"   Cookies stored: {len(cj)}")
for c in cj:
    print(f"   - {c.name}: {c.value[:30]}...")

# Step 2: Call Stripe checkout with the cookies
checkout_url = f"{BASE}/api/stripe/checkout"
checkout_data = json.dumps({"package_slug": "vault_access"}).encode()
checkout_headers = {"Content-Type": "application/json"}

req2 = urllib.request.Request(checkout_url, data=checkout_data, headers=checkout_headers, method='POST')
try:
    resp2 = opener.open(req2, timeout=15)
    result = json.loads(resp2.read())
    print(f"\n✅ Stripe Checkout: {resp2.status}")
    print(f"   URL: {result.get('url', 'N/A')[:80]}...")
    print(f"   Full URL available to open in browser")
except urllib.error.HTTPError as e:
    body = e.read().decode()[:200]
    print(f"\n❌ Stripe Checkout: {e.code} - {body}")
except Exception as e:
    print(f"\n❌ Error: {e}")