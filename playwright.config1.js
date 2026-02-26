// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { worker } from 'node:cluster';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  retries: 1,
  //max number of retries for failed tests//can we use retries above 10? 
  // //yes we can use retries above 10 but it is not recommended because it will increase the execution time of the tests and it will also increase the chances of false positives
  workers: 1,
  //by default its run 5 workers
  // Playwright runs tests in parallel across available CPU cores. Setting workers to 1 will run all tests sequentially in a single worker process.
  //  This can be useful for debugging or when you want to ensure that tests do not interfere with each other, but it will increase the overall execution
  // // time of the test suite.
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,

  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',//on/off/only-on-failure
        trace: 'retain-on-failure',//on/off/retain-on-failure
        video: 'retain-on-failure',//on/off/retain-on-failure/on-first-retry 

        ignorreHTTPSErrors: true,//this will accept the self signed certificate error, which is common in safari browser
        permissions: ['geolocation'],
        //this will give the permission to access the geolocation in the browser//
        // we can also give the permission to access the camera and microphone by using 'camera' and 'microphone' respectively
        //permision like geolocation, camera, microphone, notifications, etc
        Viewport: {
          width: 720, height: 720,
          ...devices['iPhone 12'],
          ...devices['']
        },


      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',//on/off/only-on-failure
        trace: 'retain-on-failure',//on/off/retain-on-failure
        Viewport: { width: 720, height: 720 }
      }

    },
    {
      name: 'firefox',

      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',//on/off/only-on-failure
        trace: 'retain-on-failure',//on/off/retain-on-failure
      }
    }

  ]

  // use: {
  //   browserName: 'webkit',
  //   headless: true,
  //   screenshot: 'only-on-failure',//on/off/only-on-failure
  //   trace: 'retain-on-failure',//on/off/retain-on-failure




  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  // }


});
module.exports = config
