describe("coaching-route-spec.cy.js", () => {
  beforeEach(() => {
    // gatsby-plugin-offline registers a service worker. Once it takes control
    // of the page, later visits in the same run fail under Cypress, so the
    // tests load the page without it.
    cy.visit("/coaching/", {
      onBeforeLoad(win) {
        delete win.navigator.__proto__.serviceWorker
      },
    })
  })

  it("shows the headline", () => {
    cy.contains("h1", "Ship at startup speed")
  })

  it("answers frequently asked questions", () => {
    cy.contains("h2", "Frequently Asked Questions")
    cy.contains("h2", "How do you measure success?")
  })

  it("links to the newsletter", () => {
    cy.contains("a", "join the newsletter").should("have.attr", "href", "/newsletter")
  })

  it("links to booking a working session", () => {
    cy.contains("a", "Book a working session")
      .should("have.attr", "href")
      .and("include", "calendly.com")
  })
})
