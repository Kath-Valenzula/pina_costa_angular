describe('PinnaCosta App', () => {
  it('Visits the initial project page and shows header items', () => {
    cy.visit('/')

    
    cy.get('app-header img[alt="Logo"]').should('be.visible')

   
    cy.get('app-header').within(() => {
      cy.contains('Inicio').should('have.attr', 'href', '/')
      cy.contains('Acerca de').should('have.attr', 'href', '/acerca')
      cy.contains('Catálogo').should('have.attr', 'href', '/catalogo')
      cy.contains('Carrito').should('exist')
    })
  })
})
