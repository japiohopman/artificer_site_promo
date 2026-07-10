from playwright.sync_api import sync_playwright
import os

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Get absolute path to index.html
        path = os.path.abspath("index.html")
        url = f"file://{path}"

        # Desktop
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(url)
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/desktop.png", full_page=True)
        print("Desktop screenshot saved.")

        # Tablet
        page.set_viewport_size({"width": 768, "height": 1024})
        page.goto(url)
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/tablet.png", full_page=True)
        print("Tablet screenshot saved.")

        # Mobile
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(url)
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/mobile.png", full_page=True)
        print("Mobile screenshot saved.")

        browser.close()

if __name__ == "__main__":
    capture_screenshots()
