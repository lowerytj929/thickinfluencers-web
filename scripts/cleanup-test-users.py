#!/usr/bin/env python3
"""Clean up test users from Supabase Auth."""
import json, urllib.request

with open('/Users/drac-/thickinfluencers-web/.env.local') as f:
    svc_key = None
    for line in f:
        if line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
            svc_key = line.strip().split('=', 1)[1].strip("'\"")
    assert svc_key

# List all test users (created during debugging)
url = 'https://baihkbjyghusbcmqbiyj.supabase.co/auth/v1/admin/users'
req = urllib.request.Request(url, headers={
    'Authorization': f'Bearer {svc_key}',
    'apikey': svc_key,
})
resp = urllib.request.urlopen(req, timeout=15)
data = json.loads(resp.read())
users = data.get('users', [])

test_prefixes = ['test-', 'testfix-', 'browertest', 'freshbrowser', 'flowtest-', 'verify-', 'unconf-', 'brandnewuser', 'finaltest-']
deleted = []
for u in users:
    email = u.get('email', '')
    for prefix in test_prefixes:
        if email.startswith(prefix):
            uid = u['id']
            del_req = urllib.request.Request(
                f'{url}/{uid}',
                method='DELETE',
                headers={
                    'Authorization': f'Bearer {svc_key}',
                    'apikey': svc_key,
                }
            )
            try:
                urllib.request.urlopen(del_req, timeout=10)
                deleted.append(email)
            except:
                pass
            break

print(f"Cleaned up {len(deleted)} test users:")
for e in deleted:
    print(f"  - {e}")