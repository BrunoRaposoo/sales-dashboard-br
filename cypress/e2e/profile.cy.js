describe('Check if profile page renders the correct components', () => {
  beforeEach(() => {
    cy.login('tester@cypress.com', 'Dnc@1234')
    cy.visit('http://localhost:5173/perfil')
  })

  it('should display profile form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="tel"]').should('be.visible')
    cy.get('#update-profile').should('be.visible')
    cy.get('#delete-profile').should('be.visible')
  })

  it('should display switch theme button', () => {
    cy.get('#theme-switch').should('be.visible')
  })

  it('should redirect to home from logout button', () => {
    cy.get('#logout').click()
    cy.url().should('include', '/')
  })
})
