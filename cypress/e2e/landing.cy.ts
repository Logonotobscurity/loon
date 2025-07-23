describe('LOG_ON Landing Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('verifies nav links open dropdowns on hover', () => {
    cy.get('nav button').contains('Solutions').trigger('mouseover');
    cy.get('div').contains('Deploy autonomous agents').should('be.visible');
  });

  it('verifies Hero CTA scrolls to Capabilities section', () => {
    cy.get('a').contains('Deploy Your First Agent').click();
    cy.get('#capabilities').should('be.visible');
  });

  context('Mobile View', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('shows the mobile footer CTA and buttons are clickable', () => {
      cy.get('#mobile-footer-cta').should('be.visible');
      cy.get('#mobile-footer-cta button').contains('Click to Speak').should('be.visible');
      cy.get('#mobile-footer-cta button').contains('Book a Builder').should('be.visible');
    });
  });
});
