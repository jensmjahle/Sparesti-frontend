describe('StartView spec', () => {
  it('Can navigate to login', () => {
    cy.visit('/')
    cy.get('[data-testid="LogInButton"]').should('be.enabled')
    cy.get('[data-testid="LogInButton"]').click()
    cy.url().should('include', '/login')
  })
})
