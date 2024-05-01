// https://on.cypress.io/api
describe('Milestone View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/milestone')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
  })
  it('should display milestone view components and perform actions', () => {
    cy.contains('.title', 'Dine sparemål!').should('be.visible');

    cy.contains('.create-milestone-button-title', 'Lag nytt sparemål +').click();

    cy.url().should('include', '/homepage/create-milestone');

    cy.go('back');
    cy.get('.active-milestone').should('have.length.greaterThan', 0);

    // Click on the help icon
    cy.get('.help-icon').click();

    // Assert that the help popup is visible
    cy.get('.popup-container').should('be.visible');

    // Click on the close button in the help popup
    cy.get('#delete-button').click();

    // Assert that the help popup is closed
    cy.get('.popup-container').should('not.exist');
  });
  it('should display milestone view components and perform actions on smaller screens', () => {
    cy.viewport(500, 700);

    cy.contains('.title', 'Dine sparemål!').should('be.visible');

    cy.contains('.toggle-button', 'Fullførte sparemål').click();

    cy.contains('.toggle-button', 'Aktive sparemål').should('not.have.class', 'active-button');
    cy.contains('.toggle-button', 'Fullførte sparemål').should('have.class', 'active-button');
  });

  it('should display completed milestone items and expand when clicked', () => {

    cy.get('.completed-milestone').should('have.length.greaterThan', 0);

    cy.get('.completed-milestone').first().click();

    cy.get('.completed-milestone').first().should('have.class', 'expanded');
});
})
