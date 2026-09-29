import os
import time
import json
import subprocess
import signal
import urllib.request
import urllib.error
from datetime import datetime
from playwright.sync_api import sync_playwright

def run_verification():
    report = {
        "timestamp": datetime.now().isoformat(),
        "status": "HEALTHY",
        "checks": [],
        "artifacts": []
    }

    def log_check(name, passed, details=""):
        status_str = "PASS" if passed else "FAIL"
        print(f"[{status_str}] {name}: {details}")
        report["checks"].append({
            "name": name,
            "passed": passed,
            "details": details
        })
        if not passed:
            report["status"] = "FAILED"

    # 1. Audit static files on disk
    required_files = [
        "public/data/product_truth.json",
        "public/styles.css",
        "public/favicon.svg",
        "server.js",
        "views/index.ejs"
    ]
    for rel_path in required_files:
        exists = os.path.exists(rel_path)
        log_check(f"File Existence ({rel_path})", exists, "Found on disk" if exists else "Missing")

    # 2. Launch Express server
    env = {**os.environ, "PORT": "3000"}
    server_process = subprocess.Popen(["node", "server.js"], env=env)
    time.sleep(3)

    try:
        # 3. HTTP Endpoint checks
        base_url = "http://localhost:3000"

        # Check GET /
        try:
            req = urllib.request.Request(base_url)
            with urllib.request.urlopen(req) as response:
                log_check("HTTP GET /", response.status == 200, f"Status code {response.status}")
        except Exception as e:
            log_check("HTTP GET /", False, str(e))

        # Check GET /api/status
        try:
            req = urllib.request.Request(f"{base_url}/api/status")
            with urllib.request.urlopen(req) as response:
                body = json.loads(response.read().decode('utf-8'))
                has_brand = "brand" in body
                log_check("HTTP GET /api/status", response.status == 200 and has_brand, "Valid Product Truth JSON returned")
        except Exception as e:
            log_check("HTTP GET /api/status", False, str(e))

        # Check POST /subscribe
        try:
            data = json.dumps({"email": "test@example.com"}).encode('utf-8')
            req = urllib.request.Request(f"{base_url}/subscribe", data=data, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req) as response:
                log_check("HTTP POST /subscribe", response.status == 200, "Subscribe endpoint responded 200")
        except Exception as e:
            log_check("HTTP POST /subscribe", False, str(e))

        # 4. Playwright Screenshot and Console Audit
        console_errors = []
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            for name, width in [("desktop", 1440), ("tablet", 768), ("mobile", 375)]:
                page.set_viewport_size({"width": width, "height": 800})
                page.goto(base_url)
                page.wait_for_load_state("networkidle")
                screenshot_path = f"verification/{name}.png"
                page.screenshot(path=screenshot_path, full_page=True)
                report["artifacts"].append(screenshot_path)
                log_check(f"Viewport Capture ({name})", True, f"Saved to {screenshot_path}")

            browser.close()

        log_check("Browser Console Audit", len(console_errors) == 0, f"{len(console_errors)} console errors found")

    finally:
        os.kill(server_process.pid, signal.SIGTERM)

    # 5. Write Report
    report_path = "verification/report.json"
    with open(report_path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"\nVerification finished with status [{report['status']}]. Report saved to {report_path}.")

if __name__ == "__main__":
    run_verification()
