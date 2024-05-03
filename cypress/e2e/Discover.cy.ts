describe('Discover View Tests', () => {
  beforeEach(() => {
    cy.visit('/homepage/discover')
  })

  it('displays articles', () => {
    cy.get('[data-testid="Articles"]').should('have.length.above', 0)
  })

  it('opens help popup', () => {
    cy.get('.help-icon').click()
    cy.get('.popup-container').should('be.visible')
  })
})
