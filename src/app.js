import puppeteer from "puppeteer";
import dotenv from "dotenv";

async function run() {
  dotenv.config();
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const url = "https://bumble.com/get-started";
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForNavigation();

    await clickSelector(page, ".button--transparent");

    await typeInput(page, `${process.env.phoneNumber}`, "#phone");

    await typeInput(page, `${process.env.password}`, "#pass");

    const likeSelector = "div[data-qa-role=encounters-action-like]";
    for (var i = 0; i < 5; i++) {
      try {
        await page.waitForSelector(likeSelector, { timeout: 3000 });
        await page.click(likeSelector, { delay: 2000 });
        console.log(`Liking: ${i}`);
      } catch (e) {
        await clickSelector(page, ".button--transparent");
        console.error(`Error: ${e}`);
      }
    }
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

const clickSelector = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.$eval(selector, (elem) => elem.click({ delay: 1000 }));
};

const typeInput = async (page, text, id) => {
  await page.waitForSelector(id);
  await page.type(id, text, { delay: 200 });
  await page.keyboard.press("Enter");
};

run();
