describe('home-route-spec.cy.js', () => {
  it('should visit', () => {
    cy.visit('/')
    cy.contains("EDGARDO CARRERAS")
  })
  it('promotes devops bootcamp', () => {
    cy.visit("/")
    cy.get("a").contains("DevOps Essentials Bootcamp").click();
    cy.url().should('include', '/dev-ops-essentials')
  })
})
