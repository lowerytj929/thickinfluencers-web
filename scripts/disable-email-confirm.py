#!/usr/bin/env python3
"""Disable email confirmation in Supabase auth so users can sign up immediately."""
import json, urllib.request

with open('/Users/drac-/thickinfluencers-web/.env.local') as f:
    svc_key = None
    anon_key = None
    for line in f:
        if line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
            svc_key = line.strip().split('=', 1)[1].strip("'\"")
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            anon_key = line.strip().split('=', 1)[1].strip("'\"")

# Use GoTrue admin API to update settings
url = 'https://baihkbjyghusbcmqbiyj.supabase.co/auth/v1/admin/settings'
body = json.dumps({
    "mailer_autoconfirm": True,
    "phone_autoconfirm": True,
    "disable_signup": False,
}).encode()

req = urllib.request.Request(
    url, data=body, method='PUT',
    headers={
        'Authorization': f'Bearer {svc_key}',
        'apikey': anon_key,
        'Content-Type': 'application/json'
    }
)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
        print("✅ Settings updated!")
        print(json.dumps(data, indent=2))
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"❌ HTTP {e.code}: {body}")
except Exception as e:
    print(f"❌ Error: {e}")