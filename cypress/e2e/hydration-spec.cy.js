// React throws an uncaught error when the server-rendered HTML does not match
// the first client render (hydration errors #418, #423 and #425), then
// re-renders the whole page in the browser. Cypress fails a test on any
// uncaught page error, so visiting one page of each kind guards against a
// regression.
const pages = [
  "/",
  "/newsletter/",
  "/blog/",
  "/blog/10x-developer-myth/",
  "/daily/10x-developer-myth/",
  "/coaching-call/",
  "/saas-team-bootcamp/",
]

describe("hydration", () => {
  pages.forEach(page => {
    it(`${page} hydrates without errors`, () => {
      cy.visit(page, {
        onBeforeLoad(win) {
          // See home-route-spec.cy.js: load without the offline service worker.
          delete win.navigator.__proto__.serviceWorker
        },
      })
      // Hydration starts once the page scripts have loaded; give it time to
      // finish so a mismatch surfaces inside this test.
      cy.wait(1500)
      cy.get("#___gatsby").should("not.be.empty")
    })
  })
})
