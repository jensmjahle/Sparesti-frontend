describe('Create milestone View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/milestone')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);
    cy.contains('.create-milestone-button-title', 'Lag nytt sparemål +').click();
  })
  it('validates input fields correctly', () => {
    // Submit without filling any field
    cy.get( '.save-button').last().click()
    cy.get('.error').should('contain.text', 'Mangler tittel på sparemålet!');
    cy.get('.error').should('contain.text', 'Mangler beskrivelse på sparemålet!');
    cy.get('.error').should('contain.text', 'Oppgi sluttdato!');
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');

    // Fill in valid data
    cy.get('#title-input').type('Test Milestone Tittel');
    cy.get('#description-area').type('Test Milestone Beskrivelse');
    cy.get('#goal-input').type('5000');
    cy.get('#current-input').type('2000');
    cy.get('#end-date').click(); // Assume you have a date picker
    cy.get('#2024-05-25').first().click(); // Select tomorrow's date
    cy.get('.save-button').last().click();
    // Check if the form is submitted
    cy.url().should('include', '/homepage/milestone');

    cy.get('.active-milestone').first().click()
    cy.viewport(1100, 700);
    cy.contains('button', 'Slett').click()
    cy.get('.option-buttons').get('#delete-button').click()
    cy.url().should('include', '/homepage/milestone');

  });

  it('validates input fields correctly for negative values', () => {
    // Fill in valid data
    cy.get('#title-input').type('Test Milestone Tittel');
    cy.get('#description-area').type('Test Milestone Beskrivelse');

    // Negative value for goal sum
    cy.get('#goal-input').type('-5000');
    cy.get('#current-input').type('-2000');
    cy.get('#end-date').click();
    cy.get('#2024-05-25').first().click();
    cy.get('.save-button').last().click();
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');

    // Negative value for current sum
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');
  });

  it('validates input fields correctly for non-numeric characters', () => {
    // Fill in valid data
    cy.get('#title-input').type('Test Milestone Tittel');
    cy.get('#description-area').type('Test Milestone Beskrivelse');

    // Non-numeric characters for goal sum
    cy.get('#goal-input').clear().type('abc');
    cy.get('#current-input').type('abc');
    cy.get('.save-button').last().click();
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');

    // Non-numeric characters for current sum
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig beløp!');
  });

  it('validates that the goal amount is greater than the current amount', () => {
    // Fill in valid data
    cy.get('#title-input').type('Test Milestone Title');
    cy.get('#description-area').type('Test Milestone Description');
    cy.get('#goal-input').type('5000');
    cy.get('#current-input').type('6000');
    cy.get('.save-button').last().click();
    cy.get('.error').should('contain.text', 'Nåværende beløp kan ikke være lik eller større enn sparebeløpet!');

  });

})
