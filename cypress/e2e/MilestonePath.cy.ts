describe('Milestone-Path View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/milestone')
    cy.wait(2000);
    cy.get('.active-milestone').should('have.length.greaterThan', 0);
    cy.get('.active-milestone').first().click()
  })
  it('displays milestone path information', () => {
    cy.viewport(1100, 700);

    // Check if the milestone path name is displayed
    cy.get('.title').should('be.visible');

    // Check if the path description is displayed
    cy.get('#Description').should('be.visible');

    // Check if total to save is displayed
    cy.get('#Progress').should('be.visible');

    // Check if total saved is displayed
    cy.get('#Progress').should('be.visible');
  });

  it('allows toggling between information and milestone path view in mobile', () => {
    cy.viewport(500, 700);

    // Click on the toggle button for milestone path view
    cy.get('.toggle-button-title').contains('Sparesti').click();

    // Check if the milestone path view is displayed
    cy.get('#Path').should('be.visible');

    // Click on the toggle button for information
    cy.get('.toggle-button-title').contains('Informasjon').click();

    // Check if the information view is displayed
    cy.get('#Info').should('be.visible');
  });

  it('opens and closes help popup', () => {
    // Click on the help icon
    cy.get('.help-icon').click();

    // Check if the help popup is displayed
    cy.get('.popup-container').should('be.visible');

    // Click on the close button of the help popup
    cy.get('#delete-button').click();

    // Check if the help popup is closed
    cy.get('.popup-container').should('not.exist');
  });
})
