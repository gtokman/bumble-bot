# Node JS Project Template

### Features
* Translates ES6 and above syntax to ES5 code

### Installation
* Clone repo
* `yarn install`
* `yarn dev` to run dev env
* add a `.env` at the project root with `phoneNumber` and `password` set

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

### Support
Buy Me A [Coffee](https://buymeacoff.ee/buildswiftapps) ☕️