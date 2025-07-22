const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    userDataDir: path.join(__dirname, "temp"),
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // 1. Visit the specified domain
  await page.goto("https://www.glossyit.com", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  // 2. Collect all links on the page
  const links = await page.$$eval("a", (as) => as.map((a) => a.href));
  const uniqueLinks = Array.from(new Set(links)).filter((link) =>
    link.startsWith("http")
  );

  // Create a directory for screenshots
  const screenshotDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // 3. Open each link and 4. Take a screenshot
  for (let i = 0; i < uniqueLinks.length; i++) {
    const link = uniqueLinks[i];
    try {
      const newPage = await browser.newPage();
      await newPage.setViewport({ width: 1920, height: 1080 });
      await newPage.goto(link, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      const filename = `${link.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      await newPage.screenshot({
        path: path.join(screenshotDir, filename),
        fullPage: true,
      });
      console.log(`Screenshot taken for: ${link}`);
      await newPage.close();
    } catch (err) {
      console.error(`Failed to screenshot ${link}:`, err.message);
    }
  }

  await browser.close();
  console.log("All screenshots taken.");
}

main();
