describe('Login Flow Correct Crendentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('should login with valid creditials', () => {
    cy.get('input[type="email"]').type('tester@cypress.com')
    cy.get('input[type="password"]').type('Dnc@1234')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
    cy.get('header').should('be.visible')
  })
})

describe('Login Flow Invalid Crendentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('shouldnt login with invalid creditials', () => {
    cy.get('input[type="email"]').type('none@cypress.com')
    cy.get('input[type="password"]').type('DncNone@1234')
    cy.get('button[type="submit"]').click()
    cy.contains('Email e/ou senha inválidos').should('be.visible')
  })
})