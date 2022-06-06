describe('home-route-spec.cy.js', () => {
  it('should visit', () => {
    cy.visit('/')
    cy.contains("EDGARDO CARRERAS")
  })
})
