
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {

    //1.default configuration
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    //2. custom configuration
    //enable "record and playback" feature
    experimentalStudio: true,

    //4000 by default
    //time, in milliseconds, to wait until most DOM based commands are considered timed out.
    defaultCommandTimeout: 15000,

    //Whether to enable Chromium-based browser's Web Security for same-origin policy and insecure mixed content.
    chromeWebSecurity: false,

    //60000 by default
    //time, in milliseconds, to wait for page transition events or cy.visit(), cy.go(), cy.reload() commands to fire their page load events.
    pageLoadTimeout: 60000,
    //end of custom configuration

    viewportWidth: 1920,
    viewportHeight: 1080,

    baseUrl: 'https://dev.mathgpt.ai'

  },
});
