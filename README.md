# Scraping By Puppeteer

This project automates the process of visiting a website, collecting all unique links, and taking full-page screenshots of each link using [Puppeteer](https://pptr.dev/). Screenshots are saved locally for further analysis or archiving.

## Features
- Launches a Chromium browser and visits the main page (`https://www.glossyit.com`).
- Collects all unique, valid links from the page.
- Visits each link and takes a full-page screenshot.
- Saves screenshots in the `screenshots/` directory, named after the URL.
- Uses a persistent browser session stored in the `temp/` directory.

## Prerequisites
- [Node.js](https://nodejs.org/) v20.x or higher (tested on v20.18.3)
- [npm](https://www.npmjs.com/) v11.x or higher

## Installation
1. Clone this repository or download the source code.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
Run the script with Node.js:
```bash
node app.js
```

- The browser will open in non-headless mode and start processing links.
- Screenshots will be saved in the `screenshots/` folder.
- Temporary browser data is stored in the `temp/` folder.

## Project Structure
- `app.js` — Main script for automation and screenshot capture.
- `screenshots/` — Output directory for all screenshots.
- `temp/` — Stores browser session data for Puppeteer.
- `package.json` — Project metadata and dependencies.

## Customization
- To change the target website, modify the URL in `app.js`:
  ```js
  await page.goto("https://www.glossyit.com", { ... });
  ```
- Adjust viewport or Puppeteer launch options as needed.

## Notes
- The script runs in non-headless mode by default for easier debugging. Change `headless: false` to `true` in `app.js` for silent operation.
- Large numbers of links may result in many screenshots and increased resource usage.
- Filenames are sanitized to avoid invalid characters.

## License
ISC 