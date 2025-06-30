describe('PinnaCosta App', () => {
  it('Visits the initial project page and shows main content', () => {
    cy.visit('/')

    cy.get('app-header img[alt="Logo"]').should('be.visible')

    cy.contains('h1', 'Acerca de Piña Costa').should('be.visible')

    cy.get('app-header').within(() => {
      cy.contains('Inicio').should('have.attr', 'href', '/')
      cy.contains('Acerca de').should('have.attr', 'href', '/acerca')
      cy.contains('Catálogo').should('have.attr', 'href', '/catalogo')
      cy.contains('Carrito').should('exist')
    })
  })

  it('allows a user to login and add a product to the cart', () => {
    cy.visit('/login')

    cy.get('input[id="email"]').type('usuario')
    cy.get('input[id="password"]').type('usuario')
    cy.contains('button', 'Ingresar').click()

    cy.url().should('include', '/perfil')

    cy.visit('/catalogo')
    cy.contains('button', 'Agregar al carrito').first().click()

    cy.visit('/cart')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })
})
