describe("burger constructor", () => {
  beforeEach(() => {
    localStorage.setItem("refreshToken", "mockRefreshToken");
    cy.setCookie("accessToken", "mockAccessToken");
    cy.intercept("GET", "api/ingredients", {
      fixture: "ingredients.json",
    });
    cy.intercept("POST", "api/auth/login", {
      fixture: "user.json",
    });
    cy.intercept("POST", "api/orders", {
      fixture: "order.json",
    });
    cy.visit("/");
    cy.get('[data-cy="ingredientCard"]').as("ingredientsList");
    cy.get('[data-cy="constructorBun"]').as("constructorBun");
    cy.get('[data-cy="constructorFilling"]').as("constructorFilling");
    cy.get('[data-cy="placeOrderBtn"]').as("placeOrderBtn");
  });

  it("should test the modal window working", () => {
    cy.get("@ingredientsList").first().click();
    cy.url().should("include", "/ingredients/643d69a5c3f7b9001cfa093c");
    cy.get('[data-cy="closeIcon"]').click();
    cy.url().should("not.include", "/ingredients/643d69a5c3f7b9001cfa093c");
  });

  it("should create an order", () => {
    cy.get("@ingredientsList").first().trigger("dragstart");
    cy.get("@constructorBun").trigger("drop");
    cy.get("@ingredientsList").last().trigger("dragstart");
    cy.get("@constructorFilling").trigger("drop");
    cy.get("@placeOrderBtn").click();
    cy.contains("Вход");
    cy.login().get("@placeOrderBtn").click();
    cy.contains("идентификатор заказа").get('[data-cy="closeIcon"]').click();
  });

  it("shouldn't create an order", () => {
    cy.get("@ingredientsList").last().trigger("dragstart");
    cy.get("@constructorFilling").trigger("drop");
    cy.get("@placeOrderBtn").click();
    cy.url().should("not.include", "/login");
  });

  it("should change bun", () => {
    cy.get("@ingredientsList").first().trigger("dragstart");
    cy.get("@constructorBun").trigger("drop");
    cy.get("@ingredientsList").eq(1).trigger("dragstart");
    cy.get("@constructorBun").trigger("drop");
    cy.contains("Флюоресцентная булка");
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
