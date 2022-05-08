describe('Appointments page', () => {
  before(() => {
    cy.visit('/appointments');
  });

  it('can see the intro section', () => {
    cy.pick('intro').should('be.visible');
  });

  it('can see the appointment form', () => {
    cy.pick('appointment-form').should('be.visible');
  });

  it('can see the appointments list', () => {
    cy.pick('appointment-list').should('be.visible');
  });
});
