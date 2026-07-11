from playwright.sync_api import sync_playwright
import os
import time
import subprocess
import signal

def capture_screenshots():
    server_process = subprocess.Popen(["node", "server.js"], env={**os.environ, "PORT": "3000"})
    time.sleep(5)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            url = "http://localhost:3000"

            for name, width in [("desktop", 1440), ("tablet", 768), ("mobile", 375)]:
                page.set_viewport_size({"width": width, "height": 800})
                page.goto(url)
                page.wait_for_load_state("networkidle")
                page.screenshot(path=f"verification/{name}.png", full_page=True)
                print(f"{name.capitalize()} screenshot saved.")
            browser.close()
    finally:
        os.kill(server_process.pid, signal.SIGTERM)

if __name__ == "__main__":
    capture_screenshots()
