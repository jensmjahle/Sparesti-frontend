describe('Discover View Tests', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/discover')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000)
  })

  it('displays articles', () => {
    cy.get('.article-item').should('have.length.above', 0)
  })

  it('opens help popup', () => {
    cy.get('.help-icon').click()
    cy.get('.popup-container').should('be.visible')
  })
})
