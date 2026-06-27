#!/usr/bin/env python3
"""
ThickInfluencers Vault — Site Monitor
======================================
Comprehensive health check for the production site.
Returns structured JSON output for cron-driven analysis.

Usage:
  python3 scripts/monitor.py                    # full check
  python3 scripts/monitor.py --quick            # page-only check
  python3 scripts/monitor.py --pages-only       # just page health
  python3 scripts/monitor.py --auth-only        # just auth endpoints
"""

import json
import sys
import urllib.request
import urllib.error
import ssl
import time
import os
import traceback

BASE = "https://thickinfluencers-web.vercel.app"
TIMEOUT = 15

# Pages to check (expected status codes)
PAGES = {
    "/": 200,
    "/auth": 200,
    "/premium": 200,
    "/search": 200,
    "/privacy": 200,
    "/terms": 200,
    "/compliance": 200,
    "/copyright": 200,
    "/takedown": 200,
    "/robots.txt": 200,
    "/sitemap.xml": 200,
    "/checkout/success": 200,
    # Protected pages: urllib follows 307 redirect to auth page → 200 is correct
    "/admin": 200,
    "/dashboard": 200,
    "/admin/upload": 200,
}

# API endpoints to check (by method)
API_ENDPOINTS = {
    "POST /api/stripe/checkout": ("POST", "/api/stripe/checkout", 401),  # 401 = middleware blocks unauthed
    "POST /api/stripe/webhook": ("POST", "/api/stripe/webhook", 401),    # 401 = middleware blocks
    "POST /api/public/auth/login": ("POST", "/api/public/auth/login", 401),  # 401 = supabase rejects missing email/password
}


def fetch(url, method="GET", data=None, headers=None):
    """Fetch a URL and return status and body."""
    if headers is None:
        headers = {}
    ctx = ssl.create_default_context()
    ctx.check_hostname = True
    req = urllib.request.Request(url, method=method, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return resp.status, body
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace") if e.fp else ""
        return e.code, body
    except Exception as e:
        return -1, str(e)


def check_pages():
    """Check all public pages."""
    results = {"passed": 0, "failed": 0, "errors": []}
    for path, expected in PAGES.items():
        url = BASE + path
        status, body = fetch(url)
        ok = status == expected
        if ok:
            results["passed"] += 1
        else:
            results["failed"] += 1
            results["errors"].append({
                "path": path,
                "expected": expected,
                "got": status,
                "body_preview": body[:200] if not ok else "",
            })
    return results


def check_api():
    """Check API endpoint health."""
    results = {"passed": 0, "failed": 0, "errors": []}
    for name, (method, path, expected) in API_ENDPOINTS.items():
        url = BASE + path
        data = None
        headers = {"Content-Type": "application/json"}
        if method == "POST":
            data = json.dumps({"test": True}).encode()
        status, body = fetch(url, method=method, data=data, headers=headers)
        ok = status == expected
        if ok:
            results["passed"] += 1
        else:
            results["failed"] += 1
            results["errors"].append({
                "name": name,
                "path": path,
                "expected": expected,
                "got": status,
                "body_preview": body[:200],
            })
    return results


def check_env_debug():
    """Check debug endpoint for env var integrity."""
    url = BASE + "/api/public/debug"
    status, body = fetch(url)
    if status == 200:
        try:
            data = json.loads(body)
            issues = []
            url_val = data.get("next_public_supabase_url", {})
            svc_val = data.get("supabase_service_role_key", {})
            anon_val = data.get("next_public_supabase_anon_key", {})

            url_ends = url_val.get("ends_with", "")
            svc_len = svc_val.get("length", 0)
            anon_len = anon_val.get("length", 0)
            svc_ends = svc_val.get("ends_with", "")
            anon_ends = anon_val.get("ends_with", "")

            if not url_ends.endswith("supabase.co"):
                issues.append(f"URL may be corrupted: ends with ...{url_ends}")
            if svc_len < 210:
                issues.append(f"SERVICE_ROLE_KEY length: {svc_len} (expected 219)")
            if anon_len < 200:
                issues.append(f"ANON_KEY length: {anon_len} (expected 208)")
            if data.get("status") == "issues_detected":
                issues.extend(data.get("issues", []))

            return {"exists": True, "status_code": status, "data": data, "issues": issues}
        except json.JSONDecodeError:
            return {"exists": True, "status_code": status, "error": "non-json response"}
    return {"exists": True, "status_code": status, "error": f"status {status}"}


def check_auth_flow():
    """
    Lightweight auth check — try to hit the auth/signup page
    and verify the form loads properly.
    """
    url = BASE + "/auth"
    status, body = fetch(url)
    if status != 200:
        return {"status": "fail", "error": f"auth page returned {status}"}
    # Check for key auth page content
    checks = {
        "has_signin_form": "sign in" in body.lower() or "login" in body.lower(),
        "has_email_field": "email" in body.lower(),
        "has_password_field": "password" in body.lower(),
    }
    return {"status": "ok", "checks": checks}


def check_page_content():
    """
    Verify key pages have expected content (not broken/empty).
    """
    pages_to_check = {
        "/": ["Vault Empire", "Unlock"],
        "/premium": ["Vault Access", "Vault Pro", "$15", "$25"],
        "/api/public/debug": ["supabase", "length", "status"],
    }
    results = {"passed": 0, "failed": 0, "issues": []}
    for path, expected_terms in pages_to_check.items():
        url = BASE + path
        status, body = fetch(url)
        if status != 200:
            results["failed"] += 1
            results["issues"].append({"path": path, "error": f"status {status}"})
            continue
        for term in expected_terms:
            if term.lower() not in body.lower():
                results["failed"] += 1
                results["issues"].append({
                    "path": path,
                    "error": f"missing content: '{term}'",
                })
            else:
                results["passed"] += 1
    return results


def main():
    start = time.time()
    report = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "base_url": BASE,
        "duration_s": None,
        "pages": None,
        "api": None,
        "env_debug": None,
        "auth_flow": None,
        "page_content": None,
        "overall": "unknown",
        "errors_found": 0,
    }

    quick = "--quick" in sys.argv
    pages_only = "--pages-only" in sys.argv
    auth_only = "--auth-only" in sys.argv

    try:
        if not auth_only:
            report["pages"] = check_pages()
        if not pages_only and not auth_only:
            report["api"] = check_api()
            report["env_debug"] = check_env_debug()
            report["page_content"] = check_page_content()
        if not pages_only:
            report["auth_flow"] = check_auth_flow()

        # Tally errors
        total_errors = 0
        if report["pages"]:
            total_errors += report["pages"]["failed"]
        if report["api"]:
            total_errors += report["api"]["failed"]
        if report["page_content"]:
            total_errors += report["page_content"]["failed"]
        if report["env_debug"] and report["env_debug"].get("issues"):
            total_errors += len(report["env_debug"]["issues"])

        report["errors_found"] = total_errors
        report["overall"] = "healthy" if total_errors == 0 else "issues_detected"

    except Exception as e:
        report["overall"] = "monitor_crashed"
        report["crash_error"] = str(e)
        report["crash_traceback"] = traceback.format_exc()

    report["duration_s"] = round(time.time() - start, 2)

    print(json.dumps(report, indent=2))
    return 0 if report["overall"] == "healthy" else 1


if __name__ == "__main__":
    sys.exit(main())