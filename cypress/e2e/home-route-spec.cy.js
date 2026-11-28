describe("home-route-spec.cy.js", () => {
  beforeEach(() => {
    // gatsby-plugin-offline registers a service worker. Once it takes control
    // of the page, later visits in the same run fail under Cypress, so the
    // tests load the page without it.
    cy.visit("/", {
      onBeforeLoad(win) {
        delete win.navigator.__proto__.serviceWorker
      },
    })
  })

  it("states the role in the headline", () => {
    cy.contains("AI / Agentic Engineer")
    cy.get("h1").should("have.length", 1).and("contain", "agentic tooling")
  })

  it("links every case study", () => {
    ;[
      "agentic-delivery-at-origin",
      "gitlaunch-mcp-server",
      "gitlaunch",
      "flexio-delivery-coaching",
      "react-ci-cd-template",
      "rusty-chess",
    ].forEach(slug => {
      cy.get(`a[href="/work/${slug}/"]`).should("exist")
    })
  })

  it("opens a case study with its decisions and results", () => {
    cy.contains("a", "GitLaunch").click()
    cy.location("pathname").should("eq", "/work/gitlaunch/")
    cy.contains("h2", "Decisions and tradeoffs")
    cy.contains("h2", "Results")
    cy.contains("a", "Live site").should("have.attr", "href", "https://gitlaunch.dev")
    cy.get('video source[src="/videos/gitlaunch-launch.mp4"]').should("exist")
  })

  it("links to GitHub, LinkedIn, the resume and the contact page", () => {
    cy.get('a[href="https://github.com/donedgardo"]').should("exist")
    cy.get('a[href*="linkedin.com/in/edgardo-carreras"]').should("exist")
    cy.get('a[href="/resume/"]').should("exist")
    cy.get('a[href="/contact/"]').should("exist")
  })

  it("gives every image alt text", () => {
    cy.get("img").each(img => {
      expect(img.attr("alt")).to.not.be.empty
    })
  })

  it("describes the person as structured data", () => {
    cy.get('script[type="application/ld+json"]').should("contain", '"@type":"Person"')
  })
})
