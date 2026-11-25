const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // The production build loads analytics scripts. They are not under test,
    // and their cross-origin frames make Cypress fail the page load.
    blockHosts: ["*.clarity.ms", "*.googletagmanager.com", "*.google-analytics.com"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
