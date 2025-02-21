describe("burger constructor", () => {
  beforeEach(() => {
    localStorage.setItem("refreshToken", "mockRefreshToken");
    cy.setCookie("accessToken", "mockAccessToken");
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients.json",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
      fixture: "user.json",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order.json",
    });
    cy.visit("http://localhost:3000/");
  });

  it("should test the modal window working", () => {
    cy.get('[data-cy="ingredientCard"]').first().click();
    cy.url().should("include", "/ingredients/643d69a5c3f7b9001cfa093c");
    cy.get('[data-cy="closeIcon"]').click();
    cy.url().should("not.include", "/ingredients/643d69a5c3f7b9001cfa093c");
  });

  it("should create an order", () => {
    cy.get('[data-cy="ingredientCard"]').first().trigger("dragstart");
    cy.get('[data-cy="constructorBun"]').trigger("drop");
    cy.get('[data-cy="ingredientCard"]').last().trigger("dragstart");
    cy.get('[data-cy="constructorFilling"]').trigger("drop");
    cy.get('[data-cy="placeOrderBtn"]').click();
    cy.contains("Вход")
      .get('[data-cy="inputEmail"]')
      .type("test@test.com")
      .get('[data-cy="inputPassword"]')
      .type("123456")
      .get('[data-cy="loginBtn"]')
      .click()
      .get('[data-cy="placeOrderBtn"]')
      .click();
    cy.contains("идентификатор заказа").get('[data-cy="closeIcon"]').click();
  });

  it("shouldn't create an order", () => {
    cy.get('[data-cy="ingredientCard"]').last().trigger("dragstart");
    cy.get('[data-cy="constructorFilling"]').trigger("drop");
    cy.get('[data-cy="placeOrderBtn"]').click();
    cy.url().should("not.include", "/login");
  });

  it("should change bun", () => {
    cy.get('[data-cy="ingredientCard"]').first().trigger("dragstart");
    cy.get('[data-cy="constructorBun"]').trigger("drop");
    cy.get('[data-cy="ingredientCard"]').eq(1).trigger("dragstart");
    cy.get('[data-cy="constructorBun"]').trigger("drop");
    cy.contains("Флюоресцентная булка");
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
