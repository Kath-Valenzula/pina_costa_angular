describe('PinnaCosta App', () => {
  it('opens the Cypress example page', () => {
    cy.visit('https://example.cypress.io/')

    cy.contains('Kitchen Sink').should('be.visible')
  })
})
