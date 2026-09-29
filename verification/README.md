# Verification Suite

The `verification/` folder contains automated layout and functional audit scripts for `artificer_site_promo`.

## Files
- `capture.py`: Python script powered by Playwright that tests server routes, captures screenshots at desktop/tablet/mobile viewports, and writes `verification/report.json`.
- `report.json`: Structured report generated during test runs.
- `desktop.png`, `tablet.png`, `mobile.png`: Viewport screenshot artifacts.

## Usage
Ensure Python Playwright dependencies are installed, then run:

```bash
python3 verification/capture.py
```

Or run via npm:

```bash
npm test
```
