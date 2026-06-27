#!/usr/bin/env python3
"""Create Stripe products and price IDs for ThickInfluencers"""
import json, urllib.request, base64

# Read stripe key
with open("/Users/drac-/thickinfluencers-web/.env.local") as f:
    env = {}
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip()

sk = env.get("STRIPE_SECRET_KEY", "")
if not sk:
    print("No STRIPE_SECRET_KEY found")
    exit(1)

auth = base64.b64encode(f"{sk}:".encode()).decode()

headers = {
    "Authorization": f"Basic {auth}",
    "Content-Type": "application/x-www-form-urlencoded",
}

def stripe_post(path, data):
    url = f"https://api.stripe.com/v1/{path}"
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err = json.loads(e.read())
        print(f"  ERROR: {err.get('error', {}).get('message', e.code)}")
        return None

# 1. Create Vault Access product ($15/month)
print("Creating Vault Access...")
prod1 = stripe_post("products", {
    "name": "Vault Access",
    "description": "Full gallery access with daily influencer drops, vault content, and instant Telegram invite.",
    "metadata[featured]": "false",
})
if prod1:
    pid1 = stripe_post("prices", {
        "product": prod1["id"],
        "unit_amount": "1500",
        "currency": "usd",
        "recurring[interval]": "month",
    })
    if pid1:
        print(f"  ✅ Vault Access price: {pid1['id']}")

# 2. Create Vault Pro product ($25/month)
print("\nCreating Vault Pro...")
prod2 = stripe_post("products", {
    "name": "Vault Pro",
    "description": "Everything in Vault Access plus VIP Telegram channel, exclusive drops, and priority support.",
    "metadata[featured]": "true",
})
if prod2:
    pid2 = stripe_post("prices", {
        "product": prod2["id"],
        "unit_amount": "2500",
        "currency": "usd",
        "recurring[interval]": "month",
    })
    if pid2:
        print(f"  ✅ Vault Pro price: {pid2['id']}")

# Output as env format
if prod1 and pid1 and prod2 and pid2:
    print(f"\n=== ADD THESE TO .env.local ===")
    print(f"STRIPE_VAULT_ACCESS_PRICE_ID={pid1['id']}")
    print(f"STRIPE_VAULT_PRO_PRICE_ID={pid2['id']}")
    print(f"\n=== ADD THESE TO lib/constants.ts ===")
    print(f"In PRICE_IDS:")
    print(f'  vault_access: "{pid1["id"]}",')
    print(f'  vault_pro: "{pid2["id"]}",')
