describe("burrito builder user flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      fixture: "./order-data.json",
    });
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      body: {
        name: "Joe",
        ingredients: ["sour cream"],
      },
    });
    cy.visit("http://localhost:3000/");
  });

  it("should display all sites functionality on load", () => {
    cy.contains("Burrito Builder");
    cy.get("form").should("exist").find("input[type=text]");
    cy.get(".ingredientBtn")
      .should("have.length", 12)
      .first()
      .should("have.text", "beans");
    cy.get(".ingredientBtn").last().should("have.text", "sour cream");
    cy.contains("Order: Nothing selected");
    cy.get("button").last().should("have.text", "Submit Order");
  });

  it("should display all previous orders on load", () => {
    cy.get(".order")
      .should("have.length", 2)
      .first()
      .should("have.text", "Patbeanslettucecarnitasqueso frescojalapeno");
    cy.get(".order")
      .last()
      .should(
        "have.text",
        "Samsteakpico de gallolettucecarnitasqueso frescojalapeno"
      );
  });

  it("should be have the ability for a user to add their name and ingredients", () => {
    cy.get("input[type=text]").type("Joe").should("have.value", "Joe");
    cy.get(".ingredientBtn").last().click();
    cy.contains("Order: sour cream");
  });

  it("should be have the ability for a user to submit their order and have it displayed", () => {
    cy.get("input[type=text]").type("Joe").should("have.value", "Joe");
    cy.get(".ingredientBtn").last().click();
    cy.contains("Order: sour cream");
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      fixture: "./new-order-data.json",
    });
    cy.get("button").last().click();
    cy.get(".order")
      .should("have.length", 3)
      .last()
      .should("have.text", "Joesour cream");
  });

  it("should not be able to submit an order if the form is partially filled out", () => {
    cy.get("input[type=text]").type("Joe").should("have.value", "Joe");
    cy.get("button").last().click();
    cy.get(".order")
      .should("have.length", 2)
      .last()
      .should(
        "have.text",
        "Samsteakpico de gallolettucecarnitasqueso frescojalapeno"
      );
    cy.get("input[type=text]").should("have.value", "");
  });

  it("should display a message if no orders load", () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 500,
    });
    cy.visit("http://localhost:3000/");
    cy.contains("No orders yet!");
  });
});
