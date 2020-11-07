# Node JS Project Template

### Features
* Translates ES6 and above syntax to ES5 code

### Installation
* Clone repo
* `yarn install`
* add a `.env` at the project root with `phoneNumber` and `password` set
* `ngrok http 3000` 
* Nexmo phone number to by pass 2FA
* Add `ngrok` domain to Nexmo phone number [incoming webhook](https://developer.nexmo.com/messaging/sms/code-snippets/receiving-an-sms)
* `yarn dev` to run dev env

### Dependencies
* Puppeteer for UI testing
* Node-Fetch API client
* Express
* Dotenv
* Body parser

### Issues
* Sometimes chromium is not installed properly in *node_modules*, if you see an error when running `yarn dev` add this in the [launch args](src/app.js).
  ```
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // path to local chromium
  ```
* Facebook alert dialog pops up sometimes, ignore it

### Support
Buy Me A [Coffee](https://buymeacoff.ee/buildswiftapps) ☕️