describe("home-route-spec.cy.js", () => {
  it("should visit homepage", () => {
    cy.visit("/")
    cy.contains("I help your team deliver")
  })
  
  it("shows DevSecOps services", () => {
    cy.visit("/")
    cy.contains("DevSecOps Pipeline Audit")
    cy.contains("Fractional DevSecOps Engineer")
  })
  
  it("links to newsletter", () => {
    cy.visit("/")
    cy.get("a").contains("Get the Newsletter").should("have.attr", "href", "/newsletter")
  })
})
