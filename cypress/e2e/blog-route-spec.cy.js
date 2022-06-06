describe('blog-route-spec.cy.js', () => {
  it('should visit', () => {
    cy.visit('/blog')
    cy.contains("Blog")
  })
})
