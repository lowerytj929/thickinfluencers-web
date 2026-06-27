#!/usr/bin/env python3
"""Test login with an unconfirmed user to verify auto-confirm works."""
import json, urllib.request

with open('/Users/drac-/thickinfluencers-web/.env.local') as f:
    svc_key = anon_key = None
    for line in f:
        if line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
            svc_key = line.strip().split('=', 1)[1].strip("'\"")
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            anon_key = line.strip().split('=', 1)[1].strip("'\"")
    assert svc_key and anon_key

# Step 1: Create an unconfirmed user (simulating an old signup)
import random
email = f"unconf-{random.randint(10000,99999)}@test.com"
password = "TestPass123"

# Use admin API to create user with email_confirm=False
url = 'https://baihkbjyghusbcmqbiyj.supabase.co/auth/v1/admin/users'
body = json.dumps({
    "email": email,
    "password": password,
    "email_confirm": False,
}).encode()
req = urllib.request.Request(url, data=body, method='POST', headers={
    'Authorization': f'Bearer {svc_key}',
    'apikey': anon_key,
    'Content-Type': 'application/json',
})
resp = urllib.request.urlopen(req, timeout=10)
user = json.loads(resp.read())
user_id = user['id']
print(f"✅ Created unconfirmed user: {email} (id: {user_id})")
print(f"   email_confirmed_at: {user.get('email_confirmed_at', 'NOT SET')}")

# Step 2: Try to sign in via the production login API - should trigger auto-confirm
url2 = 'https://thickinfluencers-web.vercel.app/api/public/auth/login'
body2 = json.dumps({"email": email, "password": password}).encode()
req2 = urllib.request.Request(url2, data=body2, method='POST', headers={
    'Content-Type': 'application/json',
})
try:
    resp2 = urllib.request.urlopen(req2, timeout=15)
    result = json.loads(resp2.read())
    print(f"\n✅ Login API returned 200!")
    print(f"   User ID: {result.get('user',{}).get('id','N/A')}")
    print(f"   Confirmed: {result.get('user',{}).get('email_confirmed_at','N/A')}")
    print(f"   Redirect: {result.get('redirect','N/A')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"\n❌ Login API returned {e.code}: {body}")
except Exception as e:
    print(f"\n❌ Error: {e}")

# Step 3: Clean up test user
req3 = urllib.request.Request(f'{url}/{user_id}', method='DELETE', headers={
    'Authorization': f'Bearer {svc_key}',
    'apikey': anon_key,
})
req3.get_method = lambda: 'DELETE'
urllib.request.urlopen(req3, timeout=10)
print(f"\n🧹 Deleted test user")