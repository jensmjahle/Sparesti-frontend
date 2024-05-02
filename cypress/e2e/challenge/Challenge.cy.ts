// https://on.cypress.io/api
describe('Challenge View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/challenge')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500);
  })

  it('should display active challenges and inactive challenges', () => {
    cy.contains('.title', 'Dine utfordringer!').should('be.visible');
    cy.viewport(1100, 700);

    cy.get('.active-challenge').should('have.length.greaterThan', 0);
    cy.get('.potential-challenge').should('have.length.greaterThan', 0);
  });

  it('opens and closes help popup', () => {
    cy.get('.help-icon').click();
    cy.get('.popup-container').should('be.visible');

    // Close the popup
    cy.get('#delete-button').click();
    cy.get('.popup-container').should('not.exist');
  });

  it('navigates to create challenge page when "Ny personlig utfordring +" button is clicked', () => {
    cy.get('.create-challenge-button').click();
    cy.url().should('include', '/homepage/create-challenge');
  });

  it('should display active challenges and when clicked it should expand', () => {
    cy.viewport(1100, 700);

    cy.get('.active-challenge').should('have.length.greaterThan', 0);

    cy.get('.active-challenge').first().click();

    cy.get('.active-challenge').first().should('have.class', 'expanded');
  });

  it('should display the toggle buttons for smaller screens, and the buttons should work accordingly', () => {
    cy.viewport(500, 700);

    cy.contains('.title', 'Dine utfordringer!').should('be.visible');

    cy.contains('.toggle-button', 'Aktive utfordringer').click();

    cy.contains('.toggle-button', 'Nye utfordringer').should('not.have.class', 'active-button');
    cy.contains('.toggle-button', 'Aktive utfordringer').should('have.class', 'active-button');
    cy.get('.active-challenge').should('be.visible');

    cy.contains('.toggle-button', 'Nye utfordringer').click();
    cy.get('.potential-challenge').should('be.visible');

    cy.contains('.toggle-button', 'Aktive utfordringer').should('not.have.class', 'active-button');
    cy.contains('.toggle-button', 'Nye utfordringer').should('have.class', 'active-button');
  });
})
