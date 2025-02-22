Cypress.Commands.add("login", () => {
  cy.get('[data-cy="inputEmail"]').type("test@test.com");
  cy.get('[data-cy="inputPassword"]').type("123456");
  cy.get('[data-cy="loginBtn"]').click();
});
