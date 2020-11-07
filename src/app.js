import puppeteer from "puppeteer";
import dotenv from "dotenv";

import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var code = ""

app
  .route('/webhooks/inbound-sms')
  .get(handleInboundSms)
  .post(handleInboundSms)

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params)
  code = params.text.split(" ")[5].slice(0, -1)
  response.status(204).send()
}

app.listen(process.env.PORT || 3000)

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
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
    });

    await clickSelector(page, ".button--transparent");

    await typeInput(page, `${process.env.phoneNumber}`, "#phone");
    //code before the pause
    console.log("waiting 1")
    setTimeout(async function(){
      for (var i = 0; i < code.length; i++) {
        console.log("waiting 2")
        const letter = code.split("")[i]
        await page.keyboard.type(letter);
      }
      await page.keyboard.press("Enter");
    }, 9000);

    await page.waitForNavigation();
    const likeSelector = "div[data-qa-role=encounters-action-like]";
    for (var i = 0; i < 100; i++) {
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
