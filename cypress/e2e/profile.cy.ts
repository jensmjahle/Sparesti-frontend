// https://on.cypress.io/api
//    cy.get('.text-input').find('#email-input').type("test@email.com")
describe('Profile View', () => {
  beforeEach(() => {
    cy.login('JohnSmith12', 'password')
    cy.visit('/homepage/profile')
    cy.wait(4000);
  })

  it('should display components', () => {
    // Assert that the logout button is displayed
    cy.get('#logout-button').should('be.visible');
    cy.get('.input-fields').first().should('be.visible');
    cy.get('#user-info').scrollIntoView()
    // Assert that the user info component is displayed
    cy.get('#user-info').should('be.visible');

    // Assert that the password info component is displayed
    cy.get('#password-info').should('be.visible');

    // Assert that the income info component is displayed
    cy.get('#income-info').should('be.visible');
    // Assert that the bank account info component is displayed
    cy.get('#account-info').scrollIntoView()
    cy.get('#account-info').should('be.visible');

    // Assert that the badges component is displayed
    cy.get('#badges').should('be.visible');
    //
     // Assert that the delete user button is displayed
     cy.get('#delete-user-button').should('be.visible');
  })
  it('should validate email input', () => {
    cy.get('.text-input').find('#email-input').clear().type("test@email.com")

    // Assert that the email error message is not visible
    cy.get('.error-message').should('not.exist');

    // Type invalid email in the email input field
    cy.get('.text-input').find('#email-input').clear().type('invalid-email');
    // Assert that the email error message is visible
    cy.get('.error-message').should('be.visible');
  });
  it('should validate income inputs', () => {
    // Type invalid income values
    cy.get('#monthlyIncome').clear().type('-1000');
    cy.get('#monthlySpending').clear().type('-500');
    cy.get('#monthlySaving').clear().type('-200');

    // Click on the "Lagre" (Save) button
    cy.get('#income-save').click();

    // Assert that error messages are visible for all inputs
    cy.get('.error-message').should('have.length', 3);

    // Assert specific error messages
    cy.contains('#incomeError', 'Vennligst oppgi en gyldig månedlig inntekt!').should('be.visible');
    cy.contains('#spendingError', 'Vennligst oppgi gyldige faste utgifter!').should('be.visible');
    cy.contains('#savingError', 'Vennligst oppgi et gyldig ønsket sparebeløp!').should('be.visible');
  })

})
