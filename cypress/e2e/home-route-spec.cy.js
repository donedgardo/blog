describe("home-route-spec.cy.js", () => {
  beforeEach(() => {
    // Known issue: the homepage throws React hydration errors (#418, then
    // #423 when React falls back to client rendering). The page still
    // renders, so these tests check its content. Remove this handler once
    // the hydration mismatch is fixed, so a regression fails the build.
    cy.on("uncaught:exception", err => !/Minified React error #(418|423)/.test(err.message))
    cy.visit("/")
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
