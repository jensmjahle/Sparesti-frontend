describe('Login spec', () => {
  it('Can log in', () => {
    cy.visit('/login')

    cy.get('[data-testid="LogInButton"]').should('be.disabled')

    cy.get('[data-testid="NameInput"]').type("JohnSmith12")
    cy.get('[data-testid="NameInput"]').should('have.value', "JohnSmith12")

    cy.get('[data-testid="LogInButton"]').should('be.disabled')

    cy.get('[data-testid="PasswordInput"]').type("password")
    cy.get('[data-testid="PasswordInput"]').should('have.value', "password")

    cy.get('[data-testid="LogInButton"]').should('be.enabled')
    cy.get('[data-testid="LogInButton"]').click()
    cy.url().should('include', '/homepage')
  })

  it('Can navigate to new user', () => {
    cy.visit('/login')
    cy.get('[data-testid="NewUserLink"]').click()
    cy.url().should('include', '/signup')

  })
})