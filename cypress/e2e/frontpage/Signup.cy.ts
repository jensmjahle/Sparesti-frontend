describe('Signup spec', () => {
  it('Can signup', () => {
    cy.visit('/signup')

    cy.get('[data-testid="NewUserLink"]').click()
    cy.get('[data-testid="SignupButton"]').should('be.disabled')

    cy.get('[data-testid="NameInput"]').type("TestingUser")
    cy.get('[data-testid="NameInput"]').should('have.value', "TestingUser")

    cy.get('[data-testid="SignupButton"]').should('be.disabled')

    cy.get('[data-testid="EmailInput"]').type("Testing@Test.test")
    cy.get('[data-testid="EmailInput"]').should('have.value', "Testing@Test.test")

    cy.get('[data-testid="SignupButton"]').should('be.disabled')

    cy.get('[data-testid="PasswordInput"]').type("ehswbfwowqw+pdiaas1")
    cy.get('[data-testid="PasswordInput"]').should('have.value', "ehswbfwowqw+pdiaas1")

    cy.get('[data-testid="SignupButton"]').should('be.disabled')

    cy.get('[data-testid="ConfirmPasswordInput"]').type("ehswbfwowqw+pdiaas1")
    cy.get('[data-testid="ConfirmPasswordInput"]').should('have.value', "ehswbfwowqw+pdiaas1")

    cy.get('[data-testid="SignupButton"]').should('be.enabled')
  })
})
