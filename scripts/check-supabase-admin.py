#!/usr/bin/env python3
"""Try alternative Supabase Auth admin config endpoints."""
import json, urllib.request

with open('/Users/drac-/thickinfluencers-web/.env.local') as f:
    svc_key = None
    anon_key = None
    for line in f:
        if line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
            svc_key = line.strip().split('=', 1)[1].strip("'\"")
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            anon_key = line.strip().split('=', 1)[1].strip("'\"")
    assert svc_key and anon_key, "Could not read keys from .env.local"

base = 'https://baihkbjyghusbcmqbiyj.supabase.co'
endpoints = [
    ('GET', '/auth/v1/admin/config'),
    ('PUT', '/auth/v1/admin/config'),
    ('GET', '/auth/v1/admin/settings'),
    ('PUT', '/auth/v1/admin/settings'),
]

for method, path in endpoints:
    url = f'{base}{path}'
    body = None
    if method == 'PUT':
        body = json.dumps({
            "mailer_autoconfirm": True,
            "phone_autoconfirm": True,
            "disable_signup": False,
        }).encode()
    req = urllib.request.Request(url, data=body, method=method, headers={
        'Authorization': f'Bearer {svc_key}',
        'apikey': anon_key,
        'Content-Type': 'application/json',
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
            print(f'✅ {method} {path}: {resp.status}')
            print(json.dumps(data, indent=2)[:500])
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:200]
        print(f'❌ {method} {path}: {e.code} — {body}')
    except Exception as e:
        print(f'⚠️ {method} {path}: {e}')
    print()