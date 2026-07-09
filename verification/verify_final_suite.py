import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 5000})

        # Load the local index.html
        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        # Wait for reveal animations
        await page.evaluate("document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))")

        # Take screenshots of the new sections
        sections = ['#use-cases', '#newsletter', '.video-placeholder']
        for section in sections:
            selector = section
            name = section.replace("#", "").replace(".", "")
            el = await page.query_selector(selector)
            if el:
                await el.screenshot(path=f'verification/section_{name}.png')

        await browser.close()

if __name__ == "__main__":
    os.makedirs('verification', exist_ok=True)
    asyncio.run(main())
