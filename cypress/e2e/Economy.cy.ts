describe('Economy View', () => {
  let transactionsCount;

  beforeEach(() => {
    cy.login('JohnSmith12', 'password');
    cy.visit('/homepage/economy');
    cy.wait(4000);
    // Get the count of transactions
    cy.get('.transaction').its('length').then((count) => {
      transactionsCount = count;
    });
  });

  it('displays transactions and pie-chart by default', () => {
    cy.viewport(1100, 700);
    cy.get('.box').should('be.visible')
    cy.get('.pie-box').should('be.visible')

  });

  it('toggles between transactions and pie chart in smaller screen', () => {
    cy.viewport(500, 700);

    // Click on "Diagram" button
    cy.contains('.toggle-button', 'Diagram').click();
    cy.contains('.toggle-button','Diagram').should('have.class', 'active-button');
    cy.get('.box').should('not.be.visible');
    cy.get('.pie-box').should('be.visible');

    // Click on "Transaksjoner" button
    cy.contains('.toggle-button', 'Transaksjoner').click();
    cy.contains('.toggle-button','Transaksjoner').should('have.class', 'active-button');
    cy.get('.box').should('be.visible');
    cy.get('.pie-box').should('not.be.visible');
     });
  it('opens and closes help popup', () => {
    cy.get('.help-icon').click();
    cy.get('.popup-container').should('be.visible');

    // Close the popup
    cy.get('#delete-button').click();
    cy.get('.popup-container').should('not.exist');
  });
});
