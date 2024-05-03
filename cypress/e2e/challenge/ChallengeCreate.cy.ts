describe('Create challenge View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/challenge')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.contains('.create-challenge-button', 'Ny personlig utfordring +').click();
  })
  it('validates input fields correctly', () => {
    // Submit without filling any field
    cy.get( '.save-button').last().click()
    cy.get('.error').should('contain.text', 'Mangler tittel på utfordringen!');
    cy.get('.error').should('contain.text', 'Mangler beskrivelse på utfordringen!');
    cy.get('.error').should('contain.text', 'Oppgi sluttdato!');
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig sparebeløp!');

    // Fill in valid data
    cy.get('#title-input').type('Test Challenge Title');
    cy.get('#description-area').type('Test Challenge Beskrivelse');
    cy.get('#goal-input').type('7000');
    cy.get('.dp__input_wrap').last().click(); // Assume you have a date picker
    cy.get('#2024-05-27').first().click();
    cy.get('.save-button').last().click();
    cy.wait(2500);
    cy.url().should('include', '/homepage/challenge');

  });

  it('validates input fields correctly for negative values', () => {
    // Fill in valid data
    cy.get('#title-input').type('Test Challenge Title');
    cy.get('#description-area').type('Test Challenge Beskrivelse');

    // Negative value for goal sum
    cy.get('#goal-input').type('-5000');
    cy.get('.dp__input_wrap').last().click(); // Assume you have a date picker
    cy.get('#2024-05-28').first().click();
    cy.get('.save-button').last().click();
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig sparebeløp!');
  });

  it('validates input fields correctly for non-numeric characters', () => {
    // Fill in valid data
    cy.get('#title-input').type('Test Challenge Title');
    cy.get('#description-area').type('Test Challenge Beskrivelse');
    cy.get('.dp__input_wrap').last().click(); // Assume you have a date picker
    cy.get('#2024-05-28').first().click();
    // Non-numeric characters for goal sum
    cy.get('#goal-input').type('abc');
    cy.get('.save-button').last().click();
    cy.get('.error').should('contain.text', 'Fyll inn et gyldig sparebeløp!');

  });


})
