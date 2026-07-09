import asyncio
from playwright.async_api import async_playwright
import os

async def verify_join_section():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})

        # Load the local index.html
        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        # Scroll to the join section
        join_section = page.locator("#join")
        await join_section.scroll_into_view_if_needed()

        # Give it a moment for the reveal animation
        await asyncio.sleep(1)

        # Take a screenshot of the join section
        os.makedirs("verification", exist_ok=True)
        await join_section.screenshot(path="verification/section_join.png")

        print("Verification screenshot saved to verification/section_join.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_join_section())
